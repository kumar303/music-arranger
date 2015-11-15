import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from 'lib/components/app';
import dataStore from 'lib/data-store';

render((
  <Provider store={dataStore}>
    <App/>
  </Provider>
), document.getElementById('app'));
