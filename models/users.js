const db = require('./conn.js'),
    bcrypt = require('bcryptjs');

class User {

    constructor(id, first_name, last_name, email, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
    }

    async checkPassword(hashedPassword) {
        return bcrypt.compareSync(this.password, hashedPassword)
    }

    async save() {
        try {
            const response = await db.one(`
                insert into users
                    (first_name, last_name, email, password)
                values
                    ($1, $2, $3, $4)
                returning id`, [this.first_name, this.last_name, this.email, this.password]);
            console.log("user was created with id:", response.id);
            return response
        } catch(err) {
            return err.message
        }
    }

    async login() {
        try {
            const response = await db.one(`select * from users where email = $1`, [this.email]);
            const isValid = await this.checkPassword(response.password);
            console.log("isValid:", isValid);
            if (!!isValid) {
                const {first_name, last_name, id} = response
                return {isValid, first_name, last_name, user_id: id}
            } else {
                return {isValid}
            }
        } catch(err) {
            return err.message;
        }
    }
}

module.exports = User;