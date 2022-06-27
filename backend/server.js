var express = require('express')
var app = express()
app.use(express.json())
var HTTP_PORT = 8000

var admin = require('firebase-admin')

var serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: 'https://twitter-data-cce17-default-rtdb.firebaseio.com',
})

const db = admin.firestore()

app.get('/api/companies', (req, res) => {
   let companies = db.collection('companies')
   var data = {}
   var count = 0

   companies.get().then((querySnapshot) => {
      querySnapshot.forEach((document) => {
         data[count] = document.id
         count++
      })
      res.send(data)
   })
})

app.get('/api/weeklyData/:company/', (req, res) => {
   let company = req.params['company']
   if (company.indexOf('+') >= 0) {
      company = company.replace('+', ' ')
      console.log(company)
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

app.listen(HTTP_PORT, () => {
   console.log('Server running on port %PORT%'.replace('%PORT%', HTTP_PORT))
})
