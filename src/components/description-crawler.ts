class descriptionCrawler {

  public data: string[];

  private element: HTMLElement;
  private dotdotdot: HTMLElement;
  private index: number;

  private attachEvent: Function;

  constructor(element: HTMLElement, attachEvent: Function) {

    this.element = element;
    this.data = this.element.innerHTML.split('. ');
    this.data = this.data.map(description => description.replace(/\.$/, ''));
    this.data = this.randomiseArray(this.data);
    this.attachEvent = attachEvent;

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

    const element = document.createElement('a');
    element.href = '#';
    element.title = data;
    element.innerHTML = data;
    this.attachEvent('click', element, this.crawlNext.bind(this));
    return element;

  }

  private incrementIndex() {

    this.index = this.index + 1;
    if (this.index >= this.data.length) {
      this.index = 0;
    }

  }

  private randomiseArray(array: string[]) {

    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex = currentIndex - 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;

  }

}

export default descriptionCrawler;
