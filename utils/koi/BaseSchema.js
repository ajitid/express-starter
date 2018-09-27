class BaseSchema {
  constructor() {
    this.cleaners = []
  }

  ownFunction(fn) {
    this.cleaners.push(fn);
    return this
  }

  clean(value) {
    return this.cleaners.reduce((prevValue, cleaner) => cleaner(prevValue), value);
  }
}

module.exports = BaseSchema
