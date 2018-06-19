exports.defineTags = function (dictionary) {
    dictionary.defineTag('intdocs', {
        mustNotHaveValue: true,
        onTagged: function (doclet, tag) {
            doclet.ignore=true;
       }
    });
}; 