const BaseSchema = require('./BaseSchema')

class NumberSchema extends BaseSchema {
  constructor (parser = parseInt) {
    super()
    this.parser = parser
  }

  clean (value) {
    value = this.parser === parseInt ? this.parser(value, 10) : this.parser(value)
    return super.clean(value)
  }

  toFixed (decimalPlaces) {
    const _toFixed = value => parseFloat(value.toFixed(decimalPlaces))
    this.cleaners.push(_toFixed)
    return this
  }

  stripDecimal (toPlaces) {
    return this.toFixed(toPlaces)
  }

  dropDecimal () {
    const _dropDecimal = value => parseInt(value.toFixed(0), 10)
    this.cleaners.push(_dropDecimal)
    return this
  }
}

module.exports = NumberSchema
