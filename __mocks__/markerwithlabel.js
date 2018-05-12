
const markerwithlabel = function (map) {
    return function (markerOptions) {
        this.labelContent = markerOptions.labelContent;
        this.labelClass = markerOptions.labelClass;
        this.setOptions = function (options) {
            for (const opt in options) {
                if (options.hasOwnProperty(opt)) {
                    if (options[opt]) {
                        this[opt] = options[opt];
                    }
                }
            }
        }
    }
};

module.exports = markerwithlabel;