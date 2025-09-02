import {slug} from './formatters'

/**
 * Raw version string parser.
 *
 * @property {number} major
 * @property {number} minor
 * @property {number} patch
 * @property {string} tail
 * @property {string} formatted
 * @property {string} semantic
 */
export class VersionInfo {
  /**
   * @param {string} raw RAW string with version information
   */
  constructor(raw) {
    this.major = 0
    this.minor = 0
    this.patch = 0
    this.tail = ''
    this.formatted = ''
    this.semantic = ''

    const clear = VersionInfo.clearVersionString(VersionInfo.rejectVersionPrefix(raw.trimStart()))
    const parts = VersionInfo.splitVersionStringIntoParts(clear)

    if (parts.length > 0) {
      let validPartsCounter = 0

      for (let i = 0; i <= 2; i++) {
        if (i < parts.length) {
          if (parts[i].length >= 1 && ['-', '+', '_'].includes(parts[i].charAt(0))) {
            break
          }

          let num = parseFloat(parts[i])

          if (!isNaN(num) && num >= 0) {
            validPartsCounter++

            switch (i) {
              case 0: {
                this.major = num
                parts[i] = num // replace original string with parsed number (omit leading zeros)
                break
              }
              case 1: {
                this.minor = num
                parts[i] = num
                break
              }
              case 2: {
                this.patch = num
                parts[i] = num
                break
              }
            }
          } else {
            break
          }
        } else {
          break
        }
      }

      if (validPartsCounter > 0) {
        this.formatted = parts.slice(0, validPartsCounter).join('.')
      }

      this.semantic = `${this.major}.${this.minor}.${this.patch}`

      if (parts.length > validPartsCounter) {
        this.tail = slug(parts.slice(validPartsCounter).join('-'))
      }

      if (this.tail.length > 0) {
        this.formatted += '-' + this.tail
        this.semantic += '-' + this.tail
      }
    }
  }

  /**
   * @param {string} s
   * @return {string}
   */
  static rejectVersionPrefix(s) {
    return s
      .replace(/^[vV][._\s-]?(\d.*)/, '$1')
      .replace(/^ver[._\s-]?(\d.*)/i, '$1')
      .replace(/^version[._\s-]?(\d.*)/i, '$1')
  }

  /**
   * @param {string} s
   * @return {string}
   */
  static clearVersionString(s) {
    return s.replace(/([^a-zA-Z0-9+_.-]+)/g, '-')
  }

  /**
   * @param {string} s
   * @return {string[]}
   */
  static splitVersionStringIntoParts(s) {
    const matched = s.match(/^(?<major>\d+)(\.(?<minor>\d+)(\.(?<patch>\d+))?)?(?<tail>.*)?$/)

    let parts = []

    if (matched) {
      Object.keys(matched.groups).forEach(key => {
        parts.push(matched.groups[key])
      })
    }

    return parts.filter(s => {
      return typeof s === 'string' && s.length > 0
    })
  }
}
