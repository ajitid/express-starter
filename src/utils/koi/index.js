const BaseSchema = require('./BaseSchema')
const StringSchema = require('./StringSchema')
const NumberSchema = require('./NumberSchema')

// Koi to clean
class Koi {
  static string () {
    return new StringSchema()
  }

  static number (parser = parseInt) {
    return new NumberSchema(parser)
  }

  static clean (value, schema, removeFieldsNotInSchema = false) {
    // TODO if Joi.validate is async then make this clean async too
    if (schema instanceof BaseSchema) { return schema.clean(value) }

    const cleanedData = {}
    const fields = value
    for (const key of Object.keys(fields)) {
      if (!schema[key]) {
        cleanedData[key] = fields[key]
        continue
      }
      cleanedData[key] = schema[key].clean(fields[key])
    }

    if (removeFieldsNotInSchema) {
      const schemaKeys = Object.keys(schema)
      for (const key of Object.keys(fields)) {
        if (schemaKeys.indexOf(key) === -1) { delete cleanedData[key] }
      }
    }

    return cleanedData
  }
}

module.exports = Koi
