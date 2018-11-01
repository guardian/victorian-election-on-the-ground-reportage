import config from '../config.json'

var str = config.path;
var target = str.lastIndexOf('/');
var path = str.substring(target + 1);

import templateHTML from "./src/templates/brunswick-1.html!text"

export async function render() {
    // this function just has to return a string of HTML
    // you can generate this using js, e.g. using Mustache.js
    return templateHTML;
}