'use strict';

const fs = require('fs');
const shortid = require('shortid');

(function () {
    var Utils = (function () {
        var Utils = function (options) {
            var self = this;
            self.vars = {
              region: ''
            };
            self.data = [];
            return self;
        };
        Utils.prototype.flipTable = function (consoleLog) {
            var ft = '(╯°□°）╯ ︵ ┻━┻';
            if (consoleLog) { console.log(ft); }
            return ft;
        };
        Utils.prototype.startsWith = function (findThis, here) {
            return here.substr(0, findThis.length) === findThis;
        };
        Utils.prototype.spaces = function (num) {
            var s = '';
            for (var i = 0; i < num; i++) {
            s += ' ';
            }
            return s;
        };
        Utils.prototype.apiResponse = function (message) {
            var response = {
                statusCode: 200,
                headers: {
                  'Access-Control-Allow-Origin': '*'
                },
                body: message
            };
            return response;
        };
        Utils.prototype.apiBinaryResponse = function (contentType, data) {
            var response = {
                statusCode: 200,
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Content-Type': contentType
                },
                body: data.toString("base64"),
                isBase64Encoded: true
            };
            return response;
        };

        return Utils;
    })();
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = new Utils();
    } else {
        window.utils = new Utils();
    }
})();
