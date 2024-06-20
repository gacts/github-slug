const {describe, test, expect} = require('@jest/globals')
const {slug} = require('./formatters')

describe('slug', () => {
  [
    {name: 'simple string', give: 'foo', want: 'foo'},
    {name: 'duty branch name', give: " Foo_bar--_--baz V1.2.3 %_#$ \t\n\r ", want: 'foo-bar-baz-v1-2-3-percent-dollar'},
    {name: 'duty tag name', give: "\n\r foo/bar_1.2.3(aaa_bbb)\t", want: 'foo-bar-1-2-3-aaa-bbb'},
    {name: 'empty string', give: '', want: ''},
    {name: 'slashes only', give: '///////////////', want: ''},
    {name: 'special symbols only -> empty result', give: '^*()_=+\\/?~`@;:\'"', want: ''},
  ].forEach(tt => {
    test(tt.name, () => {
      expect(slug(tt.give)).toBe(tt.want)
    })
  })
})
