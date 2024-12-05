import { JSX, NavigationElement, PageEvent, Reflection, ReflectionKind } from 'typedoc'
import { UnhoaxThemeContext } from '../ThemeContext.js'
import { ChevronDownIcon } from '../icons/chevron-down.js'
import { KindIcon } from './KindIcon.js'

type Props = {
  context: UnhoaxThemeContext
  currentUrl: string
  props: PageEvent<Reflection>
}
export function Navigation({ context, currentUrl, props }: Props): JSX.Element {
  const basePath = context.options.getValue('basePath') || '/'
  const urlToProject = context.urlTo(props.project)
  const projectIsCurrentPage = currentUrl === urlToProject
  const elements = context.getNavigation()
  return (
    <nav class='project-nav'>
      <a
        href={urlToProject}
        class={['nav-leaf', projectIsCurrentPage ? 'is-active' : undefined].filter(Boolean).join(' ')}
      >
        Modules
      </a>
      <ul class='nav-tree'>{elements.map(navTreeItem)}</ul>
    </nav>
  )

  function navTreeItem(element: NavigationElement) {
    return element.children ? (
      <NavTreeItem
        defaultOpened={hasOpenedElement(element, currentUrl)}
        text={element.text}
        children={element.children.map(navTreeItem)}
      />
    ) : (
      <NavTreeLeaf
        customIcons={context.customIcons}
        isActive={currentUrl === element.path}
        text={element.text}
        kind={element.kind}
        link={element.path && context.relativeURL(element.path)}
      />
    )
  }
}

type NavTreeItemProps = {
  defaultOpened: boolean
  text: string
  children: JSX.Children
}
export function NavTreeItem(props: NavTreeItemProps) {
  if (!props.text) return null
  return (
    <li>
      <details
        class='nav-accordion'
        open={props.defaultOpened}
      >
        <summary>
          <span>{props.text}</span>
          <ChevronDownIcon />
        </summary>
        <ul class='nav-tree'>{props.children}</ul>
      </details>
    </li>
  )
}

type NavTreeLeafProps = {
  class?: string
  kind?: ReflectionKind
  customIcons: UnhoaxThemeContext['customIcons']
  isActive: boolean
  link?: string
  text: string
}
export function NavTreeLeaf(props: NavTreeLeafProps) {
  if (!props.text) return null
  const icon = props.kind && props.customIcons[props.kind]?.()
  const kindIcon = !icon && props.kind && (
    <small>
      <KindIcon kind={props.kind} />
    </small>
  )
  const className = [props.class, 'nav-leaf', props.isActive ? 'is-active' : undefined].filter(Boolean).join(' ')

  return (
    <li>
      {props.link ? (
        <a
          class={className}
          href={props.link}
        >
          {icon}
          <span>{props.text}</span>
          {kindIcon}
        </a>
      ) : (
        <span class={className}>
          {icon}
          <span>{props.text}</span>
          {kindIcon}
        </span>
      )}
    </li>
  )
}

function hasOpenedElement(element: NavigationElement, url: string): boolean {
  return element.path === url || !!element.children?.some((element) => hasOpenedElement(element, url))
}
