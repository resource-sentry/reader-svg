const Categories = require('@resource-sentry/utils/lib/categories');

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
        expect(categories[Categories.GRAPHIC]).toBeDefined();
    });

    it('finds recursively assets', () => {
        expect(categories[Categories.GRAPHIC]).toHaveLength(5);
    });
});
