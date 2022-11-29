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
   var companies = [
      'Ducalis',
      'Quickframe',
      'PrizePool',
      'Accion Systems',
      'Dataherald',
      'Pentester Academy',
      'Yotascale',
      'Scienaptic',
   ]
   var topN = Math.round(companies.length * 0.25) // later change to a req param
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
   const gatherData = async () => {
      let featureObj = {}
      let resultCompany = []
      for (var i = 0; i < filters.length; i++) {
         featureObj[filters[i]] = {}
         for (var j = 0; j < companies.length; j++) {
            if (paths[filters[i]].includes('company_twitter_data')) {
               let featureData = db
                  .collection('company_data')
                  .doc(companies[j])
                  .collection('company_twitter_data')
               let doc = await featureData.get()
               let filter = paths[filters[i]].split('/').pop()
               doc = doc.docs[doc.docs.length - 1] // get most recent data
               featureObj[filters[i]][companies[j]] =
                  doc.data()['data']['public_metrics'][filter]
            } else {
               let featureData = db
                  .collection('company_data')
                  .doc(companies[j])
                  .collection('quarterly')
                  .doc('activity')
                  .collection('data')
               let doc = await featureData.get()
               let filter = paths[filters[i]].split('/').pop()
               doc = doc.docs[doc.docs.length - 1] // get most recent data
               if (doc !== undefined) {
                  if (filters[i].includes('Company')) {
                     featureObj[filters[i]][companies[j]] =
                        doc.data()['tweet_metrics']['company'][filter]
                  } else if (
                     filters[i] === 'Users' ||
                     filters[i] === 'User Tweets'
                  ) {
                     featureObj[filters[i]][companies[j]] = doc.data()[filter]
                  } else {
                     featureObj[filters[i]][companies[j]] =
                        doc.data()['tweet_metrics']['other_users'][filter]
                  }
               }
            }
         }
         var sortable = Object.fromEntries(
            Object.entries(featureObj[filters[i]])
               .sort(([, a], [, b]) => b - a)
               .splice(0, topN)
         )
         console.log(sortable)
         resultCompany = [...resultCompany, ...Object.keys(sortable)]
      }
      return resultCompany
   }
   gatherData().then((data) => {
      console.log({ ...[...new Set(data)] })
      res.send({ ...[...new Set(data)] })
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
