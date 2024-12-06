import { JSX, ReflectionKind } from 'typedoc'
import { UnhoaxThemeContext } from '../ThemeContext.js'
import { CrossIcon } from '../icons/cross.js'

type Props = {
  context: UnhoaxThemeContext
}

export function PageHeader({ context }: Props) {
  const navigationLinks = Object.entries(context.options.getValue('navigationLinks'))
  return (
    <>
      <dialog
        id='search-dialog'
        // @ts-ignore
        popover
      >
        <button
          type='button'
          class='close-button'
          // @ts-ignore
          popovertarget='search-dialog'
        >
          <CrossIcon />
        </button>
        <h3>Search</h3>
        <input
          type='search'
          id='search-input'
          placeholder='Search…'
        />

        <hr />

        <div
          id='search-results'
          data-state='idle'
        >
          Search something to see results
        </div>
      </dialog>

      <header class='page-header'>
        <h3 class='site-title'>
          <a
            href={context.options.getValue('titleLink') || context.relativeURL('')}
            class='header-logo'
          >
            {context.projectDisplayName}
          </a>
        </h3>

        <div class='header-content'>
          {navigationLinks.length > 0 && (
            <div class='header-nav-links'>
              {navigationLinks.map(([label, url]) => (
                <a href={url}>{label}</a>
              ))}
            </div>
          )}
          <button
            type='button'
            // @ts-ignore
            popovertarget='search-dialog'
          >
            {context.icons.search()}
          </button>

          <label
            for='mobile-nav-opened'
            class='mobile-nav-burger-trigger'
            aria-label={context.i18n.theme_menu()}
          >
            {context.icons.menu()}
          </label>
        </div>
      </header>
    </>
  )
}
