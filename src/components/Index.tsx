import { ContainerReflection, i18n, JSX, ReflectionCategory, ReflectionGroup } from 'typedoc'
import { UnhoaxThemeContext } from '../ThemeContext.js'

function renderCategory(context: UnhoaxThemeContext, item: ReflectionCategory | ReflectionGroup, prependName = '') {
  return (
    <section class='tsd-index-section'>
      <h3 class='tsd-index-heading'>{prependName ? `${prependName} - ${item.title}` : item.title}</h3>
      {item.description && (
        <div class='tsd-comment tsd-typography'>
          <JSX.Raw html={context.markdown(item.description)} />
        </div>
      )}
      <div class='tsd-index-list'>
        {item.children.map((item) => (
          <a
            href={context.urlTo(item)}
            class={['tsd-index-link', item.isDeprecated() && 'deprecated', context.getReflectionClasses(item)]
              .filter(Boolean)
              .join(' ')}
          >
            <span>{item.getFriendlyFullName()}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

type Props = { context: UnhoaxThemeContext; props: ContainerReflection }
export function Index({ context, props }: Props) {
  const groups = props.groups ?? []
  const categories = props.categories ?? []

  let content: JSX.Element | JSX.Element[] = categories.length
    ? categories.map((item) => renderCategory(context, item))
    : groups.flatMap((item) => {
        return item.categories
          ? item.categories.map((item2) => renderCategory(context, item2, item.title))
          : renderCategory(context, item)
      })

  content = (
    <>
      <h3>{i18n.theme_index()}</h3>
      {content}
    </>
  )

  return <section class='tsd-panel tsd-index-panel'>{content}</section>
}
