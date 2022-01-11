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

router.post('/', (req, res) => {

})


router.get('*', (req, res) => {
    res.status(404).json({
        message: "Not Found"
    })
})
module.exports = router
