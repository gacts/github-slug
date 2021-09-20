const core = require('@actions/core')
const {isOnBranch, isOnTag, currentTagName, currentBranchName} = require('./exports')
const slugify = require('slugify')

// slugify options
const slugifyOptions = {replacement: '-', lower: true, strict: true}

// main action entrypoint (docs: <https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action>)
async function run() {
  const isBranch = isOnBranch(), isTag = isOnTag()

  core.setOutput('is-branch', isBranch.toString())
  core.setOutput('is-tag', isTag.toString())

  if (isBranch) {
    let branchName = currentBranchName()

    if (typeof branchName === 'string') {
      branchName = branchName.trim()

      core.setOutput('branch-name', branchName)
      core.setOutput('branch-name-slug', slugify(branchName, slugifyOptions))
    }
  }

  if (isTag) {
    let tagName = currentTagName()

    if (typeof tagName === 'string') {
      tagName = tagName.trim()

      core.setOutput('tag-name', tagName)
      core.setOutput('tag-name-slug', slugify(tagName, slugifyOptions))
    }
  }
}

// run the action
try {
  run()
} catch (error) {
  core.setFailed(error.message)
}
