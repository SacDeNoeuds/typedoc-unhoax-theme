import { JSX, PageEvent, Reflection, ReflectionKind, RenderTemplate } from 'typedoc'
import { UnhoaxThemeContext } from '../ThemeContext.js'
import path from 'node:path'

type Props = {
  context: UnhoaxThemeContext
  template: RenderTemplate<PageEvent<Reflection>>
  props: PageEvent<Reflection>
}
export function Html({ context, template, props }: Props) {
  const favicon = context.options.getValue('favicon')
  const relativeToRoot = path.relative(process.cwd(), context.options.getValue('basePath'))
  const basePath = '/' + relativeToRoot + (relativeToRoot.endsWith('/') ? '' : '/')
  return (
    <html lang={context.options.getValue('lang')}>
      <head>
        <meta charset='utf-8' />
        <meta
          name='description'
          content={'Documentation for ' + context.projectDisplayName}
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        {context.hook('head.begin', context)}
        <meta
          http-equiv='x-ua-compatible'
          content='IE=edge'
        />
        <title>{props.model.isProject() ? context.projectDisplayName : props.model.getFriendlyFullName()}</title>
        {favicon && (
          <link
            rel='icon'
            href={favicon}
          />
        )}
        <JsonLdScript context={context} />
        <link
          rel='stylesheet'
          href={context.relativeURL('assets/highlight.css', true)}
        />
        {context.options.getValue('customCss') && (
          <link
            rel='stylesheet'
            href={context.relativeURL('assets/custom.css', true)}
          />
        )}
        {context.options.getValue('customJs') && (
          <script
            defer
            src={context.relativeURL('assets/custom.js', true)}
          />
        )}
        {context.hook('head.end', context)}
      </head>
      <body>
        {context.hook('body.begin', context)}
        {context.toolbar(props)}

        <input
          id='mobile-nav-opened'
          type='checkbox'
          hidden
        />
        <div class='page-layout'>
          <aside class='site-nav-wrapper'>
            <div class='site-nav'>
              {context.hook('sidebar.begin', context)}
              {context.sidebar(props)}
              {context.hook('sidebar.end', context)}
            </div>
          </aside>

          <aside class='page-toc-wrapper'>
            <div class='page-toc'>
              {context.hook('pageSidebar.begin', context)}
              {context.pageSidebar(props)}
              {context.hook('pageSidebar.end', context)}
            </div>
          </aside>

          <main class='page-content'>
            {context.hook('content.begin', context)}
            {context.header(props)}
            {template(props)}
            {context.hook('content.end', context)}
          </main>
        </div>

        {context.footer()}
        <div class='overlay' />
        {context.hook('body.end', context)}

        <script>
          <JSX.Raw html={`window.ReflectionKind=${JSON.stringify(ReflectionKind)}\n`} />
          <JSX.Raw html={`window.basePath=${JSON.stringify(basePath)}`} />
        </script>
        <script
          type='module'
          src={context.relativeURL('assets/init-app.js', true)}
        />

        {/* <script
          defer
          async
          type='module'
          src={context.relativeURL('assets/element/drop-down.js', true)}
        /> */}
      </body>
    </html>
  )
}

function JsonLdScript({ context }: Pick<Props, 'context'>) {
  const hostedBaseUrl = context.options.getValue('hostedBaseUrl')
  if (context.page.url !== 'index.html') return null
  if (!hostedBaseUrl) return null // cannot indicate where the site is.
  return (
    <script type='application/ld+json'>
      <JSX.Raw
        html={JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          'name': context.page.project.name,
          'url': hostedBaseUrl,
        })}
      />
    </script>
  )
}
