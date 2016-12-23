import html from './public/index.html';
import style from './index.scss';

(() => {
    'use strict';

    class DescriptionCrawler {

        constructor(element) {

            this.element = element;
            this.data = this.element.innerHTML.split('. ');

            this.dotdotdot = document.createElement('span');
            this.dotdotdot.innerHTML = '...';
            this.dotdotdot.className = 'dotdotdot';

            this.index = 0;

            this.crawlNext();

        }

        createLinkElementFromData(data) {

            let element = document.createElement('a');
            element.href = '#';
            element.title = data;
            element.innerHTML = data;
            this.attachEvent('click', element, this.crawlNext);
            return element;

        }

        attachEvent(evnt, elem, func) {

            if (elem.addEventListener) {
                elem.addEventListener(evnt, func.bind(this), false);
            } else if (elem.attachEvent) {
                elem.attachEvent('on' + evnt, func.bind(this));
            } else {
                elem[evnt] = func;
            }

        }

        crawlNext(e) {

          if (e) {
            e.preventDefault();
          }

          this.element.innerHTML = '';
          this.element.appendChild(this.createLinkElementFromData(this.data[this.index]));
          this.element.appendChild(this.dotdotdot);

          this.index++;

        }



    }

    const crawler = new DescriptionCrawler(document.querySelector('p'));

})();
