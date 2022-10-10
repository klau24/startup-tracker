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
   var companyArr = []
   var company = {}
   var count = 0

   companies.get().then((querySnapshot) => {
      querySnapshot.data()['companies'].forEach((c) => {
         company['label'] = c
         company['id'] = count
         companyArr.push(company)
         company = {}
         count++
      })
      res.send(companyArr)
   })
})

app.get('/api/weeklyData/:company/', (req, res) => {
   let company = req.params['company']
   if (company.indexOf('+') >= 0) {
      company = company.replace('+', ' ')
   }

   let weekly_data = db
      .collection('companies')
      .doc(company)
      .collection('weekly_data')
   var data = {}

   weekly_data.get().then((querySnapshot) => {
      querySnapshot.forEach((document) => {
         data[document.data().week] = document.data()
      })
      res.send(data)
   })
})

app.get('/api/companyTwitterData/:company/', (req, res) => {
   let company = req.params['company']
   if (company.indexOf('+') >= 0) {
      company = company.replace('+', ' ')
   }

   let twitterData = db
      .collection('company_data')
      .doc(company)
      .collection('company_twitter_data')

   var data = {}

   twitterData.get().then((querySnapshot) => {
      querySnapshot.forEach((document) => {
         if (document.id != '1. Company Data') {
            data[document.id] = document.data()
         }
      })

      var dates = Object.keys(data)
      var mostRecent = dates[dates.length - 1]
      data['summary'] = data[mostRecent]['data']['public_metrics']
      res.send(data)
   })
})

app.get('/api/tweets/:company/', (req, res) => {
   let company = req.params['company']
   if (company.indexOf('+') >= 0) {
      company = company.replace('+', ' ')
   }

   let tweetData = db
      .collection('company_data')
      .doc(company)
      .collection('tweets')

   var data = { data: {} }
   var wordCloud = {}
   var wordCloudArr = []
   var tweetCount = 0
   var avgSyllables = 0
   var avgWords = 0
   var avgReadGrade = 0
   var likeCount = 0
   var retweetCount = 0

   tweetData.get().then((querySnapshot) => {
      querySnapshot.forEach((document) => {
         document.data()['tweets'].forEach((tweet) => {
            tweet['nlp_features']['processed_tweet'].split(' ').map((word) => {
               if (word in wordCloud) {
                  wordCloud[word]++
               } else {
                  wordCloud[word] = 1
               }
            })

            avgSyllables +=
               tweet['nlp_features']['readability_features']['sentence info'][
                  'syllables'
               ]
            avgWords +=
               tweet['nlp_features']['readability_features']['sentence info'][
                  'words'
               ]
            avgReadGrade +=
               tweet['nlp_features']['readability_features'][
                  'readability grades'
               ]['Coleman-Liau']
            likeCount += tweet['public_metrics']['like_count']
            retweetCount += tweet['public_metrics']['retweet_count']
            tweetCount++
         })

         date = document.id.split(' ')[0]
         if (date in data['data']) {
            data['data'][date]['likeCount'] += likeCount
            data['data'][date]['retweetCount'] += retweetCount
         } else {
            data['data'][document.id] = {
               likeCount: likeCount,
               retweetCount: retweetCount,
            }
         }

         likeCount = 0
         retweetCount = 0
      })

      avgSyllables /= tweetCount
      avgWords /= tweetCount
      avgReadGrade /= tweetCount

      for (var i in wordCloud) {
         if (wordCloud[i] > 1) {
            wordCloudArr.push({ text: i, value: wordCloud[i] })
         }
      }
      data['wordFrequency'] = wordCloudArr
      data['summaryData'] = {
         avgSyllables: avgSyllables.toFixed(2),
         avgWords: avgWords.toFixed(2),
         avgReadGrade: avgReadGrade.toFixed(2),
      }

      res.send(data)
   })
})

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'client', 'index.html'))
})

app.listen(HTTP_PORT, () => {
   console.log('Server running on port %PORT%'.replace('%PORT%', HTTP_PORT))
})
