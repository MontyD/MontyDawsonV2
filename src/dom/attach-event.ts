function attachEvent(evnt: string, elem: any, func: Function) {
    'use stict';

    if (elem.addEventListener) {
        elem.addEventListener(evnt, func.bind(this), false);
    } else if (elem.attachEvent) {
        elem.attachEvent('on' + evnt, func.bind(this));
    } else {
        elem[evnt] = func;
    }

}

export default attachEvent;
