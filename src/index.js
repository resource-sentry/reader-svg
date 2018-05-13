const Promise    = require('bluebird'),
      fs         = require('fs'),
      glob       = require('fast-glob'),
      path       = require('path'),
      BaseReader = require('@resource-sentry/utils/lib/base-reader'),
      Categories = require('@resource-sentry/utils/lib/categories');

const TransformBasic = require('./transform-basic');

class SvgReader extends BaseReader {
    constructor(config) {
        super();
        this.config = config;
        this.transforms = this.createTransformList(config.transform);
    }

    createTransformList(directives) {
        let transform;
        let result = [];
        let knownTransforms = {};

        if (directives !== undefined) {
            directives.forEach(directive => {
                transform = knownTransforms[directive];
                if (transform !== undefined) {
                    result.push(new transform());
                }
            });
        }

        // The main transform always the last
        // It gives opportunity for custom transforms to do their unique operations
        result.push(new TransformBasic());

        return result;
    }

    getEntry() {
        return this.config.entry;
    }

    scan() {
        let entry = path.resolve(process.cwd(), this.getEntry());

        return Promise
            .resolve()
            .then(() => {
                return glob('**/*.svg', {
                    cwd: entry
                });
            })
            .then(files => {
                return Promise.map(files, filePath => {
                    let content = fs.readFileSync(path.resolve(entry, filePath), 'utf8');
                    let key = filePath.replace(path.sep, '_').replace('.svg', '');

                    this.transforms.forEach(transform => {
                        content = transform.getResult(content);
                    });

                    this.addValue(Categories.GRAPHIC, key, content);
                });
            })
            .then(() => this.dispatch('dataDidChange'));
    }
}

module.exports = SvgReader;
