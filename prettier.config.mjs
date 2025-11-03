// see:  https://prettier.io/docs/en/configuration.html

/** @type {import('prettier').Config} */
const config = {
  semi: false,
  tabWidth: 2,
  singleQuote: true,
  bracketSpacing: false,
  printWidth: 120,
  trailingComma: 'es5',
  parser: 'typescript',
}

export default config
