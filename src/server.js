import http from 'http'
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import Pages from './pages/containers/Page.jsx'
import Layout from './pages/components/Layout.jsx'

function requestHandler(request, response){
  const context = {}

  let html = renderToString(
    <StaticRouter
      location={request.url}
      context={context}>
      <Pages />
    </StaticRouter>
  )

  response.setHeader('Content-Type', 'text/html')

  if (context.url) {
    response.writeHead(301, {
      Location: context.url,
    })
    response.end()
  }

  response.write(
    renderToStaticMarkup(
      <Layout
        title='Aplicacion'
        content={html}
      />
    )
  )
  response.end()
}

const server = http.createServer(requestHandler)

server.listen(3000)
