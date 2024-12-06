// @ts-check

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  name: 'Example DDD',
  entryPoints: ['./src/auth', './src/grocery-list', './src/library/*'],
  categorizeByGroup: false,
  sortEntryPoints: true,
  out: '../../demo/ddd',
  basePath: ['.', isGithubActions && 'typedoc-unhoax-theme', 'ddd'].filter(Boolean).join('/'),
  categoryOrder: ['Use Case', 'Event', 'Entity', 'Error'],
  navigation: {
    compactFolders: true,
    includeCategories: true,
    excludeReferences: true,
    includeGroups: false,
  },
  plugin: ['../../lib/index.js'],
  visibilityFilters: {},
  searchCategoryBoosts: {
    'Use Case': 2,
    'Entity': 1.2,
  },
  // searchGroupBoosts: {
  //   'Use Case': 2,
  //   'Entity': 1.2,
  // },
  navigationLinks: {
    Docs: 'https://typedoc.org',
  },
  highlightLanguages: ['typescript', 'tsx', 'css', 'json', 'jsonc', 'python', 'yaml', 'markdown'],
  cleanOutputDir: true,
  markdownItOptions: {
    html: true,
  },
  suppressCommentWarningsInDeclarationFiles: true,
}

export default config
