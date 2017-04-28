import http from 'http';
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

import Pages from './pages/containers/Page';
import Layout from './pages/components/Layout';

import messages from './messages.json';

const domain = process.env.NODE_ENV === 'production'
? 'https://gabrielnz-platzi-blog-sfs.now.sh/'
: 'http://localhost:3001';

function requestHandler(request, response) {
  const locale = request.headers['accept-language'].indexOf('es') >= 0 ? 'es' : 'en';
  const context = {};

  const html = renderToString(
    <IntlProvider locale={locale} messages={messages[locale]}>
      <StaticRouter
        location={request.url}
        context={context}
      >
        <Pages />
      </StaticRouter>
    </IntlProvider>,
  );

  response.setHeader('Content-Type', 'text/html');

  if (context.url) {
    response.writeHead(301, {
      Location: context.url,
    });
    response.end();
  }

  response.write(
    renderToStaticMarkup(
      <Layout
        title="React blog"
        content={html}
        domain={domain}
      />,
    ),
  );
  response.end();
}

const server = http.createServer(requestHandler);

server.listen(3000);
