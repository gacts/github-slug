const {beforeEach, describe, test, expect} = require('@jest/globals')
const envGithub = require('./env/names')
const {ActionID} = require('./utils')

beforeEach(() => {
  Object.keys(envGithub).forEach(key => {
    delete process.env[envGithub[key]]
  })
})

describe('ActionID', () => {
  [
    {
      name: 'empty', wantUsable: false, wantToString: '',
    },
    {
      name: 'numeric (`id: foobar` was not set for the action)',
      giveEnv: [{name: envGithub.GITHUB_ACTION, value: '1'}],
      wantUsable: false,
      wantToString: '',
    },
    {
      name: 'some large number',
      giveEnv: [{name: envGithub.GITHUB_ACTION, value: '999999999'}],
      wantUsable: false,
      wantToString: '',
    },
    {
      name: 'action id is set',
      giveEnv: [{name: envGithub.GITHUB_ACTION, value: 'foo-action-name'}],
      wantUsable: true,
      wantToString: 'foo-action-name',
    },
    {
      name: '__self is a reserved word and must be ignored',
      giveEnv: [{name: envGithub.GITHUB_ACTION, value: '__self'}],
      wantUsable: false,
      wantToString: '',
    },
  ].forEach((tt) => {
    test(tt.name, () => {
      if (tt.giveEnv !== undefined) {
        tt.giveEnv.forEach(env => { // setup env
          process.env[env.name] = env.value
        })
      }

      const act = new ActionID

      expect(act.isUsable()).toBe(tt.wantUsable)
      expect(act.toString()).toBe(tt.wantToString)

      if (tt.giveEnv !== undefined) {
        tt.giveEnv.forEach(env => { // teardown env
          delete process.env[env.name]
        })
      }
    })
  })
})
