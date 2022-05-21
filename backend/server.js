var express = require('express')
var app = express()

var HTTP_PORT = 8000

app.listen(HTTP_PORT, () => {
   console.log('Server running on port %PORT%'.replace('%PORT%', HTTP_PORT))
})
