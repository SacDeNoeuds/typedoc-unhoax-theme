import {
  DefaultThemeRenderContext,
  JSX,
  NavigationElement,
  PageEvent,
  Reflection,
  ReflectionKind,
} from 'typedoc'
import { UnhoaxThemeContext } from '../ThemeContext.js'
import { ChevronDownIcon } from '../icons/chevron-down.js'
import { KindIcon } from './KindIcon.js'

type CustomIcons = Partial<DefaultThemeRenderContext['icons']>

export function Navigation(props: {
  projectName: string
  basePath: string
  currentUrl: string
  urlToProject: string
  elements: NavigationElement[]
  customIcons: CustomIcons
}): JSX.Element {
  // const projectIsCurrentPage = props.project === props.model
  const projectIsCurrentPage = props.currentUrl === props.urlToProject
  return (
    <nav class='project-nav'>
      <a
        href={props.urlToProject}
        class={['nav-leaf', projectIsCurrentPage ? 'is-active' : undefined]
          .filter(Boolean)
          .join(' ')}
      >
        {props.projectName}
      </a>
      <ul class='nav-tree'>{props.elements.map(navTreeItem)}</ul>
    </nav>
  )

  function navTreeItem(element: NavigationElement) {
    return element.children ? (
      <NavTreeItem
        defaultOpened={hasOpenedElement(element, props.currentUrl)}
        text={element.text}
        children={element.children.map(navTreeItem)}
      />
    ) : (
      <NavTreeLeaf
        customIcons={props.customIcons}
        isActive={props.currentUrl === element.path}
        text={element.text}
        kind={element.kind}
        link={element.path && props.basePath + element.path}
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
  customIcons: CustomIcons
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
  const className = [
    props.class,
    'nav-leaf',
    props.isActive ? 'is-active' : undefined,
  ]
    .filter(Boolean)
    .join(' ')

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
  return (
    element.path === url ||
    !!element.children?.some((element) => hasOpenedElement(element, url))
  )
}
