const v = require('v8n');
const Joi = require('joi');

class User {
    static validate(fields) {
        const schema = Joi.object().keys({
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
            name: Joi.string().min(3).max(40).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9\s]{6,30}$/).required(),
        });
        const result = Joi.validate(fields, schema);
        console.log(result);
    }

    static clean(fields) {

    }

    constructor(email, name, ) {
        const validations = [

        ]
        !v.isEmpty(name)
        // TODO

        j
        this.name = name;
        this.age = age;
    }

    static matchPassword(userpassword) {

    }
}

module.exports = User;
