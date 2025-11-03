import core from '@actions/core'
import {commitHash, currentBranch, currentTag, isOnBranch, isOnTag, version} from './exports'
import {ActionID, CLITable, Output} from './utils'
import {slug} from './formatters'

/**
 * Main entry point for the GitHub Action.
 *
 * This function gathers branch, tag, commit, and version information,
 * formats them into outputs, and logs a table for workflow reference.
 */
async function run(): Promise<void> {
  const outputs: Output[] = []
  const [isBranch, isTag] = [isOnBranch(), isOnTag()]

  outputs.push(new Output('is-branch', isBranch.toString(), 'The workflow was triggered on a branch'))
  outputs.push(new Output('is-tag', isTag.toString(), 'The workflow was triggered on a tag'))

  // collect branch information if applicable
  const branch = currentBranch()
  if (isBranch && branch) {
    outputs.push(new Output('branch-name', branch.name, 'Current branch name'))
    outputs.push(new Output('branch-name-slug', branch.slug, 'A slugged version of "branch-name"'))
  }

  // collect tag information if applicable
  const tag = currentTag()
  if (isTag && tag) {
    outputs.push(new Output('tag-name', tag.name, 'Current tag name'))
    outputs.push(new Output('tag-name-slug', tag.slug, 'A slugged version of "tag-name"'))
  }

  // collect commit hash information
  const hash = commitHash()
  if (hash) {
    outputs.push(new Output('commit-hash', hash.long, 'The commit SHA hash'))
    outputs.push(new Output('commit-hash-short', hash.short, 'Short commit SHA hash'))
  }

  // collect version information
  const ver = version()
  outputs.push(new Output('version', ver.version, 'Cleared and slugged version value'))
  outputs.push(new Output('version-major', ver.major.toString(), 'Major version'))
  outputs.push(new Output('version-minor', ver.minor.toString(), 'Minor version'))
  outputs.push(new Output('version-patch', ver.patch.toString(), 'Patch version'))
  outputs.push(new Output('version-semantic', ver.semantic, 'Semantic version value'))

  // handle optional slug input from user
  const toSlug = core.getInput('to-slug').trim()
  if (toSlug) {
    outputs.push(new Output('slug', slug(toSlug), 'A slugged version of "to-slug" input'))
  }

  // prepare CLI table for logging
  const table = new CLITable(['Name', 'Description', 'How to use in your workflow', 'Value'])
  const actionId = new ActionID()

  core.startGroup('Setup action')

  // set outputs for GitHub workflow and populate table
  for (const output of outputs) {
    core.setOutput(output.name, output.value)
    table.push([
      output.name,
      output.description,
      `\${{ steps.${actionId.isUsable() ? actionId.toString() : '<this-step-id>'}.outputs.${output.name} }}`,
      output.value,
    ])
  }

  core.endGroup()
  core.info(table.toString())
}

// execute the action and handle errors
run().catch((error: Error) => {
  core.setFailed(error.message)
})
