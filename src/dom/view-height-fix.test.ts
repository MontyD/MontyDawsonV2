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
const ADJUSTED_HEIGHT: string = '4020px';
const MOBILE_TYPES: Array<string> = ['iPhone', 'iPad', 'iPod', 'Android'];

let element: HTMLElement;

function defineUserAgent(agent: string): void {
    (<any>window).navigator.__defineGetter__('userAgent', () => agent);
}

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
        defineUserAgent('desktop');
        new ViewHeightFix([SELECTOR]);
        expect(element.style.height).toEqual(STARTING_HEIGHT);
    });

    it('will act if it running on mobile', () => {
        MOBILE_TYPES.forEach((type) => {
            defineUserAgent(type);
            new ViewHeightFix([SELECTOR]);
            expect(element.style.height).toEqual(ADJUSTED_HEIGHT);
            // reset each time to stop leaks
            defineUserAgent('desktop');
            element.style.height = STARTING_HEIGHT;
            expect(element.style.height).toEqual(STARTING_HEIGHT);
        });
    });

    it('will act on multiple selectors and all elements matching selector', () => {
        let classElements: Array<HTMLDivElement> = [];
        let idElements: Array<HTMLDivElement> = [];
        let selectorsToTest: Array<string> = [SELECTOR];
        const ELEMENTS_ID_BASE = 'testID';
        for(let i = 0; i < 5; i++) {
            let el = document.createElement('div');
            el.className = SELECTOR.replace('.', '');
            el.style.height = STARTING_HEIGHT;
            document.body.appendChild(el);
            classElements.push(el);
        }
        for(let i = 0; i < 5; i++) {
            let el = document.createElement('div');
            el.id = ELEMENTS_ID_BASE + i.toString();
            el.style.height = STARTING_HEIGHT;
            document.body.appendChild(el);
            selectorsToTest.push('#' + el.id);
            idElements.push(el);
        };

        defineUserAgent(MOBILE_TYPES[0]);
        new ViewHeightFix(selectorsToTest);

        classElements.forEach(el => expect(el.style.height).toEqual(ADJUSTED_HEIGHT));
        idElements.forEach(el => expect(el.style.height).toEqual(ADJUSTED_HEIGHT));

    });

});