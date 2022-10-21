import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import store, {persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
const RNRedux = () => {
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor} loading={null}> */}
      <App />
      {/* </PersistGate> */}
    </Provider>
  );
};
AppRegistry.registerComponent(appName, () => RNRedux);
