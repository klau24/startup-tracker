import { collection, getDocs } from 'firebase/firestore/lite'
import express from 'express'
import { db } from './config.js'

var app = express()
app.use(express.json())

var HTTP_PORT = 8000

// getting all company names in the db
app.get('/', async (req, res) => {
   res.json({ hello: 'world' })
})

// getting all company names in the db
app.get('/companies', async (req, res) => {
   let companies = db.collection('companies')

   companies.get().then((querySnapshot) => {
      querySnapshot.forEach((document) => {
         console.log(document.id)
      })
   })
})

app.listen(HTTP_PORT, () => {
   console.log('Server running on port %PORT%'.replace('%PORT%', HTTP_PORT))
})
