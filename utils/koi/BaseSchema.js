class BaseSchema {
  constructor() {
    this.cleaners = []
  }

  ownFunction(fn) {
    this.cleaners.push(fn);
    return this
  }

  clean(value) {
    // FIXME
    // if(value === undefined || value === null)
    //   return null
    return this.cleaners.reduce((prevValue, cleaner) => cleaner(prevValue), value);
  }
}

module.exports = BaseSchema
