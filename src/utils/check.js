const Koi = require('./koi')

// console.log(Koi.string().ownFunction(fn).trim().evaluate("        ddddd        "));
// console.log(Koi.clean(33.33223, Koi.number(parseFloat).stripDecimal(2)));

const obj = {
  name: '   Ajit Singh  ',
  age: 18.234,
  meh: 12.2
}

const schema = {
  name: Koi.string().trim(),
  age: Koi.number(parseFloat).stripDecimal(1),
  dob: Koi.string()
}

console.log(Koi.clean(obj, schema))
