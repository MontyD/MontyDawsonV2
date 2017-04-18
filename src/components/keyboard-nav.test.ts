import {} from 'jest';
import KeyboardNav from './keyboard-nav';

const attachEvent = jest.fn();

describe('KeyboardNav', () => {

    it('will attach keydown to the window method', () => {

        new KeyboardNav([], attachEvent);
        expect(attachEvent).toHaveBeenCalledWith('keydown', window, expect.any(Function));

    });


});