const BaseSchema = require('./BaseSchema')

class StringSchema extends BaseSchema {
  trim() {
    const _trim = value => value.trim()
    this.cleaners.push(_trim)
    return this
  }
}

module.exports = StringSchema
