const express = require('express'),
    router = express.Router(),
    booksModel = require('../models/books');

router.get('/', async function (req, res) {
    const allBooks = await booksModel.getAllBooks();
    console.log("allBooks", allBooks);
    res.render('template', {
        locals: {
            title: booksModel,
            booksList: allBooks,
            is_logged_in: req.session.is_logged_in,
            userID: req.session.user_id
        },
        partials: {
            partial: 'partial-books-list'
        }
    })
})

function numberToStars(num) {
    let rating = (num == 1) ? "*" 
    : (num == 2) ? "**"
    : (num == 3) ? "***"
    : (num == 4) ? "****"
    : (num == 5) ? "*****"
    : "NA";
    return rating
}

router.get('/:book_id', async function (req, res) {
    const bookInfo = await booksModel.getBook(req.params.book_id);
    console.log("Book Info:", bookInfo)
    const bookReviews = await booksModel.getBookReviews(req.params.book_id);
    for (review in bookReviews) {
        bookReviews[review].stars = numberToStars(bookReviews[review].score)
    }
    console.log("Book Reviews:", bookReviews)
    res.render('template', {
        locals: {
            title: 'Book Reviews',
            bookInfo: bookInfo,
            reviews: bookReviews,
            is_logged_in: req.session.is_logged_in,
            userID: req.session.user_id
        },
        partials: {
            partial: 'partial-book-reviews'
        }
    })
})

router.post('/:book_id', (req,res) => {
    const bookId = req.body.bookId;
    const userId = req.body.userId;
    const content = req.body.content;
    const score = req.body.score;
    // console.log(req.body)
    booksModel.addReview(bookId, userId, score, content)
    .then(async () => {
        const bookInfo = await booksModel.getBook(req.params.book_id);
        // console.log("Book Info:", bookInfo)
        const bookReviews = await booksModel.getBookReviews(req.params.book_id);
        for (review in bookReviews) {
            bookReviews[review].stars = numberToStars(bookReviews[review].score)
        }
        // console.log("Book Reviews:", bookReviews)
        res.render('template', {
            locals: {
                title: 'Book Reviews',
                bookInfo: bookInfo,
                reviews: bookReviews,
                is_logged_in: req.session.is_logged_in,
                userID: req.session.user_id
            },
            partials: {
                partial: 'partial-book-reviews'
            }
        })
    })
})

module.exports = router;
