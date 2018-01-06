require('../style/index.scss');

import { viewHeightFix, attachEvent, raf } from './dom';
import { COLOURS } from './constants';

const offlinePlugin: any = require('offline-plugin/runtime');

(() => {

  const offline = offlinePlugin.install();
  const vhFix = new viewHeightFix(['header', 'main', 'footer']);
})();
