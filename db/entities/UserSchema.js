const { EntitySchema } = require("typeorm");
const User = require("../models/User");

module.exports = new EntitySchema({
    name: "users",
    target: User,
    columns: {
        email: {
            primary: true,
            type: "varchar"
        },
        name: {
            type: "varchar"
        },
        password: {
            type: "varchar"
        },
        password_salt: {
            type: "varchar"
        },
    }
});
