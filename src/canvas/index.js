import { raf, attachEvent } from '../dom';

class Canvas {

  constructor(id, options) {
    this.element = document.getElementById(id);
    this.options = options;

    if (!this.element) {
      throw new Error(`Unable to find canvas element by ID ${id}`);
    }

    this.setup();
  }

  setup() {
    if (this.options.fullScreen) {
      this.setFullScreen();
      attachEvent('resize', window, () => raf(this.setFullScreen.bind(this)));
    }
    this.ctx = this.element.getContext('2d');
  }

  setFullScreen() {
    this.element.width = window.innerWidth;
    this.element.height = window.innerHeight;
  }

}

export default Canvas;
