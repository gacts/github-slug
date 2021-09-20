const core = require('@actions/core')
const envGithub = require('./env/github')
const {getEnv} = require('./env/utils')

// read action inputs
const input = {
  stripVersionPrefix: core.getInput('strip-version-prefix').toLowerCase() === 'true',
}

// main action entrypoint (docs: <https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action>)
async function run() {
  const githubRef = getEnv(envGithub.GITHUB_REF), separator = '/'

  // check for the existence of environment variable GITHUB REF
  if (githubRef !== undefined) {
    const refParts = githubRef.split(separator) // [ 'refs', 'heads', 'feature', 'foo' ]

    if (refParts.length >= 3) {
      const clearRef = refParts.slice(2, refParts.length).join(separator) // 'feature/foo'

      console.log(clearRef)
    } else {
      core.warning(`Wrong environment variable "${envGithub.GITHUB_REF}": ${githubRef}`)
    }
  } else {
    core.warning(`Environment variable "${envGithub.GITHUB_REF}" was not found`)
  }
}

// run the action
try {
  run()
} catch (error) {
  core.setFailed(error.message)
}
