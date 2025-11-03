import {getEnv} from './env/utils'
import envGithub from './env/names'
import Table from 'cli-table' // docs: <https://github.com/Automattic/cli-table>

export class ActionID {
  /** @var {string|undefined} */
  currentID

  constructor() {
    this.currentID = getEnv(envGithub.GITHUB_ACTION)
  }

  isUsable() {
    return this.currentID !== undefined && (isNaN(parseFloat(this.currentID)) && this.currentID !== '__self')
  }

  toString() {
    return this.isUsable() ? this.currentID : ''
  }
}

export class Output {
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
export class CLITable {
  /** @var {{}} */
  t

  /**
   * @param {string[]} headers
   */
  constructor(headers) {
    this.t = new Table({head: headers, style: {head: ['green']}})
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
