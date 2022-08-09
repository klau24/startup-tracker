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

//app.use(express.static(path.join(__dirname, 'client')))

app.get('/api/companies', (req, res) => {
   let companies = db.collection('companies')
   var companyArr = []
   var company = {}
   var count = 0

   companies.get().then((querySnapshot) => {
      querySnapshot.forEach((document) => {
         company['label'] = document.id
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

app.get('/api/twitterData/:company/', (req, res) => {
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
         data[document.id] = document.data()
      })

      // Summary of twitter account stats as of most recent date
      twitterData
         .limit(1)
         .get()
         .then((querySnapshot) => {
            querySnapshot.forEach((document) => {
               data['summary'] = document.data()['data']['public_metrics']
               res.send(data)
            })
         })
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

/*app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'client', 'index.html'))
})*/

app.listen(HTTP_PORT, () => {
   console.log('Server running on port %PORT%'.replace('%PORT%', HTTP_PORT))
})
