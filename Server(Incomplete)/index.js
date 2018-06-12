// content of index.js
const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
const db = require('./db.json')

app.use(cors()) // for local testing
app.get('/api', (request, response) => {
  response.send("Hellow World!")
  console.log("requested")
})

app.get('/api/restaurants', (request, response) => {
  response.send(db.restaurants)
  console.log("requested")
  console.log(db.restaurants)
})

app.get('/api/testinputs', (request, response) => {
  response.send(db.testinputs)
  console.log("requested")
  console.log(db.testinputs)
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})