// Imports external modules
const { validate } = require('jsonschema');
const fs = require('fs');

/**
 * Validates the JSON object according to the schema
 * @param {object} instance - The JSON object of a GameBook
 * @return {object} The object represents the result of the validation
 */
exports.validate = (instance) => {
  const schema = this.readJSON(`${__dirname}/gamebook.schema.json`);
  return validate(instance, schema);
};

/**
 * Reads a file in JSON format
 * @param {string} pathFile The path of the JSON file
 * @return {object} The instance of the object contained in the JSON file
 * @throws
 */
exports.readJSON = (pathFile) => {
  const rawdata = fs.readFileSync(pathFile);
  return JSON.parse(rawdata);
};
