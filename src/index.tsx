import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from './components/app';

const offlinePlugin: any = require('offline-plugin/runtime');
require('../style/index.scss');

(() => {
    offlinePlugin.install();

    ReactDOM.render(
      <BrowserRouter>
        <App/>
      </BrowserRouter>,
      document.getElementById('app')
    );
})();
