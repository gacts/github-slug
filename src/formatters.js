// import slugify from 'slugify' // link: <https://www.npmjs.com/package/slugify>

/**
 * @param {string} s
 * @return {string}
 */
export const slug = (s) => {
  return s.replace(/[._/()#+]/g, '-')
}
