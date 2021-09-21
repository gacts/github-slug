const core = require('@actions/core') // docs: <https://docs.github.com/en/actions/reference/workflow-commands-for-github-actions>
const {isOnBranch, isOnTag, currentTag, currentBranch, version} = require('./exports')
const {ActionID, Output, CLITable} = require('./utils')
const colors = require('colors') // docs: <https://github.com/marak/colors.js>

// main action entrypoint (docs: <https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action>)
async function run() {
  /** @var {Output[]} */
  const outputs = []

  const isBranch = isOnBranch(), isTag = isOnTag()

  outputs.push(new Output('is-branch', isBranch.toString(), 'Is branch'))
  outputs.push(new Output('is-tag', isTag.toString(), 'Is tag'))

  const branch = currentBranch()

  if (isBranch && branch !== undefined) {
    outputs.push(new Output('branch-name', branch.name, 'Branch name'))
    outputs.push(new Output('branch-name-slug', branch.slug, 'Branch name slug'))
  }

  const tag = currentTag()

  if (isTag && tag !== undefined) {
    outputs.push(new Output('tag-name', tag.name, 'Tag name'))
    outputs.push(new Output('tag-name-slug', tag.slug, 'Tag name slug'))
  }

  const ver = version()

  outputs.push(new Output('version', ver.version, 'Version'))
  outputs.push(new Output('version-major', ver.major, 'Major version'))
  outputs.push(new Output('version-minor', ver.minor, 'Minor version'))
  outputs.push(new Output('version-patch', ver.patch, 'Patch version'))
  outputs.push(new Output('version-semantic', ver.semantic, 'Semantic version'))

  const t = new CLITable(['Name', 'Description', 'How to use in your workflow', 'Value']), act = new ActionID

  core.startGroup('Setup')
  outputs.forEach((el) => {
    core.setOutput(el.name, el.value)
    t.push([
      el.name,
      el.description,
      `${'${{ steps.' + (act.isUsable() ? act.toString() : '<this-step-id>') + '.outputs.' + el.name + ' }}'}`,
      el.value,
    ])
  })
  core.endGroup()

  console.log(t.toString())
}

// run the action
try {
  colors.enable()

  run()
} catch (error) {
  core.setFailed(error.message)
}
