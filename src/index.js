const core = require('@actions/core') // docs: <https://docs.github.com/en/actions/reference/workflow-commands-for-github-actions>
const {isOnBranch, isOnTag, currentTagName, currentBranchName} = require('./exports')
const slugify = require('slugify')

// main action entrypoint (docs: <https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action>)
async function run() {
  // slugify options
  const slugifyOptions = {replacement: '-', lower: true, strict: true}

  /** @var {Array.<{name: String, value: any, description: String}>} */
  const outputs = []

  const isBranch = isOnBranch(), isTag = isOnTag(), branchName = currentBranchName(), tagName = currentTagName()

  outputs.push({name: 'is-branch', value: isBranch.toString(), description: 'Is branch'})
  outputs.push({name: 'is-tag', value: isTag.toString(), description: 'Is tag'})

  if (isBranch && typeof branchName === 'string') {
    const branch = branchName.trim(), branchSlug = slugify(branch, slugifyOptions)

    outputs.push({name: 'branch-name', value: branch, description: 'Branch name'})
    outputs.push({name: 'branch-name-slug', value: branchSlug, description: 'Branch name slug'})
  }

  if (isTag && typeof tagName === 'string') {
    const tag = tagName.trim(), tagSlug = slugify(tag, slugifyOptions)

    outputs.push({name: 'tag-name', value: tag, description: 'Tag name'})
    outputs.push({name: 'tag-name-slug', value: tagSlug, description: 'Tag name slug'})
  }

  outputs.forEach((item) => {
    core.setOutput(item.name, item.value)
    core.info(`${item.description} (${'${{ steps.<this-step-id>.outputs.'+item.name+' }}'}): ${item.value}`)
  })
}

// run the action
try {
  run()
} catch (error) {
  core.setFailed(error.message)
}
