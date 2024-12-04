import { JSX } from 'typedoc'
import { UnhoaxThemeContext } from '../ThemeContext.js'

type Props = {
  context: UnhoaxThemeContext
}
export function SidebarLinks({ context }: Props) {
  const links = Object.entries(context.options.getValue('sidebarLinks'))
  if (links.length === 0) return null
  return (
    <nav class='sidebar-links'>
      {links.map(([label, url]) => (
        <a href={url}>{label}</a>
      ))}
    </nav>
  )
}
