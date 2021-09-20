/**
 * Get the environment variable.
 *
 * @param {string} name
 * @return {string|undefined}
 */
function getEnv(name) {
  if (name in process.env) {
    return process.env[name]
  }

  return undefined;
}

module.exports = {
  getEnv
}
