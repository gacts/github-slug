const {getEnv} = require('./env/utils');
const envGithub = require('./env/names');

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

/**
 * Returns current branch name.
 *
 * @return {string|undefined}
 */
function currentBranchName() {
  const githubHeadRef = getEnv(envGithub.GITHUB_HEAD_REF)

  if (githubHeadRef !== undefined) {
    return githubHeadRef
  }

  const githubRef = getEnv(envGithub.GITHUB_REF)

  if (githubRef !== undefined) {
    const parts = githubRef.split(separator) // [ 'refs', 'heads', 'feature', 'foo' ]

    if (parts.length >= 3) {
      return parts.slice(2, parts.length).join(separator) // 'feature/foo'
    }
  }

  return undefined
}

/**
 * Returns current tag name.
 *
 * @return {string|undefined}
 */
function currentTagName() {
  const githubRef = getEnv(envGithub.GITHUB_REF)

  if (githubRef !== undefined) {
    const parts = githubRef.split(separator) // [ 'refs', 'tags', 'v1.2.3' ]

    if (parts.length >= 3) {
      return parts.slice(2, parts.length).join(separator) // 'v1.2.3'
    }
  }

  return undefined
}

module.exports = {
  isOnBranch,
  isOnTag,
  currentBranchName,
  currentTagName,
}
