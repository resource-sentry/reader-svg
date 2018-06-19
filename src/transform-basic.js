class TransformBasic {
    constructor() {
        this.header = /<\?.*\?>/;
        this.formatting = /(\r?\n|\r)+\s*/g;
        this.comments = /<!.*-->/g;
        this.verboseTags = /<(title|desc)>.*<\/\1>/g;
        this.idContent = /\sid=.*?\s/g;
        this.responsiveWidth = /(<svg.*)\swidth=\S*/g;
        this.responsiveHeight = /(<svg.*)\sheight=\S*/g;
        this.namespaces = /\sxmlns:\S+["']/g;
    }

    getResult(content) {
        return content
            .replace(this.header, '')
            .replace(this.comments, '')
            .replace(this.verboseTags, '')
            .replace(this.idContent, match => match.toLowerCase())
            .replace(this.responsiveWidth, '')
            .replace(this.responsiveHeight, '')
            .replace(this.namespaces, '')
            .replace(this.formatting, '');
    }
}

module.exports = TransformBasic;
