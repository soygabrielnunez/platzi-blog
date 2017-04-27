import React from 'react'

function Layout(props) {
  return (
    <html>
      <head>
        <meta charSet='utf-8' />
        <title>{props.title}</title>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, minimum-scale=1.0'
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/normalize/6.0.0/normalize.css.min'
        />
        <link
          rel='stylesheet'
          href='http://localhost:3001/styles.css'
        />
      </head>
      <body>
        <div
          id='render-target'
          dangerouslySetInnerHTML={{
            __html: props.content
          }}
        />
      <script src='http://localhost:3001/app.js'></script>
      </body>
    </html>
  )
}

export default Layout
