"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var xdr = _interopRequire(require("../generated/stellar-xdr_generated"));

var isUndefined = _interopRequire(require("lodash/isUndefined"));

var BaseOperation = require("./base_operation").BaseOperation;

var Keypair = require("../keypair").Keypair;

var _jsXdr = require("js-xdr");

var UnsignedHyper = _jsXdr.UnsignedHyper;
var Hyper = _jsXdr.Hyper;

var ManageExternalSystemAccountIdPoolEntryBuilder = exports.ManageExternalSystemAccountIdPoolEntryBuilder = (function () {
    function ManageExternalSystemAccountIdPoolEntryBuilder() {
        _classCallCheck(this, ManageExternalSystemAccountIdPoolEntryBuilder);
    }

    _createClass(ManageExternalSystemAccountIdPoolEntryBuilder, null, {
        createExternalSystemAccountIdPoolEntry: {
            /**
             * Creates operation for new pool entry creation
             * @param {object} opts
             *
             * @param {string} opts.externalSystemType - type of external system
             * @param {string} opts.data
             *
             * @param {string} [opts.source] - The source account for the creation. Defaults to the transaction's source account.
             *
             * @returns {xdr.ManageExternalSystemAccountIdPoolEntryOp}
             */

            value: function createExternalSystemAccountIdPoolEntry(opts) {
                var attrs = {};

                attrs.externalSystemType = BaseOperation._ExternalSystemTypeFromNumber(opts.externalSystemType);

                if (opts.data === "") {
                    throw new Error("data cannot be empty string");
                }
                attrs.data = opts.data;

                attrs.ext = new xdr.CreateExternalSystemAccountIdPoolEntryActionInputExt(xdr.LedgerVersion.emptyVersion());

                var createExternalSystemAccountIdPoolEntryActionInput = new xdr.CreateExternalSystemAccountIdPoolEntryActionInput(attrs);
                return ManageExternalSystemAccountIdPoolEntryBuilder._createManageExternalSystemAccountIdPoolEntryOp(opts, new xdr.ManageExternalSystemAccountIdPoolEntryOpActionInput.create(createExternalSystemAccountIdPoolEntryActionInput));
            }
        },
        _createManageExternalSystemAccountIdPoolEntryOp: {
            value: function _createManageExternalSystemAccountIdPoolEntryOp(opts, input) {
                var manageExternalSystemAccountIdPoolEntryOp = new xdr.ManageExternalSystemAccountIdPoolEntryOp({
                    actionInput: input,
                    ext: new xdr.ManageExternalSystemAccountIdPoolEntryOpExt(xdr.LedgerVersion.emptyVersion()) });

                var opAttributes = {};
                opAttributes.body = xdr.OperationBody.manageExternalSystemAccountIdPoolEntry(manageExternalSystemAccountIdPoolEntryOp);
                BaseOperation.setSourceAccount(opAttributes, opts);
                return new xdr.Operation(opAttributes);
            }
        },
        manageExternalSystemAccountIdPoolEntryToObject: {
            value: function manageExternalSystemAccountIdPoolEntryToObject(result, attrs) {
                result.actionType = attrs.actionInput()["switch"]().name;
                switch (attrs.actionInput()["switch"]()) {
                    case xdr.ManageExternalSystemAccountIdPoolEntryAction.create():
                        {
                            var action = attrs.actionInput().createExternalSystemAccountIdPoolEntryActionInput();
                            result.externalSystemType = action.externalSystemType().value;
                            result.data = action.data();
                            break;
                        }
                }
            }
        }
    });

    return ManageExternalSystemAccountIdPoolEntryBuilder;
})();