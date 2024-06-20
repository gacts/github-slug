const {describe, test, expect} = require('@jest/globals')
const {VersionInfo} = require("./version")

describe('VersionInfo::rejectVersionPrefix', () => {
  [
    {give: '', want: ''},
    {give: 'foo', want: 'foo'},
    {give: 'v', want: 'v'},
    {give: 'V', want: 'V'},
    {give: 'ver', want: 'ver'},
    {give: 'version', want: 'version'},

    {give: 'v1', want: '1'},
    {give: 'v1.1', want: '1.1'},
    {give: 'V1.1.2', want: '1.1.2'},
    {give: 'v.1', want: '1'},
    {give: 'v-1.1', want: '1.1'},
    {give: 'v_1.1.2', want: '1.1.2'},
    {give: 'ver3', want: '3'},
    {give: 'vEr.1', want: '1'},
    {give: 'ver-1.1', want: '1.1'},
    {give: 'ver_1.1.2', want: '1.1.2'},
    {give: 'version3', want: '3'},
    {give: 'verSIon.1', want: '1'},
    {give: 'version-1.1', want: '1.1'},
    {give: 'version.1.1.2', want: '1.1.2'},

    {give: 'v1.1.2-RC1', want: '1.1.2-RC1'},
    {give: 'ver.1.2.3 foo bar ', want: '1.2.3 foo bar '},

    {give: 'foo v1.2.3', want: 'foo v1.2.3'},
    {give: 'foo version_1.2.3', want: 'foo version_1.2.3'},
  ].forEach(tt => {
    test(`${tt.give} -> ${tt.want}`, () => {
      expect(VersionInfo.rejectVersionPrefix(tt.give)).toBe(tt.want)
    })
  })
})

describe('VersionInfo constructor', () => {
  [
    {give: '1', wantMajor: 1, wantMinor: 0, wantPath: 0, wantFormatted: '1', wantSemantic: '1.0.0'},
    {give: 'v1.2', wantMajor: 1, wantMinor: 2, wantPath: 0, wantFormatted: '1.2', wantSemantic: '1.2.0'},
    {give: 'ver-1.2.3', wantMajor: 1, wantMinor: 2, wantPath: 3, wantFormatted: '1.2.3', wantSemantic: '1.2.3'},
    {give: 'version.1.2.3.4', wantMajor: 1, wantMinor: 2, wantPath: 3, wantFormatted: '1.2.3-4', wantSemantic: '1.2.3-4'},
    {give: '0.0.0.0', wantMajor: 0, wantMinor: 0, wantPath: 0, wantFormatted: '0.0.0-0', wantSemantic: '0.0.0-0'},
    {give: '0-0', wantMajor: 0, wantMinor: 0, wantPath: 0, wantFormatted: '0-0', wantSemantic: '0.0.0-0'},

    {give: 'V2-rc1', wantMajor: 2, wantMinor: 0, wantPath: 0, wantFormatted: '2-rc1', wantSemantic: '2.0.0-rc1'},
    {give: 'v.1.2+rc1', wantMajor: 1, wantMinor: 2, wantPath: 0, wantFormatted: '1.2-rc1', wantSemantic: '1.2.0-rc1'},
    {give: 'VERSION_1.2-3+rc2', wantMajor: 1, wantMinor: 2, wantPath: 0, wantFormatted: '1.2-3-rc2', wantSemantic: '1.2.0-3-rc2'},
    {give: '001.0003.00000002', wantMajor: 1, wantMinor: 3, wantPath: 2, wantFormatted: '1.3.2', wantSemantic: '1.3.2'},

    {give: "\t v1.2.3\t-RC1\r\n \t", wantMajor: 1, wantMinor: 2, wantPath: 3, wantFormatted: '1.2.3-rc1', wantSemantic: '1.2.3-rc1'},
    {give: 'v1 some-feature', wantMajor: 1, wantMinor: 0, wantPath: 0, wantFormatted: '1-some-feature', wantSemantic: '1.0.0-some-feature'},
    {give: 'ver1.2 some-feature', wantMajor: 1, wantMinor: 2, wantPath: 0, wantFormatted: '1.2-some-feature', wantSemantic: '1.2.0-some-feature'},
    {give: 'version1.2.3 some-feature', wantMajor: 1, wantMinor: 2, wantPath: 3, wantFormatted: '1.2.3-some-feature', wantSemantic: '1.2.3-some-feature'},
    {give: 'v1 2 some-feature', wantMajor: 1, wantMinor: 0, wantPath: 0, wantFormatted: '1-2-some-feature', wantSemantic: '1.0.0-2-some-feature'},

    {give: 'PR-1 ver1.2_RC-2-3-test', wantMajor: 0, wantMinor: 0, wantPath: 0, wantFormatted: '', wantSemantic: ''},
  ].forEach(tt => {
    test(`${tt.give} -> ${tt.wantFormatted} (semantic: ${tt.wantSemantic})`, () => {
      const ver = new VersionInfo(tt.give)

      expect(ver.major).toBe(tt.wantMajor)
      expect(ver.minor).toBe(tt.wantMinor)
      expect(ver.patch).toBe(tt.wantPath)
      expect(ver.formatted).toBe(tt.wantFormatted)
      expect(ver.semantic).toBe(tt.wantSemantic)
    })
  })
})
