// Requires external module
const fs = require('fs')

// Requires internal module
const db = require('./aa-sqlite3')
const validate = require('./validator').validate

/** Class representing a GameBooks parser */
module.exports = class Parser {
    #path

    /**
     * @param {string} path - The path of the GameBook in .db format
     */
    constructor(path) {
        this.#path = path
    }

    /**
     * Returns the number of GameBook chapters
     * @async
     * @return {number} The total number of chapters
     */
    async getNumberOfChapters() {
        try {
            // Connects to SQLite DB
            await db.open(this.#path)
        } catch (error) {
            return undefined
        }
        try {
            // Preparing the query
            const query = 'SELECT COUNT(id_entity) AS number FROM T_ENTITY WHERE entity_type="chapter"'
            // Query execution
            var row = await db.get(query)

            // Closing the DB
            db.close()
        } catch (error) {
            // Closing the DB
            db.close()
            return undefined
        }

        return row.number
    }

    /**
     * Returns an object contains the GameBook chapters
     * @async
     * @return {object} The object that represents the chapters of a GameBook
     */
    async getChapters() {
        try {
            // Connects to SQLite DB
            await db.open(this.#path)
        } catch (error) {
            return undefined
        }
        try {
            // Preparing the query
            const query = 'SELECT * FROM T_ENTITY JOIN T_ENTITY_ATTRIBUTES ON T_ENTITY.id_entity=T_ENTITY_ATTRIBUTES.id_entity WHERE T_ENTITY.entity_type=\'chapter\''
            // Query execution
            var rows = await db.all(query)

            // Closing the DB
            db.close()
        } catch (error) {
            // Closing the DB
            db.close()
            return undefined
        }

        var totalChapters = await this.getNumberOfChapters()

        let chapters = []

        // Chapter array creation cycle
        for (let i = 0; (i < totalChapters * 5); i += 5) {
            let number = parseInt(rows[i].entity_name, 10)
            let description = '', flag_ending = '', flag_fixed = '', flag_deadly = '', chapter_title = '', next_chapters = ''
            // Chapter creation cycle
            for (let j = i; (j < i+5); j++) {
                if (rows[j].attribute_name == 'description') {
                    description = rows[j].attribute_value
                    next_chapters = findNextPossibleChapter(description)
                }

                else if (rows[j].attribute_name == 'flag_fixed')
                    flag_fixed = (rows[j].attribute_value == 'true')

                else if (rows[j].attribute_name == 'flag_final')
                    flag_ending = (rows[j].attribute_value == 'true')

                else if (rows[j].attribute_name == 'flag_death')
                    flag_deadly = (rows[j].attribute_value == 'true')

                else if (rows[j].attribute_name == 'chapter_title')
                    chapter_title = rows[j].attribute_value
            }

            // Creation of the object "chapter"
            var chapter = {
                "number": number,
                "description": description,
                "flag_fixed": flag_fixed,
                "flag_ending": flag_ending,
                "flag_deadly": flag_deadly,
                "chapter_title": chapter_title,
                "next_chapters": next_chapters
            }
            // Insert the "chapter" object into the array
            chapters.push(chapter)
        }
        return chapters
    }

    /** 
     * Returns an object contains the GameBook information
     * @async
     * @return {object} The object representing the GameBook information
     */
    async getInfo() {
        try {
            // Connects to SQLite DB
            await db.open(this.#path)
        } catch (error) {
            return undefined
        }
        try {
            // Preparing the query
            const query = 'SELECT * FROM T_ENTITY JOIN T_ENTITY_ATTRIBUTES ON T_ENTITY.id_entity=T_ENTITY_ATTRIBUTES.id_entity WHERE T_ENTITY.entity_name=\'game\''
            // Query execution
            var rows = await db.all(query)

            // Closing the DB
            db.close()
        } catch (error) {
            // Closing the DB
            db.close()
            return undefined
        }

        let title = '', author = '', lgc_version = '', version = '', revision = ''
        for (let i = 0; (i < rows.length); i++)
            if (rows[i].attribute_name == 'title')
                title = rows[i].attribute_value
            else if (rows[i].attribute_name == 'author')
                author = rows[i].attribute_value
            else if (rows[i].attribute_name == 'lgc_version')
                lgc_version = rows[i].attribute_value
            else if (rows[i].attribute_name == 'version')
                version = rows[i].attribute_value
            else if (rows[i].attribute_name == 'revision')
                revision = parseInt(rows[i].attribute_value, 10)

        // Creation of the object "info"
        const info = {
            "title": title,
            "author": author,
            "lgc_version": lgc_version,
            "version": version,
            "revision": revision
        }

        return info
    }

    /**
     * Returns an object contains the GameBook introduction
     * @async
     * @return {object} The object representing the GameBook introduction
     */
    async getIntro() {
        try {
            // Connects to SQLite DB
            await db.open(this.#path)
        } catch (error) {
            return undefined
        }
        try {
            // Preparing the query
            const query = 'SELECT * FROM T_ENTITY JOIN T_ENTITY_ATTRIBUTES ON T_ENTITY.id_entity=T_ENTITY_ATTRIBUTES.id_entity WHERE T_ENTITY.entity_name=\'intro\''
            // Query execution
            var rows = await db.all(query)

            // Closing the DB
            db.close()
        } catch (error) {
            // Closing the DB
            db.close()
            return undefined
        }

        let chapter_title = '', description = ''
        for (let i = 0; (i < rows.length); i++)
            if (rows[i].attribute_name == 'chapter_title')
                chapter_title = rows[i].attribute_value
            else if (rows[i].attribute_name == 'description')
                description = rows[i].attribute_value

        // Creation of the object "intro"
        const intro = {
            "chapter_title": chapter_title,
            "description": description
        }

        return intro
    }

    /**
     * Returns an object contains the GameBook rules
     * @async
     * @return {object} The object representing the GameBook rules
     */
    async getRules() {
        try {
            // Connects to SQLite DB
            await db.open(this.#path)
        } catch (error) {
            return undefined
        }
        try {
            // Preparing the query
            const query = 'SELECT * FROM T_ENTITY JOIN T_ENTITY_ATTRIBUTES ON T_ENTITY.id_entity=T_ENTITY_ATTRIBUTES.id_entity WHERE T_ENTITY.entity_name=\'rules\''
            // Query execution
            var rows = await db.all(query)

            // Closing the DB
            db.close()
        } catch (error) {
            // Closing the DB
            db.close()
            return undefined
        }

        var chapter_title = '', description = ''
        for (let i = 0; (i < rows.length); i++)
            if (rows[i].attribute_name == 'chapter_title')
                chapter_title = rows[i].attribute_value
            else if (rows[i].attribute_name == 'description')
                description = rows[i].attribute_value

        // Creation of the object "intro"
        const rules = {
            "chapter_title": chapter_title,
            "description": description
        }

        return rules
    }

    /**
     * Returns an object contains the entire GameBook
     * @async
     * @return {object} The object representing the entire GameBook
     */
    async getGameBook() {
        // Creation of object containing data
        const gamebook = {
            "chapters": await this.getChapters(),
            "info":     await this.getInfo(),
            "intro":    await this.getIntro(),
            "rules":    await this.getRules()
        }
        if (validate(gamebook).valid)
            return gamebook
        else
            return undefined
    }

    /**
     * Export the GameBook to JSON files
     * @param {string} dest - The destination path for the export, it should be .json file
     * @return {Promise} Promise object represents the string result of the function
     */
    exportToFile(dest) {
        return new Promise(async (resolve, reject) => {
            const gamebook = await this.getGameBook()
            if (!gamebook) 
                reject('It is not a GameBook')
            else {
                // Convert JSON object to string
                const data = JSON.stringify(gamebook, null, 4)

                // write JSON string to a file
                fs.writeFile(dest, data, (error) => {
                    if (error)
                        reject(error.message)
                    else
                        resolve(`JSON data is saved in =>\t${dest}`)
                })
            }
        })
    }

}

/**
 * Finds the next chapters in the description
 * @param {string} text
 * @return {Array} The aray content the next possible chapters
 */
function findNextPossibleChapter(text) {
    var nextChapters = [];
    var number = '';

    for (i = 0; (i < text.length); i++) {
        if (text.charAt(i) == '[') {
            i++;
            while (text.charAt(i) != ']') {
                if ((text.charAt(i) == '0') ||
                    (text.charAt(i) == '1') ||
                    (text.charAt(i) == '2') ||
                    (text.charAt(i) == '3') ||
                    (text.charAt(i) == '4') ||
                    (text.charAt(i) == '5') ||
                    (text.charAt(i) == '6') ||
                    (text.charAt(i) == '7') ||
                    (text.charAt(i) == '8') ||
                    (text.charAt(i) == '9'))
                    number = number + text.charAt(i)
                i++
            }
            if (Number.isInteger(parseInt(number)))
                nextChapters.push(parseInt(number, 10))
            number = ''
        }
    }
    return nextChapters
}