"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Operation = require("../operation").Operation;

var xdr = _interopRequire(require("../generated/stellar-xdr_generated"));

var isUndefined = _interopRequire(require("lodash/isUndefined"));

var ManageKeyValueOpBuilder = exports.ManageKeyValueOpBuilder = (function () {
    function ManageKeyValueOpBuilder() {
        _classCallCheck(this, ManageKeyValueOpBuilder);
    }

    _createClass(ManageKeyValueOpBuilder, null, {
        manageKeyValueOp: {
            value: function manageKeyValueOp(opts) {
                var attributes = {};
                if (isUndefined(opts.action) || !xdr.ManageKvAction._byValue.has(opts.action)) {
                    throw new Error("key-value action is invalid");
                }

                if (isUndefined(opts.key)) {
                    throw new Error("key-value key must be defined");
                }

                attributes.key = opts.key;
                attributes.action = new xdr.ManageKeyValueOpAction(Operation._keyValueActionFromNumber(opts.action));
                attributes.ext = new xdr.ManageKeyValueExt(xdr.LedgerVersion.emptyVersion());

                if (opts.action === xdr.ManageKvAction.put()) {
                    ManageKeyValueOpBuilder.putKV(opts, attributes);
                }

                var manageKV = new xdr.ManageKeyValueOp(attributes);

                var opAttributes = {};
                opAttributes.body = xdr.OperationBody.manageKeyValue(manageKV);
                Operation.setSourceAccount(opAttributes, opts);
                return new xdr.Operation(opAttributes);
            }
        },
        manageKeyValueOpToObject: {
            value: function manageKeyValueOpToObject(result, attrs) {
                result.key = attrs.key;
                result.action = new xdr.ManageKeyValueOpAction(Operation._keyValueActionFromNumber(attrs.action));
                if (result.action === xdr.ManageKvAction.put) {
                    this.putKV(attrs, result);
                }
            }
        },
        putKV: {
            value: function putKV(opts, attributes) {
                var KVEntry = new xdr.KeyValueEntry({
                    key: opts.key,
                    ext: new xdr.ManageKeyValueExt(xdr.LedgerVersion.emptyVersion())
                });

                if (isUndefined(opts.KvType) || !xdr.KeyValueEntryType._byValue.has(opts.KvType)) {
                    throw new Error("key-value type is invalid");
                }

                KVEntry.value = new xdr.KeyValueEntryValue(opts.KvType);
                KVEntry.value().defaultMask = opts.value;

                attributes.action().value = new xdr.KeyValueEntry(KVEntry);
            }
        }
    });

    return ManageKeyValueOpBuilder;
})();