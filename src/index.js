import style from './index.scss';
import DescriptionCrawler from './components/Description-Crawler.js';
import ContextMenu from './components/Context-Menu.js';
(() => {
    'use strict';

    const crawler = new DescriptionCrawler(document.querySelector('p'));
    const contextMenu = new ContextMenu([{
      name: 'View Source',
      href: 'https://github.com/MontyD/MontyDawsonV2'
    }, {
      name: 'View Horse',
      href: 'https://www.google.co.uk/search?q=horses&source=lnms&tbm=isch&sa=X&ved=0ahUKEwiKrdOQ5JbRAhUed1AKHbiuBQgQ_AUICCgB&biw=1150&bih=671'
    }]);

})();
