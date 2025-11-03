import {getEnv, EnvName} from './env'
import {slug} from './formatters'
import {VersionInfo} from './version'
import github from '@actions/github'

/** Separator used in GitHub refs (e.g., "refs/heads/main") */
const REF_SEPARATOR = '/'

/**
 * Determines if the current GitHub context is on a branch.
 * Checks both `GITHUB_REF_TYPE` and the structure of `GITHUB_REF`.
 */
export function isOnBranch(): boolean {
  const refType = getEnv(EnvName.GITHUB_REF_TYPE)?.trim().toLowerCase()
  if (refType === 'branch') {
    return true
  }

  const githubRef = getEnv(EnvName.GITHUB_REF)
  if (!githubRef) {
    return false
  }

  const parts = githubRef.split(REF_SEPARATOR)
  return parts.length >= 3 && ['heads', 'pull'].includes(parts[1].trim().toLowerCase())
}

/**
 * Determines if the current GitHub context is on a tag.
 * Checks both `GITHUB_REF_TYPE` and the structure of `GITHUB_REF`.
 */
export function isOnTag(): boolean {
  const refType = getEnv(EnvName.GITHUB_REF_TYPE)?.trim().toLowerCase()
  if (refType === 'tag') {
    return true
  }

  const githubRef = getEnv(EnvName.GITHUB_REF)
  if (!githubRef) {
    return false
  }

  const parts = githubRef.split(REF_SEPARATOR)
  return parts.length >= 3 && parts[1].trim().toLowerCase() === 'tags'
}

/** Represents a Git branch */
export class Branch {
  constructor(
    public name: string,
    public slug: string
  ) {}
}

/**
 * Returns the current branch from GitHub context if available.
 */
export function currentBranch(): Branch | undefined {
  const toBranch = (name: string) => new Branch(name.trim(), slug(name))

  const eventName = getEnv(EnvName.GITHUB_EVENT_NAME)?.toLowerCase()
  const refFromPayload = github.context.payload['ref']

  if (eventName === 'delete' && typeof refFromPayload === 'string') {
    return toBranch(refFromPayload)
  }

  const headRef = getEnv(EnvName.GITHUB_HEAD_REF)
  if (headRef) {
    return toBranch(headRef)
  }

  const githubRef = getEnv(EnvName.GITHUB_REF)
  if (githubRef) {
    const parts = githubRef.split(REF_SEPARATOR)
    if (parts.length >= 3) {
      const branchName = parts.slice(2).filter(Boolean).join(REF_SEPARATOR).trim()
      return branchName ? toBranch(branchName) : undefined
    }
  }

  return undefined
}

/** Represents a Git tag */
export class Tag {
  constructor(
    public name: string,
    public slug: string
  ) {}
}

/**
 * Returns the current tag from GitHub context if available.
 */
export function currentTag(): Tag | undefined {
  const githubRef = getEnv(EnvName.GITHUB_REF)
  if (!githubRef) {
    return undefined
  }

  const parts = githubRef.split(REF_SEPARATOR)
  if (parts.length < 3) {
    return undefined
  }

  const tagName = parts.slice(2).filter(Boolean).join(REF_SEPARATOR).trim()
  return tagName ? new Tag(tagName, slug(tagName)) : undefined
}

/** Represents a Git commit hash */
export class CommitHash {
  constructor(
    public long: string,
    public short: string
  ) {}
}

/**
 * Returns the commit hash from GitHub context if available.
 * The short hash is the first 7 characters of the cleaned SHA.
 */
export function commitHash(): CommitHash | undefined {
  const sha = getEnv(EnvName.GITHUB_SHA)
  if (!sha || sha.length < 7) {
    return undefined
  }

  const cleanSha = sha.toLowerCase().replace(/[^a-f0-9]+/g, '')
  return cleanSha.length >= 7 ? new CommitHash(cleanSha, cleanSha.slice(0, 7)) : undefined
}

/** Represents a semantic version */
export class Version {
  version = ''
  major = 0
  minor = 0
  patch = 0
  semantic = ''
}

/**
 * Computes the version based on GitHub context.
 * Priority: Tag > Branch > Commit hash > Fallback.
 */
export function version(): Version {
  const ver = new Version()

  const tag = currentTag()
  if (isOnTag() && tag) {
    const parsed = new VersionInfo(tag.name)
    ver.version = parsed.formatted || tag.slug
    ver.semantic = parsed.semantic || `0.0.0-${tag.slug}`
    ver.major = parsed.major
    ver.minor = parsed.minor
    ver.patch = parsed.patch

    return ver
  }

  const branch = currentBranch()
  if (isOnBranch() && branch) {
    const parsed = new VersionInfo(branch.name)
    ver.version = parsed.formatted || branch.slug
    ver.semantic = parsed.semantic || `0.0.0-${branch.slug}`
    ver.major = parsed.major
    ver.minor = parsed.minor
    ver.patch = parsed.patch

    return ver
  }

  const hash = commitHash()
  if (hash) {
    ver.version = hash.short
    ver.semantic = `0.0.0-${hash.short}`

    return ver
  }

  const fallback = 'undefined-version'
  ver.version = fallback
  ver.semantic = `0.0.0-${fallback}`

  return ver
}
