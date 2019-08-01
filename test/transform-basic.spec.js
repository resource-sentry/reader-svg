const Categories = require('@resource-sentry/utils/lib/categories');

const Reader = require('../src/index');

describe('Transform: Basic', () => {

    let svg;
    let svgMdn;
    let svgMdnDefs;

    beforeAll(() => {
        let reader = new Reader({entry: './test/data'});
        return reader
            .scan()
            .then(() => {
                let categories = reader.getAllCategories();
                let graphics = categories[Categories.GRAPHIC];

                svg = graphics
                    .filter(({name}) => (name === 'simple-sketch-import'))
                    .map(({value}) => value)[0];

                svgMdn = graphics
                    .filter(({name}) => (name === 'mdn-gradient'))
                    .map(({value}) => value)[0];

                svgMdnDefs = graphics
                    .filter(({name}) => (name === 'mdn-defs'))
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

    it('makes SVG responsive with valid main svg tag', () => {
        expect(svgMdn).toContain('<svg viewBox="0 0 80 30" xmlns="http://www.w3.org/2000/svg">');
    });

    it('omits dimensions on rect element', () => {
        expect(svgMdn).toContain('<rect x="10" y="10"');
    });

    it('removes XML declaration', () => {
        expect(svg).not.toContain('?xml');
    });

    it('changes identifiers to use lowercase characters', () => {
        expect(svg).toContain('id="page-1"');
    });

    it('changes identifiers to use lowercase in definitions', () => {
        expect(svgMdn).toContain('id="gradient01"');
    });

    it('changes url references to use lowercase characters', () => {
        expect(svgMdn).toContain('fill="url(#gradient01)"');
    });

    it('removes new lines', () => {
        expect(svg).not.toContain('\n');
    });

    it('removes empty definitions', () => {
        expect(svg).not.toContain('defs');
    });

    it('omits non-empty definitions', () => {
        expect(svgMdn).toContain('defs');
    });

    it('preserves namespace', () => {
        expect(svgMdnDefs).toContain('xmlns:xlink="http://www.w3.org/1999/xlink"');
        expect(svgMdnDefs).toContain('xlink:href=');
    });

    it('converts references to shape definitions', () => {
        expect(svgMdnDefs).toContain('xlink:href="#mycircle"');
    });

    it('converts IRI to lowercase', () => {
        expect(svgMdnDefs).toContain('fill="url(\'#mygradient\')"');
    });

});
