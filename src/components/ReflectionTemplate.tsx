import {
  ContainerReflection,
  DeclarationReflection,
  JSX,
  PageEvent,
  ReferenceReflection,
  Reflection,
  ReflectionKind,
  SignatureReflection,
  TypeParameterReflection,
} from 'typedoc'
import { UnhoaxThemeContext } from '../ThemeContext.js'
import { hasTypeParameters } from '../utils.js'

type Props = {
  context: UnhoaxThemeContext
  props: PageEvent<ContainerReflection>
}
export function ReflectionTemplate({ context, props }: Props) {
  if (
    props.model.kindOf(ReflectionKind.TypeAlias | ReflectionKind.Variable) &&
    props.model instanceof DeclarationReflection
  )
    return context.memberDeclaration(props.model)

  if (props.model.kindOf(ReflectionKind.ExportContainer) && (props.model.isDeclaration() || props.model.isProject()))
    return context.moduleReflection(props.model)

  return (
    <>
      {props.model.hasComment() && (
        <section class='comment'>
          {context.commentSummary(props.model)}
          {context.commentTags(props.model)}
        </section>
      )}

      {context.reflectionPreview(props.model)}

      {hasTypeParameters(props.model) && context.typeParameters(props.model.typeParameters)}

      {props.model instanceof DeclarationReflection && (
        <>
          {context.hierarchy(props.model.typeHierarchy)}

          {!!props.model.implementedTypes && (
            <section>
              <h4>{context.i18n.theme_implements()}</h4>
              <ul class='hierarchy'>
                {props.model.implementedTypes.map((item) => (
                  <li>{context.type(item)}</li>
                ))}
              </ul>
            </section>
          )}
          {!!props.model.implementedBy && (
            <section>
              <h4>{context.i18n.theme_implemented_by()}</h4>
              <ul class='hierarchy'>
                {props.model.implementedBy.map((item) => (
                  <li>{context.type(item)}</li>
                ))}
              </ul>
            </section>
          )}
          {!!props.model.signatures?.length && <section>{context.memberSignatures(props.model)}</section>}
          {!!props.model.indexSignatures?.length && (
            <section class={`tsd-panel ${context.getReflectionClasses(props.model)}`}>
              <h4 class='tsd-before-signature'>{context.i18n.theme_indexable()}</h4>
              <ul class='tsd-signatures'>
                {props.model.indexSignatures.map((index) => (
                  <IndexSignature
                    context={context}
                    index={index}
                  />
                ))}
              </ul>
            </section>
          )}
          {!props.model.signatures && context.memberSources(props.model)}
        </>
      )}
      {!!props.model.childrenIncludingDocuments?.length && context.index(props.model)}
      {context.members(props.model)}
    </>
  )
}

function IndexSignature({ context, index }: { context: UnhoaxThemeContext; index: SignatureReflection }) {
  return (
    <li class='tsd-index-signature'>
      <div class='tsd-signature'>
        {index.flags.isReadonly && <span class='tsd-signature-keyword'>readonly </span>}
        <span class='tsd-signature-symbol'>[</span>
        {index.parameters!.map((item) => (
          <>
            <span class={getKindClass(item)}>{item.name}</span>: {context.type(item.type)}
          </>
        ))}
        <span class='tsd-signature-symbol'>]: </span>
        {context.type(index.type)}
      </div>
      {context.commentSummary(index)}
      {context.commentTags(index)}
      {context.typeDetailsIfUseful(index.type)}
    </li>
  )
}

function getKindClass(refl: Reflection): string {
  if (refl instanceof ReferenceReflection) {
    return getKindClass(refl.getTargetReflectionDeep())
  }
  return ReflectionKind.classString(refl.kind)
}
