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
   var strToVar = {
      'Followers Count': 'followers_count',
      'Following Count': 'following_count',
      'Company Tweets': 'tweet_count',
   }
   var filters = req.params['filters'].split(',').map((s) => {
      return strToVar[s]
   })
   var prevDay = new Date()
   var dd = String(prevDay.getDate() - 1).padStart(2, '0')
   var mm = String(prevDay.getMonth() + 1).padStart(2, '0') //January is 0!
   var yyyy = prevDay.getFullYear()
   prevDay = yyyy + '-' + mm + '-' + dd
   const gatherData = async () => {
      let featureObj = {}
      let resultCompany = []
      for (var i = 0; i < filters.length; i++) {
         featureObj[filters[i]] = {}
         for (var j = 0; j < companies.length; j++) {
            let featureData = db
               .collection('company_data')
               .doc(companies[j])
               .collection('company_twitter_data')
               .doc(prevDay)
            const doc = await featureData.get()
            featureObj[filters[i]][companies[j]] =
               doc.data()['data']['public_metrics'][filters[i]]
         }
         var sortable = Object.fromEntries(
            Object.entries(featureObj[filters[i]])
               .sort(([, a], [, b]) => b - a)
               .splice(0, topN)
         )
         resultCompany = [...resultCompany, ...Object.keys(sortable)]
      }
      return resultCompany
   }
   gatherData().then((data) => {
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
      console.log({ ...querySnapshot.data()['companies'] })
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
