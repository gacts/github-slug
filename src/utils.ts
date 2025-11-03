import {getEnv, EnvName} from './env'
import Table from 'cli-table'

/**
 * Class representing a GitHub Action ID from the environment.
 */
export class ActionID {
  /** The current GitHub Action ID, if available */
  private readonly currentID?: string

  constructor() {
    this.currentID = getEnv(EnvName.GITHUB_ACTION)
  }

  /**
   * Determines if the current action ID is usable.
   * An ID is usable if it exists and is not numeric or '__self'.
   *
   * @returns {boolean} True if usable, false otherwise.
   */
  public isUsable(): boolean {
    if (!this.currentID) return false

    const isNumber = !isNaN(parseFloat(this.currentID))
    return !isNumber && this.currentID !== '__self'
  }

  /**
   * Returns the current action ID if usable, otherwise an empty string.
   *
   * @returns {string} Usable action ID or empty string.
   */
  public toString(): string {
    return this.isUsable() ? this.currentID! : ''
  }
}

/**
 * Represents an output parameter for GitHub Actions or other contexts.
 */
export class Output<T = any> {
  /** The name of the output */
  public name: string

  /** The value of the output */
  public value: T

  /** Description of the output */
  public description: string

  /**
   * @param name - The name of the output
   * @param value - The value of the output
   * @param description - A description for the output
   */
  constructor(name: string, value: T, description: string) {
    this.name = name
    this.value = value
    this.description = description
  }
}

/**
 * Simple wrapper around a CLI table implementation.
 */
export class CLITable {
  private table: Table

  /**
   * @param headers - Array of table header strings
   */
  constructor(headers: string[]) {
    this.table = new Table({head: headers, style: {head: ['green']}})
  }

  /**
   * Adds a row to the CLI table.
   *
   * @param row - Array of strings representing a table row
   */
  public push(row: string[]): void {
    this.table.push(row)
  }

  /**
   * Returns the string representation of the table.
   *
   * @returns {string} The formatted CLI table
   */
  public toString(): string {
    return this.table.toString()
  }
}
