import { JSX, ParameterReflection } from 'typedoc'
import { UnhoaxThemeContext } from '../ThemeContext.js'

type Props = {
  context: UnhoaxThemeContext
  item: ParameterReflection
}
export function SignatureParameter({ context, item }: Props) {
  return (
    <pre>
      <code>
        {context.reflectionFlags(item)}
        {!!item.flags.isRest && <span class='tsd-signature-symbol'>…</span>}
        <span class='tsd-kind-parameter'>{item.name}</span>
        {': '}
        {context.type(item.type)}
        {item.defaultValue !== undefined && <span class='tsd-signature-symbol'>{` = ${item.defaultValue}`}</span>}
      </code>
    </pre>
  )
}
