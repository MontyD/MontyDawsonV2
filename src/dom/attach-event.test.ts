import attachEvent from './attach-event';
describe('attach-event', () => {
    it('will call addEventListener if available on the element', () => {
        let mockElement = {
            addEventListener: jest.fn()
        };

        attachEvent('test', mockElement, () => null);

        expect(mockElement.addEventListener.mock.calls[0][0]).toBe('test');

    });

    it('will call attachEvent if available on the element, and addEventListener is not', () => {
        let mockElement = {
            attachEvent: jest.fn()
        };

        attachEvent('test', mockElement, () => null);

        expect(mockElement.attachEvent.mock.calls[0][0]).toBe('ontest');

        mockElement.addEventListener = () => null;

        mockElement.attachEvent.mockClear();

        attachEvent('test', mockElement, () => null);

        expect(mockElement.attachEvent.mock.calls.length).toBe(0);

    });

    it('will add the function as a key if no addEventListener or attachEvent', () => {
        let mockElement = {};

        attachEvent('test', mockElement, () => 'hello');

        expect(mockElement.test()).toBe('hello');
    });
});
