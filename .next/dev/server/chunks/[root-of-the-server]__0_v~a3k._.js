module.exports = [
"[project]/node_modules/axios/lib/cancel/Cancel.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */ function Cancel(message) {
    this.message = message;
}
Cancel.prototype.toString = function toString() {
    return 'Cancel' + (this.message ? ': ' + this.message : '');
};
Cancel.prototype.__CANCEL__ = true;
module.exports = Cancel;
}),
"[project]/node_modules/axios/lib/cancel/CancelToken.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var Cancel = __turbopack_context__.r("[project]/node_modules/axios/lib/cancel/Cancel.js [app-route] (ecmascript)");
/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */ function CancelToken(executor) {
    if (typeof executor !== 'function') {
        throw new TypeError('executor must be a function.');
    }
    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
    });
    var token = this;
    executor(function cancel(message) {
        if (token.reason) {
            // Cancellation has already been requested
            return;
        }
        token.reason = new Cancel(message);
        resolvePromise(token.reason);
    });
}
/**
 * Throws a `Cancel` if cancellation has been requested.
 */ CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
        throw this.reason;
    }
};
/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */ CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
        cancel = c;
    });
    return {
        token: token,
        cancel: cancel
    };
};
module.exports = CancelToken;
}),
"[project]/node_modules/axios/lib/cancel/isCancel.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = function isCancel(value) {
    return !!(value && value.__CANCEL__);
};
}),
"[project]/node_modules/axios/lib/helpers/spread.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */ module.exports = function spread(callback) {
    return function wrap(arr) {
        return callback.apply(null, arr);
    };
};
}),
"[project]/node_modules/axios/lib/helpers/isAxiosError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */ module.exports = function isAxiosError(payload) {
    return typeof payload === 'object' && payload.isAxiosError === true;
};
}),
"[project]/node_modules/axios/lib/helpers/bind.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = function bind(fn, thisArg) {
    return function wrap() {
        var args = new Array(arguments.length);
        for(var i = 0; i < args.length; i++){
            args[i] = arguments[i];
        }
        return fn.apply(thisArg, args);
    };
};
}),
"[project]/node_modules/axios/lib/utils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var bind = __turbopack_context__.r("[project]/node_modules/axios/lib/helpers/bind.js [app-route] (ecmascript)");
// utils is a library of generic helper functions non-specific to axios
var toString = Object.prototype.toString;
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */ function isArray(val) {
    return toString.call(val) === '[object Array]';
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */ function isUndefined(val) {
    return typeof val === 'undefined';
}
/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */ function isBuffer(val) {
    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */ function isArrayBuffer(val) {
    return toString.call(val) === '[object ArrayBuffer]';
}
/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */ function isFormData(val) {
    return typeof FormData !== 'undefined' && val instanceof FormData;
}
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */ function isArrayBufferView(val) {
    var result;
    if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
    } else {
        result = val && val.buffer && val.buffer instanceof ArrayBuffer;
    }
    return result;
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */ function isString(val) {
    return typeof val === 'string';
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */ function isNumber(val) {
    return typeof val === 'number';
}
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */ function isObject(val) {
    return val !== null && typeof val === 'object';
}
/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */ function isPlainObject(val) {
    if (toString.call(val) !== '[object Object]') {
        return false;
    }
    var prototype = Object.getPrototypeOf(val);
    return prototype === null || prototype === Object.prototype;
}
/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */ function isDate(val) {
    return toString.call(val) === '[object Date]';
}
/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */ function isFile(val) {
    return toString.call(val) === '[object File]';
}
/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */ function isBlob(val) {
    return toString.call(val) === '[object Blob]';
}
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */ function isFunction(val) {
    return toString.call(val) === '[object Function]';
}
/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */ function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
}
/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */ function isURLSearchParams(val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */ function trim(str) {
    return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */ function isStandardBrowserEnv() {
    if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
        return false;
    }
    return ("TURBOPACK compile-time value", "undefined") !== 'undefined' && typeof document !== 'undefined';
}
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */ function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
        return;
    }
    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
        /*eslint no-param-reassign:0*/ obj = [
            obj
        ];
    }
    if (isArray(obj)) {
        // Iterate over array values
        for(var i = 0, l = obj.length; i < l; i++){
            fn.call(null, obj[i], i, obj);
        }
    } else {
        // Iterate over object keys
        for(var key in obj){
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                fn.call(null, obj[key], key, obj);
            }
        }
    }
}
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */ function merge() {
    var result = {};
    function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
            result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
            result[key] = merge({}, val);
        } else if (isArray(val)) {
            result[key] = val.slice();
        } else {
            result[key] = val;
        }
    }
    for(var i = 0, l = arguments.length; i < l; i++){
        forEach(arguments[i], assignValue);
    }
    return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */ function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === 'function') {
            a[key] = bind(val, thisArg);
        } else {
            a[key] = val;
        }
    });
    return a;
}
/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */ function stripBOM(content) {
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1);
    }
    return content;
}
module.exports = {
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isBuffer: isBuffer,
    isFormData: isFormData,
    isArrayBufferView: isArrayBufferView,
    isString: isString,
    isNumber: isNumber,
    isObject: isObject,
    isPlainObject: isPlainObject,
    isUndefined: isUndefined,
    isDate: isDate,
    isFile: isFile,
    isBlob: isBlob,
    isFunction: isFunction,
    isStream: isStream,
    isURLSearchParams: isURLSearchParams,
    isStandardBrowserEnv: isStandardBrowserEnv,
    forEach: forEach,
    merge: merge,
    extend: extend,
    trim: trim,
    stripBOM: stripBOM
};
}),
"[project]/node_modules/axios/lib/helpers/buildURL.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}
/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */ module.exports = function buildURL(url, params, paramsSerializer) {
    /*eslint no-param-reassign:0*/ if (!params) {
        return url;
    }
    var serializedParams;
    if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
    } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
    } else {
        var parts = [];
        utils.forEach(params, function serialize(val, key) {
            if (val === null || typeof val === 'undefined') {
                return;
            }
            if (utils.isArray(val)) {
                key = key + '[]';
            } else {
                val = [
                    val
                ];
            }
            utils.forEach(val, function parseValue(v) {
                if (utils.isDate(v)) {
                    v = v.toISOString();
                } else if (utils.isObject(v)) {
                    v = JSON.stringify(v);
                }
                parts.push(encode(key) + '=' + encode(v));
            });
        });
        serializedParams = parts.join('&');
    }
    if (serializedParams) {
        var hashmarkIndex = url.indexOf('#');
        if (hashmarkIndex !== -1) {
            url = url.slice(0, hashmarkIndex);
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return url;
};
}),
"[project]/node_modules/axios/lib/core/InterceptorManager.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
function InterceptorManager() {
    this.handlers = [];
}
/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */ InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
    this.handlers.push({
        fulfilled: fulfilled,
        rejected: rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
};
/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */ InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
        this.handlers[id] = null;
    }
};
/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */ InterceptorManager.prototype.forEach = function forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
            fn(h);
        }
    });
};
module.exports = InterceptorManager;
}),
"[project]/node_modules/axios/lib/helpers/normalizeHeaderName.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
module.exports = function normalizeHeaderName(headers, normalizedName) {
    utils.forEach(headers, function processHeader(value, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
            headers[normalizedName] = value;
            delete headers[name];
        }
    });
};
}),
"[project]/node_modules/axios/lib/core/enhanceError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */ module.exports = function enhanceError(error, config, code, request, response) {
    error.config = config;
    if (code) {
        error.code = code;
    }
    error.request = request;
    error.response = response;
    error.isAxiosError = true;
    error.toJSON = function toJSON() {
        return {
            // Standard
            message: this.message,
            name: this.name,
            // Microsoft
            description: this.description,
            number: this.number,
            // Mozilla
            fileName: this.fileName,
            lineNumber: this.lineNumber,
            columnNumber: this.columnNumber,
            stack: this.stack,
            // Axios
            config: this.config,
            code: this.code
        };
    };
    return error;
};
}),
"[project]/node_modules/axios/lib/core/createError.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var enhanceError = __turbopack_context__.r("[project]/node_modules/axios/lib/core/enhanceError.js [app-route] (ecmascript)");
/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */ module.exports = function createError(message, config, code, request, response) {
    var error = new Error(message);
    return enhanceError(error, config, code, request, response);
};
}),
"[project]/node_modules/axios/lib/core/settle.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var createError = __turbopack_context__.r("[project]/node_modules/axios/lib/core/createError.js [app-route] (ecmascript)");
/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */ module.exports = function settle(resolve, reject, response) {
    var validateStatus = response.config.validateStatus;
    if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
    } else {
        reject(createError('Request failed with status code ' + response.status, response.config, null, response.request, response));
    }
};
}),
"[project]/node_modules/axios/lib/helpers/isAbsoluteURL.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */ module.exports = function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};
}),
"[project]/node_modules/axios/lib/helpers/combineURLs.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */ module.exports = function combineURLs(baseURL, relativeURL) {
    return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};
}),
"[project]/node_modules/axios/lib/core/buildFullPath.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var isAbsoluteURL = __turbopack_context__.r("[project]/node_modules/axios/lib/helpers/isAbsoluteURL.js [app-route] (ecmascript)");
var combineURLs = __turbopack_context__.r("[project]/node_modules/axios/lib/helpers/combineURLs.js [app-route] (ecmascript)");
/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */ module.exports = function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
    }
    return requestedURL;
};
}),
"[project]/node_modules/axios/package.json.[json].cjs [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "name": "axios",
    "version": "0.21.4",
    "description": "Promise based HTTP client for the browser and node.js",
    "main": "index.js",
    "scripts": {
        "test": "grunt test",
        "start": "node ./sandbox/server.js",
        "build": "NODE_ENV=production grunt build",
        "preversion": "npm test",
        "version": "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json",
        "postversion": "git push && git push --tags",
        "examples": "node ./examples/server.js",
        "coveralls": "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
        "fix": "eslint --fix lib/**/*.js"
    },
    "repository": {
        "type": "git",
        "url": "https://github.com/axios/axios.git"
    },
    "keywords": [
        "xhr",
        "http",
        "ajax",
        "promise",
        "node"
    ],
    "author": "Matt Zabriskie",
    "license": "MIT",
    "bugs": {
        "url": "https://github.com/axios/axios/issues"
    },
    "homepage": "https://axios-http.com",
    "devDependencies": {
        "coveralls": "^3.0.0",
        "es6-promise": "^4.2.4",
        "grunt": "^1.3.0",
        "grunt-banner": "^0.6.0",
        "grunt-cli": "^1.2.0",
        "grunt-contrib-clean": "^1.1.0",
        "grunt-contrib-watch": "^1.0.0",
        "grunt-eslint": "^23.0.0",
        "grunt-karma": "^4.0.0",
        "grunt-mocha-test": "^0.13.3",
        "grunt-ts": "^6.0.0-beta.19",
        "grunt-webpack": "^4.0.2",
        "istanbul-instrumenter-loader": "^1.0.0",
        "jasmine-core": "^2.4.1",
        "karma": "^6.3.2",
        "karma-chrome-launcher": "^3.1.0",
        "karma-firefox-launcher": "^2.1.0",
        "karma-jasmine": "^1.1.1",
        "karma-jasmine-ajax": "^0.1.13",
        "karma-safari-launcher": "^1.0.0",
        "karma-sauce-launcher": "^4.3.6",
        "karma-sinon": "^1.0.5",
        "karma-sourcemap-loader": "^0.3.8",
        "karma-webpack": "^4.0.2",
        "load-grunt-tasks": "^3.5.2",
        "minimist": "^1.2.0",
        "mocha": "^8.2.1",
        "sinon": "^4.5.0",
        "terser-webpack-plugin": "^4.2.3",
        "typescript": "^4.0.5",
        "url-search-params": "^0.10.0",
        "webpack": "^4.44.2",
        "webpack-dev-server": "^3.11.0"
    },
    "browser": {
        "./lib/adapters/http.js": "./lib/adapters/xhr.js"
    },
    "jsdelivr": "dist/axios.min.js",
    "unpkg": "dist/axios.min.js",
    "typings": "./index.d.ts",
    "dependencies": {
        "follow-redirects": "^1.14.0"
    },
    "bundlesize": [
        {
            "path": "./dist/axios.min.js",
            "threshold": "5kB"
        }
    ]
};
}),
"[project]/node_modules/axios/lib/adapters/http.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
var settle = __turbopack_context__.r("[project]/node_modules/axios/lib/core/settle.js [app-route] (ecmascript)");
var buildFullPath = __turbopack_context__.r("[project]/node_modules/axios/lib/core/buildFullPath.js [app-route] (ecmascript)");
var buildURL = __turbopack_context__.r("[project]/node_modules/axios/lib/helpers/buildURL.js [app-route] (ecmascript)");
var http = __turbopack_context__.r("[externals]/http [external] (http, cjs)");
var https = __turbopack_context__.r("[externals]/https [external] (https, cjs)");
var httpFollow = __turbopack_context__.r("[project]/node_modules/follow-redirects/index.js [app-route] (ecmascript)").http;
var httpsFollow = __turbopack_context__.r("[project]/node_modules/follow-redirects/index.js [app-route] (ecmascript)").https;
var url = __turbopack_context__.r("[externals]/url [external] (url, cjs)");
var zlib = __turbopack_context__.r("[externals]/zlib [external] (zlib, cjs)");
var pkg = __turbopack_context__.r("[project]/node_modules/axios/package.json.[json].cjs [app-route] (ecmascript)");
var createError = __turbopack_context__.r("[project]/node_modules/axios/lib/core/createError.js [app-route] (ecmascript)");
var enhanceError = __turbopack_context__.r("[project]/node_modules/axios/lib/core/enhanceError.js [app-route] (ecmascript)");
var isHttps = /https:?/;
/**
 *
 * @param {http.ClientRequestArgs} options
 * @param {AxiosProxyConfig} proxy
 * @param {string} location
 */ function setProxy(options, proxy, location) {
    options.hostname = proxy.host;
    options.host = proxy.host;
    options.port = proxy.port;
    options.path = location;
    // Basic proxy authorization
    if (proxy.auth) {
        var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
        options.headers['Proxy-Authorization'] = 'Basic ' + base64;
    }
    // If a proxy is used, any redirects must also pass through the proxy
    options.beforeRedirect = function beforeRedirect(redirection) {
        redirection.headers.host = redirection.host;
        setProxy(redirection, proxy, redirection.href);
    };
}
/*eslint consistent-return:0*/ module.exports = function httpAdapter(config) {
    return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
        var resolve = function resolve(value) {
            resolvePromise(value);
        };
        var reject = function reject(value) {
            rejectPromise(value);
        };
        var data = config.data;
        var headers = config.headers;
        // Set User-Agent (required by some servers)
        // See https://github.com/axios/axios/issues/69
        if ('User-Agent' in headers || 'user-agent' in headers) {
            // User-Agent is specified; handle case where no UA header is desired
            if (!headers['User-Agent'] && !headers['user-agent']) {
                delete headers['User-Agent'];
                delete headers['user-agent'];
            }
        // Otherwise, use specified value
        } else {
            // Only set header if it hasn't been set in config
            headers['User-Agent'] = 'axios/' + pkg.version;
        }
        if (data && !utils.isStream(data)) {
            if (Buffer.isBuffer(data)) {
            // Nothing to do...
            } else if (utils.isArrayBuffer(data)) {
                data = Buffer.from(new Uint8Array(data));
            } else if (utils.isString(data)) {
                data = Buffer.from(data, 'utf-8');
            } else {
                return reject(createError('Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream', config));
            }
            // Add Content-Length header if data exists
            headers['Content-Length'] = data.length;
        }
        // HTTP basic authentication
        var auth = undefined;
        if (config.auth) {
            var username = config.auth.username || '';
            var password = config.auth.password || '';
            auth = username + ':' + password;
        }
        // Parse url
        var fullPath = buildFullPath(config.baseURL, config.url);
        var parsed = url.parse(fullPath);
        var protocol = parsed.protocol || 'http:';
        if (!auth && parsed.auth) {
            var urlAuth = parsed.auth.split(':');
            var urlUsername = urlAuth[0] || '';
            var urlPassword = urlAuth[1] || '';
            auth = urlUsername + ':' + urlPassword;
        }
        if (auth) {
            delete headers.Authorization;
        }
        var isHttpsRequest = isHttps.test(protocol);
        var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
        var options = {
            path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
            method: config.method.toUpperCase(),
            headers: headers,
            agent: agent,
            agents: {
                http: config.httpAgent,
                https: config.httpsAgent
            },
            auth: auth
        };
        if (config.socketPath) {
            options.socketPath = config.socketPath;
        } else {
            options.hostname = parsed.hostname;
            options.port = parsed.port;
        }
        var proxy = config.proxy;
        if (!proxy && proxy !== false) {
            var proxyEnv = protocol.slice(0, -1) + '_proxy';
            var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
            if (proxyUrl) {
                var parsedProxyUrl = url.parse(proxyUrl);
                var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
                var shouldProxy = true;
                if (noProxyEnv) {
                    var noProxy = noProxyEnv.split(',').map(function trim(s) {
                        return s.trim();
                    });
                    shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
                        if (!proxyElement) {
                            return false;
                        }
                        if (proxyElement === '*') {
                            return true;
                        }
                        if (proxyElement[0] === '.' && parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement) {
                            return true;
                        }
                        return parsed.hostname === proxyElement;
                    });
                }
                if (shouldProxy) {
                    proxy = {
                        host: parsedProxyUrl.hostname,
                        port: parsedProxyUrl.port,
                        protocol: parsedProxyUrl.protocol
                    };
                    if (parsedProxyUrl.auth) {
                        var proxyUrlAuth = parsedProxyUrl.auth.split(':');
                        proxy.auth = {
                            username: proxyUrlAuth[0],
                            password: proxyUrlAuth[1]
                        };
                    }
                }
            }
        }
        if (proxy) {
            options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
            setProxy(options, proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
        }
        var transport;
        var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
        if (config.transport) {
            transport = config.transport;
        } else if (config.maxRedirects === 0) {
            transport = isHttpsProxy ? https : http;
        } else {
            if (config.maxRedirects) {
                options.maxRedirects = config.maxRedirects;
            }
            transport = isHttpsProxy ? httpsFollow : httpFollow;
        }
        if (config.maxBodyLength > -1) {
            options.maxBodyLength = config.maxBodyLength;
        }
        // Create the request
        var req = transport.request(options, function handleResponse(res) {
            if (req.aborted) return;
            // uncompress the response body transparently if required
            var stream = res;
            // return the last request in case of redirects
            var lastRequest = res.req || req;
            // if no content, is HEAD request or decompress disabled we should not decompress
            if (res.statusCode !== 204 && lastRequest.method !== 'HEAD' && config.decompress !== false) {
                switch(res.headers['content-encoding']){
                    /*eslint default-case:0*/ case 'gzip':
                    case 'compress':
                    case 'deflate':
                        // add the unzipper to the body stream processing pipeline
                        stream = stream.pipe(zlib.createUnzip());
                        // remove the content-encoding in order to not confuse downstream operations
                        delete res.headers['content-encoding'];
                        break;
                }
            }
            var response = {
                status: res.statusCode,
                statusText: res.statusMessage,
                headers: res.headers,
                config: config,
                request: lastRequest
            };
            if (config.responseType === 'stream') {
                response.data = stream;
                settle(resolve, reject, response);
            } else {
                var responseBuffer = [];
                var totalResponseBytes = 0;
                stream.on('data', function handleStreamData(chunk) {
                    responseBuffer.push(chunk);
                    totalResponseBytes += chunk.length;
                    // make sure the content length is not over the maxContentLength if specified
                    if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
                        stream.destroy();
                        reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded', config, null, lastRequest));
                    }
                });
                stream.on('error', function handleStreamError(err) {
                    if (req.aborted) return;
                    reject(enhanceError(err, config, null, lastRequest));
                });
                stream.on('end', function handleStreamEnd() {
                    var responseData = Buffer.concat(responseBuffer);
                    if (config.responseType !== 'arraybuffer') {
                        responseData = responseData.toString(config.responseEncoding);
                        if (!config.responseEncoding || config.responseEncoding === 'utf8') {
                            responseData = utils.stripBOM(responseData);
                        }
                    }
                    response.data = responseData;
                    settle(resolve, reject, response);
                });
            }
        });
        // Handle errors
        req.on('error', function handleRequestError(err) {
            if (req.aborted && err.code !== 'ERR_FR_TOO_MANY_REDIRECTS') return;
            reject(enhanceError(err, config, null, req));
        });
        // Handle request timeout
        if (config.timeout) {
            // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
            var timeout = parseInt(config.timeout, 10);
            if (isNaN(timeout)) {
                reject(createError('error trying to parse `config.timeout` to int', config, 'ERR_PARSE_TIMEOUT', req));
                return;
            }
            // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
            // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
            // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
            // And then these socket which be hang up will devoring CPU little by little.
            // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
            req.setTimeout(timeout, function handleRequestTimeout() {
                req.abort();
                reject(createError('timeout of ' + timeout + 'ms exceeded', config, config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED', req));
            });
        }
        if (config.cancelToken) {
            // Handle cancellation
            config.cancelToken.promise.then(function onCanceled(cancel) {
                if (req.aborted) return;
                req.abort();
                reject(cancel);
            });
        }
        // Send the request
        if (utils.isStream(data)) {
            data.on('error', function handleStreamError(err) {
                reject(enhanceError(err, config, null, req));
            }).pipe(req);
        } else {
            req.end(data);
        }
    });
};
}),
"[project]/node_modules/axios/lib/helpers/cookies.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
function standardBrowserEnv() {
    return {
        write: function write(name, value, expires, path, domain, secure) {
            var cookie = [];
            cookie.push(name + '=' + encodeURIComponent(value));
            if (utils.isNumber(expires)) {
                cookie.push('expires=' + new Date(expires).toGMTString());
            }
            if (utils.isString(path)) {
                cookie.push('path=' + path);
            }
            if (utils.isString(domain)) {
                cookie.push('domain=' + domain);
            }
            if (secure === true) {
                cookie.push('secure');
            }
            document.cookie = cookie.join('; ');
        },
        read: function read(name) {
            var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
            return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
            this.write(name, '', Date.now() - 86400000);
        }
    };
}() : // Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
    return {
        write: function write() {},
        read: function read() {
            return null;
        },
        remove: function remove() {}
    };
}();
}),
"[project]/node_modules/axios/lib/helpers/parseHeaders.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
    'age',
    'authorization',
    'content-length',
    'content-type',
    'etag',
    'expires',
    'from',
    'host',
    'if-modified-since',
    'if-unmodified-since',
    'last-modified',
    'location',
    'max-forwards',
    'proxy-authorization',
    'referer',
    'retry-after',
    'user-agent'
];
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */ module.exports = function parseHeaders(headers) {
    var parsed = {};
    var key;
    var val;
    var i;
    if (!headers) {
        return parsed;
    }
    utils.forEach(headers.split('\n'), function parser(line) {
        i = line.indexOf(':');
        key = utils.trim(line.substr(0, i)).toLowerCase();
        val = utils.trim(line.substr(i + 1));
        if (key) {
            if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
                return;
            }
            if (key === 'set-cookie') {
                parsed[key] = (parsed[key] ? parsed[key] : []).concat([
                    val
                ]);
            } else {
                parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
            }
        }
    });
    return parsed;
};
}),
"[project]/node_modules/axios/lib/helpers/isURLSameOrigin.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;
    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */ function resolveURL(url) {
        var href = url;
        if (msie) {
            // IE needs attribute set twice to normalize properties
            urlParsingNode.setAttribute('href', href);
            href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute('href', href);
        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
        };
    }
    originURL = resolveURL(window.location.href);
    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */ return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
}() : // Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
        return true;
    };
}();
}),
"[project]/node_modules/axios/lib/adapters/xhr.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
var settle = __turbopack_context__.r("[project]/node_modules/axios/lib/core/settle.js [app-route] (ecmascript)");
var cookies = __turbopack_context__.r("[project]/node_modules/axios/lib/helpers/cookies.js [app-route] (ecmascript)");
var buildURL = __turbopack_context__.r("[project]/node_modules/axios/lib/helpers/buildURL.js [app-route] (ecmascript)");
var buildFullPath = __turbopack_context__.r("[project]/node_modules/axios/lib/core/buildFullPath.js [app-route] (ecmascript)");
var parseHeaders = __turbopack_context__.r("[project]/node_modules/axios/lib/helpers/parseHeaders.js [app-route] (ecmascript)");
var isURLSameOrigin = __turbopack_context__.r("[project]/node_modules/axios/lib/helpers/isURLSameOrigin.js [app-route] (ecmascript)");
var createError = __turbopack_context__.r("[project]/node_modules/axios/lib/core/createError.js [app-route] (ecmascript)");
module.exports = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        if (utils.isFormData(requestData)) {
            delete requestHeaders['Content-Type']; // Let the browser set it
        }
        var request = new XMLHttpRequest();
        // HTTP basic authentication
        if (config.auth) {
            var username = config.auth.username || '';
            var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
            requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        // Set the request timeout in MS
        request.timeout = config.timeout;
        function onloadend() {
            if (!request) {
                return;
            }
            // Prepare the response
            var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
            var responseData = !responseType || responseType === 'text' || responseType === 'json' ? request.responseText : request.response;
            var response = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config: config,
                request: request
            };
            settle(resolve, reject, response);
            // Clean up request
            request = null;
        }
        if ('onloadend' in request) {
            // Use onloadend if available
            request.onloadend = onloadend;
        } else {
            // Listen for ready state to emulate onloadend
            request.onreadystatechange = function handleLoad() {
                if (!request || request.readyState !== 4) {
                    return;
                }
                // The request errored out and we didn't get a response, this will be
                // handled by onerror instead
                // With one exception: request that using file: protocol, most browsers
                // will return status as 0 even though it's a successful request
                if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
                    return;
                }
                // readystate handler is calling before onerror or ontimeout handlers,
                // so we should call onloadend on the next 'tick'
                setTimeout(onloadend);
            };
        }
        // Handle browser request cancellation (as opposed to a manual cancellation)
        request.onabort = function handleAbort() {
            if (!request) {
                return;
            }
            reject(createError('Request aborted', config, 'ECONNABORTED', request));
            // Clean up request
            request = null;
        };
        // Handle low level network errors
        request.onerror = function handleError() {
            // Real errors are hidden from us by the browser
            // onerror should only fire if it's a network error
            reject(createError('Network Error', config, null, request));
            // Clean up request
            request = null;
        };
        // Handle timeout
        request.ontimeout = function handleTimeout() {
            var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
            if (config.timeoutErrorMessage) {
                timeoutErrorMessage = config.timeoutErrorMessage;
            }
            reject(createError(timeoutErrorMessage, config, config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED', request));
            // Clean up request
            request = null;
        };
        // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.
        if (utils.isStandardBrowserEnv()) {
            // Add xsrf header
            var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;
            if (xsrfValue) {
                requestHeaders[config.xsrfHeaderName] = xsrfValue;
            }
        }
        // Add headers to the request
        if ('setRequestHeader' in request) {
            utils.forEach(requestHeaders, function setRequestHeader(val, key) {
                if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
                    // Remove Content-Type if data is undefined
                    delete requestHeaders[key];
                } else {
                    // Otherwise add header to the request
                    request.setRequestHeader(key, val);
                }
            });
        }
        // Add withCredentials to request if needed
        if (!utils.isUndefined(config.withCredentials)) {
            request.withCredentials = !!config.withCredentials;
        }
        // Add responseType to request if needed
        if (responseType && responseType !== 'json') {
            request.responseType = config.responseType;
        }
        // Handle progress if needed
        if (typeof config.onDownloadProgress === 'function') {
            request.addEventListener('progress', config.onDownloadProgress);
        }
        // Not all browsers support upload events
        if (typeof config.onUploadProgress === 'function' && request.upload) {
            request.upload.addEventListener('progress', config.onUploadProgress);
        }
        if (config.cancelToken) {
            // Handle cancellation
            config.cancelToken.promise.then(function onCanceled(cancel) {
                if (!request) {
                    return;
                }
                request.abort();
                reject(cancel);
                // Clean up request
                request = null;
            });
        }
        if (!requestData) {
            requestData = null;
        }
        // Send the request
        request.send(requestData);
    });
};
}),
"[project]/node_modules/axios/lib/defaults.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
var normalizeHeaderName = __turbopack_context__.r("[project]/node_modules/axios/lib/helpers/normalizeHeaderName.js [app-route] (ecmascript)");
var enhanceError = __turbopack_context__.r("[project]/node_modules/axios/lib/core/enhanceError.js [app-route] (ecmascript)");
var DEFAULT_CONTENT_TYPE = {
    'Content-Type': 'application/x-www-form-urlencoded'
};
function setContentTypeIfUnset(headers, value) {
    if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
        headers['Content-Type'] = value;
    }
}
function getDefaultAdapter() {
    var adapter;
    if (typeof XMLHttpRequest !== 'undefined') {
        // For browsers use XHR adapter
        adapter = __turbopack_context__.r("[project]/node_modules/axios/lib/adapters/xhr.js [app-route] (ecmascript)");
    } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
        // For node use HTTP adapter
        adapter = __turbopack_context__.r("[project]/node_modules/axios/lib/adapters/http.js [app-route] (ecmascript)");
    }
    return adapter;
}
function stringifySafely(rawValue, parser, encoder) {
    if (utils.isString(rawValue)) {
        try {
            (parser || JSON.parse)(rawValue);
            return utils.trim(rawValue);
        } catch (e) {
            if (e.name !== 'SyntaxError') {
                throw e;
            }
        }
    }
    return (encoder || JSON.stringify)(rawValue);
}
var defaults = {
    transitional: {
        silentJSONParsing: true,
        forcedJSONParsing: true,
        clarifyTimeoutError: false
    },
    adapter: getDefaultAdapter(),
    transformRequest: [
        function transformRequest(data, headers) {
            normalizeHeaderName(headers, 'Accept');
            normalizeHeaderName(headers, 'Content-Type');
            if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
                return data;
            }
            if (utils.isArrayBufferView(data)) {
                return data.buffer;
            }
            if (utils.isURLSearchParams(data)) {
                setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
                return data.toString();
            }
            if (utils.isObject(data) || headers && headers['Content-Type'] === 'application/json') {
                setContentTypeIfUnset(headers, 'application/json');
                return stringifySafely(data);
            }
            return data;
        }
    ],
    transformResponse: [
        function transformResponse(data) {
            var transitional = this.transitional;
            var silentJSONParsing = transitional && transitional.silentJSONParsing;
            var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
            var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';
            if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
                try {
                    return JSON.parse(data);
                } catch (e) {
                    if (strictJSONParsing) {
                        if (e.name === 'SyntaxError') {
                            throw enhanceError(e, this, 'E_JSON_PARSE');
                        }
                        throw e;
                    }
                }
            }
            return data;
        }
    ],
    /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */ timeout: 0,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: -1,
    maxBodyLength: -1,
    validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
    }
};
defaults.headers = {
    common: {
        'Accept': 'application/json, text/plain, */*'
    }
};
utils.forEach([
    'delete',
    'get',
    'head'
], function forEachMethodNoData(method) {
    defaults.headers[method] = {};
});
utils.forEach([
    'post',
    'put',
    'patch'
], function forEachMethodWithData(method) {
    defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
module.exports = defaults;
}),
"[project]/node_modules/axios/lib/core/transformData.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
var defaults = __turbopack_context__.r("[project]/node_modules/axios/lib/defaults.js [app-route] (ecmascript)");
/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */ module.exports = function transformData(data, headers, fns) {
    var context = this || defaults;
    /*eslint no-param-reassign:0*/ utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
    });
    return data;
};
}),
"[project]/node_modules/axios/lib/core/dispatchRequest.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
var transformData = __turbopack_context__.r("[project]/node_modules/axios/lib/core/transformData.js [app-route] (ecmascript)");
var isCancel = __turbopack_context__.r("[project]/node_modules/axios/lib/cancel/isCancel.js [app-route] (ecmascript)");
var defaults = __turbopack_context__.r("[project]/node_modules/axios/lib/defaults.js [app-route] (ecmascript)");
/**
 * Throws a `Cancel` if cancellation has been requested.
 */ function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
    }
}
/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */ module.exports = function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    // Ensure headers exist
    config.headers = config.headers || {};
    // Transform request data
    config.data = transformData.call(config, config.data, config.headers, config.transformRequest);
    // Flatten headers
    config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
    utils.forEach([
        'delete',
        'get',
        'head',
        'post',
        'put',
        'patch',
        'common'
    ], function cleanHeaderConfig(method) {
        delete config.headers[method];
    });
    var adapter = config.adapter || defaults.adapter;
    return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        // Transform response data
        response.data = transformData.call(config, response.data, response.headers, config.transformResponse);
        return response;
    }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
            throwIfCancellationRequested(config);
            // Transform response data
            if (reason && reason.response) {
                reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
            }
        }
        return Promise.reject(reason);
    });
};
}),
"[project]/node_modules/axios/lib/core/mergeConfig.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */ module.exports = function mergeConfig(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {};
    var config = {};
    var valueFromConfig2Keys = [
        'url',
        'method',
        'data'
    ];
    var mergeDeepPropertiesKeys = [
        'headers',
        'auth',
        'proxy',
        'params'
    ];
    var defaultToConfig2Keys = [
        'baseURL',
        'transformRequest',
        'transformResponse',
        'paramsSerializer',
        'timeout',
        'timeoutMessage',
        'withCredentials',
        'adapter',
        'responseType',
        'xsrfCookieName',
        'xsrfHeaderName',
        'onUploadProgress',
        'onDownloadProgress',
        'decompress',
        'maxContentLength',
        'maxBodyLength',
        'maxRedirects',
        'transport',
        'httpAgent',
        'httpsAgent',
        'cancelToken',
        'socketPath',
        'responseEncoding'
    ];
    var directMergeKeys = [
        'validateStatus'
    ];
    function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
            return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
            return utils.merge({}, source);
        } else if (utils.isArray(source)) {
            return source.slice();
        }
        return source;
    }
    function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
            config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
            config[prop] = getMergedValue(undefined, config1[prop]);
        }
    }
    utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
            config[prop] = getMergedValue(undefined, config2[prop]);
        }
    });
    utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);
    utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
            config[prop] = getMergedValue(undefined, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
            config[prop] = getMergedValue(undefined, config1[prop]);
        }
    });
    utils.forEach(directMergeKeys, function merge(prop) {
        if (prop in config2) {
            config[prop] = getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
            config[prop] = getMergedValue(undefined, config1[prop]);
        }
    });
    var axiosKeys = valueFromConfig2Keys.concat(mergeDeepPropertiesKeys).concat(defaultToConfig2Keys).concat(directMergeKeys);
    var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys(key) {
        return axiosKeys.indexOf(key) === -1;
    });
    utils.forEach(otherKeys, mergeDeepProperties);
    return config;
};
}),
"[project]/node_modules/axios/lib/helpers/validator.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var pkg = __turbopack_context__.r("[project]/node_modules/axios/package.json.[json].cjs [app-route] (ecmascript)");
var validators = {};
// eslint-disable-next-line func-names
[
    'object',
    'boolean',
    'number',
    'function',
    'string',
    'symbol'
].forEach(function(type, i) {
    validators[type] = function validator(thing) {
        return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
    };
});
var deprecatedWarnings = {};
var currentVerArr = pkg.version.split('.');
/**
 * Compare package versions
 * @param {string} version
 * @param {string?} thanVersion
 * @returns {boolean}
 */ function isOlderVersion(version, thanVersion) {
    var pkgVersionArr = thanVersion ? thanVersion.split('.') : currentVerArr;
    var destVer = version.split('.');
    for(var i = 0; i < 3; i++){
        if (pkgVersionArr[i] > destVer[i]) {
            return true;
        } else if (pkgVersionArr[i] < destVer[i]) {
            return false;
        }
    }
    return false;
}
/**
 * Transitional option validator
 * @param {function|boolean?} validator
 * @param {string?} version
 * @param {string} message
 * @returns {function}
 */ validators.transitional = function transitional(validator, version, message) {
    var isDeprecated = version && isOlderVersion(version);
    function formatMessage(opt, desc) {
        return '[Axios v' + pkg.version + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
    }
    // eslint-disable-next-line func-names
    return function(value, opt, opts) {
        if (validator === false) {
            throw new Error(formatMessage(opt, ' has been removed in ' + version));
        }
        if (isDeprecated && !deprecatedWarnings[opt]) {
            deprecatedWarnings[opt] = true;
            // eslint-disable-next-line no-console
            console.warn(formatMessage(opt, ' has been deprecated since v' + version + ' and will be removed in the near future'));
        }
        return validator ? validator(value, opt, opts) : true;
    };
};
/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */ function assertOptions(options, schema, allowUnknown) {
    if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
    }
    var keys = Object.keys(options);
    var i = keys.length;
    while(i-- > 0){
        var opt = keys[i];
        var validator = schema[opt];
        if (validator) {
            var value = options[opt];
            var result = value === undefined || validator(value, opt, options);
            if (result !== true) {
                throw new TypeError('option ' + opt + ' must be ' + result);
            }
            continue;
        }
        if (allowUnknown !== true) {
            throw Error('Unknown option ' + opt);
        }
    }
}
module.exports = {
    isOlderVersion: isOlderVersion,
    assertOptions: assertOptions,
    validators: validators
};
}),
"[project]/node_modules/axios/lib/core/Axios.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
var buildURL = __turbopack_context__.r("[project]/node_modules/axios/lib/helpers/buildURL.js [app-route] (ecmascript)");
var InterceptorManager = __turbopack_context__.r("[project]/node_modules/axios/lib/core/InterceptorManager.js [app-route] (ecmascript)");
var dispatchRequest = __turbopack_context__.r("[project]/node_modules/axios/lib/core/dispatchRequest.js [app-route] (ecmascript)");
var mergeConfig = __turbopack_context__.r("[project]/node_modules/axios/lib/core/mergeConfig.js [app-route] (ecmascript)");
var validator = __turbopack_context__.r("[project]/node_modules/axios/lib/helpers/validator.js [app-route] (ecmascript)");
var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */ function Axios(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
    };
}
/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */ Axios.prototype.request = function request(config) {
    /*eslint no-param-reassign:0*/ // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof config === 'string') {
        config = arguments[1] || {};
        config.url = arguments[0];
    } else {
        config = config || {};
    }
    config = mergeConfig(this.defaults, config);
    // Set config.method
    if (config.method) {
        config.method = config.method.toLowerCase();
    } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
    } else {
        config.method = 'get';
    }
    var transitional = config.transitional;
    if (transitional !== undefined) {
        validator.assertOptions(transitional, {
            silentJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
            forcedJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
            clarifyTimeoutError: validators.transitional(validators.boolean, '1.0.0')
        }, false);
    }
    // filter out skipped interceptors
    var requestInterceptorChain = [];
    var synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
            return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    var responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    var promise;
    if (!synchronousRequestInterceptors) {
        var chain = [
            dispatchRequest,
            undefined
        ];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);
        while(chain.length){
            promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
    }
    var newConfig = config;
    while(requestInterceptorChain.length){
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
            newConfig = onFulfilled(newConfig);
        } catch (error) {
            onRejected(error);
            break;
        }
    }
    try {
        promise = dispatchRequest(newConfig);
    } catch (error) {
        return Promise.reject(error);
    }
    while(responseInterceptorChain.length){
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
    }
    return promise;
};
Axios.prototype.getUri = function getUri(config) {
    config = mergeConfig(this.defaults, config);
    return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};
// Provide aliases for supported request methods
utils.forEach([
    'delete',
    'get',
    'head',
    'options'
], function forEachMethodNoData(method) {
    /*eslint func-names:0*/ Axios.prototype[method] = function(url, config) {
        return this.request(mergeConfig(config || {}, {
            method: method,
            url: url,
            data: (config || {}).data
        }));
    };
});
utils.forEach([
    'post',
    'put',
    'patch'
], function forEachMethodWithData(method) {
    /*eslint func-names:0*/ Axios.prototype[method] = function(url, data, config) {
        return this.request(mergeConfig(config || {}, {
            method: method,
            url: url,
            data: data
        }));
    };
});
module.exports = Axios;
}),
"[project]/node_modules/axios/lib/axios.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var utils = __turbopack_context__.r("[project]/node_modules/axios/lib/utils.js [app-route] (ecmascript)");
var bind = __turbopack_context__.r("[project]/node_modules/axios/lib/helpers/bind.js [app-route] (ecmascript)");
var Axios = __turbopack_context__.r("[project]/node_modules/axios/lib/core/Axios.js [app-route] (ecmascript)");
var mergeConfig = __turbopack_context__.r("[project]/node_modules/axios/lib/core/mergeConfig.js [app-route] (ecmascript)");
var defaults = __turbopack_context__.r("[project]/node_modules/axios/lib/defaults.js [app-route] (ecmascript)");
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */ function createInstance(defaultConfig) {
    var context = new Axios(defaultConfig);
    var instance = bind(Axios.prototype.request, context);
    // Copy axios.prototype to instance
    utils.extend(instance, Axios.prototype, context);
    // Copy context to instance
    utils.extend(instance, context);
    return instance;
}
// Create the default instance to be exported
var axios = createInstance(defaults);
// Expose Axios class to allow class inheritance
axios.Axios = Axios;
// Factory for creating new instances
axios.create = function create(instanceConfig) {
    return createInstance(mergeConfig(axios.defaults, instanceConfig));
};
// Expose Cancel & CancelToken
axios.Cancel = __turbopack_context__.r("[project]/node_modules/axios/lib/cancel/Cancel.js [app-route] (ecmascript)");
axios.CancelToken = __turbopack_context__.r("[project]/node_modules/axios/lib/cancel/CancelToken.js [app-route] (ecmascript)");
axios.isCancel = __turbopack_context__.r("[project]/node_modules/axios/lib/cancel/isCancel.js [app-route] (ecmascript)");
// Expose all/spread
axios.all = function all(promises) {
    return Promise.all(promises);
};
axios.spread = __turbopack_context__.r("[project]/node_modules/axios/lib/helpers/spread.js [app-route] (ecmascript)");
// Expose isAxiosError
axios.isAxiosError = __turbopack_context__.r("[project]/node_modules/axios/lib/helpers/isAxiosError.js [app-route] (ecmascript)");
module.exports = axios;
// Allow use of default import syntax in TypeScript
module.exports.default = axios;
}),
"[project]/node_modules/axios/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/node_modules/axios/lib/axios.js [app-route] (ecmascript)");
}),
"[project]/node_modules/follow-redirects/debug.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var debug;
module.exports = function() {
    if (!debug) {
        try {
            /* eslint global-require: off */ debug = (()=>{
                const e = new Error("Cannot find module 'debug'");
                e.code = 'MODULE_NOT_FOUND';
                throw e;
            })()("follow-redirects");
        } catch (error) {}
        if (typeof debug !== "function") {
            debug = function() {};
        }
    }
    debug.apply(null, arguments);
};
}),
"[project]/node_modules/follow-redirects/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

var url = __turbopack_context__.r("[externals]/url [external] (url, cjs)");
var URL = url.URL;
var http = __turbopack_context__.r("[externals]/http [external] (http, cjs)");
var https = __turbopack_context__.r("[externals]/https [external] (https, cjs)");
var Writable = __turbopack_context__.r("[externals]/stream [external] (stream, cjs)").Writable;
var assert = __turbopack_context__.r("[externals]/assert [external] (assert, cjs)");
var debug = __turbopack_context__.r("[project]/node_modules/follow-redirects/debug.js [app-route] (ecmascript)");
// Preventive platform detection
// istanbul ignore next
(function detectUnsupportedEnvironment() {
    var looksLikeNode = typeof process !== "undefined";
    var looksLikeBrowser = ("TURBOPACK compile-time value", "undefined") !== "undefined" && typeof document !== "undefined";
    var looksLikeV8 = isFunction(Error.captureStackTrace);
    if (!looksLikeNode && (looksLikeBrowser || !looksLikeV8)) {
        console.warn("The follow-redirects package should be excluded from browser builds.");
    }
})();
// Whether to use the native URL object or the legacy url module
var useNativeURL = false;
try {
    assert(new URL(""));
} catch (error) {
    useNativeURL = error.code === "ERR_INVALID_URL";
}
// HTTP headers to drop across HTTP/HTTPS and domain boundaries
var sensitiveHeaders = [
    "Authorization",
    "Proxy-Authorization",
    "Cookie"
];
// URL fields to preserve in copy operations
var preservedUrlFields = [
    "auth",
    "host",
    "hostname",
    "href",
    "path",
    "pathname",
    "port",
    "protocol",
    "query",
    "search",
    "hash"
];
// Create handlers that pass events from native requests
var events = [
    "abort",
    "aborted",
    "connect",
    "error",
    "socket",
    "timeout"
];
var eventHandlers = Object.create(null);
events.forEach(function(event) {
    eventHandlers[event] = function(arg1, arg2, arg3) {
        this._redirectable.emit(event, arg1, arg2, arg3);
    };
});
// Error types with codes
var InvalidUrlError = createErrorType("ERR_INVALID_URL", "Invalid URL", TypeError);
var RedirectionError = createErrorType("ERR_FR_REDIRECTION_FAILURE", "Redirected request failed");
var TooManyRedirectsError = createErrorType("ERR_FR_TOO_MANY_REDIRECTS", "Maximum number of redirects exceeded", RedirectionError);
var MaxBodyLengthExceededError = createErrorType("ERR_FR_MAX_BODY_LENGTH_EXCEEDED", "Request body larger than maxBodyLength limit");
var WriteAfterEndError = createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
// istanbul ignore next
var destroy = Writable.prototype.destroy || noop;
// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
    // Initialize the request
    Writable.call(this);
    this._sanitizeOptions(options);
    this._options = options;
    this._ended = false;
    this._ending = false;
    this._redirectCount = 0;
    this._redirects = [];
    this._requestBodyLength = 0;
    this._requestBodyBuffers = [];
    // Attach a callback if passed
    if (responseCallback) {
        this.on("response", responseCallback);
    }
    // React to responses of native requests
    var self = this;
    this._onNativeResponse = function(response) {
        try {
            self._processResponse(response);
        } catch (cause) {
            self.emit("error", cause instanceof RedirectionError ? cause : new RedirectionError({
                cause: cause
            }));
        }
    };
    // Create filter for sensitive HTTP headers
    this._headerFilter = new RegExp("^(?:" + sensitiveHeaders.concat(options.sensitiveHeaders).map(escapeRegex).join("|") + ")$", "i");
    // Perform the first request
    this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);
RedirectableRequest.prototype.abort = function() {
    destroyRequest(this._currentRequest);
    this._currentRequest.abort();
    this.emit("abort");
};
RedirectableRequest.prototype.destroy = function(error) {
    destroyRequest(this._currentRequest, error);
    destroy.call(this, error);
    return this;
};
// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function(data, encoding, callback) {
    // Writing is not allowed if end has been called
    if (this._ending) {
        throw new WriteAfterEndError();
    }
    // Validate input and shift parameters if necessary
    if (!isString(data) && !isBuffer(data)) {
        throw new TypeError("data should be a string, Buffer or Uint8Array");
    }
    if (isFunction(encoding)) {
        callback = encoding;
        encoding = null;
    }
    // Ignore empty buffers, since writing them doesn't invoke the callback
    // https://github.com/nodejs/node/issues/22066
    if (data.length === 0) {
        if (callback) {
            callback();
        }
        return;
    }
    // Only write when we don't exceed the maximum body length
    if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
        this._requestBodyLength += data.length;
        this._requestBodyBuffers.push({
            data: data,
            encoding: encoding
        });
        this._currentRequest.write(data, encoding, callback);
    } else {
        this.emit("error", new MaxBodyLengthExceededError());
        this.abort();
    }
};
// Ends the current native request
RedirectableRequest.prototype.end = function(data, encoding, callback) {
    // Shift parameters if necessary
    if (isFunction(data)) {
        callback = data;
        data = encoding = null;
    } else if (isFunction(encoding)) {
        callback = encoding;
        encoding = null;
    }
    // Write data if needed and end
    if (!data) {
        this._ended = this._ending = true;
        this._currentRequest.end(null, null, callback);
    } else {
        var self = this;
        var currentRequest = this._currentRequest;
        this.write(data, encoding, function() {
            self._ended = true;
            currentRequest.end(null, null, callback);
        });
        this._ending = true;
    }
};
// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function(name, value) {
    this._options.headers[name] = value;
    this._currentRequest.setHeader(name, value);
};
// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function(name) {
    delete this._options.headers[name];
    this._currentRequest.removeHeader(name);
};
// Global timeout for all underlying requests
RedirectableRequest.prototype.setTimeout = function(msecs, callback) {
    var self = this;
    // Destroys the socket on timeout
    function destroyOnTimeout(socket) {
        socket.setTimeout(msecs);
        socket.removeListener("timeout", socket.destroy);
        socket.addListener("timeout", socket.destroy);
    }
    // Sets up a timer to trigger a timeout event
    function startTimer(socket) {
        if (self._timeout) {
            clearTimeout(self._timeout);
        }
        self._timeout = setTimeout(function() {
            self.emit("timeout");
            clearTimer();
        }, msecs);
        destroyOnTimeout(socket);
    }
    // Stops a timeout from triggering
    function clearTimer() {
        // Clear the timeout
        if (self._timeout) {
            clearTimeout(self._timeout);
            self._timeout = null;
        }
        // Clean up all attached listeners
        self.removeListener("abort", clearTimer);
        self.removeListener("error", clearTimer);
        self.removeListener("response", clearTimer);
        self.removeListener("close", clearTimer);
        if (callback) {
            self.removeListener("timeout", callback);
        }
        if (!self.socket) {
            self._currentRequest.removeListener("socket", startTimer);
        }
    }
    // Attach callback if passed
    if (callback) {
        this.on("timeout", callback);
    }
    // Start the timer if or when the socket is opened
    if (this.socket) {
        startTimer(this.socket);
    } else {
        this._currentRequest.once("socket", startTimer);
    }
    // Clean up on events
    this.on("socket", destroyOnTimeout);
    this.on("abort", clearTimer);
    this.on("error", clearTimer);
    this.on("response", clearTimer);
    this.on("close", clearTimer);
    return this;
};
// Proxy all other public ClientRequest methods
[
    "flushHeaders",
    "getHeader",
    "setNoDelay",
    "setSocketKeepAlive"
].forEach(function(method) {
    RedirectableRequest.prototype[method] = function(a, b) {
        return this._currentRequest[method](a, b);
    };
});
// Proxy all public ClientRequest properties
[
    "aborted",
    "connection",
    "socket"
].forEach(function(property) {
    Object.defineProperty(RedirectableRequest.prototype, property, {
        get: function() {
            return this._currentRequest[property];
        }
    });
});
RedirectableRequest.prototype._sanitizeOptions = function(options) {
    // Ensure headers are always present
    if (!options.headers) {
        options.headers = {};
    }
    if (!isArray(options.sensitiveHeaders)) {
        options.sensitiveHeaders = [];
    }
    // Since http.request treats host as an alias of hostname,
    // but the url module interprets host as hostname plus port,
    // eliminate the host property to avoid confusion.
    if (options.host) {
        // Use hostname if set, because it has precedence
        if (!options.hostname) {
            options.hostname = options.host;
        }
        delete options.host;
    }
    // Complete the URL object when necessary
    if (!options.pathname && options.path) {
        var searchPos = options.path.indexOf("?");
        if (searchPos < 0) {
            options.pathname = options.path;
        } else {
            options.pathname = options.path.substring(0, searchPos);
            options.search = options.path.substring(searchPos);
        }
    }
};
// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function() {
    // Load the native protocol
    var protocol = this._options.protocol;
    var nativeProtocol = this._options.nativeProtocols[protocol];
    if (!nativeProtocol) {
        throw new TypeError("Unsupported protocol " + protocol);
    }
    // If specified, use the agent corresponding to the protocol
    // (HTTP and HTTPS use different types of agents)
    if (this._options.agents) {
        var scheme = protocol.slice(0, -1);
        this._options.agent = this._options.agents[scheme];
    }
    // Create the native request and set up its event handlers
    var request = this._currentRequest = nativeProtocol.request(this._options, this._onNativeResponse);
    request._redirectable = this;
    for (var event of events){
        request.on(event, eventHandlers[event]);
    }
    // RFC7230§5.3.1: When making a request directly to an origin server, […]
    // a client MUST send only the absolute path […] as the request-target.
    this._currentUrl = /^\//.test(this._options.path) ? url.format(this._options) : // When making a request to a proxy, […]
    // a client MUST send the target URI in absolute-form […].
    this._options.path;
    // End a redirected request
    // (The first request must be ended explicitly with RedirectableRequest#end)
    if (this._isRedirect) {
        // Write the request entity and end
        var i = 0;
        var self = this;
        var buffers = this._requestBodyBuffers;
        (function writeNext(error) {
            // Only write if this request has not been redirected yet
            // istanbul ignore else
            if (request === self._currentRequest) {
                // Report any write errors
                // istanbul ignore if
                if (error) {
                    self.emit("error", error);
                } else if (i < buffers.length) {
                    var buffer = buffers[i++];
                    // istanbul ignore else
                    if (!request.finished) {
                        request.write(buffer.data, buffer.encoding, writeNext);
                    }
                } else if (self._ended) {
                    request.end();
                }
            }
        })();
    }
};
// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function(response) {
    // Store the redirected response
    var statusCode = response.statusCode;
    if (this._options.trackRedirects) {
        this._redirects.push({
            url: this._currentUrl,
            headers: response.headers,
            statusCode: statusCode
        });
    }
    // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
    // that further action needs to be taken by the user agent in order to
    // fulfill the request. If a Location header field is provided,
    // the user agent MAY automatically redirect its request to the URI
    // referenced by the Location field value,
    // even if the specific status code is not understood.
    // If the response is not a redirect; return it as-is
    var location = response.headers.location;
    if (!location || this._options.followRedirects === false || statusCode < 300 || statusCode >= 400) {
        response.responseUrl = this._currentUrl;
        response.redirects = this._redirects;
        this.emit("response", response);
        // Clean up
        this._requestBodyBuffers = [];
        return;
    }
    // The response is a redirect, so abort the current request
    destroyRequest(this._currentRequest);
    // Discard the remainder of the response to avoid waiting for data
    response.destroy();
    // RFC7231§6.4: A client SHOULD detect and intervene
    // in cyclical redirections (i.e., "infinite" redirection loops).
    if (++this._redirectCount > this._options.maxRedirects) {
        throw new TooManyRedirectsError();
    }
    // Store the request headers if applicable
    var requestHeaders;
    var beforeRedirect = this._options.beforeRedirect;
    if (beforeRedirect) {
        requestHeaders = Object.assign({
            // The Host header was set by nativeProtocol.request
            Host: response.req.getHeader("host")
        }, this._options.headers);
    }
    // RFC7231§6.4: Automatic redirection needs to done with
    // care for methods not known to be safe, […]
    // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
    // the request method from POST to GET for the subsequent request.
    var method = this._options.method;
    if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" || // RFC7231§6.4.4: The 303 (See Other) status code indicates that
    // the server is redirecting the user agent to a different resource […]
    // A user agent can perform a retrieval request targeting that URI
    // (a GET or HEAD request if using HTTP) […]
    statusCode === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) {
        this._options.method = "GET";
        // Drop a possible entity and headers related to it
        this._requestBodyBuffers = [];
        removeMatchingHeaders(/^content-/i, this._options.headers);
    }
    // Drop the Host header, as the redirect might lead to a different host
    var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);
    // If the redirect is relative, carry over the host of the last request
    var currentUrlParts = parseUrl(this._currentUrl);
    var currentHost = currentHostHeader || currentUrlParts.host;
    var currentUrl = /^\w+:/.test(location) ? this._currentUrl : url.format(Object.assign(currentUrlParts, {
        host: currentHost
    }));
    // Create the redirected request
    var redirectUrl = resolveUrl(location, currentUrl);
    debug("redirecting to", redirectUrl.href);
    this._isRedirect = true;
    spreadUrlObject(redirectUrl, this._options);
    // Drop confidential headers when redirecting to a less secure protocol
    // or to a different domain that is not a superdomain
    if (redirectUrl.protocol !== currentUrlParts.protocol && redirectUrl.protocol !== "https:" || redirectUrl.host !== currentHost && !isSubdomain(redirectUrl.host, currentHost)) {
        removeMatchingHeaders(this._headerFilter, this._options.headers);
    }
    // Evaluate the beforeRedirect callback
    if (isFunction(beforeRedirect)) {
        var responseDetails = {
            headers: response.headers,
            statusCode: statusCode
        };
        var requestDetails = {
            url: currentUrl,
            method: method,
            headers: requestHeaders
        };
        beforeRedirect(this._options, responseDetails, requestDetails);
        this._sanitizeOptions(this._options);
    }
    // Perform the redirected request
    this._performRequest();
};
// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
    // Default settings
    var exports = {
        maxRedirects: 21,
        maxBodyLength: 10 * 1024 * 1024
    };
    // Wrap each protocol
    var nativeProtocols = {};
    Object.keys(protocols).forEach(function(scheme) {
        var protocol = scheme + ":";
        var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
        var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);
        // Executes a request, following redirects
        function request(input, options, callback) {
            // Parse parameters, ensuring that input is an object
            if (isURL(input)) {
                input = spreadUrlObject(input);
            } else if (isString(input)) {
                input = spreadUrlObject(parseUrl(input));
            } else {
                callback = options;
                options = validateUrl(input);
                input = {
                    protocol: protocol
                };
            }
            if (isFunction(options)) {
                callback = options;
                options = null;
            }
            // Set defaults
            options = Object.assign({
                maxRedirects: exports.maxRedirects,
                maxBodyLength: exports.maxBodyLength
            }, input, options);
            options.nativeProtocols = nativeProtocols;
            if (!isString(options.host) && !isString(options.hostname)) {
                options.hostname = "::1";
            }
            assert.equal(options.protocol, protocol, "protocol mismatch");
            debug("options", options);
            return new RedirectableRequest(options, callback);
        }
        // Executes a GET request, following redirects
        function get(input, options, callback) {
            var wrappedRequest = wrappedProtocol.request(input, options, callback);
            wrappedRequest.end();
            return wrappedRequest;
        }
        // Expose the properties on the wrapped protocol
        Object.defineProperties(wrappedProtocol, {
            request: {
                value: request,
                configurable: true,
                enumerable: true,
                writable: true
            },
            get: {
                value: get,
                configurable: true,
                enumerable: true,
                writable: true
            }
        });
    });
    return exports;
}
function noop() {}
function parseUrl(input) {
    var parsed;
    // istanbul ignore else
    if (useNativeURL) {
        parsed = new URL(input);
    } else {
        // Ensure the URL is valid and absolute
        parsed = validateUrl(url.parse(input));
        if (!isString(parsed.protocol)) {
            throw new InvalidUrlError({
                input
            });
        }
    }
    return parsed;
}
function resolveUrl(relative, base) {
    // istanbul ignore next
    return useNativeURL ? new URL(relative, base) : parseUrl(url.resolve(base, relative));
}
function validateUrl(input) {
    if (/^\[/.test(input.hostname) && !/^\[[:0-9a-f]+\]$/i.test(input.hostname)) {
        throw new InvalidUrlError({
            input: input.href || input
        });
    }
    if (/^\[/.test(input.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(input.host)) {
        throw new InvalidUrlError({
            input: input.href || input
        });
    }
    return input;
}
function spreadUrlObject(urlObject, target) {
    var spread = target || {};
    for (var key of preservedUrlFields){
        spread[key] = urlObject[key];
    }
    // Fix IPv6 hostname
    if (spread.hostname.startsWith("[")) {
        spread.hostname = spread.hostname.slice(1, -1);
    }
    // Ensure port is a number
    if (spread.port !== "") {
        spread.port = Number(spread.port);
    }
    // Concatenate path
    spread.path = spread.search ? spread.pathname + spread.search : spread.pathname;
    return spread;
}
function removeMatchingHeaders(regex, headers) {
    var lastValue;
    for(var header in headers){
        if (regex.test(header)) {
            lastValue = headers[header];
            delete headers[header];
        }
    }
    return lastValue === null || typeof lastValue === "undefined" ? undefined : String(lastValue).trim();
}
function createErrorType(code, message, baseClass) {
    // Create constructor
    function CustomError(properties) {
        // istanbul ignore else
        if (isFunction(Error.captureStackTrace)) {
            Error.captureStackTrace(this, this.constructor);
        }
        Object.assign(this, properties || {});
        this.code = code;
        this.message = this.cause ? message + ": " + this.cause.message : message;
    }
    // Attach constructor and set default properties
    CustomError.prototype = new (baseClass || Error)();
    Object.defineProperties(CustomError.prototype, {
        constructor: {
            value: CustomError,
            enumerable: false
        },
        name: {
            value: "Error [" + code + "]",
            enumerable: false
        }
    });
    return CustomError;
}
function destroyRequest(request, error) {
    for (var event of events){
        request.removeListener(event, eventHandlers[event]);
    }
    request.on("error", noop);
    request.destroy(error);
}
function isSubdomain(subdomain, domain) {
    assert(isString(subdomain) && isString(domain));
    var dot = subdomain.length - domain.length - 1;
    return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
}
function isArray(value) {
    return value instanceof Array;
}
function isString(value) {
    return typeof value === "string" || value instanceof String;
}
function isFunction(value) {
    return typeof value === "function";
}
function isBuffer(value) {
    return typeof value === "object" && "length" in value;
}
function isURL(value) {
    return URL && value instanceof URL;
}
function escapeRegex(regex) {
    return regex.replace(/[\]\\/()*+?.$]/g, "\\$&");
}
// Exports
module.exports = wrap({
    http: http,
    https: https
});
module.exports.wrap = wrap;
}),
"[project]/node_modules/moment-range/dist/moment-range.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {

!function(t, e) {
    ("TURBOPACK compile-time truthy", 1) ? module.exports = e(__turbopack_context__.r("[project]/node_modules/moment/moment.js [app-route] (ecmascript)")) : "TURBOPACK unreachable";
}(/*TURBOPACK member replacement*/ __turbopack_context__.e, function(t) {
    return function(t) {
        function e(r) {
            if (n[r]) return n[r].exports;
            var o = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return t[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports;
        }
        var n = {};
        return e.m = t, e.c = n, e.i = function(t) {
            return t;
        }, e.d = function(t, n, r) {
            e.o(t, n) || Object.defineProperty(t, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            });
        }, e.n = function(t) {
            var n = t && t.__esModule ? function() {
                return t.default;
            } : function() {
                return t;
            };
            return e.d(n, "a", n), n;
        }, e.o = function(t, e) {
            return Object.prototype.hasOwnProperty.call(t, e);
        }, e.p = "", e(e.s = 3);
    }([
        function(t, e, n) {
            "use strict";
            var r = n(5)();
            t.exports = function(t) {
                return t !== r && null !== t;
            };
        },
        function(t, e, n) {
            "use strict";
            t.exports = n(18)() ? Symbol : n(20);
        },
        function(e, n) {
            e.exports = t;
        },
        function(t, e, n) {
            "use strict";
            function r(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }
            function o(t, e, n) {
                return e in t ? Object.defineProperty(t, e, {
                    value: n,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : t[e] = n, t;
            }
            function i(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }
            function u(t) {
                return t.range = function(e, n) {
                    var r = this;
                    return "string" == typeof e && y.hasOwnProperty(e) ? new h(t(r).startOf(e), t(r).endOf(e)) : new h(e, n);
                }, t.rangeFromInterval = function(e) {
                    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : t();
                    if (t.isMoment(r) || (r = t(r)), !r.isValid()) throw new Error("Invalid date.");
                    var o = r.clone().add(n, e), i = [];
                    return i.push(t.min(r, o)), i.push(t.max(r, o)), new h(i);
                }, t.rangeFromISOString = function(e) {
                    var n = a(e), r = t.parseZone(n[0]), o = t.parseZone(n[1]);
                    return new h(r, o);
                }, t.parseZoneRange = t.rangeFromISOString, t.fn.range = t.range, t.range.constructor = h, t.isRange = function(t) {
                    return t instanceof h;
                }, t.fn.within = function(t) {
                    return t.contains(this.toDate());
                }, t;
            }
            function a(t) {
                return t.split("/");
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }), e.DateRange = void 0;
            var s = function() {
                function t(t, e) {
                    var n = [], r = !0, o = !1, i = void 0;
                    try {
                        for(var u, a = t[Symbol.iterator](); !(r = (u = a.next()).done) && (n.push(u.value), !e || n.length !== e); r = !0);
                    } catch (t) {
                        o = !0, i = t;
                    } finally{
                        try {
                            !r && a.return && a.return();
                        } finally{
                            if (o) throw i;
                        }
                    }
                    return n;
                }
                return function(e, n) {
                    if (Array.isArray(e)) return e;
                    if (Symbol.iterator in Object(e)) return t(e, n);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance");
                };
            }(), c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                return typeof t;
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
            }, f = function() {
                function t(t, e) {
                    for(var n = 0; n < e.length; n++){
                        var r = e[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
                    }
                }
                return function(e, n, r) {
                    return n && t(e.prototype, n), r && t(e, r), e;
                };
            }();
            e.extendMoment = u;
            var l = n(2), v = r(l), d = n(1), p = r(d), y = {
                year: !0,
                quarter: !0,
                month: !0,
                week: !0,
                day: !0,
                hour: !0,
                minute: !0,
                second: !0
            }, h = e.DateRange = function() {
                function t(e, n) {
                    i(this, t);
                    var r = e, o = n;
                    if (1 === arguments.length || void 0 === n) {
                        if ("object" === (void 0 === e ? "undefined" : c(e)) && 2 === e.length) {
                            var u = s(e, 2);
                            r = u[0], o = u[1];
                        } else if ("string" == typeof e) {
                            var f = a(e), l = s(f, 2);
                            r = l[0], o = l[1];
                        }
                    }
                    this.start = r || 0 === r ? (0, v.default)(r) : (0, v.default)(-864e13), this.end = o || 0 === o ? (0, v.default)(o) : (0, v.default)(864e13);
                }
                return f(t, [
                    {
                        key: "adjacent",
                        value: function(t) {
                            var e = this.start.isSame(t.end), n = this.end.isSame(t.start);
                            return e && t.start.valueOf() <= this.start.valueOf() || n && t.end.valueOf() >= this.end.valueOf();
                        }
                    },
                    {
                        key: "add",
                        value: function(t) {
                            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                                adjacent: !1
                            };
                            return this.overlaps(t, e) ? new this.constructor(v.default.min(this.start, t.start), v.default.max(this.end, t.end)) : null;
                        }
                    },
                    {
                        key: "by",
                        value: function(t) {
                            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                                excludeEnd: !1,
                                step: 1
                            }, n = this;
                            return o({}, p.default.iterator, function() {
                                var r = e.step || 1, o = Math.abs(n.start.diff(n.end, t)) / r, i = e.excludeEnd || !1, u = 0;
                                return e.hasOwnProperty("exclusive") && (i = e.exclusive), {
                                    next: function() {
                                        var e = n.start.clone().add(u * r, t), a = i ? !(u < o) : !(u <= o);
                                        return u++, {
                                            done: a,
                                            value: a ? void 0 : e
                                        };
                                    }
                                };
                            });
                        }
                    },
                    {
                        key: "byRange",
                        value: function(t) {
                            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                                excludeEnd: !1,
                                step: 1
                            }, n = this, r = e.step || 1, i = this.valueOf() / t.valueOf() / r, u = Math.floor(i), a = e.excludeEnd || !1, s = 0;
                            return e.hasOwnProperty("exclusive") && (a = e.exclusive), o({}, p.default.iterator, function() {
                                return u === 1 / 0 ? {
                                    done: !0
                                } : {
                                    next: function() {
                                        var e = (0, v.default)(n.start.valueOf() + t.valueOf() * s * r), o = u === i && a ? !(s < u) : !(s <= u);
                                        return s++, {
                                            done: o,
                                            value: o ? void 0 : e
                                        };
                                    }
                                };
                            });
                        }
                    },
                    {
                        key: "center",
                        value: function() {
                            var t = this.start.valueOf() + this.diff() / 2;
                            return (0, v.default)(t);
                        }
                    },
                    {
                        key: "clone",
                        value: function() {
                            return new this.constructor(this.start.clone(), this.end.clone());
                        }
                    },
                    {
                        key: "contains",
                        value: function(e) {
                            var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                                excludeStart: !1,
                                excludeEnd: !1
                            }, r = this.start.valueOf(), o = this.end.valueOf(), i = e.valueOf(), u = e.valueOf(), a = n.excludeStart || !1, s = n.excludeEnd || !1;
                            n.hasOwnProperty("exclusive") && (a = s = n.exclusive), e instanceof t && (i = e.start.valueOf(), u = e.end.valueOf());
                            var c = r < i || r <= i && !a, f = o > u || o >= u && !s;
                            return c && f;
                        }
                    },
                    {
                        key: "diff",
                        value: function(t, e) {
                            return this.end.diff(this.start, t, e);
                        }
                    },
                    {
                        key: "duration",
                        value: function(t, e) {
                            return this.diff(t, e);
                        }
                    },
                    {
                        key: "intersect",
                        value: function(t) {
                            var e = this.start.valueOf(), n = this.end.valueOf(), r = t.start.valueOf(), o = t.end.valueOf(), i = e == n, u = r == o;
                            if (i) {
                                var a = e;
                                if (a == r || a == o) return null;
                                if (a > r && a < o) return this.clone();
                            } else if (u) {
                                var s = r;
                                if (s == e || s == n) return null;
                                if (s > e && s < n) return new this.constructor(s, s);
                            }
                            return e <= r && r < n && n < o ? new this.constructor(r, n) : r < e && e < o && o <= n ? new this.constructor(e, o) : r < e && e <= n && n < o ? this.clone() : e <= r && r <= o && o <= n ? new this.constructor(r, o) : null;
                        }
                    },
                    {
                        key: "isEqual",
                        value: function(t) {
                            return this.start.isSame(t.start) && this.end.isSame(t.end);
                        }
                    },
                    {
                        key: "isSame",
                        value: function(t) {
                            return this.isEqual(t);
                        }
                    },
                    {
                        key: "overlaps",
                        value: function(t) {
                            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                                adjacent: !1
                            }, n = null !== this.intersect(t);
                            return e.adjacent && !n ? this.adjacent(t) : n;
                        }
                    },
                    {
                        key: "reverseBy",
                        value: function(t) {
                            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                                excludeStart: !1,
                                step: 1
                            }, n = this;
                            return o({}, p.default.iterator, function() {
                                var r = e.step || 1, o = Math.abs(n.start.diff(n.end, t)) / r, i = e.excludeStart || !1, u = 0;
                                return e.hasOwnProperty("exclusive") && (i = e.exclusive), {
                                    next: function() {
                                        var e = n.end.clone().subtract(u * r, t), a = i ? !(u < o) : !(u <= o);
                                        return u++, {
                                            done: a,
                                            value: a ? void 0 : e
                                        };
                                    }
                                };
                            });
                        }
                    },
                    {
                        key: "reverseByRange",
                        value: function(t) {
                            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {
                                excludeStart: !1,
                                step: 1
                            }, n = this, r = e.step || 1, i = this.valueOf() / t.valueOf() / r, u = Math.floor(i), a = e.excludeStart || !1, s = 0;
                            return e.hasOwnProperty("exclusive") && (a = e.exclusive), o({}, p.default.iterator, function() {
                                return u === 1 / 0 ? {
                                    done: !0
                                } : {
                                    next: function() {
                                        var e = (0, v.default)(n.end.valueOf() - t.valueOf() * s * r), o = u === i && a ? !(s < u) : !(s <= u);
                                        return s++, {
                                            done: o,
                                            value: o ? void 0 : e
                                        };
                                    }
                                };
                            });
                        }
                    },
                    {
                        key: "snapTo",
                        value: function(t) {
                            var e = this.clone();
                            return e.start.isSame((0, v.default)(-864e13)) || (e.start = e.start.startOf(t)), e.end.isSame((0, v.default)(864e13)) || (e.end = e.end.endOf(t)), e;
                        }
                    },
                    {
                        key: "subtract",
                        value: function(t) {
                            var e = this.start.valueOf(), n = this.end.valueOf(), r = t.start.valueOf(), o = t.end.valueOf();
                            return null === this.intersect(t) ? [
                                this
                            ] : r <= e && e < n && n <= o ? [] : r <= e && e < o && o < n ? [
                                new this.constructor(o, n)
                            ] : e < r && r < n && n <= o ? [
                                new this.constructor(e, r)
                            ] : e < r && r < o && o < n ? [
                                new this.constructor(e, r),
                                new this.constructor(o, n)
                            ] : e < r && r < n && o < n ? [
                                new this.constructor(e, r),
                                new this.constructor(r, n)
                            ] : [];
                        }
                    },
                    {
                        key: "toDate",
                        value: function() {
                            return [
                                this.start.toDate(),
                                this.end.toDate()
                            ];
                        }
                    },
                    {
                        key: "toString",
                        value: function() {
                            return this.start.format() + "/" + this.end.format();
                        }
                    },
                    {
                        key: "valueOf",
                        value: function() {
                            return this.end.valueOf() - this.start.valueOf();
                        }
                    }
                ]), t;
            }();
        },
        function(t, e, n) {
            "use strict";
            var r, o = n(6), i = n(13), u = n(9), a = n(15);
            r = t.exports = function(t, e) {
                var n, r, u, s, c;
                return arguments.length < 2 || "string" != typeof t ? (s = e, e = t, t = null) : s = arguments[2], null == t ? (n = u = !0, r = !1) : (n = a.call(t, "c"), r = a.call(t, "e"), u = a.call(t, "w")), c = {
                    value: e,
                    configurable: n,
                    enumerable: r,
                    writable: u
                }, s ? o(i(s), c) : c;
            }, r.gs = function(t, e, n) {
                var r, s, c, f;
                return "string" != typeof t ? (c = n, n = e, e = t, t = null) : c = arguments[3], null == e ? e = void 0 : u(e) ? null == n ? n = void 0 : u(n) || (c = n, n = void 0) : (c = e, e = n = void 0), null == t ? (r = !0, s = !1) : (r = a.call(t, "c"), s = a.call(t, "e")), f = {
                    get: e,
                    set: n,
                    configurable: r,
                    enumerable: s
                }, c ? o(i(c), f) : f;
            };
        },
        function(t, e, n) {
            "use strict";
            t.exports = function() {};
        },
        function(t, e, n) {
            "use strict";
            t.exports = n(7)() ? Object.assign : n(8);
        },
        function(t, e, n) {
            "use strict";
            t.exports = function() {
                var t, e = Object.assign;
                return "function" == typeof e && (t = {
                    foo: "raz"
                }, e(t, {
                    bar: "dwa"
                }, {
                    trzy: "trzy"
                }), t.foo + t.bar + t.trzy === "razdwatrzy");
            };
        },
        function(t, e, n) {
            "use strict";
            var r = n(10), o = n(14), i = Math.max;
            t.exports = function(t, e) {
                var n, u, a, s = i(arguments.length, 2);
                for(t = Object(o(t)), a = function(r) {
                    try {
                        t[r] = e[r];
                    } catch (t) {
                        n || (n = t);
                    }
                }, u = 1; u < s; ++u)e = arguments[u], r(e).forEach(a);
                if (void 0 !== n) throw n;
                return t;
            };
        },
        function(t, e, n) {
            "use strict";
            t.exports = function(t) {
                return "function" == typeof t;
            };
        },
        function(t, e, n) {
            "use strict";
            t.exports = n(11)() ? Object.keys : n(12);
        },
        function(t, e, n) {
            "use strict";
            t.exports = function() {
                try {
                    return Object.keys("primitive"), !0;
                } catch (t) {
                    return !1;
                }
            };
        },
        function(t, e, n) {
            "use strict";
            var r = n(0), o = Object.keys;
            t.exports = function(t) {
                return o(r(t) ? Object(t) : t);
            };
        },
        function(t, e, n) {
            "use strict";
            var r = n(0), o = Array.prototype.forEach, i = Object.create, u = function(t, e) {
                var n;
                for(n in t)e[n] = t[n];
            };
            t.exports = function(t) {
                var e = i(null);
                return o.call(arguments, function(t) {
                    r(t) && u(Object(t), e);
                }), e;
            };
        },
        function(t, e, n) {
            "use strict";
            var r = n(0);
            t.exports = function(t) {
                if (!r(t)) throw new TypeError("Cannot use null or undefined");
                return t;
            };
        },
        function(t, e, n) {
            "use strict";
            t.exports = n(16)() ? String.prototype.contains : n(17);
        },
        function(t, e, n) {
            "use strict";
            var r = "razdwatrzy";
            t.exports = function() {
                return "function" == typeof r.contains && !0 === r.contains("dwa") && !1 === r.contains("foo");
            };
        },
        function(t, e, n) {
            "use strict";
            var r = String.prototype.indexOf;
            t.exports = function(t) {
                return r.call(this, t, arguments[1]) > -1;
            };
        },
        function(t, e, n) {
            "use strict";
            var r = {
                object: !0,
                symbol: !0
            };
            t.exports = function() {
                var t;
                if ("function" != typeof Symbol) return !1;
                t = Symbol("test symbol");
                try {
                    String(t);
                } catch (t) {
                    return !1;
                }
                return !!r[typeof Symbol.iterator] && !!r[typeof Symbol.toPrimitive] && !!r[typeof Symbol.toStringTag];
            };
        },
        function(t, e, n) {
            "use strict";
            t.exports = function(t) {
                return !!t && ("symbol" == typeof t || !!t.constructor && "Symbol" === t.constructor.name && "Symbol" === t[t.constructor.toStringTag]);
            };
        },
        function(t, e, n) {
            "use strict";
            var r, o, i, u, a = n(4), s = n(21), c = Object.create, f = Object.defineProperties, l = Object.defineProperty, v = Object.prototype, d = c(null);
            if ("function" == typeof Symbol) {
                r = Symbol;
                try {
                    String(r()), u = !0;
                } catch (t) {}
            }
            var p = function() {
                var t = c(null);
                return function(e) {
                    for(var n, r, o = 0; t[e + (o || "")];)++o;
                    return e += o || "", t[e] = !0, n = "@@" + e, l(v, n, a.gs(null, function(t) {
                        r || (r = !0, l(this, n, a(t)), r = !1);
                    })), n;
                };
            }();
            i = function(t) {
                if (this instanceof i) throw new TypeError("Symbol is not a constructor");
                return o(t);
            }, t.exports = o = function t(e) {
                var n;
                if (this instanceof t) throw new TypeError("Symbol is not a constructor");
                return u ? r(e) : (n = c(i.prototype), e = void 0 === e ? "" : String(e), f(n, {
                    __description__: a("", e),
                    __name__: a("", p(e))
                }));
            }, f(o, {
                for: a(function(t) {
                    return d[t] ? d[t] : d[t] = o(String(t));
                }),
                keyFor: a(function(t) {
                    var e;
                    s(t);
                    for(e in d)if (d[e] === t) return e;
                }),
                hasInstance: a("", r && r.hasInstance || o("hasInstance")),
                isConcatSpreadable: a("", r && r.isConcatSpreadable || o("isConcatSpreadable")),
                iterator: a("", r && r.iterator || o("iterator")),
                match: a("", r && r.match || o("match")),
                replace: a("", r && r.replace || o("replace")),
                search: a("", r && r.search || o("search")),
                species: a("", r && r.species || o("species")),
                split: a("", r && r.split || o("split")),
                toPrimitive: a("", r && r.toPrimitive || o("toPrimitive")),
                toStringTag: a("", r && r.toStringTag || o("toStringTag")),
                unscopables: a("", r && r.unscopables || o("unscopables"))
            }), f(i.prototype, {
                constructor: a(o),
                toString: a("", function() {
                    return this.__name__;
                })
            }), f(o.prototype, {
                toString: a(function() {
                    return "Symbol (" + s(this).__description__ + ")";
                }),
                valueOf: a(function() {
                    return s(this);
                })
            }), l(o.prototype, o.toPrimitive, a("", function() {
                var t = s(this);
                return "symbol" == typeof t ? t : t.toString();
            })), l(o.prototype, o.toStringTag, a("c", "Symbol")), l(i.prototype, o.toStringTag, a("c", o.prototype[o.toStringTag])), l(i.prototype, o.toPrimitive, a("c", o.prototype[o.toPrimitive]));
        },
        function(t, e, n) {
            "use strict";
            var r = n(19);
            t.exports = function(t) {
                if (!r(t)) throw new TypeError(t + " is not a symbol");
                return t;
            };
        }
    ]);
});
}),
"[project]/node_modules/stock-nse-india/build/utils.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __createBinding = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, {
        enumerable: true,
        get: function() {
            return m[k];
        }
    });
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getDataSchema = exports.sleep = exports.getDateRangeChunks = void 0;
var moment_range_1 = __turbopack_context__.r("[project]/node_modules/moment-range/dist/moment-range.js [app-route] (ecmascript)");
var Moment = __importStar(__turbopack_context__.r("[project]/node_modules/moment/moment.js [app-route] (ecmascript)"));
var moment = moment_range_1.extendMoment(Moment);
/**
 * @private
 */ var getDateRangeChunks = function(startDate, endDate, chunkInDays) {
    var range = moment.range(startDate, endDate);
    var chunks = Array.from(range.by('days', {
        step: chunkInDays
    }));
    var dateRanges = [];
    for(var i = 0; i < chunks.length; i++){
        dateRanges.push({
            start: i > 0 ? chunks[i].add(1, 'day').format('DD-MM-YYYY') : chunks[i].format('DD-MM-YYYY'),
            end: chunks[i + 1] ? chunks[i + 1].format('DD-MM-YYYY') : range.end.format('DD-MM-YYYY')
        });
    }
    return dateRanges;
};
exports.getDateRangeChunks = getDateRangeChunks;
/**
 * @private
 */ var sleep = function(ms) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, ms);
    });
};
exports.sleep = sleep;
/**
 * @private
 * @param obj
 * @returns
 */ // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
var getDataSchema = function(data, isTypeStrict) {
    if (isTypeStrict === void 0) {
        isTypeStrict = true;
    }
    if (typeof data !== 'object') return isTypeStrict ? "" + typeof data : 'any';
    if (Array.isArray(data) && typeof data[0] !== 'object') {
        return isTypeStrict ? typeof data[0] + "[]" : 'any';
    }
    return Object.entries(data).map(function(_a) {
        var _b, _c;
        var key = _a[0], value = _a[1];
        if (Moment.isDate(value)) return key + ": " + (isTypeStrict ? 'Date' : 'any');
        if (value === null || typeof value === 'string') return key + ": " + (isTypeStrict ? 'string | null' : 'any');
        if (typeof value !== 'string' && Array.isArray(value)) {
            var typeForEmpty = isTypeStrict ? [] : 'any';
            return _b = {}, _b["" + key] = value.length ? exports.getDataSchema(value[0], isTypeStrict) : typeForEmpty, _b;
        }
        if (typeof value === 'object') {
            return _c = {}, _c["" + key] = exports.getDataSchema(value, isTypeStrict), _c;
        }
        return key + ": " + (isTypeStrict ? typeof value : 'any');
    });
};
exports.getDataSchema = getDataSchema;
}),
"[project]/node_modules/stock-nse-india/build/index.js [app-route] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __assign = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__assign || function() {
    __assign = Object.assign || function(t) {
        for(var s, i = 1, n = arguments.length; i < n; i++){
            s = arguments[i];
            for(var p in s)if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__generator || function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    }, f, y, t, g;
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    //TURBOPACK unreachable
    ;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
};
var __importDefault = /*TURBOPACK member replacement*/ __turbopack_context__.e && /*TURBOPACK member replacement*/ __turbopack_context__.e.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NseIndia = exports.ApiList = void 0;
var axios_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/axios/index.js [app-route] (ecmascript)"));
var user_agents_1 = __importDefault(__turbopack_context__.r("[project]/node_modules/user-agents/dist/index.js [app-route] (ecmascript)"));
var utils_1 = __turbopack_context__.r("[project]/node_modules/stock-nse-india/build/utils.js [app-route] (ecmascript)");
var ApiList;
(function(ApiList) {
    ApiList["GLOSSARY"] = "/api/cmsContent?url=/glossary";
    ApiList["HOLIDAY_TRADING"] = "/api/holiday-master?type=trading";
    ApiList["HOLIDAY_CLEARING"] = "/api/holiday-master?type=clearing";
    ApiList["MARKET_STATUS"] = "/api/marketStatus";
    ApiList["MARKET_TURNOVER"] = "/api/market-turnover";
    ApiList["ALL_INDICES"] = "/api/allIndices";
    ApiList["INDEX_NAMES"] = "/api/index-names";
    ApiList["CIRCULARS"] = "/api/circulars";
    ApiList["LATEST_CIRCULARS"] = "/api/latest-circular";
    ApiList["EQUITY_MASTER"] = "/api/equity-master";
    ApiList["MARKET_DATA_PRE_OPEN"] = "/api/market-data-pre-open?key=ALL";
    ApiList["MERGED_DAILY_REPORTS_CAPITAL"] = "/api/merged-daily-reports?key=favCapital";
    ApiList["MERGED_DAILY_REPORTS_DERIVATIVES"] = "/api/merged-daily-reports?key=favDerivatives";
    ApiList["MERGED_DAILY_REPORTS_DEBT"] = "/api/merged-daily-reports?key=favDebt";
})(ApiList = exports.ApiList || (exports.ApiList = {}));
var NseIndia = function() {
    function NseIndia() {
        this.baseUrl = 'https://www.nseindia.com';
        this.cookieMaxAge = 60; // should be in seconds
        this.baseHeaders = {
            'Authority': 'www.nseindia.com',
            'Referer': 'https://www.nseindia.com/',
            'Accept': '*/*',
            'Origin': this.baseUrl,
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'application/json, text/plain, */*',
            'Connection': 'keep-alive'
        };
        this.userAgent = '';
        this.cookies = '';
        this.cookieUsedCount = 0;
        this.cookieExpiry = new Date().getTime() + this.cookieMaxAge * 1000;
        this.noOfConnections = 0;
    }
    NseIndia.prototype.getNseCookies = function() {
        return __awaiter(this, void 0, void 0, function() {
            var response, setCookies, cookies_1;
            return __generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        if (!(this.cookies === '' || this.cookieUsedCount > 10 || this.cookieExpiry <= new Date().getTime())) return [
                            3 /*break*/ ,
                            2
                        ];
                        this.userAgent = new user_agents_1.default().toString();
                        return [
                            4 /*yield*/ ,
                            axios_1.default.get(this.baseUrl, {
                                headers: __assign(__assign({}, this.baseHeaders), {
                                    'User-Agent': this.userAgent
                                })
                            })
                        ];
                    case 1:
                        response = _a.sent();
                        setCookies = response.headers['set-cookie'];
                        cookies_1 = [];
                        setCookies.forEach(function(cookie) {
                            var cookieKeyValue = cookie.split(';')[0];
                            cookies_1.push(cookieKeyValue);
                        });
                        this.cookies = cookies_1.join('; ');
                        this.cookieUsedCount = 0;
                        this.cookieExpiry = new Date().getTime() + this.cookieMaxAge * 1000;
                        _a.label = 2;
                    case 2:
                        this.cookieUsedCount++;
                        return [
                            2 /*return*/ ,
                            this.cookies
                        ];
                }
            });
        });
    };
    /**
     *
     * @param url NSE API's URL
     * @returns JSON data from NSE India
     */ NseIndia.prototype.getData = function(url) {
        return __awaiter(this, void 0, void 0, function() {
            var retries, hasError, response, _a, _b, _c, _d, _e, error_1;
            var _f, _g;
            return __generator(this, function(_h) {
                switch(_h.label){
                    case 0:
                        retries = 0;
                        hasError = false;
                        _h.label = 1;
                    case 1:
                        if (!(this.noOfConnections >= 5)) return [
                            3 /*break*/ ,
                            3
                        ];
                        return [
                            4 /*yield*/ ,
                            utils_1.sleep(500)
                        ];
                    case 2:
                        _h.sent();
                        return [
                            3 /*break*/ ,
                            1
                        ];
                    case 3:
                        this.noOfConnections++;
                        _h.label = 4;
                    case 4:
                        _h.trys.push([
                            4,
                            7,
                            ,
                            8
                        ]);
                        _b = (_a = axios_1.default).get;
                        _c = [
                            url
                        ];
                        _f = {};
                        _d = [
                            __assign({}, this.baseHeaders)
                        ];
                        _g = {};
                        _e = 'Cookie';
                        return [
                            4 /*yield*/ ,
                            this.getNseCookies()
                        ];
                    case 5:
                        return [
                            4 /*yield*/ ,
                            _b.apply(_a, _c.concat([
                                (_f.headers = __assign.apply(void 0, _d.concat([
                                    (_g[_e] = _h.sent(), _g['User-Agent'] = this.userAgent, _g)
                                ])), _f)
                            ]))
                        ];
                    case 6:
                        response = _h.sent();
                        this.noOfConnections--;
                        return [
                            2 /*return*/ ,
                            response.data
                        ];
                    case 7:
                        error_1 = _h.sent();
                        hasError = true;
                        retries++;
                        this.noOfConnections--;
                        if (retries >= 10) throw error_1;
                        return [
                            3 /*break*/ ,
                            8
                        ];
                    case 8:
                        if (hasError) return [
                            3 /*break*/ ,
                            1
                        ];
                        _h.label = 9;
                    case 9:
                        return [
                            2 /*return*/ 
                        ];
                }
            });
        });
    };
    /**
     *
     * @param apiEndpoint
     * @returns
     */ NseIndia.prototype.getDataByEndpoint = function(apiEndpoint) {
        return __awaiter(this, void 0, void 0, function() {
            return __generator(this, function(_a) {
                return [
                    2 /*return*/ ,
                    this.getData("" + this.baseUrl + apiEndpoint)
                ];
            });
        });
    };
    /**
     *
     * @returns List of NSE equity symbols
     */ NseIndia.prototype.getAllStockSymbols = function() {
        return __awaiter(this, void 0, void 0, function() {
            var data;
            return __generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        return [
                            4 /*yield*/ ,
                            this.getDataByEndpoint(ApiList.MARKET_DATA_PRE_OPEN)
                        ];
                    case 1:
                        data = _a.sent().data;
                        return [
                            2 /*return*/ ,
                            data.map(function(obj) {
                                return obj.metadata.symbol;
                            }).sort()
                        ];
                }
            });
        });
    };
    /**
     *
     * @param symbol
     * @returns
     */ NseIndia.prototype.getEquityDetails = function(symbol) {
        return this.getDataByEndpoint("/api/quote-equity?symbol=" + encodeURIComponent(symbol.toUpperCase()));
    };
    /**
     *
     * @param symbol
     * @returns
     */ NseIndia.prototype.getEquityTradeInfo = function(symbol) {
        return this.getDataByEndpoint("/api/quote-equity?symbol=" + encodeURIComponent(symbol.toUpperCase()) + "&section=trade_info");
    };
    /**
     *
     * @param symbol
     * @returns
     */ NseIndia.prototype.getEquityCorporateInfo = function(symbol) {
        return this.getDataByEndpoint("/api/top-corp-info?symbol=" + encodeURIComponent(symbol.toUpperCase()) + "&market=equities");
    };
    /**
     *
     * @param symbol
     * @param isPreOpenData
     * @returns
     */ NseIndia.prototype.getEquityIntradayData = function(symbol, isPreOpenData) {
        if (isPreOpenData === void 0) {
            isPreOpenData = false;
        }
        return __awaiter(this, void 0, void 0, function() {
            var details, identifier, url;
            return __generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        return [
                            4 /*yield*/ ,
                            this.getEquityDetails(symbol.toUpperCase())
                        ];
                    case 1:
                        details = _a.sent();
                        identifier = details.info.identifier;
                        url = "/api/chart-databyindex?index=" + identifier;
                        if (isPreOpenData) url += '&preopen=true';
                        return [
                            2 /*return*/ ,
                            this.getDataByEndpoint(url)
                        ];
                }
            });
        });
    };
    /**
     *
     * @param symbol
     * @param range
     * @returns
     */ NseIndia.prototype.getEquityHistoricalData = function(symbol, range) {
        return __awaiter(this, void 0, void 0, function() {
            var data, activeSeries, dateRanges, promises;
            var _this = this;
            return __generator(this, function(_a) {
                switch(_a.label){
                    case 0:
                        return [
                            4 /*yield*/ ,
                            this.getEquityDetails(symbol.toUpperCase())
                        ];
                    case 1:
                        data = _a.sent();
                        activeSeries = data.info.activeSeries.length ? data.info.activeSeries[0] : /* istanbul ignore next */ 'EQ';
                        if (!range) {
                            range = {
                                start: new Date(data.metadata.listingDate),
                                end: new Date()
                            };
                        }
                        dateRanges = utils_1.getDateRangeChunks(range.start, range.end, 66);
                        promises = dateRanges.map(function(dateRange) {
                            return __awaiter(_this, void 0, void 0, function() {
                                var url;
                                return __generator(this, function(_a) {
                                    url = "/api/historical/cm/equity?symbol=" + encodeURIComponent(symbol.toUpperCase()) + ("&series=[%22" + activeSeries + "%22]&from=" + dateRange.start + "&to=" + dateRange.end);
                                    return [
                                        2 /*return*/ ,
                                        this.getDataByEndpoint(url)
                                    ];
                                });
                            });
                        });
                        return [
                            2 /*return*/ ,
                            Promise.all(promises)
                        ];
                }
            });
        });
    };
    /**
     *
     * @param symbol
     * @returns
     */ NseIndia.prototype.getEquitySeries = function(symbol) {
        return this.getDataByEndpoint("/api/historical/cm/equity/series?symbol=" + encodeURIComponent(symbol.toUpperCase()));
    };
    /**
     *
     * @param index
     * @returns
     */ NseIndia.prototype.getEquityStockIndices = function(index) {
        return this.getDataByEndpoint("/api/equity-stockIndices?index=" + encodeURIComponent(index.toUpperCase()));
    };
    /**
     *
     * @param index
     * @param isPreOpenData
     * @returns
     */ NseIndia.prototype.getIndexIntradayData = function(index, isPreOpenData) {
        if (isPreOpenData === void 0) {
            isPreOpenData = false;
        }
        var endpoint = "/api/chart-databyindex?index=" + index.toUpperCase() + "&indices=true";
        if (isPreOpenData) endpoint += '&preopen=true';
        return this.getDataByEndpoint(endpoint);
    };
    /**
     *
     * @param index
     * @param range
     * @returns
     */ NseIndia.prototype.getIndexHistoricalData = function(index, range) {
        return __awaiter(this, void 0, void 0, function() {
            var dateRanges, promises;
            var _this = this;
            return __generator(this, function(_a) {
                dateRanges = utils_1.getDateRangeChunks(range.start, range.end, 66);
                promises = dateRanges.map(function(dateRange) {
                    return __awaiter(_this, void 0, void 0, function() {
                        var url;
                        return __generator(this, function(_a) {
                            url = "/api/historical/indicesHistory?indexType=" + encodeURIComponent(index.toUpperCase()) + ("&from=" + dateRange.start + "&to=" + dateRange.end);
                            return [
                                2 /*return*/ ,
                                this.getDataByEndpoint(url)
                            ];
                        });
                    });
                });
                return [
                    2 /*return*/ ,
                    Promise.all(promises)
                ];
            });
        });
    };
    /**
     *
     * @param indexSymbol
     * @returns
     */ NseIndia.prototype.getIndexOptionChain = function(indexSymbol) {
        return this.getDataByEndpoint("/api/option-chain-indices?symbol=" + encodeURIComponent(indexSymbol.toUpperCase()));
    };
    /**
     *
     * @param symbol
     * @returns
     */ NseIndia.prototype.getEquityOptionChain = function(symbol) {
        return this.getDataByEndpoint("/api/option-chain-equities?symbol=" + encodeURIComponent(symbol.toUpperCase()));
    };
    return NseIndia;
}();
exports.NseIndia = NseIndia;
}),
"[externals]/better-sqlite3 [external] (better-sqlite3, cjs, [project]/node_modules/better-sqlite3)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("better-sqlite3-90e2652d1716b047", () => require("better-sqlite3-90e2652d1716b047"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0_v~a3k._.js.map