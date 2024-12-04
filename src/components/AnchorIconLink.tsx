import { JSX } from 'typedoc'
import { UnhoaxThemeContext } from '../ThemeContext.js'

type Props = {
  context: UnhoaxThemeContext
  anchor: string | undefined
}
export function AnchorIconLink({ context, anchor }: Props) {
  if (!anchor) return null

  return (
    <a
      href={`#${anchor}`}
      aria-label={context.i18n.theme_permalink()}
      class='anchor-icon'
    >
      {context.icons.anchor()}
    </a>
  )
}
