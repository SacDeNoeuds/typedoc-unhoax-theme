// @ts-check

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  basePath: ['.', isGithubActions && 'typedoc-unhoax-theme', 'demo/typedoc-default'].filter(Boolean).join('/'),
  out: '../../demo/typedoc-default',
  cleanOutputDir: true,

  name: 'TypeDoc Example',
  entryPoints: ['./src'],
  sort: ['source-order'],
  categorizeByGroup: false,
  plugin: ['../../lib/index.js'],
  searchCategoryBoosts: {
    Component: 2,
    Model: 1.2,
  },
  searchGroupBoosts: {
    Classes: 1.5,
  },
  navigationLinks: {
    Docs: 'https://typedoc.org',
    API: 'https://typedoc.org/api/index.html',
    GitHub: 'https://github.com/TypeStrong/typedoc',
  },
  highlightLanguages: ['typescript', 'tsx', 'css', 'json', 'jsonc', 'python', 'yaml', 'markdown'],
  markdownItOptions: {
    html: true,
  },
  suppressCommentWarningsInDeclarationFiles: true,
}

export default config
