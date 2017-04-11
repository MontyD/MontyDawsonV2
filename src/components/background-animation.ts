import { Canvas } from '../canvas';
import { raf, attachEvent } from '../dom';

class BackgroundAnimation extends Canvas {

  constructor() {
    super('background', {
        fullScreen: true,
        backgroundColor: '#E0E0E0'
    });
  }

}

export default BackgroundAnimation;
