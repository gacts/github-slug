<p align="center">
  <img src="https://avatars0.githubusercontent.com/u/44036562?s=200&v=4" alt="Logo" width="100" />
</p>

# GitHub slug action

![Release version][badge_release_version]
[![Build Status][badge_build]][link_build]
[![License][badge_license]][link_license]

GitHub Action to expose slug values of branch/tag/version inside your GitHub workflow.

## Overview

Slug on a variable will:

- Put the variable content in **lower case**
- Replace special characters like `$` or `%` with `dollar` and `percent` respectively
- Replace any character by `-` except `0-9`, `a-z`, and `-`
- Remove leading, trailing, and duplicated `-` character

## Usage

Add this in your workflow:

```yaml
- uses: gacts/github-slug@v1
  id: slug
  with:
    # replace value in "to-slug" this on your choice
    to-slug: Hello ${{ github.actor }}! How are you?
```

And in subsequent steps you will be able to use the following variables:

Description                            | How to use in your workflow                  | Examples for `branch`/`tag` workflows
-------------------------------------- | -------------------------------------------- | -------------------------------------
A slugged version of "to-slug" input   | `${{ steps.slug.outputs.slug }}`             | `hello-username-how-are-you`
The workflow was triggered on a branch | `${{ steps.slug.outputs.is-branch }}`        | `true`/`false`
The workflow was triggered on a tag    | `${{ steps.slug.outputs.is-tag }}`           | `false`/`true`
Current branch name                    | `${{ steps.slug.outputs.branch-name }}`      | `fix/Foo_bar`/`<empty-value>`
A slugged version of `branch-name`     | `${{ steps.slug.outputs.branch-name-slug }}` | `fix-foo-bar`/`<empty-value>`
Current tag name                       | `${{ steps.slug.outputs.tag-name }}`         | `<empty-value>`/`v1.2-rc1_Lorem`
A slugged version of `tag-name`        | `${{ steps.slug.outputs.tag-name-slug }}`    | `<empty-value>`/`v1-2-rc1-lorem`
Cleared and slugged version value (prefix `v/ver/version[._-]` will be rejected) | `${{ steps.slug.outputs.version }}` | `fix-foo-bar`/`1.2-rc1-lorem`
Major version                          | `${{ steps.slug.outputs.version-major }}`    | `0`/`1`
Minor version                          | `${{ steps.slug.outputs.version-minor }}`    | `0`/`2`
Patch version                          | `${{ steps.slug.outputs.version-patch }}`    | `0`/`0`
Semantic version value                 | `${{ steps.slug.outputs.version-semantic }}` | `0.0.0-fix-foo-bar`/`1.2.0-rc1-lorem`

> Tip: Use [Dependabot][use_dependabot] to maintain your `gacts/github-slug` version updated in your GitHub workflows.

## Releasing

New versions releasing scenario:

- Build the action distribution (`make build` or `yarn build`)
- Commit and push changes (including `dist` directory changes - this is important) into the `master` branch
- Publish new release using repo releases page (git tag should follow `vX.Y.Z` format)

Major git tag (`v1` if you publish `v1.Y.Z` release) will be updated automatically.

## Support

[![Issues][badge_issues]][link_issues]
[![Issues][badge_pulls]][link_pulls]

If you will find any action errors - please, [make an issue][link_create_issue] in the current repository.

## License

This is open-sourced software licensed under the [MIT License][link_license].

[badge_build]:https://img.shields.io/github/workflow/status/gacts/github-slug/tests?maxAge=30
[badge_release_version]:https://img.shields.io/github/release/gacts/github-slug.svg?maxAge=30
[badge_license]:https://img.shields.io/github/license/gacts/github-slug.svg?longCache=true
[badge_release_date]:https://img.shields.io/github/release-date/gacts/github-slug.svg?maxAge=180
[badge_commits_since_release]:https://img.shields.io/github/commits-since/gacts/github-slug/latest.svg?maxAge=45
[badge_issues]:https://img.shields.io/github/issues/gacts/github-slug.svg?maxAge=45
[badge_pulls]:https://img.shields.io/github/issues-pr/gacts/github-slug.svg?maxAge=45

[link_build]:https://github.com/gacts/github-slug/actions
[link_license]:https://github.com/gacts/github-slug/blob/master/LICENSE
[link_issues]:https://github.com/gacts/github-slug/issues
[link_create_issue]:https://github.com/gacts/github-slug/issues/new
[link_pulls]:https://github.com/gacts/github-slug/pulls

[use_dependabot]:https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/keeping-your-actions-up-to-date-with-dependabot
