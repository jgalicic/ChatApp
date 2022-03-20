const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

app.post('/events', (req, res) => {
  const event = req.body

  axios.post('http://localhost:4000/events', event).then((e) => {
    console.log("SWEET!", event)
  }).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://localhost:4001/events', event).catch((err) => {
    console.log(err.message);
  });
  axios.post('http://localhost:4002/events', event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: 'OK' });
})

app.listen(4005, () => {
  console.log('Listening on port 4005')
})