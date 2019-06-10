const db = require('./conn.js');

class Books {

    static async getAllBooks() {
        try {
            const response = await db.any(`select * from books;`);
            return response
        } catch {
            return err.message
        }
    }

    static async getBook(bookId) {
        try {
            const response = await db.one(`select * from books where id = ${bookId};`);
            return response
        } catch(err) {
            return err.message
        }
    }

    static async getBookReviews(bookId) {
        try {
            const response = await db.any(`select * from books as b join reviews as r on b.id = r.book_id where b.id = ${bookId}`);
            return response
        } catch(err) {
            return err.message
        }
    }

    static async addReview(bookId, userId, score, content) {
        const query = `insert into reviews(user_id, book_id, score, content) values (${userId}, ${bookId}, ${score}, '${content}');`
        try {
            const response = await db.result(query);
            return response
        } catch(err) {
            return err.message
        }
    }
}

module.exports = Books;