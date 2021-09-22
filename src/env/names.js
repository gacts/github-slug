/**
 * Inputs environments variables keys from Github actions job
 * @see https://git.io/Jzcq8
 */

module.exports = Object.freeze({
  // The name of the workflow. Eg.: `tests`
  GITHUB_WORKFLOW: 'GITHUB_WORKFLOW',

  // The [job_id](https://git.io/JzcLJ) of the current job. Eg.: `Run tests`
  GITHUB_JOB: 'GITHUB_JOB',

  // The unique identifier (id) of the action
  GITHUB_ACTION: 'GITHUB_ACTION',

  // The name of the person or app that initiated the workflow. Eg.: `octocat`
  GITHUB_ACTOR: 'GITHUB_ACTOR',

  // The owner and repository name. Eg.: `octocat/Hello-World`
  GITHUB_REPOSITORY: 'GITHUB_REPOSITORY',

  // The name of the webhook event that triggered the workflow. Eg.: `push`
  GITHUB_EVENT_NAME: 'GITHUB_EVENT_NAME',

  // The GitHub workspace directory path, initially empty. Eg.: `/home/runner/work/my-repo-name/my-repo-name`
  GITHUB_WORKSPACE: 'GITHUB_WORKSPACE',

  // The commit SHA that triggered the workflow. Eg.: `ffac537e6cbbf934b08745a378932722df287a53`
  GITHUB_SHA: 'GITHUB_SHA',

  // The branch or tag ref that triggered the workflow. Eg.: `refs/heads/feature-branch-1`. If neither a branch or
  // tag is available for the event type, the variable will not exist
  GITHUB_REF: 'GITHUB_REF',

  // Only set for pull request events. The name of the head branch
  GITHUB_HEAD_REF: 'GITHUB_HEAD_REF',

  // Only set for pull request events. The name of the base branch
  GITHUB_BASE_REF: 'GITHUB_BASE_REF',

  // The operating system of the runner executing the job. Possible values are `Linux`, `Windows`, or `macOS`
  RUNNER_OS: 'RUNNER_OS',

  // The path to a temporary directory on the runner. This directory is emptied at the beginning and end of each job.
  // Note that files will not be removed if the runner's user account does not have permission to delete
  // them. Eg.: `/tmp`
  RUNNER_TEMP: 'RUNNER_TEMP',
})
