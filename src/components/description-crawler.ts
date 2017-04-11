import { attachEvent } from '../dom';

class DescriptionCrawler {

    public data: Array<string>;

    private element: HTMLElement;
    private dotdotdot: HTMLElement;
    private index: number;

    constructor(element: HTMLElement) {
      console.log('here');
        this.element = element;
        this.data = this.element.innerHTML.split('. ');
        this.data = this.randomiseArray(this.data);

        this.dotdotdot = document.createElement('span');
        this.dotdotdot.innerHTML = '...';
        this.dotdotdot.className = 'dotdotdot';

        this.index = 0;

        this.crawlNext();

    }

    public crawlNext(e?: MouseEvent) {

      if (e) {
        e.preventDefault();
      }

      this.element.innerHTML = '';
      this.element.appendChild(this.createLinkElementFromData(this.data[this.index]));
      this.element.appendChild(this.dotdotdot);

      this.incrementIndex();

    }

    private createLinkElementFromData(data: string) {

        let element = document.createElement('a');
        element.href = '#';
        element.title = data;
        element.innerHTML = data;
        attachEvent('click', element, this.crawlNext.bind(this));
        return element;

    }

    private incrementIndex() {

      this.index++;
      if (this.index >= this.data.length) {
        this.index = 0;
      }

    }

    private randomiseArray(array: Array<string>) {

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
