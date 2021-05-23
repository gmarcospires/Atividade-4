const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();


const uri = "mongodb+srv://vue123:1234@cluster1.xv3sf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// listar todos os posts
router.get('/', async(req, res) => {
    //res.setHeader('Access-Control-Allow-Origin', '*')
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
})

// criar posts
router.post('/', async(req, res) => {
    //res.setHeader('Access-Control-Allow-Origin', '*')
    const posts = await loadPostsCollection();
    await posts.insertOne ({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

// apagar um post

router.delete('/:id', async(req, res) => {
    //res.setHeader('Access-Control-Allow-Origin', '*')
    const posts = await loadPostsCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send;
})

async function loadPostsCollection() {
    await client.connect();
    return client.db('vue_express').collection('posts');

}

module.exports = router;