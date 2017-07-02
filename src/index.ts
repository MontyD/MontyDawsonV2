require('../style/index.scss');

import descriptionCrawler from './components/description-crawler';
import contextMenu from './components/context-menu';
import { viewHeightFix, attachEvent, raf } from './dom';
import keyboardNav, { keyMap }  from './components/keyboard-nav';
import { COLOURS } from './constants';
import backgroundAnimation from './components/background-animation';

const offlinePlugin: any = require('offline-plugin/runtime');

(() => {

  'use strict';

  const offline = offlinePlugin.install();

  const crawler = new descriptionCrawler(<HTMLElement>document.querySelector('p'), attachEvent);

  const menu = new contextMenu([{
    name: 'View Source',
    href: 'https://github.com/MontyD/MontyDawsonV2',
  }, {
    name: 'View Horse',
    href: 'https://www.google.co.uk/search?q=horses&source=lnms&tbm=isch',
  }],                          attachEvent);

  const vhFix = new viewHeightFix(['header', 'main', 'footer']);

  const keyboardNavigation = new keyboardNav([
    new keyMap(
      [9, 13, 37, 39],
      [0, '50vh'],
      true,
      crawler.crawlNext.bind(crawler),
  )],                                        attachEvent);

  const backgroundAni = new backgroundAnimation(COLOURS, raf, attachEvent);

})();
