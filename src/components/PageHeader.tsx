import { JSX } from 'typedoc'
import { UnhoaxThemeContext } from '../ThemeContext.js'

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

        <div>
          <select id='theme-select'>
            <option value='light'>
              {'☀️'}
              &nbsp; &nbsp;
              {context.i18n.theme_light()}
            </option>
            <option value='dark'>
              {'🌙'}
              &nbsp; &nbsp;
              {context.i18n.theme_dark()}
            </option>
          </select>
        </div>

        <label
          for='mobile-nav-opened'
          class='mobile-nav-burger-trigger'
          aria-label={context.i18n.theme_menu()}
        >
          {context.icons.menu()}
        </label>
      </div>
    </header>
  )
}
