const Reader = require('../src/index');

describe('Transform: Basic', () => {

    let svg;

    beforeAll(() => {
        let reader = new Reader({entry: './test/data'});
        return reader
            .scan()
            .then(() => {
                let categories = reader.getAllCategories();
                let graphics = categories[4];

                svg = graphics
                    .filter(({name}) => (name === 'simple-sketch-import'))
                    .map(({value}) => value)[0];
            });
    });

    it('removes verbose title field', () => {
        expect(svg).not.toContain('title');
    });

    it('removes verbose desc field', () => {
        expect(svg).not.toContain('desc');
    });

    it('removes comments', () => {
        expect(svg).not.toContain('<!--');
    });

    it('makes SVG responsive', () => {
        expect(svg).not.toContain(' width=');
        expect(svg).not.toContain(' height=');
    });

    it('removes XML declaration', () => {
        expect(svg).not.toContain('?xml');
    });

    it('changes identifiers to use lowercase characters', () => {
        expect(svg).toContain('id="page-1"');
    });

    it('removes extra namespaces', () => {
        expect(svg).not.toContain('xmlns:xlink');
    });

    it('removes new lines', () => {
        expect(svg).not.toContain('\n');
    });

});
