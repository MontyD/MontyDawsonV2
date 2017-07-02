class keyMap {
  constructor(
    public key: number | number[],
    public heights: (number | string)[],
    public prevent: boolean,
    public fn: Function,
  ) { }
}

class keyboardNav {

  private keyMappings: keyMap[];
  private attachEvent: Function;

  constructor(keyMappings: keyMap[], attachEvent: Function) {

    this.keyMappings = keyMappings;
    this.attachEvent = attachEvent;

    this.attachEvent('keydown', window, this.keyDown.bind(this));

  }

  keyDown(e: KeyboardEvent) {

    const keyCode = e.keyCode;
    const target = this.keyMappings
                    .filter(
                      item =>
                        item.key === keyCode ||
                        typeof item.key !== 'number' && 
                        item.key.indexOf && 
                        item.key.indexOf(keyCode) > -1,
                    )[0];

    if (!target || !this.checkHeights(target.heights)) {
      return;
    }

    if (target.prevent) {
      e.preventDefault();
    }

    return target.fn();
  }

  private checkHeights(heights: any[]) {

    const sanitizedHeights: number[] = [];
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    heights.forEach((height) => {
      let newHeight;
      if (typeof height === 'number') {
        return sanitizedHeights.push(height);
      }
      if (typeof height === 'string' && height.indexOf('vh') > -1) {
        newHeight = String(height).replace(/[A-Z]/gi, '');
        newHeight = parseInt(newHeight, 10);
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

export default keyboardNav;
export {
  keyMap,
};
