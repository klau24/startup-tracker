import { express } from 'express'
import { cors } from 'cors'
import { Companies } from './config.js'

var app = express()

app.use(express.json())
app.use(cors())

var HTTP_PORT = 8000

// getting all company names in the db
app.get('/', async (req, res) => {
   const snapshot = await Companies.get()
   const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
   console.log(list)
   //res.send(list);
})

app.listen(HTTP_PORT, () => {
   console.log('Server running on port %PORT%'.replace('%PORT%', HTTP_PORT))
})
