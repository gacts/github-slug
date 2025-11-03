/**
 * Returns the environment variable. Empty variables are not available and will be interpreted as nonexistent.
 *
 * @param {string} name
 * @return {string|undefined}
 */
export const getEnv = (name) => {
  if (name in process.env) {
    const value = process.env[name]

    if (typeof value === 'string' && value.length > 0) {
      return value
    }
  }

  return undefined
}
