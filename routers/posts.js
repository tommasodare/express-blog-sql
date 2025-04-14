const express = require('express')
const router = express.Router()
const postController = require('../controllers/postsController')

// Index
router.get('/', postController.index)

// Show
router.get('/:slug', postController.show)

// Create
router.post('/', postController.store)

// Update
router.put('/:slug', postController.update)

// Modify
router.patch('/:slug', postController.modify)

// Destroy
router.delete('/:slug', postController.destroy)


module.exports = router