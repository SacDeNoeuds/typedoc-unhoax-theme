import { JSX } from 'typedoc'
import { UnhoaxThemeContext } from '../ThemeContext.js'
import { Dropdown } from './Dropdown.js'

type Props = {
  context: UnhoaxThemeContext
}

export function PageHeader({ context }: Props) {
  const navigationLinks = Object.entries(context.options.getValue('navigationLinks'))
  return (
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

        <Dropdown
          trigger={<button type='button'>Settings</button>}
          overlayClass='settings-overlay'
        >
          {context.settings()}
        </Dropdown>

        <label
          for='site-nav-opened'
          class='site-nav-burger-trigger'
          aria-label={context.i18n.theme_menu()}
        >
          {context.icons.menu()}
        </label>
      </div>
    </header>
  )
}
