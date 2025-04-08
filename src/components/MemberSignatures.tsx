import { DeclarationReflection, JSX } from 'typedoc'
import { UnhoaxThemeContext } from '../ThemeContext.js'

type Props = { context: UnhoaxThemeContext; props: DeclarationReflection }

export function MemberSignatures({ context, props }: Props) {
  return (
    <div class={`signatures ${context.getReflectionClasses(props)}`}>
      {props.signatures?.map((item) => (
        <div class='signature'>
          <pre class='anchor-link'>
            <code>{context.memberSignatureTitle(item)}</code>
          </pre>
          <div class='signature-body'>{context.memberSignatureBody(item)}</div>
        </div>
      ))}
    </div>
  )
}
