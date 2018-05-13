const Reader = require('../src/index');

describe('Reader', () => {

    let categories;

    beforeAll(() => {
        let reader = new Reader({entry: './test/data'});
        return reader
            .scan()
            .then(() => {
                categories = reader.getAllCategories();
            });
    });

    it('uses Graphic category', () => {
        expect(categories[4]).toBeDefined();
    });

    it('finds recursively assets', () => {
        expect(categories[4]).toHaveLength(3);
    });
});
