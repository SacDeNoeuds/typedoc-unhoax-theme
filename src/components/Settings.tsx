import { JSX } from 'typedoc'
import { UnhoaxThemeContext } from '../ThemeContext.js'

type Props = {
  context: UnhoaxThemeContext
}
export function Settings({ context }: Props) {
  return (
    <div class='theme-control'>
      <label for='theme-select'>{context.i18n.theme_theme()}</label>
      <select id='theme-select'>
        <option value='os'>{context.i18n.theme_os()}</option>
        <option value='light'>{context.i18n.theme_light()}</option>
        <option value='dark'>{context.i18n.theme_dark()}</option>
      </select>
    </div>
  )
}
