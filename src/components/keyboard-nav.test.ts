import {} from 'jest';
import KeyboardNav from './keyboard-nav';

let eventListeners = [];

const attachEvent = (evnt: string, elem: any, func: Function) => {
    eventListeners.push({
        evnt,
        elem,
        func
    });
};

describe('KeyboardNav', () => {

    beforeEach(() => {
        eventListeners = [];
    });

    it('will attach keydown to the window method', () => {
        
        new KeyboardNav([], attachEvent);
        expect(eventListeners.length).toBe(1);
        expect(eventListeners[0].evnt).toEqual('keydown');

    });


});