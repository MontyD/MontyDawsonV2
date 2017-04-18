require('../style/index.scss');

import DescriptionCrawler from './components/description-crawler';
import ContextMenu from './components/context-menu';
import { ViewHeightFix, attachEvent, raf } from './dom';
import KeyboardNav from './components/keyboard-nav';
import BackgroundAnimation from './components/background-animation';

const OfflinePlugin: any = require('offline-plugin/runtime');

(() => {

    'use strict';

    const offline = OfflinePlugin.install();

    const crawler = new DescriptionCrawler(<HTMLElement>document.querySelector('p'), attachEvent);

    const contextMenu = new ContextMenu([{
        name: 'View Source',
        href: 'https://github.com/MontyD/MontyDawsonV2'
    }, {
        name: 'View Horse',
        href: 'https://www.google.co.uk/search?q=horses&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiKrdOQ5JbRAhUed1AKHbiuBQgQ_AUICCgB&biw=1150&bih=671'
    }], attachEvent);

    const viewHeightFix = new ViewHeightFix(['header', 'main', 'footer']);

    const keyboardNavigation = new KeyboardNav([{
        key: [9, 13, 37, 39],
        fn: crawler.crawlNext.bind(crawler),
        prevent: true,
        heights: [0, '50vh']
    }], attachEvent);

    const backgroundAnimation = new BackgroundAnimation(raf, attachEvent);

})();
