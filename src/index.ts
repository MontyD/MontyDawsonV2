require('../style/index.scss');
import DescriptionCrawler from './components/description-crawler';
import ContextMenu from './components/context-menu';
import { ViewHeightFix } from './dom';
import KeyboardNav from './components/keyboard-nav';
// import OfflinePlugin from 'offline-plugin/runtime';
import BackgroundAnimation from './components/background-animation';

(() => {

    'use strict';

    const crawler = new DescriptionCrawler(<HTMLElement>document.querySelector('p'));

    const contextMenu = new ContextMenu([{
        name: 'View Source',
        href: 'https://github.com/MontyD/MontyDawsonV2'
    }, {
        name: 'View Horse',
        href: 'https://www.google.co.uk/search?q=horses&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiKrdOQ5JbRAhUed1AKHbiuBQgQ_AUICCgB&biw=1150&bih=671'
    }]);

    const viewHeightFix = new ViewHeightFix(['header', 'main', 'footer']);

    const keyboardNavigation = new KeyboardNav([{
        key: [9, 13, 37, 39],
        fn: crawler.crawlNext.bind(crawler),
        prevent: true,
        heights: [0, '50vh']
    }]);
    
    // const offline = OfflinePlugin.install();

    const backgroundAnimation = new BackgroundAnimation();

})();
