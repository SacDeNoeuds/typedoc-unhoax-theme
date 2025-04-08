import { i18n, JSX } from 'typedoc'
import { UnhoaxThemeContext } from '../ThemeContext.js'

type Props = { context: UnhoaxThemeContext; anchor: string | undefined }
export function AnchorIconLink({ context, anchor }: Props) {
  if (!anchor) return null

  return (
    <a
      href={`#${anchor}`}
      aria-label={i18n.theme_permalink()}
      class='anchor-icon'
    >
      {context.icons.anchor()}
    </a>
  )
}
