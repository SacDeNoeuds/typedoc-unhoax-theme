import { JSX, DefaultTheme, PageEvent, Reflection, Renderer, RendererEvent } from 'typedoc'
import { UnhoaxThemeContext } from './ThemeContext.js'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { cpSync } from 'node:fs'

export class UnhoaxTheme extends DefaultTheme {
  constructor(renderer: Renderer) {
    super(renderer)

    // copy the complete assets
    renderer.on(RendererEvent.END, () => {
      const from = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/assets/')
      const to = path.resolve(this.application.options.getValue('out'), 'assets/')

      cpSync(from, to, { recursive: true })
    })

    // link the css file
    renderer.hooks.on('head.end', (event) => (
      <link
        rel='stylesheet'
        href={event.relativeURL('assets/styles.css')}
      />
    ))
  }

  getRenderContext(pageEvent: PageEvent<Reflection>) {
    return new UnhoaxThemeContext(this.router, this, pageEvent, this.application.options)
  }
}
