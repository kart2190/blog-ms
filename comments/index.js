const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let commentsById = {};

app.get('/posts/:id/comments',(req,res) => {
    res.status(201).send(commentsById[req.params.id] || []);
})

app.post('/posts/:id/comments',(req,res) => {
    let comments = commentsById[req.params.id] || [];
    const contentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    comments.push({id:contentId,content: content});
    commentsById[req.params.id] = comments;
    res.status(201).send(comments);
})

app.listen(4001,()=> {
    console.log("Server listening on 4001!");
})