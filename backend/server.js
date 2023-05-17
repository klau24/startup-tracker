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

app.get('/api/screening/:filters', (req, res) => {
   /*var companies = [
      'OpenExchange',
      'Metadata (Media and Information Services)',
      'ZeroStorefront',
      'Elevate Brands',
      'Kasa Living',
      'Strike Graph',
      'Seel (CommercialProfessional Insurance)',
      'AllSeated',
      'Experic',
      'Good Mylk Co.',
      'OnSite Waste Technologies',
      'Kyte (Information Services)',
      'Genomatica',
      'Xpansiv',
      'Sweet Flower',
      'Emergence Healthcare Group',
      'BeeFlow',
      'Advantia Health',
      'Utobo',
      'Panhwar Jet',
      'Wheels',
   ]*/

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

      // Create an array of promises for all the queries
      const queryPromises = filters.map(async (filter) => {
         featureObj[filter] = {}

         const companyData = db.collection('company_data')
         const twitterDataPath = paths[filter].includes('company_twitter_data')
         const filterMetric = paths[filter].split('/').pop()

         const querySnapshotPromises = companies.map(async (company) => {
            const docRef = twitterDataPath
               ? companyData.doc(company).collection('company_twitter_data')
               : companyData
                    .doc(company)
                    .collection('quarterly')
                    .doc('activity')
                    .collection('data')

            try {
               const docSnapshot = await docRef.get()
               const doc = docSnapshot.docs[docSnapshot.docs.length - 1]

               if (doc && doc.exists) {
                  if (twitterDataPath) {
                     featureObj[filter][company] =
                        doc.data()['data']['public_metrics'][filterMetric]
                  } else {
                     if (filter.includes('Company')) {
                        featureObj[filter][company] =
                           doc.data().tweet_metrics.company[filterMetric]
                     } else if (
                        filter === 'Users' ||
                        filter === 'User Tweets'
                     ) {
                        featureObj[filter][company] = doc.data()[filterMetric]
                     } else {
                        featureObj[filter][company] =
                           doc.data().tweet_metrics.other_users[filterMetric]
                     }
                  }

                  resultCompany.add(company)
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

      for (const filter of filters) {
         const sortable = Object.fromEntries(
            Object.entries(featureObj[filter])
               .sort(([, a], [, b]) => b - a)
               .slice(0, topN)
         )

         resultCompany.add(...Object.keys(sortable))
      }

      return { companies: [...resultCompany], feature: featureObj }
   }

   db.collection('company_data')
      .doc('1. Supported Companies')
      .get()
      .then((querySnapshot) => {
         var companies = querySnapshot.data().companies
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
   let companies = db.collection('company_data').doc('1. Supported Companies')
   companies.get().then((querySnapshot) => {
      res.send({ ...querySnapshot.data()['companies'] })
   })
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

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'client', 'index.html'))
})

app.listen(HTTP_PORT, () => {
   console.log('Server running on port %PORT%'.replace('%PORT%', HTTP_PORT))
})
