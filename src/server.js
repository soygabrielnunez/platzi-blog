import http from 'http'
import React from 'react'
// renderToString renderiza la aplicacion a un string con el HTML
import { renderToString } from 'react-dom/server'

function requestHandler(req, res) {
  const html = renderToString(
    // el primer parametro que espera es props, y por los momentos no vamos a pasarle props
    React.DOM.h1(null, 'hola')
  )

  res.write(html)
  res.end
}

const server = http.createServer(requestHandler)

server.listen(3000)
