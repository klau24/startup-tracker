var express = require('express')
var app = express()
app.use(express.json())
var path = require('path')

var HTTP_PORT = 8080
var admin = require('firebase-admin')

var serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: 'https://twitter-data-cce17-default-rtdb.firebaseio.com',
})

const db = admin.firestore()

app.use(express.static(path.join(__dirname, 'client')))

app.get('/api/filters', (req, res) => {
   let filters = db.collection('filter_mappings')
   filters.get().then((querySnapshot) => {
      res.send({ ...querySnapshot.docs.map((doc) => doc.id) })
   })
})

app.get('/api/screening/:filters', (req, res) => {
   var paths = {
      'Followers Count': 'company_twitter_data/followers_count',
      'Following Count': 'company_twitter_data/following_count',
      'Company Tweets': 'company_twitter_data/tweet_count',
      'Company Tweet Likes':
         'daily/activity/data/tweet_metrics/company/like_count',
      'Company Retweets':
         'daily/activity/data/tweet_metrics/company/retweet_count',
      Users: 'daily/activity/data/tweet_metrics/users',
      'User Tweets': 'daily/activity/data/tweet_metrics/user_tweets',
      'User Tweet Likes':
         'daily/activity/data/tweet_metrics/other_users/like_count',
      'User Retweets':
         'daily/activity/data/tweet_metrics/other_users/retweet_count',
   }
   var filters = req.params['filters'].split(',')
   const gatherData = async (companies, topN) => {
      const featureObj = {}
      const resultCompany = new Set()
      const companyData = db.collection('company_data_restructured')

      // Create an array of promises for all the queries
      const queryPromises = filters.map(async (filter) => {
         featureObj[filter] = {}
         var mapped_filter = await db
            .collection('filter_mappings')
            .doc(filter)
            .get()
         mapped_filter = mapped_filter.data()
         const querySnapshotPromises = companies.map(async (company) => {
            try {
               const dates = await companyData.doc(company).listCollections()
               const mostRecentDate = dates[dates.length - 1]
               const docRef = mostRecentDate.doc(mapped_filter.collection)
               const doc = await docRef.get()

               if (doc && doc.exists) {
                  var feature_value = doc.data()
                  var path = mapped_filter.path.split('/')
                  console.log(feature_value, path)
                  for (const subdoc of path) {
                     feature_value = feature_value[subdoc]
                  }
                  featureObj[filter][company] = feature_value
               }
            } catch (error) {
               // Handle the error as appropriate for your use case
               console.error(
                  `Error fetching data for company ${company} and filter ${filter}:`,
                  error
               )
            }
         })

         await Promise.all(querySnapshotPromises) // Wait for all the queries for this filter to complete
      })

      await Promise.all(queryPromises) // Wait for all the filters to complete

      console.log(featureObj)
      for (const filter of filters) {
         const sortable = Object.fromEntries(
            Object.entries(featureObj[filter])
               .sort(([, a], [, b]) => b - a)
               .slice(0, topN)
         )
         Object.keys(sortable).forEach(resultCompany.add, resultCompany)
      }
      return { companies: [...resultCompany], feature: featureObj }
   }

   const companies = []
   db.collection('company_data_restructured')
      .get()
      .then((querySnapshot) => {
         querySnapshot.forEach((doc) => {
            const company_name = doc.id
            companies.push(company_name)
         })
         var topN = Math.round(companies.length * 0.25) // later change to a req param
         gatherData(companies, topN).then((data) => {
            res.send(data)
         })
      })
})

app.get('/api/:company/:time/:feature', (req, res) => {
   let company = req.params['company']
   if (company.indexOf('+') >= 0) {
      company = company.replace('+', ' ')
   }
   let data = {}
   let allData = {}
   let featureData = db
      .collection('company_data')
      .doc(company)
      .collection(req.params['time'])
      .doc(req.params['feature'])
      .collection('data')
   featureData.get().then((querySnapshot) => {
      var done = false
      querySnapshot.forEach((document) => {
         if (document.id === '1. Top 10') {
            data['wordcloud'] = []
            for (var key in document.data()) {
               data['wordcloud'].push({
                  text: key,
                  value: document.data()[key],
               })
            }
            done = true
         } else if (done === false) {
            allData[document.id] = document.data()
         }
      })
      var keys = Object.keys(allData)
      keys = keys.slice(-15)
      for (let i in keys) {
         var key = keys[i]
         data[key] = allData[key]
      }
      res.send(data)
   })
})

app.get('/api/companies', (req, res) => {
   let companies = db.collection('company_data_restructured')
   companies.get().then((querySnapshot) => {
      res.send({ ...querySnapshot.docs.map((doc) => doc.id) })
   })
})

app.get('/api/screen', async (req, res) => {
   const gatherData = async (companies) => {
      const data = {}
      const querySnapshotPromises = companies.map(async (doc) => {
         try {
            const dates = await db
               .collection('company_data_restructured')
               .doc(doc.id)
               .listCollections()
            const mostRecentDate = dates[dates.length - 1]
            const docRef = mostRecentDate.doc('model_data')
            const features = await docRef.get()
            data[doc.id] = {
               name: doc.id,
               prediction: features.data()['3_year_prediction'],
               description: features.data()['description'],
            }
         } catch (error) {
            console.error(doc.id, error)
         }
      })

      await Promise.all(querySnapshotPromises)
      return data
   }

   try {
      const companiesSnapshot = await db
         .collection('company_data_restructured')
         .get()
      const data = await gatherData(companiesSnapshot.docs)
      res.send({ data })
   } catch (error) {
      console.error(error)
      res.status(500).send({ error: 'An error occurred' })
   }
})

app.get('/api/:company/companyTwitterData', (req, res) => {
   // Data is currently only weekly
   let company = req.params['company']
   if (company.indexOf('+') >= 0) {
      company = company.replace('+', ' ')
   }

   let twitterData = db
      .collection('company_data')
      .doc(company)
      .collection('company_twitter_data_weekly')

   var data = {}
   twitterData.get().then((querySnapshot) => {
      querySnapshot.forEach((document) => {
         data[document.id] = document.data()
      })
      res.send(data)
   })
})

// app.get('/api/:company/companyPredictionData', (req, res) => {
//    // Data is currently only weekly
//    let company = req.params['company']
//    if (company.indexOf('+') >= 0) {
//       company = company.replace('+', ' ')
//    }

//    let twitterData = db
//       .collection('company_data')
//       .doc(company)
//       .collection('company_twitter_data_weekly')

//    var data = {}
//    twitterData.get().then((querySnapshot) => {
//       querySnapshot.forEach((document) => {
//          data[document.id] = document.data()
//       })
//       res.send(data)
//    })
// })

// app.get('/api/:company/companyPredictionData', async (req, res) => {
//    let company = req.params['company']
//    if (company.indexOf('+') >= 0) {
//       company = company.replace('+', ' ')
//    }

//    let predictionData = db
//       .collection('company_data_restructured')
//       .doc(company)

//    const collections = await predictionData.listCollections();

//    var data = {}
//    collections.forEach(collection => {
//       const model_data = db.collection(collection.id);
//       const snapshot = model_data.get();
//       console.log(snapshot)
//       snapshot.forEach(doc => {
//          console.log(doc.id, '=>', doc.data());
//          data[collection.id] = doc.data()
//       });
//       console.log('Found subcollection with id:', collection.id);
//       });
//    console.log(data)
//    res.send(data)
// })

app.get('/api/:company/companyPredictionData', async (req, res) => {
   try {
      let company = req.params['company']
      if (company.includes('+')) {
         company = company.replace('+', ' ')
      }

      const predictionData = db
         .collection('company_data_restructured')
         .doc(company)
      const collectionsSnapshot = await predictionData.listCollections()

      const data = {}
      const sortedCollectionIds = collectionsSnapshot
         .map((collection) => collection.id)
         .sort()

      for (const collectionId of sortedCollectionIds) {
         const modelDataSnapshot = await predictionData
            .collection(collectionId)
            .doc('model_data')
            .get()

         if (modelDataSnapshot.exists) {
            const modelData = modelDataSnapshot.data()
            console.log(collectionId)
            data[collectionId] = modelData
         }
      }

      res.send(data)
   } catch (error) {
      console.log('Error retrieving company prediction data:', error)
      res.status(500).send('Internal Server Error')
   }
})

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'client', 'index.html'))
})

app.listen(HTTP_PORT, () => {
   console.log('Server running on port %PORT%'.replace('%PORT%', HTTP_PORT))
})
