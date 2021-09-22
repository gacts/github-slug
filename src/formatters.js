const slugify = require('slugify') // link: <https://www.npmjs.com/package/slugify>

/**
 * @param {string} s
 * @return {string}
 */
function slug(s) {
  return slugify(s.replace(/[._/()#+]/g, '-'), {replacement: '-', lower: true, strict: true})
}

module.exports = {
  slug,
}
