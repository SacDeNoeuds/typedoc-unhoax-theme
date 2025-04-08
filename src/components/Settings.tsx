import { i18n, JSX } from 'typedoc'
import { UnhoaxThemeContext } from '../ThemeContext.js'

type Props = { context: UnhoaxThemeContext }
export function Settings({ context }: Props) {
  return (
    <div class='theme-control'>
      <label for='theme-select'>{i18n.theme_theme()}</label>
      <select id='theme-select'>
        <option value='os'>{i18n.theme_os()}</option>
        <option value='light'>{i18n.theme_light()}</option>
        <option value='dark'>{i18n.theme_dark()}</option>
      </select>
    </div>
  )
}
