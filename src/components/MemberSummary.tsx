import {
  JSX,
  DefaultThemeRenderContext,
  DeclarationReflection,
  DocumentReflection,
  ReferenceReflection,
  Reflection,
} from 'typedoc'
import { UnhoaxThemeContext } from '../ThemeContext.js'
import { AnchorIconLink } from './AnchorIconLink.js'
import { KindIcon } from './KindIcon.js'

type Props = {
  context: UnhoaxThemeContext
  member: DeclarationReflection | DocumentReflection
}

export function MemberSummary({ context, member }: Props) {
  const targetElementId = context.slugger.slug(member.name)
  const target = member instanceof ReferenceReflection ? member.getTargetReflectionDeep() : undefined

  context.page.pageHeadings.push({
    link: `#${targetElementId}`,
    text: member.getFriendlyFullName(),
    kind: target?.kind ?? member.kind,
    classes: context.getReflectionClasses(member),
  })

  const className = `member-summary ${context.getReflectionClasses(member)}`
  return (
    <>
      <dt class={className}>
        <a
          id={targetElementId}
          class='anchor'
        />
        {target ? (
          <ReferenceMemberName
            target={target}
            anchor={targetElementId}
            context={context}
            member={member}
          />
        ) : (
          <span class='member-summary-name'>
            {context.customIcons[member.kind]?.() || (
              <small>
                <KindIcon kind={member.kind} />
              </small>
            )}
            <a
              class={member.isDeprecated() ? 'deprecated' : undefined}
              href={context.urlTo(member)}
            >
              {member.name}
            </a>
            <AnchorIconLink
              context={context}
              anchor={targetElementId}
            />
          </span>
        )}
      </dt>
      <dd class={className}>{context.commentShortSummary(member)}</dd>
    </>
  )
}

function ReferenceMemberName({
  context,
  member,
  anchor,
  target,
}: Props & {
  anchor: string
  target: Reflection
}) {
  return (
    <span class='member-summary-name'>
      {context.icons[target.kind]()}
      <span class={member.isDeprecated() ? 'deprecated' : undefined}>{member.name}</span>
      <span>&nbsp;{'\u2192'}&nbsp;</span>
      {target.getFriendlyFullName()}
      <AnchorIconLink
        context={context}
        anchor={anchor}
      />
    </span>
  )
}
