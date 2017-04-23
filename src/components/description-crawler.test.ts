import {} from 'jest';
import DescriptionCrawler from './description-crawler';
import MockElement from '../../test-resources/element.resource';
import { attachEvent } from '../dom';

const mockElement: MockElement = {
    innerHTML: 'part one. part two. part three.',
    appendChild: jest.fn()
};

describe('DescriptionCrawler', () => {

    beforeEach(() => {
        mockElement.appendChild.mockClear();
    });

    it('will infer the decription strings from HTML element content', () => {
        const crawler = new DescriptionCrawler(<HTMLElement>mockElement, attachEvent);
        
        // Array will be randomised, cannot do a strict equal
        expect(crawler.data).toHaveLength(3);
        expect(crawler.data).toContain('part one');
        expect(crawler.data).toContain('part two');
        expect(crawler.data).toContain('part three');
    });

});