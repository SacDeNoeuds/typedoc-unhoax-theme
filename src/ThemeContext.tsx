import {
  JSX,
  DefaultThemeRenderContext,
  ReflectionKind,
  DeclarationHierarchy,
  PageEvent,
  Reflection,
  DocumentReflection,
  ContainerReflection,
  ProjectReflection,
  NavigationElement,
  DeclarationReflection,
  RenderTemplate,
  SignatureReflection,
} from 'typedoc'
import { SearchIcon } from './icons/search.js'
import { AnchorIcon } from './icons/anchor.js'
import { MenuIcon } from './icons/menu.js'
import { DocumentIcon } from './icons/document.js'
import { ChevronDownIcon } from './icons/chevron-down.js'
import { Navigation, NavTreeItem, NavTreeLeaf } from './components/Navigation.js'
import { Html } from './components/Html.js'
import { PageHeader } from './components/PageHeader.js'
import { SidebarLinks } from './components/SidebarLinks.js'
import { Settings } from './components/Settings.js'
import { Index } from './components/Index.js'
import { MemberSummary } from './components/MemberSummary.js'
import { ReflectionTemplate } from './components/ReflectionTemplate.js'
import { MemberSignatures } from './components/MemberSignatures.js'
import { MemberSignatureBody } from './components/MemberSignatureBody.js'

export class UnhoaxThemeContext extends DefaultThemeRenderContext {
  customIcons: Partial<DefaultThemeRenderContext['icons']> = {
    search: SearchIcon,
    anchor: AnchorIcon,
    // checkbox: () => <></>,
    chevronDown: ChevronDownIcon,
    menu: MenuIcon,
    [ReflectionKind.Document]: DocumentIcon,
    // chevronSmall: () => <></>,
    folder: () => <>FOLDER</>,
  }
  get icons(): DefaultThemeRenderContext['icons'] {
    return {
      ...this.theme.icons,
      ...this.customIcons,
    }
  }

  get projectDisplayName() {
    const { name, packageVersion } = this.page.project
    const version = packageVersion && `v${packageVersion}`
    return [name, version].filter(Boolean).join(' – ')
  }

  override defaultLayout = (
    template: RenderTemplate<PageEvent<Reflection>>,
    props: PageEvent<Reflection>,
  ): JSX.Element => {
    return (
      <Html
        context={this}
        template={template}
        pageEvent={props}
      />
    )
  }

  override toolbar = (props: PageEvent<Reflection>): JSX.Element => {
    return <PageHeader context={this} />
  }

  // Important: If you use `this`, this function MUST be bound! Template functions
  // are free to destructure the context object to only grab what they care about.
  override footer = () => {
    return (
      <footer class='page-footer'>
        {this.hook('footer.begin', this)}
        Built with TypeDoc with the Unhoax Theme 🤓&nbsp;–&nbsp;Copyright {new Date().getFullYear()}
        {this.hook('footer.end', this)}
      </footer>
    )
  }
  // override hierarchy = (typeHierarchy: DeclarationHierarchy | undefined): JSX.Element | undefined => {
  //   return <div>hierarchy</div>
  // }

  override navigation = (props: PageEvent<Reflection>): JSX.Element => {
    return (
      <Navigation
        context={this}
        currentUrl={props.url}
        props={props}
      />
    )
  }

  override pageNavigation = (props: PageEvent<Reflection>): JSX.Element => {
    const pageHeadings = props.pageHeadings.filter((heading) => heading.text)
    const pageSections = props.pageSections.flatMap((section) => {
      if (!section.title) return []
      const headings = section.headings.filter((heading) => heading.text)
      return headings.length === 0 ? [] : [{ ...section, headings }]
    })

    if (pageHeadings.length + pageSections.length === 0) return <></>

    return (
      <div class='page-nav'>
        <h4>On This Page</h4>
        {pageSections.length > 0 && (
          <ul class='nav-tree'>
            {pageSections.map((section) => {
              return (
                <NavTreeItem
                  text={section.title}
                  defaultOpened
                  children={section.headings.map((heading) => {
                    return (
                      <NavTreeLeaf
                        class={heading.level ? `page-nav-leaf-${heading.level}` : undefined}
                        customIcons={this.customIcons}
                        isActive={false}
                        text={heading.text}
                        link={heading.link}
                        kind={heading.kind}
                      />
                    )
                  })}
                />
              )
            })}
          </ul>
        )}
        {pageSections.length === 0 && pageHeadings.length > 0 && (
          <ul class='nav-tree'>
            {pageHeadings.map((heading) => {
              return (
                <NavTreeLeaf
                  customIcons={this.customIcons}
                  isActive={false}
                  text={['#'.repeat(heading.level ?? 0), heading.text].filter(Boolean).join(' ')}
                  link={heading.link}
                  kind={heading.kind}
                />
              )
            })}
          </ul>
        )}
      </div>
    )
  }

  override sidebarLinks = (): JSX.Element | null => {
    return <SidebarLinks context={this} />
  }

  override settings = (): JSX.Element => {
    return <Settings context={this} />
  }

  /** Right sidebar, with settings and "what's on this page" */
  override pageSidebar = (props: PageEvent<Reflection>): JSX.Element => {
    return this.pageNavigation(props)
  }

  // override breadcrumb = (props: Reflection): JSX.Element | undefined => {
  //   return <div>Breadcrumb</div>
  // }

  /** Content header */
  override header = (props: PageEvent<Reflection>): JSX.Element => {
    // Don't render on the index page or the class hierarchy page
    // We should probably someday render on the class hierarchy page, but currently breadcrumbs
    // are entirely dependent on the reflection hierarchy, so it doesn't make sense today.
    const renderBreadcrumbs = !['index.html', 'hierarchy.html', 'modules.html'].includes(props.url)
    const renderTitle = props.model.kind !== ReflectionKind.Document
    return (
      <div class='page-content-header'>
        {renderBreadcrumbs && <ul class='breadcrumb'>{this.breadcrumb(props.model)}</ul>}
        {renderTitle && <h1>{props.model.name}</h1>}
      </div>
    )
  }

  override breadcrumb = (props: Reflection, isFirst = true): JSX.Element | undefined => {
    return (
      <>
        {props.parent && this.breadcrumb(props.parent, false)}
        {props.parent && <span>/</span>}
        <li>{!isFirst && props.url ? <a href={this.urlTo(props)}>{props.name}</a> : <span>{props.name}</span>}</li>
      </>
    )
  }

  override reflectionTemplate = (props: PageEvent<ContainerReflection>): JSX.Element => {
    return (
      <ReflectionTemplate
        context={this}
        props={props}
      />
    )
  }

  // override hierarchyTemplate = (props: PageEvent<ProjectReflection>): JSX.Element => {
  //   return <div>Hierarchy Template</div>
  // }

  override indexTemplate = (props: PageEvent<ProjectReflection>): JSX.Element => {
    return (
      <div class='markdown readme'>
        <JSX.Raw html={this.markdown(props.model.readme || [])} />
      </div>
    )
  }

  override documentTemplate = (props: PageEvent<DocumentReflection>): JSX.Element => {
    return (
      <div class='markdown document'>
        <JSX.Raw html={this.markdown(props.model.content)} />
      </div>
    )
  }

  override index = (props: ContainerReflection): JSX.Element => {
    return (
      <Index
        context={this}
        props={props}
      />
    )
  }

  override moduleMemberSummary = (member: DeclarationReflection | DocumentReflection): JSX.Element => {
    return (
      <MemberSummary
        context={this}
        member={member}
      />
    )
  }

  override memberSignatures = (props: DeclarationReflection): JSX.Element => {
    return (
      <MemberSignatures
        context={this}
        props={props}
      />
    )
  }

  // cannot be overridden because it relies on internals
  // override moduleReflection = (mod: DeclarationReflection | ProjectReflection): JSX.Element => {}

  // cannot be overridden because it relies on internals
  // override memberSignatureTitle = (props: SignatureReflection, options?: { hideName?: boolean } | undefined): JSX.Element => {
  override memberSignatureBody = (
    props: SignatureReflection,
    r_1?: { hideSources?: boolean } | undefined,
  ): JSX.Element => {
    return (
      <MemberSignatureBody
        context={this}
        props={props}
      />
    )
  }
}
