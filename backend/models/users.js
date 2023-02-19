const db = require("./index.js")
const bcrypt = require("bcrypt")

// Data validation can also be done here //

const createNewUser = async (username, email, password) => {
    const hashedPwd = bcrypt.hashSync(password, 10)
    return db.query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [username, email, hashedPwd]
        ).then((result) => {
            return result.rows[0]
        })
}

const getUser = async (id) => {
    return db.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
    ).then((result) => {
        return result.rows[0]
    })
}

const checkUsername = async (username) => {
    return db.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
    ).then((result) => {
        return result.rows[0]
    })
}

const updateUser = async (id, username, email, password) => {
    const hashedPwd = bcrypt.hashSync(password, 10)
    return db.query(
        "UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *",
        [username, email, hashedPwd, id]
    ).then((result) => {
        return result.rows[0]
    })
}

const deleteUser = async (id) => {
    return db.query(
        "DELETE FROM users WHERE id = $1",
        [id]
    ).then((result) => {
        return result.rows[0]
    })
}

module.exports = { createNewUser, getUser, updateUser, deleteUser, checkUsername }