# GameBook API

[![NPM](https://nodei.co/npm/gamebook-api.png?mini=true)](https://www.npmjs.com/package/gamebook-api)

[![NPM](https://img.shields.io/npm/l/gamebook-api)](LICENSE)
![npm](https://img.shields.io/npm/v/gamebook-api)

Node.js module to export and validate a GameBook in JSON format.

### Features

- Convert a GameBook in SQLite3 format ([LGC3]) in JSON format according to the scheme.
- Export the GameBook to a .json file.
- Get a JSON object from a .json file.
- Validate a GameBook in JSON format according to the scheme.

### JSON schema for GameBooks

[gamebook.schema.json](lib/gamebook.schema.json)

### Installation

```sh
$ npm install gamebook-api
```

### Usage

```js
const Parser = require('gamebook-api').Parser;
const validate = require('gamebook-api').validate;
const readJSON = require('gamebook-api').readJSON;

// Instantiate the Parser class
const parser = new Parser('your/path/gamebook.db');
```

### Example

```js
const Parser = require('gamebook-api').Parser;
const validate = require('gamebook-api').validate;
const readJSON = require('gamebook-api').readJSON;

function convert(inputPath, outputPath) {
  // Instantiate the Parser class
  const parser = new Parser(inputPath);

  // Exporting the object to file
  parser.exportToFile(outputPath)
    .then((msg) => console.log(msg))
    .catch((error) => console.log(error));
}

function validateFile(filePath) {
  try {
    let instance = readJSON(filePath);
    let result = validate(instance);
  } catch (error) {
    return undefined;
    console.log(error);
  }
  if (result.valid) console.log('No error: JSON validated.');
  else {
    console.log('Error: JSON not validated.');
    console.log(result.errors);
  }

  return result;
}
```

### Get a SQLite database GameBook

- Install [LibroGame Creator 3 (LGC3)].
- Open a GameBook with LGC3.
- Export the GameBook to SQLite database.

### Contributing

- Install [Git]
- Install [Node.js]

```sh
$ git clone https://github.com/alexbernardi360/GameBook-parser.git
$ npm install
```

Make a pull request with your changes \
Contributions, features request or any other kind of help are very welcome 😊

[lgc3]: http://www.matteoporopat.com/librogame/libro-game-creator-3/
[librogame creator 3 (lgc3)]: http://www.matteoporopat.com/librogame/libro-game-creator-3/
[git]: https://git-scm.com
[node.js]: https://nodejs.org
