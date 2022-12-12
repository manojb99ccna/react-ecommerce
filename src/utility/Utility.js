import _ from 'lodash';
import StringUtils from "./StringUtils";
 

const isNullObject = (object) => {


    if (typeof object === 'undefined' || object === null) {
        return true;

    }

    return false;
}

const isUndefined = (object) => {

    if (typeof object === 'undefined') {
        return true;
    }

    return false;
}

const isNotNullObject = (object) => {
    return !isNullObject(object);
}

const isEmptyArray = (array) => {
    if (isNotNullObject(array) && array.length === 0) {
        return true;
    }

    return false;
}

const isEmpty = (obj) => {
    return _.isEmpty(obj);
}

const isNotEmpty = (obj) => {
    return !_.isEmpty(obj);
}

const isNotNullOREmpty = (obj) => {
    return isNotEmpty(obj) && isNotNullObject(obj);
}

const isEqual = (obj1, obj2) => {
    return _.isEqual(obj1, obj2);
}

const isNotEqual = (obj1, obj2) => {
    return !isEqual(obj1, obj2);
}

const mval = (source, path, defaultValue) => {

    if (isNullObject(source)) {
        return defaultValue;
    }

    // Referance from: https://stackoverflow.com/a/6491621
    path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    path = path.replace(/^\./, '');           // strip a leading dot
    var a = path.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in source) {
            source = source[k];
            if (isNullObject(source)) {
                return defaultValue;
            }

        } else {
            return defaultValue;
        }
    }
    return source;
}

export const withHighlightString = (string, startIndex, endIndex) => {
    let withHighlight = {};

    if (StringUtils.isNotEmpty(string)) {
        let startStr = string.substring(0, startIndex);
        let endStr = string.substring(endIndex, withHighlight.length);
        let subString = string.substring(startIndex, endIndex);

        withHighlight.start = startStr;
        withHighlight.end = endStr;
        withHighlight.stylable = subString;
    }

    return withHighlight;
}

const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    const copy = s.toLowerCase();
    return copy.charAt(0).toUpperCase() + copy.slice(1)
}

const sortByProperty = (property) => {
    return function (a, b) {
        if (a[property] > b[property])
            return 1;
        else if (a[property] < b[property])
            return -1;

        return 0;
    }
}

const roundOffWithCommasInAmount = (inNumber) => {
    return formatNumber(inNumber);
}

const formatNumber = (inNumber) => {
    if (inNumber === null) {
        return '-';
    }

    return inNumber.toLocaleString('en', { maximumFractionDigits: 2 });
}

const mergeUniqueDataByKey = (originalData, updateData, key) => {
    return _.unionBy(originalData, updateData, key);
}

const isValidEmail = (email) => {
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email)
}

const getBase64Image = (file) => {
    return new Promise(resolve => {
        let baseURL = '';
        let reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            baseURL = reader.result;
            resolve(baseURL);
        };
    });
}

const formatPhoneNumber = (phone) => {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
}
 
            

const showWNL = (data, flag) => {

    if (flag) {
        if (!([1, 4, 5, 6, 7, 9].indexOf(data.TypeId) >= 0)) {
            return true
        }
    }

    return false
}

// ResourceLink: https://stackoverflow.com/questions/7833709/calculating-age-in-months-and-days
function getAge(fromdate, todate){
    if(todate) todate= new Date(todate);
    else todate= new Date();

    var age= [], fromdate= new Date(fromdate),
    y= [todate.getFullYear(), fromdate.getFullYear()],
    ydiff= y[0]-y[1],
    m= [todate.getMonth(), fromdate.getMonth()],
    mdiff= m[0]-m[1],
    d= [todate.getDate(), fromdate.getDate()],
    ddiff= d[0]-d[1];

    if(mdiff < 0 || (mdiff=== 0 && ddiff<0))--ydiff;
    if(mdiff<0) mdiff+= 12;
    if(ddiff<0){
        fromdate.setMonth(m[1]+1, 0);
        ddiff= fromdate.getDate()-d[1]+d[0];
        --mdiff;
    }
    if(ydiff> 0) age.push(ydiff+ ' year'+(ydiff> 1? 's ':' '));
    if(mdiff> 0) age.push(mdiff+ ' month'+(mdiff> 1? 's':''));
    if(ddiff> 0) age.push(ddiff+ ' day'+(ddiff> 1? 's':''));
    if(age.length>1) age.splice(age.length-1,0,' and ');    
    //console.log("aaggee", age)
   // return age.join('');
    return age[0];
}

const getExtension = (filename) => {
    const parts = filename.split(/\.(?=[^\.]+$)/);
    return parts[parts.length - 1];
}

const isValidFileFormat = (filename) => {
    const ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'tiff':
        case 'gif':
        case 'pdf':
        case 'txt':
        case 'doc':
        case 'docx':
        case 'xls':
        case 'xlsx':
        case 'ppt': 
        case 'pptx':    
        // etc
        return true;
    }
    return false;
}

export {
    isNullObject, isUndefined, isNotNullObject, isEmpty, isNotEmpty, isEqual, isNotEqual, isEmptyArray, mval, getRandomArbitrary,
    sortByProperty, capitalize, isNotNullOREmpty, mergeUniqueDataByKey, roundOffWithCommasInAmount, getBase64Image,
    formatPhoneNumber, isValidEmail,  showWNL,  getAge, isValidFileFormat
}
