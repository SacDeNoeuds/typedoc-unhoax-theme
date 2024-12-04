import { DefaultThemeRenderContext, JSX, ReflectionKind } from 'typedoc'
import { UnhoaxThemeContext } from '../ThemeContext.js'

type Props = {
  kind: ReflectionKind
}
export function KindIcon({ kind }: Props) {
  const kindName = getEnumKeyOf(ReflectionKind, kind)
  if (!kindName) return null
  return (
    <abbr
      title={kindName}
      class='kind-icon'
    >
      ({kindName[0]})
    </abbr>
  )
}

function getEnumKeyOf<Enum extends { [Key: string]: any }>(
  theEnum: Enum,
  value: Enum[keyof Enum],
): keyof Enum {
  const key = Object.keys(theEnum).find((key) => theEnum[key] === value)
  if (!key) throw new Error(`Value ${value} not found in enum ${theEnum}`)
  return key
}
