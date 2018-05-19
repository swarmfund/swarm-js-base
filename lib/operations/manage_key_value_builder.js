"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var BaseOperation = require("./base_operation").BaseOperation;

var xdr = _interopRequire(require("../generated/stellar-xdr_generated"));

var isUndefined = _interopRequire(require("lodash/isUndefined"));

var isString = _interopRequire(require("lodash/isString"));

var ManageKeyValueBuilder = exports.ManageKeyValueBuilder = (function () {
    function ManageKeyValueBuilder() {
        _classCallCheck(this, ManageKeyValueBuilder);
    }

    _createClass(ManageKeyValueBuilder, null, {
        putKeyValue: {

            /**
             * Creates manage key value operation
             * @param {object} opts
             *
             * @param {string} opts.key
             * @param {number|string} opts.value
             *
             * @param {string} [opts.source] - The source account for the creation. Defaults to the transaction's source account.
             *
             * @returns {xdr.ManageKeyValueOp}
             */

            value: function putKeyValue(opts) {
                var attributes = {};

                var value = new xdr.KeyValueEntryValue.uint32(Number(opts.value));

                var KVEntry = new xdr.KeyValueEntry({
                    key: opts.key,
                    value: value,
                    ext: new xdr.KeyValueEntryExt(xdr.LedgerVersion.emptyVersion())
                });

                attributes.action = new xdr.ManageKeyValueOpAction(xdr.ManageKvAction.put(), KVEntry);

                return ManageKeyValueBuilder.createManageKeyValueOp(attributes, opts);
            }
        },
        deleteKeyValue: {

            /**
             * Creates manage key value operation
             * @param {object} opts
             *
             * @param {string} opts.key
             *
             * @param {string} [opts.source] - The source account for the creation. Defaults to the transaction's source account.
             *
             * @returns {xdr.ManageKeyValueOp}
             */

            value: function deleteKeyValue(opts) {
                var attributes = {};

                attributes.action = new xdr.ManageKeyValueOpAction(BaseOperation._keyValueActionFromNumber(xdr.ManageKvAction["delete"]().value));

                return ManageKeyValueBuilder.createManageKeyValueOp(attributes, opts);
            }
        },
        createManageKeyValueOp: {
            value: function createManageKeyValueOp(attributes, opts) {
                if (isUndefined(opts.key)) {
                    throw new Error("key_value key must be defined");
                }
                if (!isString(opts.key)) {
                    throw new Error("key value key must be string");
                }

                attributes.key = opts.key;
                attributes.ext = new xdr.ManageKeyValueOpExt(xdr.LedgerVersion.emptyVersion());

                var manageKV = new xdr.ManageKeyValueOp(attributes);

                var opAttributes = {};
                opAttributes.body = xdr.OperationBody.manageKeyValue(manageKV);
                BaseOperation.setSourceAccount(opAttributes, opts);
                return new xdr.Operation(opAttributes);
            }
        },
        manageKeyValueOpToObject: {
            value: function manageKeyValueOpToObject(result, attrs) {
                result.key = attrs.key();
                var action = attrs.action().value();
                switch (attrs.action()["switch"]()) {
                    case xdr.ManageKvAction.put():
                        result.action = new xdr.ManageKvAction.put().value;
                        result.value = action.value().ui32Value().toString();
                        break;
                    case xdr.ManageKvAction["delete"]():
                        result.action = new xdr.ManageKvAction["delete"]().value;
                        break;
                    default:
                        throw new Error("invalid KV action type");
                }
            }
        }
    });

    return ManageKeyValueBuilder;
})();