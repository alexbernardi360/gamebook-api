// Imports external modules
const validate = require('jsonschema').validate
const fs = require('fs')

exports.validate = (instance) => {
    const schema = this.readJSON(`${__dirname}/gamebook.schema.json`)
    return validate(instance, schema)
}

exports.readJSON = (path_file) => {
    const rawdata = fs.readFileSync(path_file)
    return JSON.parse(rawdata)
}