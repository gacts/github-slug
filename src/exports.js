const {getEnv} = require('./env/utils')
const envGithub = require('./env/names')
const {slug} = require('./formatters')
const {VersionInfo} = require('./version')

// references separator
const separator = '/'

/**
 * Workflow was triggered on a branch?
 *
 * @return {boolean}
 */
function isOnBranch() {
  const githubRef = getEnv(envGithub.GITHUB_REF)

  if (githubRef !== undefined) {
    const parts = githubRef.split(separator)

    return parts.length >= 3 && ['heads', 'pull'].includes(parts[1].trim().toLowerCase())
  }

  return false
}

/**
 * Workflow was triggered on a tag?
 *
 * @return {boolean}
 */
function isOnTag() {
  const githubRef = getEnv(envGithub.GITHUB_REF)

  if (githubRef !== undefined) {
    const parts = githubRef.split(separator)

    return parts.length >= 3 && parts[1].trim().toLowerCase() === 'tags'
  }

  return false
}

class Branch {
  /** @type {string} */
  name = ''
  /** @type {string} */
  slug = ''

  /**
   * @param {string} name
   * @param {string} slug
   */
  constructor(name, slug) {
    this.name = name
    this.slug = slug
  }
}

/**
 * Returns current branch name & slug.
 *
 * @return {Branch|undefined}
 */
function currentBranch() {
  /**
   * @param {string} branchName
   * @return {Branch}
   */
  const toResult = (branchName) => {
    return new Branch(branchName.trim(), slug(branchName))
  }

  const githubHeadRef = getEnv(envGithub.GITHUB_HEAD_REF)

  if (githubHeadRef !== undefined) {
    return toResult(githubHeadRef)
  }

  const githubRef = getEnv(envGithub.GITHUB_REF)

  if (githubRef !== undefined) {
    const parts = githubRef.split(separator) // [ 'refs', 'heads', 'feature', 'foo' ]

    if (parts.length >= 3) {
      const branch = parts.slice(2, parts.length).filter((s) => {
        return typeof s === 'string' && s.trim().length > 0
      }).join(separator)

      if (branch.length === 0) {
        return undefined
      }

      return toResult(branch) // 'feature/foo'
    }
  }

  return undefined
}

class Tag {
  /** @type {string} */
  name = ''
  /** @type {string} */
  slug = ''

  /**
   * @param {string} name
   * @param {string} slug
   */
  constructor(name, slug) {
    this.name = name
    this.slug = slug
  }
}

/**
 * Returns current tag name & slug.
 *
 * @return {Tag|undefined}
 */
function currentTag() {
  const githubRef = getEnv(envGithub.GITHUB_REF)

  if (githubRef !== undefined) {
    const parts = githubRef.split(separator) // [ 'refs', 'tags', 'v1.2.3' ]

    if (parts.length >= 3) {
      const tag = parts.slice(2, parts.length).filter((s) => {
        return typeof s === 'string' && s.trim().length > 0
      }).join(separator).trim() // 'v1.2.3'

      if (tag.length === 0) {
        return undefined
      }

      return new Tag(tag, slug(tag))
    }
  }

  return undefined
}

class CommitHash {
  /** @type {string} */
  long = ''
  /** @type {string} */
  short = ''

  /**
   * @param {string} long
   * @param {string} short
   */
  constructor(long, short) {
    this.long = long
    this.short = short
  }
}

/**
 * Returns current commit git hash.
 *
 * @return {CommitHash|undefined}
 */
function commitHash() {
  const hash = getEnv(envGithub.GITHUB_SHA)

  if (typeof hash === 'string' && hash.length >= 7) {
    const clear = hash.toLowerCase().replace(/([^abcdef0-9]+)/g, '')

    if (clear.length >= 7) {
      return new CommitHash(clear, clear.substring(0, 7))
    }
  }

  return undefined
}

class Version {
  /** @type {string} */
  version = ''
  /** @type {number} */
  major = 0
  /** @type {number} */
  minor = 0
  /** @type {number} */
  patch = 0
  /** @type {string} */
  semantic = ''
}

/**
 * Returns a version with a slug.
 *
 * @return {Version}
 */
function version() {
  const isTag = isOnTag(), tag = currentTag()

  if (isTag && tag !== undefined) {
    const parsed = new VersionInfo(tag.name), ver = new Version

    if (parsed.formatted.length > 0) {
      ver.version = parsed.formatted
    } else {
      ver.version = tag.slug // fallback
    }

    if (parsed.semantic.length > 0) {
      ver.semantic = parsed.semantic
    } else {
      ver.semantic = `0.0.0-${tag.slug}` // fallback
    }

    ver.major = parsed.major
    ver.minor = parsed.minor
    ver.patch = parsed.patch

    return ver
  }

  const isBranch = isOnBranch(), branch = currentBranch()

  if (isBranch && branch !== undefined) {
    const parsed = new VersionInfo(branch.name), ver = new Version

    if (parsed.formatted.length > 0) {
      ver.version = parsed.formatted
    } else {
      ver.version = branch.slug // fallback
    }

    if (parsed.semantic.length > 0) {
      ver.semantic = parsed.semantic
    } else {
      ver.semantic = `0.0.0-${branch.slug}` // fallback
    }

    ver.major = parsed.major
    ver.minor = parsed.minor
    ver.patch = parsed.patch

    return ver
  }

  const hash = commitHash()

  if (hash !== undefined) {
    const ver = new Version

    ver.version = hash.short
    ver.semantic = `0.0.0-${hash.short}`

    return ver
  }

  const fallbackVer = new Version, sign = 'undefined-version'

  fallbackVer.version = sign
  fallbackVer.semantic = `0.0.0-${sign}`

  return fallbackVer
}

module.exports = {
  isOnBranch,
  isOnTag,
  currentBranch,
  currentTag,
  commitHash,
  version,
}
