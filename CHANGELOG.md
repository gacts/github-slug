# Changelog

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog][keepachangelog] and this project adheres to [Semantic Versioning][semver].

## v1.3.0

### Changed

- Version of node runtime for action from node16 to node20

## v1.2.5

### Fixed

- Is on branch detection on `closed` events [#58]

[#58]:https://github.com/gacts/github-slug/issues/58

## v1.2.4

### Changed

- Action dependencies were updated

## v1.2.3

### Changed

- Action dependencies were updated

## v1.2.2

### Fixed

- Branch name detection on `delete` events [#49]

[#49]:https://github.com/gacts/github-slug/issues/49

## v1.2.1

### Changed

- Action dependencies were updated

## v1.2.0

### Changed

- Update to node 16 (Node 12 has an end of life on April 30, 2022)

## v1.1.1

### Changed

- Action dependencies were updated

## v1.1.0

### Added

- Outputs `commit-hash` (the commit SHA hash) and `commit-hash-short` (short commit SHA hash)

## v1.0.0

### Added

- First action release

[keepachangelog]:https://keepachangelog.com/en/1.0.0/
[semver]:https://semver.org/spec/v2.0.0.html
