"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var KeyValue = exports.KeyValue = (function () {
    /**
     * Create a new KeyValue object.
     *
     * `KeyValue` represents a single KeyValue in Stellar network and it's key.
     * @constructor
     * @param {string} key of the KeyVlaue
     */

    function KeyValue(key) {
        _classCallCheck(this, KeyValue);

        this._key = key;
    }

    _createClass(KeyValue, {
        keyValueKey: {

            /**
             * @returns {string}, a key of current KeyValue entry
             */

            value: function keyValueKey() {
                return this._key;
            }
        }
    });

    return KeyValue;
})();