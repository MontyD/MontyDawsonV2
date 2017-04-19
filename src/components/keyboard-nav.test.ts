import {} from 'jest';
import KeyboardNav from './keyboard-nav';
import { attachEvent } from '../dom';
let registeredCallback: Function;

const mockFunction = jest.fn();
const mockedAttachEvent = (event: string, windowObj: object, callback: Function) => {
    registeredCallback = callback;
};
const testBindings = {
    key: 0,
    heights: [0, 100000],
    prevent: false,
    fn: jest.fn()
};
const mockedKeyDownEvent = <KeyboardEvent> {
    keyCode: testBindings.key
};

describe('KeyboardNav', () => {

    beforeEach(() => {
        registeredCallback = null;
        testBindings.fn.mockClear();
    });

    it('will attach keydown to the window method', () => {

        new KeyboardNav([], mockFunction);
        expect(mockFunction).toHaveBeenCalledWith('keydown', window, expect.any(Function));

    });

    it('will call the event passed in on keypress - mocked', () => {
        const mockedKeyDownEvent = <KeyboardEvent> {
            keyCode: testBindings.key
        };
        new KeyboardNav([testBindings], mockedAttachEvent);
        // This simulates calling the event listener
        registeredCallback(mockedKeyDownEvent);

        expect(testBindings.fn).toHaveBeenCalled();
    });

    it('will call the event passed in on keypress - through DOM', () => {
        // actually attach event to the DOM
        new KeyboardNav([testBindings], attachEvent);
        let keyboardEvent = new KeyboardEvent('keydown', {
            bubbles : true, cancelable : true, key : '1', shiftKey : false,
        });
        document.dispatchEvent(keyboardEvent);

        expect(testBindings.fn).toHaveBeenCalled();
    });


});