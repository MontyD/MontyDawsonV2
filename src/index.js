import style from './index.scss';
import DescriptionCrawler from './components/Description-Crawler.js';
(() => {
    'use strict';

    const crawler = new DescriptionCrawler(document.querySelector('p'));

})();
