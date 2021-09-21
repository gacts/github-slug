const envGithub = require('./env/names')
const {isOnBranch, isOnTag, currentBranch, currentTag, version} = require('./exports')

beforeEach(() => {
  Object.keys(envGithub).forEach(key => {
    delete process.env[envGithub[key]]
  })
})

describe('isOnBranch', () => {
  [
    {
      name: 'empty', want: false,
    },
    {
      name: 'slashes only',
      giveEnv: [{name: envGithub.GITHUB_REF, value: '//////////////////'}],
      want: false,
    },
    {
      name: 'on the merge request',
      giveEnv: [{name: envGithub.GITHUB_REF, value: 'refs/pull/6/merge'}],
      want: true,
    },
    {
      name: 'on the branch',
      giveEnv: [{name: envGithub.GITHUB_REF, value: 'refs/heads/foo/branch'}],
      want: true,
    },
    {
      name: 'on the tag',
      giveEnv: [{name: envGithub.GITHUB_REF, value: 'refs/tags/foo-tag'}],
      want: false,
    }
  ].forEach((tt) => {
    test(tt.name, () => {
      if (tt.giveEnv !== undefined) {
        tt.giveEnv.forEach(env => { // setup env
          process.env[env.name] = env.value
        })
      }

      expect(isOnBranch()).toBe(tt.want)

      if (tt.giveEnv !== undefined) {
        tt.giveEnv.forEach(env => { // teardown env
          delete process.env[env.name]
        })
      }
    })
  })
})

describe('isOnTag', () => {
  [
    {
      name: 'empty', want: false,
    },
    {
      name: 'slashes only',
      giveEnv: [{name: envGithub.GITHUB_REF, value: '//////////////////'}],
      want: false,
    },
    {
      name: 'on the merge request',
      giveEnv: [{name: envGithub.GITHUB_REF, value: 'refs/pull/6/merge'}],
      want: false,
    },
    {
      name: 'on the branch',
      giveEnv: [{name: envGithub.GITHUB_REF, value: 'refs/heads/foo/branch'}],
      want: false,
    },
    {
      name: 'on the tag',
      giveEnv: [{name: envGithub.GITHUB_REF, value: 'refs/tags/foo-tag'}],
      want: true,
    }
  ].forEach((tt) => {
    test(tt.name, () => {
      if (tt.giveEnv !== undefined) {
        tt.giveEnv.forEach(env => { // setup env
          process.env[env.name] = env.value
        })
      }

      expect(isOnTag()).toBe(tt.want)

      if (tt.giveEnv !== undefined) {
        tt.giveEnv.forEach(env => { // teardown env
          delete process.env[env.name]
        })
      }
    })
  })
})

describe('currentBranch', () => {
  [
    {
      name: 'branch name from the GITHUB_HEAD_REF',
      giveEnv: [{name: envGithub.GITHUB_HEAD_REF, value: " Foo_bar--_--baz V1.2.3 %_#$ \t\n\r "}],
      want: {name: 'Foo_bar--_--baz V1.2.3 %_#$', slug: 'foo-bar-baz-v1-2-3-percent-dollar'},
    },
    {
      name: 'from GITHUB_REF',
      giveEnv: [
        {name: envGithub.GITHUB_REF, value: "\n\r refs/heads/foo/bar_1.2.3(aaa_bbb)\t"},
      ],
      want: {name: 'foo/bar_1.2.3(aaa_bbb)', slug: 'foo-bar-1-2-3-aaa-bbb'},
    },
    {
      name: 'GITHUB_HEAD_REF has higher priority then GITHUB_REF',
      giveEnv: [
        {name: envGithub.GITHUB_HEAD_REF, value: 'foo'},
        {name: envGithub.GITHUB_REF, value: 'refs/heads/bar'},
      ],
      want: {name: 'foo', slug: 'foo'},
    },
    {
      name: 'too short GITHUB_REF',
      giveEnv: [
        {name: envGithub.GITHUB_REF, value: 'branch/name'},
      ],
      want: undefined,
    },
    {
      name: 'slashes only in GITHUB_REF',
      giveEnv: [
        {name: envGithub.GITHUB_REF, value: '///////////'},
      ],
      want: undefined,
    },
  ].forEach((tt) => {
    test(tt.name, () => {
      if (tt.giveEnv !== undefined) {
        tt.giveEnv.forEach(env => { // setup env
          process.env[env.name] = env.value
        })
      }

      expect(currentBranch()).toEqual(tt.want)

      if (tt.giveEnv !== undefined) {
        tt.giveEnv.forEach(env => { // teardown env
          delete process.env[env.name]
        })
      }
    })
  })
})

describe('currentTag', () => {
  [
    {
      name: 'common value in GITHUB_REF',
      giveEnv: [
        {name: envGithub.GITHUB_REF, value: 'refs/tags/v1.2.3'},
      ],
      want: {name: 'v1.2.3', slug: 'v1-2-3'},
    },
    {
      name: 'composite value in GITHUB_REF',
      giveEnv: [
        {name: envGithub.GITHUB_REF, value: 'refs/tags/V1.2.3-RC1-foo/Bar'},
      ],
      want: {name: 'V1.2.3-RC1-foo/Bar', slug: 'v1-2-3-rc1-foo-bar'},
    },
    {
      name: 'too short GITHUB_REF',
      giveEnv: [
        {name: envGithub.GITHUB_REF, value: 'tag/name'},
      ],
      want: undefined,
    },
    {
      name: 'slashes only in GITHUB_REF',
      giveEnv: [
        {name: envGithub.GITHUB_REF, value: '///////////'},
      ],
      want: undefined,
    },
  ].forEach((tt) => {
    test(tt.name, () => {
      if (tt.giveEnv !== undefined) {
        tt.giveEnv.forEach(env => { // setup env
          process.env[env.name] = env.value
        })
      }

      expect(currentTag()).toEqual(tt.want)

      if (tt.giveEnv !== undefined) {
        tt.giveEnv.forEach(env => { // teardown env
          delete process.env[env.name]
        })
      }
    })
  })
})

describe('version', () => {
  [
    {
      name: 'fallback on empty environment',
      wantVersion: 'undefined-version',
      wantMajor: 0,
      wantMinor: 0,
      wantPath: 0,
      wantSemantic: '0.0.0-undefined-version',
    },
    {
      name: 'based on the hash',
      giveEnv: [
        {name: envGithub.GITHUB_SHA, value: '1b7578dd5588727359951d82aa67442a19a9963f'},
      ],
      wantVersion: '1b7578d',
      wantMajor: 0,
      wantMinor: 0,
      wantPath: 0,
      wantSemantic: '0.0.0-1b7578d',
    },
    {
      name: 'from the branch',
      giveEnv: [
        {name: envGithub.GITHUB_REF, value: 'refs/heads/foo/bar_1.2.3(aaa_bbb)'},
      ],
      wantVersion: 'foo-bar-1-2-3-aaa-bbb',
      wantMajor: 0,
      wantMinor: 0,
      wantPath: 0,
      wantSemantic: '0.0.0-foo-bar-1-2-3-aaa-bbb',
    },
    {
      name: 'from the versioned branch',
      giveEnv: [
        {name: envGithub.GITHUB_REF, value: 'refs/heads/version_0.2.3'},
      ],
      wantVersion: '0.2.3',
      wantMajor: 0,
      wantMinor: 2,
      wantPath: 3,
      wantSemantic: '0.2.3',
    },
    {
      name: 'from the tag',
      giveEnv: [
        {name: envGithub.GITHUB_REF, value: 'refs/tags/ver.1.2-foo+RC1'},
      ],
      wantVersion: '1.2-foo-rc1',
      wantMajor: 1,
      wantMinor: 2,
      wantPath: 0,
      wantSemantic: '1.2.0-foo-rc1',
    },
    {
      name: 'from the tag in wrong format',
      giveEnv: [
        {name: envGithub.GITHUB_REF, value: 'refs/tags/foo-\tbar  '},
      ],
      wantVersion: 'foo-bar',
      wantMajor: 0,
      wantMinor: 0,
      wantPath: 0,
      wantSemantic: '0.0.0-foo-bar',
    },
  ].forEach((tt) => {
    test(tt.name, () => {
      if (tt.giveEnv !== undefined) {
        tt.giveEnv.forEach(env => { // setup env
          process.env[env.name] = env.value
        })
      }

      const ver = version()

      expect(ver.version).toEqual(tt.wantVersion)
      expect(ver.semantic).toEqual(tt.wantSemantic)
      expect(ver.major).toEqual(tt.wantMajor)
      expect(ver.minor).toEqual(tt.wantMinor)
      expect(ver.patch).toEqual(tt.wantPath)

      if (tt.giveEnv !== undefined) {
        tt.giveEnv.forEach(env => { // teardown env
          delete process.env[env.name]
        })
      }
    })
  })
})
