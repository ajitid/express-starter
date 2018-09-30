const BaseSchema = require('./BaseSchema')

class StringSchema extends BaseSchema {
  clean (value) {
    value = value.toString()
    return super.clean(value)
  }

  trim () {
    const _trim = value => value.trim()
    this.cleaners.push(_trim)
    return this
  }
}

module.exports = StringSchema
