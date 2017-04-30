import reducer from './reducer';
import actions from './actions';

// Vamos a probar la accion `SET_COMMENTS` cuando se envia al store
test('reducer - SET_COMMENTS', () => {
  expect(
    reducer(
      undefined,
      actions.setComments([{ id: 1 }, { id: 3 }]),
    ),
  ).toMatchSnapshot();
});
