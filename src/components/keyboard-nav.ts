import { attachEvent } from '../dom';

interface KeyMap {
  key: number | Array<number>,
  heights: Array<number|string>,
  prevent: boolean,
  fn: Function
}

class KeyboardNav {

  private keyMappings: Array<KeyMap>;

  constructor(keyMappings: Array<KeyMap>) {

    this.keyMappings = keyMappings;

    attachEvent('keydown', window, this.keyDown.bind(this));

  }

  keyDown(e: KeyboardEvent) {

      let keyCode = e.keyCode;
      let target = this.keyMappings
                    .filter(
                      item =>
                        item.key === keyCode ||
                        typeof item.key !== 'number' && 
                        item.key.indexOf && 
                        item.key.indexOf(keyCode) > -1
                    )[0];

      if (!target || !this.checkHeights(target.heights)) {
        return;
      }

      if (target.prevent) {
        e.preventDefault();
      }

      return target.fn();
  }

  private checkHeights(heights: Array<number|string>) {

    let sanitizedHeights: Array<number> = [];
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    heights.forEach(height => {
      let newHeight;
      if (typeof height === 'number') {
        return sanitizedHeights.push(height);
      }
      if (typeof height === 'string' && height.indexOf('vh') > -1) {
        newHeight = String(height).replace(/[A-Z]/gi, '');
        newHeight = parseInt(newHeight);
        if (!isNaN(newHeight)) {
          newHeight = window.innerHeight * newHeight / 100;
          sanitizedHeights.push(newHeight);
        }
      }
    });

    if (!sanitizedHeights[1] && sanitizedHeights[0] && scrollTop >= sanitizedHeights[0]) {
      return true;
    } else if (scrollTop >= sanitizedHeights[0] && scrollTop <= sanitizedHeights[1]) {
      return true;
    }
    return false;

  }


}

export default KeyboardNav;
