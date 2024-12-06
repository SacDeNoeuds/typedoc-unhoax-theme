import { JSX, PageEvent, Reflection, RenderTemplate } from 'typedoc'
import { UnhoaxThemeContext } from '../ThemeContext.js'

type Props = {
  context: UnhoaxThemeContext
  template: RenderTemplate<PageEvent<Reflection>>
  pageEvent: PageEvent<Reflection>
}
export function Html({ context, template, pageEvent }: Props) {
  const favicon = context.options.getValue('favicon')
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
        <title>
          {pageEvent.model.isProject() ? context.projectDisplayName : pageEvent.model.getFriendlyFullName()}
        </title>
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
        <script
          type='module'
          src={context.relativeURL('assets/init-app.js', true)}
        />
        {context.toolbar(context.page)}

        <input
          id='mobile-nav-opened'
          type='checkbox'
          hidden
        />
        <div class='page-layout'>
          <aside class='site-nav'>
            {context.hook('sidebar.begin', context)}
            {context.sidebar(context.page)}
            {context.hook('sidebar.end', context)}
          </aside>

          <aside class='page-content-nav'>
            {context.hook('pageSidebar.begin', context)}
            {context.pageSidebar(context.page)}
            {context.hook('pageSidebar.end', context)}
          </aside>

          <main class='page-content'>
            {context.hook('content.begin', context)}
            {context.header(context.page)}
            {template(context.page)}
            {context.hook('content.end', context)}
          </main>
        </div>

        {context.footer()}
        <div class='overlay' />
        {context.hook('body.end', context)}

        <script
          defer
          async
          type='module'
          src={context.relativeURL('assets/element/drop-down.js', true)}
        />
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
