const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(express.json())
app.use(cors())

const { v4: uuidv4 } = require('uuid');

const commentsByPostId = {}


app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || [])
})

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = uuidv4()
  const { content } = req.body

  const comments = commentsByPostId[req.params.id] || []

  comments.push({ id: commentId, content})

  commentsByPostId[req.params.id] = comments

// Send event to event bus
 await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id
    }
  }).catch((err) => {
    console.log(err.message);
  });

  res.status(201).send(comments)

})

// ???
app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type)
  res.send({})
})



app.listen(4001, () => {
  console.log('Listening on port 4001')
})