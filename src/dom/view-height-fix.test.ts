import {} from 'jest';
import ViewHeightFix from './view-height-fix';

interface MockWindow {
    navigator: {
        __defineGetter__: Function
    }
}

const SELECTOR: string = '.testElement';
const STARTING_HEIGHT: string = '40px';
const WINDOW_HEIGHT: number = 4000;

let element: HTMLElement;

beforeEach(() => {
    element = document.createElement('div');
    element.className = SELECTOR.replace('.', '');
    element.style.height = STARTING_HEIGHT;
    document.body.appendChild(element);

    Object.defineProperty(window, 'innerHeight', {
        writable: true,
        value: WINDOW_HEIGHT
    });
});

describe('ViewHeightFix', () => {

    it('will not act if running in non-mobile', () => {
        (<any>window).navigator.__defineGetter__('userAgent', () => 'Desktop');
        new ViewHeightFix([SELECTOR]);
        expect(element.style.height).toEqual(STARTING_HEIGHT);
    });

});