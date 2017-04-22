import {} from 'jest';
import KeyboardNav, { KeyMap } from './keyboard-nav';
import { attachEvent } from '../dom';
let registeredCallback: Function;

const mockFunction = jest.fn();
const mockedAttachEvent = (event: string, windowObj: object, callback: Function) => {
    registeredCallback = callback;
};
const testBindings: KeyMap = {
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
        (testBindings.fn as any).mockClear();
    });

    it('will attach keydown to the window method', () => {

        new KeyboardNav([], mockFunction);
        expect(mockFunction).toHaveBeenCalledWith('keydown', window, expect.any(Function));

    });

    it('will call the event passed in on keypress - mocked', () => {
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

    it('will only call the function specified by the keyCode', () => {
        const willNotBeCalledBindings = {
            key: 1,
            heights: [0, 100000],
            prevent: false,
            fn: jest.fn()
        };
        new KeyboardNav([testBindings, willNotBeCalledBindings], mockedAttachEvent);
        // This simulates calling the event listener
        registeredCallback(mockedKeyDownEvent);
        
        expect(testBindings.fn).toHaveBeenCalled();
        expect(willNotBeCalledBindings.fn).not.toHaveBeenCalled();
    });

    it('will not call the callback if not within the specified height - documentElement ScrollTop', () => {
        testBindings.heights = [10000, 20000];
        new KeyboardNav([testBindings], mockedAttachEvent);
        Object.defineProperty(document.documentElement, 'scrollTop', {
            writable: true,
            value: 1
        });

        // This simulates calling the event listener
        registeredCallback(mockedKeyDownEvent);

        expect(testBindings.fn).not.toHaveBeenCalled();
    });

    it('will not call the callback if not within the specified height - body ScrollTop', () => {
        testBindings.heights = [10000, 20000];
        new KeyboardNav([testBindings], mockedAttachEvent);
        Object.defineProperty(document.documentElement, 'scrollTop', {
            writable: true,
            value: 0
        });
        Object.defineProperty(document.body, 'scrollTop', {
            writable: true,
            value: 1
        });

        // This simulates calling the event listener
        registeredCallback(mockedKeyDownEvent);

        expect(testBindings.fn).not.toHaveBeenCalled();
    });

    it('will call the callback if within the specified height', () => {
        testBindings.heights = [10000, 20000];
        new KeyboardNav([testBindings], mockedAttachEvent);
        Object.defineProperty(document.documentElement, 'scrollTop', {
            writable: true,
            value: 10001
        });

        // This simulates calling the event listener
        registeredCallback(mockedKeyDownEvent);

        expect(testBindings.fn).toHaveBeenCalled();
    });

    it('will interpret vh heights correctly', () => {
        testBindings.heights = ['100vh', '200vh'];
        new KeyboardNav([testBindings], mockedAttachEvent);
        Object.defineProperty(document.documentElement, 'scrollTop', {
            writable: true,
            value: window.innerHeight + 10
        });

        // This simulates calling the event listener
        registeredCallback(mockedKeyDownEvent);

        expect(testBindings.fn).toHaveBeenCalled();
    });

    it ('will not call preventDefault on the event if prevent is false', () => {
        testBindings.prevent = false;
        mockedKeyDownEvent.preventDefault = jest.fn();
        new KeyboardNav([testBindings], mockedAttachEvent);
        
        registeredCallback(mockedKeyDownEvent);

        expect(mockedKeyDownEvent.preventDefault).not.toHaveBeenCalled();
    });

    it ('will call preventDefault on the event if prevent is true', () => {
        testBindings.prevent = true;
        mockedKeyDownEvent.preventDefault = jest.fn();
        new KeyboardNav([testBindings], mockedAttachEvent);
        
        registeredCallback(mockedKeyDownEvent);

        expect(mockedKeyDownEvent.preventDefault).toHaveBeenCalled();
    });

});