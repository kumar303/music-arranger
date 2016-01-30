import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from 'lib/components/app';
import dataStore from 'lib/data-store';

var extras = [];
if (module.hot) {
  console.log('Adding redux dev-tools to app');
  var DevTools = require('lib/components/dev-tools');
  extras.push(<DevTools key="dev-tools" />);
}

render((
  <Provider store={dataStore}>
    <div>
      <App/>
      {extras}
    </div>
  </Provider>
), document.getElementById('app'));
