class TransformBasic {
    constructor() {
        // TODO Remove unused namespaces, for example xmlns:xlink

        this.header = /<\?.*\?>/;
        this.formatting = /(\r?\n|\r)+\s*/g;
        this.comments = /<!.*-->/g;
        this.verboseTags = /<(title|desc)>.*<\/\1>/g;
        this.idContent = /\sid=.*?\s/g;
        this.responsiveWidth = /(<svg.*)\swidth=\S*/g;
        this.responsiveHeight = /(<svg.*)\sheight=\S*/g;
        this.emptyDefitions = /<(defs)><\/\1>/g;
        this.hashValues = /#[a-zA-Z0-9\-_.:]+/g;
    }

    getResult(content) {
        return content
            .replace(this.header, '')
            .replace(this.comments, '')
            .replace(this.verboseTags, '')
            .replace(this.idContent, match => match.toLowerCase())
            .replace(this.hashValues, match => match.toLowerCase())
            .replace(this.responsiveWidth, '$1')
            .replace(this.responsiveHeight, '$1')
            .replace(this.emptyDefitions, '')
            .replace(this.formatting, '');
    }
}

module.exports = TransformBasic;
