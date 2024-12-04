import { JSX, SignatureReflection } from 'typedoc'
import { UnhoaxThemeContext } from '../ThemeContext.js'
import { hasTypeParameters } from '../utils.js'
import { SignatureParameter } from './SignatureParameter.js'

type Props = {
  context: UnhoaxThemeContext
  props: SignatureReflection
  hideSources?: boolean
}

export function MemberSignatureBody({ context, props, hideSources = false }: Props) {
  const returnsTag = props.comment?.getTag('@returns')

  return (
    <>
      {context.reflectionFlags(props)}
      {context.commentSummary(props)}

      {hasTypeParameters(props) && context.typeParameters(props.typeParameters)}

      {props.parameters && props.parameters.length > 0 && (
        <div class='parameters'>
          <h4>{context.i18n.kind_plural_parameter()}</h4>
          <ul class='parameter-list'>
            {props.parameters.map((item) => (
              <li>
                <SignatureParameter
                  context={context}
                  item={item}
                />
                {context.commentSummary(item)}
                {context.commentTags(item)}
                {context.typeDetailsIfUseful(item.type)}
              </li>
            ))}
          </ul>
        </div>
      )}
      {props.type && (
        <>
          <h4 class='tsd-returns-title'>
            {context.i18n.theme_returns()} {context.type(props.type)}
          </h4>
          {returnsTag && <JSX.Raw html={context.markdown(returnsTag.content)} />}
          {context.typeDetailsIfUseful(props.type)}
        </>
      )}

      {context.commentTags(props)}

      {!hideSources && context.memberSources(props)}
    </>
  )
}
