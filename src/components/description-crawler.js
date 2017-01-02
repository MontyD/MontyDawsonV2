import attachEvent from './attach-event.js';

class DescriptionCrawler {

    constructor(element) {

        this.element = element;
        this.data = this.element.innerHTML.split('. ');
        this.data = this.randomiseArray(this.data);

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
        attachEvent('click', element, this.crawlNext.bind(this));
        return element;

    }

    crawlNext(e) {

      if (e) {
        e.preventDefault();
      }

      this.element.innerHTML = '';
      this.element.appendChild(this.createLinkElementFromData(this.data[this.index]));
      this.element.appendChild(this.dotdotdot);

      this.incrementIndex();

    }

    incrementIndex() {

      this.index++;
      if (this.index >= this.data.length) {
        this.index = 0;
      }

    }

    randomiseArray(array) {

      let currentIndex = array.length, temporaryValue, randomIndex;

      while (currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;

    }

}

export default DescriptionCrawler;
