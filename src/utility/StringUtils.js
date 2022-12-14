//import { Buffer } from "buffer";

const StringUtils = {

    isEmpty: function (input) {
        if (typeof input === 'undefined' || input === null) {
            return true;
        }

        else if (typeof input === 'string' && input.trim().length === 0) {
            return true;
        }

        else if (typeof input === 'object' && Object.keys(input).length === 0) {
            return true;
        }

        return false;
    },

    isNotEmpty: function (input) {
        return !this.isEmpty(input);
    },

    getOrDefault: function (input, defaultValue) {

        if (this.isEmpty(input) || input === 'NA') {
            return defaultValue;
        }

        return input;
    },
    capitalize: function (s) {
        s=s.toLowerCase();
        return s.charAt(0).toUpperCase() + s.slice(1);
    },
    base64ToString: function (string) {
        //return Buffer.from(string, "base64").toString();
    },
    isAlphaNumeric: function (str) {
        return /\d/.test(str);
    },
    removeHtmlTags: function (str) {

        return (str.replace(/(<([^>]+)>)/ig, ''));
    }

}

export default StringUtils;