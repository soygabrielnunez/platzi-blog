import React from 'react';
import Renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';

import Comment from './Comment';

import messages from '../../messages.json';

const comment = {
  id: 1,
  email: 'cursos@platzi.com',
  name: 'Platzi Team',
  body: 'Este es un comentario de prueba',
};

test('Comment should render the component', () => {
  const tree = Renderer.create(
    <IntlProvider locale="es" messages={messages.es}>
      <Comment {...comment} />
    </IntlProvider>).toJSON();

  expect(tree).toMatchSnapshot();
});
