const express = require('express'),
    router = express.Router(),
    booksController = require('../controllers/books');

router.get('/', booksController.books_get);
router.get('/:book_id', booksController.book_get);
router.post('/:book_id', booksController.review_post);

module.exports = router;
