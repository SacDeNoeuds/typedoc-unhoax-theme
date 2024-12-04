// @ts-check
/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
  name: 'TypeDoc Example',
  entryPoints: ['./src'],
  sort: ['source-order'],
  categorizeByGroup: false,
  navigation: {
    compactFolders: true,
    includeCategories: true,
    excludeReferences: true,
    includeGroups: false,
  },
  plugin: ['../lib/index.js'],
  visibilityFilters: {},
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
  cleanOutputDir: true,
  markdownItOptions: {
    html: true,
  },
  suppressCommentWarningsInDeclarationFiles: true,
}

export default config
