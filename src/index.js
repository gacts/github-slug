const core = require('@actions/core')

// main action entrypoint
async function run() {
  core.debug('WIP')
}

// run the action
try {
  run()
} catch (error) {
  core.setFailed(error.message)
}
