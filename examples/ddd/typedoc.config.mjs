// @ts-check

const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  name: 'Example DDD',
  entryPoints: ['./src/auth', './src/grocery-list', './src/library/*'],
  categorizeByGroup: false,
  sortEntryPoints: true,
  out: '../../demo/ddd',
  basePath: ['.', isGithubActions && 'typedoc-unhoax-theme', 'demo/ddd'].filter(Boolean).join('/'),
  categoryOrder: ['Use Case', 'Event', 'Entity', 'Error'],
  navigation: {
    compactFolders: true,
    includeCategories: true,
    excludeReferences: true,
    includeGroups: false,
  },
  plugin: ['../../lib/index.js'],
  visibilityFilters: {},
  searchInComments: true,
  searchInDocuments: true,
  searchCategoryBoosts: {
    'Use Case': 2,
    'Entity': 1.2,
  },
  // searchGroupBoosts: {
  //   'Use Case': 2,
  //   'Entity': 1.2,
  // },
  navigationLinks: {
    TypeDoc: 'https://typedoc.org',
    GitHub: 'https://github.com/SacDeNoeuds/typedoc-unhoax-theme',
  },
  highlightLanguages: ['typescript', 'tsx', 'css', 'json', 'jsonc', 'python', 'yaml', 'markdown'],
  cleanOutputDir: true,
  markdownItOptions: {
    html: true,
  },
  suppressCommentWarningsInDeclarationFiles: true,
  typePrintWidth: 60,
}

export default config
