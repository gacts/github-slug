import {slug} from './formatters'

/**
 * Represents parsed version information from a raw version string.
 */
export class VersionInfo {
  /** Major version number */
  public major: number = 0
  /** Minor version number */
  public minor: number = 0
  /** Patch version number */
  public patch: number = 0
  /** Any extra version information after major.minor.patch */
  public tail: string = ''
  /** Formatted version string including the tail if present */
  public formatted: string = ''
  /** Semantic version string (major.minor.patch[-tail]) */
  public semantic: string = ''

  /**
   * Parses a raw version string and initializes the version info.
   * @param raw - The raw string containing version information
   */
  constructor(raw: string) {
    const cleaned = VersionInfo.clearVersionString(VersionInfo.rejectVersionPrefix(raw.trimStart()))

    const parts = VersionInfo.splitVersionStringIntoParts(cleaned)
    const versionNumbers: number[] = []

    for (let i = 0; i < Math.min(3, parts.length); i++) {
      const part = parts[i]
      if (['-', '+', '_'].includes(part.charAt(0))) {
        break
      }

      const num = Number(part)
      if (!isNaN(num) && num >= 0) {
        versionNumbers.push(num)
        switch (i) {
          case 0:
            this.major = num
            break
          case 1:
            this.minor = num
            break
          case 2:
            this.patch = num
            break
        }
        parts[i] = String(num) // normalize part string
      } else {
        break
      }
    }

    if (versionNumbers.length > 0) {
      this.formatted = versionNumbers.join('.')
    }

    this.semantic = `${this.major}.${this.minor}.${this.patch}`

    // process tail
    if (parts.length > versionNumbers.length) {
      this.tail = slug(parts.slice(versionNumbers.length).join('-'))
      if (this.tail) {
        this.formatted += `-${this.tail}`
        this.semantic += `-${this.tail}`
      }
    }
  }

  /** Removes common version prefixes like "v", "ver", or "version". */
  static rejectVersionPrefix(s: string): string {
    return s
      .replace(/^[vV][._\s-]?(\d.*)/, '$1')
      .replace(/^ver[._\s-]?(\d.*)/i, '$1')
      .replace(/^version[._\s-]?(\d.*)/i, '$1')
  }

  /** Replaces invalid characters in the version string with a dash (`-`). */
  static clearVersionString(s: string): string {
    return s.replace(/([^a-zA-Z0-9+_.-]+)/g, '-')
  }

  /** Splits a version string into major, minor, patch, and tail components. */
  static splitVersionStringIntoParts(s: string): string[] {
    const matched = s.match(/^(?<major>\d+)(\.(?<minor>\d+)(\.(?<patch>\d+))?)?(?<tail>.*)?$/)

    if (!matched?.groups) {
      return []
    }

    // only include non-empty parts
    return Object.values(matched.groups).filter(Boolean)
  }
}
