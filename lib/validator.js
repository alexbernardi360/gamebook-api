// Imports external modules
const validate = require('jsonschema').validate
const fs = require('fs')

/**
 * Validates the JSON object according to the schema
 * @param {object} instance - The JSON object of a GameBook
 * @return {object} The object represents the result of the validation
 */
exports.validate = (instance) => {
    const schema = this.readJSON(`${__dirname}/gamebook.schema.json`)
    return validate(instance, schema)
}

/**
 * Reads a file in .json format
 * @param {string} path_file The path of the .json file
 * @return {object} The instance of the object contained in the .json file
 */
exports.readJSON = (path_file) => {
    const rawdata = fs.readFileSync(path_file)
    return JSON.parse(rawdata)
}