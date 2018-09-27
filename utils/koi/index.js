const BaseSchema = require('./BaseSchema');
const StringSchema = require('./StringSchema');
const NumberSchema = require('./NumberSchema');

// Koi to clean
class Koi {
  static string() {
    // FIXME handle undefined or null
    return new StringSchema();
  }

  static number(parser=parseInt) {
    // handle undefined or null
    return new NumberSchema(parser)
  }

  static clean(value, schema) {
    if(schema instanceof BaseSchema)
      return schema.clean(value)
    const cleanedData = {}
    for(const v of Object.keys(value)) {
      if(!schema[v]) {
        cleanedData[v] = value[v]
        continue;
      }
      cleanedData[v] = schema[v].clean(value[v])
    }
    return cleanedData;
  }

}

module.exports = Koi;



