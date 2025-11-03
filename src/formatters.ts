import slugify from 'slugify' // link: <https://www.npmjs.com/package/slugify>

/**
 * Converts a string into a URL-friendly "slug".
 *
 * This function:
 * - Replaces certain characters (., _, /, (, ), #, +) with hyphens.
 * - Converts the string to lowercase.
 * - Ensures only alphanumeric characters and hyphens remain.
 *
 * @param str - The input string to convert.
 * @returns A URL-safe slug version of the input string.
 *
 * @example
 * slug('Hello World!'); // 'hello-world'
 * slug('File_Name(2025)#1'); // 'file-name-2025-1'
 */
export function slug(str: string): string {
  // replace problematic characters with hyphens
  const sanitized = str.replace(/[._/()#+]/g, '-')

  // generate a slug using slugify with safe options
  return slugify(sanitized, {
    replacement: '-', // use hyphen as a separator
    lower: true, // convert to lowercase
    strict: true, // strip characters not allowed in URL slugs
  })
}
