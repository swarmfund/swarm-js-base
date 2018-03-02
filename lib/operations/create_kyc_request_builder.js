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

var CreateKYCRequestBuilder = exports.CreateKYCRequestBuilder = (function () {
    function CreateKYCRequestBuilder() {
        _classCallCheck(this, CreateKYCRequestBuilder);
    }

    _createClass(CreateKYCRequestBuilder, null, {
        createKYCRequest: {
            /**
             * Creates operation to create KYC request
             * @param {object} opts
             * @param {number|string} opts.requestID - set to zero to create new request
             * @param {string} opts.updatedAccount - account for change KYC
             * @param {string} opts.accountTypeToSet
             * @param {number} opts.kycLevel
             * @param {object} opts.kycData
             * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
             * @returns {xdr.CreateKycRequestOp}
             */

            value: function createKYCRequest(opts) {
                var attrs = {};

                if (isUndefined(opts.requestID)) {
                    throw new Error("opts.requestID is invalid");
                }

                if (!Keypair.isValidPublicKey(opts.updatedAccount)) {
                    throw new Error("destination is invalid");
                }

                attrs.updatedAccount = Keypair.fromAccountId(opts.updatedAccount).xdrAccountId();
                attrs.accountTypeToSet = BaseOperation._accountTypeFromNumber(opts.accountTypeToSet);
                attrs.kycLevel = opts.kycLevel;
                attrs.kycData = JSON.stringify(opts.kycData);
                attrs.ext = new xdr.ChangeKycRequestExt(xdr.LedgerVersion.emptyVersion());
                var request = new xdr.ChangeKycRequest(attrs);
                var kycRequestOp = new xdr.CreateKycRequestOp({
                    requestId: UnsignedHyper.fromString(opts.requestID),
                    changeKycRequest: request,
                    ext: new xdr.CreateKycRequestOpExt(xdr.LedgerVersion.emptyVersion()) });
                var opAttributes = {};
                opAttributes.body = xdr.OperationBody.createKycRequest(kycRequestOp);
                BaseOperation.setSourceAccount(opAttributes, opts);
                return new xdr.Operation(opAttributes);
            }
        },
        createKYCRequestOpToObject: {
            value: function createKYCRequestOpToObject(result, attrs) {
                result.requestID = attrs.requestId;
                result.updatedAccount = BaseOperation.accountIdtoAddress(attrs.changeKycRequest().updatedAccount());
                result.accountTypeToSet = attrs.changeKycRequest().accountTypeToSet().value;
                result.kycLevel = attrs.changeKycRequest().kycLevel();
                result.kycData = JSON.parse(attrs.changeKycRequest().kycData());
            }
        }
    });

    return CreateKYCRequestBuilder;
})();