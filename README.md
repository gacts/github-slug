<p align="center">
  <img src="https://avatars0.githubusercontent.com/u/44036562?s=200&v=4" alt="Logo" width="100" />
</p>

# GitHub slug action

![Release version][badge_release_version]
[![Build Status][badge_build]][link_build]
[![License][badge_license]][link_license]

GitHub Action to expose slug values of branches, tags, or versions inside your GitHub workflow.

## Overview

A slug applied to a variable will:

- Convert the variable content to **lowercase**
- Replace special characters like `$` or `%` with `dollar` and `percent`, respectively
- Replace any character except `0-9`, `a-z`, and `-` with `-`
- Remove leading, trailing, and duplicated `-` characters

## Usage

Add this in your workflow:

```yaml
jobs:
  - uses: gacts/github-slug@v1
    id: slug
    with:
      to-slug: Hello ${{ github.actor }}! How are you? # feel free to use any variable or string here
```

In subsequent steps, you will be able to use the following variables:

| Description                                     | How to use in your workflow                   | Examples for `branch`/`tag` workflows      |
|-------------------------------------------------|-----------------------------------------------|--------------------------------------------|
| A slugged version of "to-slug" input            | `${{ steps.slug.outputs.slug }}`              | `hello-username-how-are-you`               |
| The workflow was triggered on a branch          | `${{ steps.slug.outputs.is-branch }}`         | `true`/`false`                             |
| The workflow was triggered on a tag             | `${{ steps.slug.outputs.is-tag }}`            | `false`/`true`                             |
| Current branch name                             | `${{ steps.slug.outputs.branch-name }}`       | `fix/Foo_bar`/`<empty-value>`              |
| A slugged version of `branch-name`              | `${{ steps.slug.outputs.branch-name-slug }}`  | `fix-foo-bar`/`<empty-value>`              |
| Current tag name                                | `${{ steps.slug.outputs.tag-name }}`          | `<empty-value>`/`v1.2-rc1_Lorem`           |
| A slugged version of `tag-name`                 | `${{ steps.slug.outputs.tag-name-slug }}`     | `<empty-value>`/`v1-2-rc1-lorem`           |
| The commit SHA hash that triggered the workflow | `${{ steps.slug.outputs.commit-hash }}`       | `ffac537e6cbbf934b08745a378932722df287a53` |
| Short _(7 first characters)_ commit SHA hash    | `${{ steps.slug.outputs.commit-hash-short }}` | `ffac537`                                  |
| Cleared and slugged version value <sup>*</sup>  | `${{ steps.slug.outputs.version }}`           | `fix-foo-bar`/`1.2-rc1-lorem`              |
| Major version                                   | `${{ steps.slug.outputs.version-major }}`     | `0`/`1`                                    |
| Minor version                                   | `${{ steps.slug.outputs.version-minor }}`     | `0`/`2`                                    |
| Patch version                                   | `${{ steps.slug.outputs.version-patch }}`     | `0`/`0`                                    |
| Semantic version value                          | `${{ steps.slug.outputs.version-semantic }}`  | `0.0.0-fix-foo-bar`/`1.2.0-rc1-lorem`      |

> <sup>*</sup> A prefix `v/ver/version[._-]` will be removed

<details>
  <summary><strong>Usage examples</strong></summary>

### On a branch:

<p align="center">
  <img src="https://hsto.org/webt/ah/qe/_e/ahqe_e03-tvp-whxpn0g6_q_vo8.png" alt="on the branch" />
</p>

```yaml
name: tests

on:
  push:
    branches: [master, main]
    paths-ignore: ['**.md']
    tags-ignore: ['**']
  pull_request:
    paths-ignore: ['**.md']

jobs:
  build:
    name: Build for ${{ matrix.os }} (${{ matrix.arch }})
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        os: [linux, darwin]
        arch: [amd64]
    steps:
      - name: Set up Go
        uses: actions/setup-go@v5
        with: {go-version: 1.22}

      - name: Check out code
        uses: actions/checkout@v4

      - uses: gacts/github-slug@v1
        id: slug

      - name: Build application
        env:
          GOOS: ${{ matrix.os }}
          GOARCH: ${{ matrix.arch }}
          CGO_ENABLED: 0
          LDFLAGS: -s -w -X internal/pkg/version.version=${{ steps.slug.outputs.branch-name-slug }}@${{ steps.slug.outputs.commit-hash-short }}
        run: go build -trimpath -ldflags "$LDFLAGS" -o ./app ./cmd/app/
```

### On a tag:

<p align="center">
  <img src="https://hsto.org/webt/y7/pl/ov/y7plovzqsmgjafdbwncrlysiaqm.png" alt="on the tag" />
</p>

```yaml
name: release

on:
  release: # Docs: <https://help.github.com/en/articles/events-that-trigger-workflows#release-event-release>
    types: [published]

jobs:
  docker-image:
    name: Build the docker image
    runs-on: ubuntu-latest
    steps:
      - name: Check out code
        uses: actions/checkout@v4

      - uses: gacts/github-slug@v1
        id: slug

      - name: Login to GitHub Container Registry
        uses: docker/login-action@v3 # Action page: <https://github.com/docker/login-action>
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GHCR_PASSWORD }} # PAT token, generate new: <https://github.com/settings/tokens/new>

      - uses: docker/build-push-action@v6 # Action page: <https://github.com/docker/build-push-action>
        with:
          context: .
          file: Dockerfile
          push: true
          tags: |
            ghcr.io/${{ github.actor }}/${{ github.event.repository.name }}:${{ steps.slug.outputs.version }}
            ghcr.io/${{ github.actor }}/${{ github.event.repository.name }}:latest
```

</details>

## Releasing

To release a new version:

- Build the action distribution (`make build` or `npm run build`).
- Commit and push changes (including `dist` directory changes - this is important) to the `master|main` branch.
- Publish the new release using the repo releases page (the git tag should follow the `vX.Y.Z` format).

Major and minor git tags (`v1` and `v1.2` if you publish a `v1.2.Z` release) will be updated automatically.

> [!TIP]
> Use [Dependabot](https://bit.ly/45zwLL1) to keep this action updated in your repository.

## Support

[![Issues][badge_issues]][link_issues]
[![Pull Requests][badge_pulls]][link_pulls]

If you find any errors in the action, please [create an issue][link_create_issue] in this repository.

## License

This is open-source software licensed under the [MIT License][link_license].

[badge_build]:https://img.shields.io/github/actions/workflow/status/gacts/github-slug/test.yml?branch=master&maxAge=30
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
