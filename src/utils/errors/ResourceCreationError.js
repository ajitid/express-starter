class ResourceCreationError extends Error {
  constructor (resourceName, reason) {
    super(`${resourceName} cannot be created because it ${reason}.`)
    this.name = 'ResourceCreationError'
  }
}

module.exports = ResourceCreationError
