import attachEvent from './attach-event.js';

class KeyboardNav {

  constructor(keyMappings) {

    if (!keyMappings || !keyMappings.length) {
      return false;
    }

    this.keyMappings = keyMappings;

    attachEvent('keydown', window, this.keyDown.bind(this));

  }

  keyDown(e) {

      let keyCode = e.keyCode;
      let target = this.keyMappings
                    .filter(
                      item =>
                        item.key === keyCode ||
                        item.key.indexOf && item.key.indexOf(keyCode) > -1
                    )[0];

      if (!target || !this.checkHeights(target.heights)) {
        return;
      }

      if (target.prevent) {
        e.preventDefault();
      }

      return target.fn();
  }

  checkHeights(heights) {

    if (!heights) {
      return true;
    }

    let sanitizedHeights = [];
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    heights.forEach(height => {
      let newHeight;
      if (typeof height === 'number' && !isNaN(height)) {
        return sanitizedHeights.push(height);
      }
      if (height.indexOf('vh') > -1) {
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
