// implement your posts router here
const express = require('express')

const router = express.Router()

const Post = require('./posts-model')



router.get('/', (req, res) => {
    Post.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({
                message: "The posts information could not be retrieved",
                err: err.message
            })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Post.findById(id)
        .then(user => {
            if(!user) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist"
                })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "The post information could not be retrieved",
                err: err.message
            })
        })
})

router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.contents) {
            res.status(400).json({
                message: "Please provide title and contents for the post"
            })
        } else {
            const post = await Post.insert(req.body)
            const newPost = {
                id: post.id,
                title: req.body.title,
                contents: req.body.contents
            }
            res.status(201).json(newPost)
        }
    } catch (err) {
        res.status(500).json({
            message: "There was an error while saving the post to the database"
        })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(!post) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            if (!req.body.title || !req.body.contents) {
                res.status(400).json({
                    message: "Please provide title and contents for the post"
                })
            } else {
                const updatedPost = await Post.update(
                    req.params.id,
                    req.body
                )
                res.status(200).json(updatedPost.title)
            }
        }
    } catch (err) {
        res.status(500).json({
            message: "The post information could not be modified"
        })
    }
})

// router.delete('/:id', (req, res) => {
//     const { id } = req.params.id
//     Post.remove(id)
//         .then(post => {
//             if (!id) {
//                 res.status(404).json({
//                     message: "The post with the specified ID does not exist"
//                 })
//             } else {
//                 res.status(200).json(post)
//             }
//         })
//         .catch(err => {
//             res.status(500).json({
//                 message: "The post could not be removed"
//             })
//         })
// })


router.get('*', (req, res) => {
    res.status(404).json({
        message: "Not Found"
    })
})
module.exports = router
