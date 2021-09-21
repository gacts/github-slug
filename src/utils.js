const {getEnv} = require('./env/utils')
const envGithub = require('./env/names')
let Table = require('cli-table') // docs: <https://github.com/Automattic/cli-table>

class ActionID {
  /** @var {string|undefined} */
  currentID

  constructor() {
    this.currentID = getEnv(envGithub.GITHUB_ACTION)
  }

  isUsable() {
    return this.currentID !== undefined && isNaN(parseFloat(this.currentID))
  }

  toString() {
    return this.isUsable() ? this.currentID : ''
  }
}

class Output {
  /** @type {string} */
  name = ''
  /** @type {any} */
  value
  /** @type {string} */
  description = ''

  /**
   * @param {string} name
   * @param {any} value
   * @param {string} description
   */
  constructor(name, value, description) {
    this.name = name
    this.description = description
    this.value = value
  }
}

/**
 * Simple wrapper around CLI table implementation.
 */
class CLITable {
  /** @var {{}} */
  t

  /**
   * @param {string[]} headers
   */
  constructor(headers) {
    this.t = new Table({head: headers})
  }

  /**
   * @param {string[]} line
   * @return {void}
   */
  push(line) {
    this.t.push(line)
  }

  /**
   * @return {string}
   */
  toString() {
    return this.t.toString()
  }
}

module.exports = {
  ActionID,
  Output,
  CLITable,
}
