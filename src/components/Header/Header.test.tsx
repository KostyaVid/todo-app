import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { store } from '../../redux/store';
import Header from './Header';

test('render header', () => {
  const component = renderer.create(
    <Provider store={store}>
      <Header />
    </Provider>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
