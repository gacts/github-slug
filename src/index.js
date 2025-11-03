import core from '@actions/core' // docs: <https://docs.github.com/en/actions/reference/workflow-commands-for-github-actions>
import {isOnBranch, isOnTag, currentTag, currentBranch, commitHash, version} from './exports'
import {ActionID, Output, CLITable} from './utils'
import {slug} from './formatters'

// main action entrypoint (docs: <https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action>)
async function run() {
  /** @var {Output[]} */
  const outputs = []

  const isBranch = isOnBranch(), isTag = isOnTag()

  outputs.push(new Output('is-branch', isBranch.toString(), 'The workflow was triggered on a branch'))
  outputs.push(new Output('is-tag', isTag.toString(), 'The workflow was triggered on a tag'))

  const branch = currentBranch()

  if (isBranch && branch !== undefined) {
    outputs.push(new Output('branch-name', branch.name, 'Current branch name'))
    outputs.push(new Output('branch-name-slug', branch.slug, 'A slugged version of "branch-name"'))
  }

  const tag = currentTag()

  if (isTag && tag !== undefined) {
    outputs.push(new Output('tag-name', tag.name, 'Current tag name'))
    outputs.push(new Output('tag-name-slug', tag.slug, 'A slugged version of "tag-name"'))
  }

  const hash = commitHash()

  if (hash !== undefined) {
    outputs.push(new Output('commit-hash', hash.long, 'The commit SHA hash'))
    outputs.push(new Output('commit-hash-short', hash.short, 'Short commit SHA hash'))
  }

  const ver = version()

  outputs.push(new Output('version', ver.version, 'Cleared and slugged version value'))
  outputs.push(new Output('version-major', ver.major, 'Major version'))
  outputs.push(new Output('version-minor', ver.minor, 'Minor version'))
  outputs.push(new Output('version-patch', ver.patch, 'Patch version'))
  outputs.push(new Output('version-semantic', ver.semantic, 'Semantic version value'))

  const toSlug = core.getInput('to-slug').trim()

  if (toSlug.length > 0) {
    outputs.push(new Output('slug', slug(toSlug), 'A slugged version of "to-slug" input'))
  }

  const t = new CLITable(['Name', 'Description', 'How to use in your workflow', 'Value']), act = new ActionID

  core.startGroup('Setup action')
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

  core.info(t.toString())
}

// run the action
(async () => {
  await run()
})().catch(error => {
  core.setFailed(error.message)
})
