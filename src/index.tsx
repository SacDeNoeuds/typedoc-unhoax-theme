/// <reference types="./jsx.d.ts" />
import { Application } from 'typedoc'
import { UnhoaxTheme } from './Theme.js'

export function load(app: Application) {
  app.renderer.defineTheme('unhoax', UnhoaxTheme)

  app.on('bootstrapEnd', () => {
    if (app.options.isSet('theme') && app.options.getValue('theme') !== 'unhoax') {
      return app.logger.warn(
        `The theme'unhoax' is not used because another theme (${app.options.getValue('theme')}) was specified!`,
      )
    }

    app.options.setValue('theme', 'unhoax')

    if (!app.options.isSet('lightHighlightTheme')) {
      app.options.setValue('lightHighlightTheme', 'vitesse-light')
    }

    if (!app.options.isSet('darkHighlightTheme')) {
      app.options.setValue('darkHighlightTheme', 'vitesse-dark')
    }
  })
}
