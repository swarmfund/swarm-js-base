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

var Hasher = require("../util/hasher").Hasher;

var Operation = require("../operation").Operation;

var ReviewRequestBuilder = exports.ReviewRequestBuilder = (function () {
    function ReviewRequestBuilder() {
        _classCallCheck(this, ReviewRequestBuilder);
    }

    _createClass(ReviewRequestBuilder, null, {
        reviewRequest: {

            /**
             * Creates operation to review reviewable request
             * @param {object} opts
             * @param {string} opts.requestID - request ID
             * @param {string} opts.requestHash - Hash of the request to be reviewed
             * @param {number} opts.requestType - Type of the request to be reviewed (xdr.ReviewableRequestType)
             * @param {number} opts.action - action to be performed over request (xdr.ReviewRequestOpAction)
             * @param {string} opts.reason - Reject reason
             * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
             * @returns {xdr.ReviewRequestOp}
             */

            value: function reviewRequest(opts) {
                var attrs = ReviewRequestBuilder._prepareAttrs(opts);

                if (isUndefined(opts.requestType) || !xdr.ReviewableRequestType._byValue.has(opts.requestType)) {
                    throw new Error("opts.requestType is invalid");
                }

                var requestType = xdr.ReviewableRequestType._byValue.get(opts.requestType);
                attrs.requestDetails = new xdr.ReviewRequestOpRequestDetails(requestType);

                return ReviewRequestBuilder._createOp(opts, attrs);
            }
        },
        _createOp: {
            value: function _createOp(opts, attrs) {
                var reviewRequestOp = new xdr.ReviewRequestOp(attrs);
                var opAttributes = {};
                opAttributes.body = xdr.OperationBody.reviewRequest(reviewRequestOp);
                BaseOperation.setSourceAccount(opAttributes, opts);
                return new xdr.Operation(opAttributes);
            }
        },
        _prepareAttrs: {
            value: function _prepareAttrs(opts) {
                var attrs = {};
                if (isUndefined(opts.requestID) || opts.requestID == "0") {
                    throw new Error("opts.requestID is invalid");
                }

                attrs.requestId = UnsignedHyper.fromString(opts.requestID);
                attrs.requestHash = Hasher.hash(opts.requestHash);

                if (isUndefined(opts.action) || !xdr.ReviewRequestOpAction._byValue.has(opts.action)) {
                    throw new Error("opts.action is invalid");
                }

                attrs.action = xdr.ReviewRequestOpAction._byValue.get(opts.action);

                if (!BaseOperation.isValidString(opts.reason, 0, 256)) {
                    throw new Error("opts.reason is invalid");
                }

                attrs.reason = opts.reason;
                attrs.ext = new xdr.ReviewRequestOpExt(xdr.LedgerVersion.emptyVersion());

                return attrs;
            }
        },
        reviewWithdrawRequest: {

            /**
             * Creates operation to review withdraw request
             * @param {object} opts
             * @param {string} opts.requestID - request ID
             * @param {string} opts.requestHash - Hash of the request to be reviewed
             * @param {number} opts.action - action to be performed over request (xdr.ReviewRequestOpAction)
             * @param {string} opts.reason - Reject reason
             * @param {string} opts.externalDetails - External System details
             * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
             * @returns {xdr.ReviewRequestOp}
             */

            value: function reviewWithdrawRequest(opts) {
                if (isUndefined(opts.externalDetails)) {
                    throw new Error("opts.externalDetails is invalid");
                }

                var attrs = ReviewRequestBuilder._prepareAttrs(opts);

                attrs.requestDetails = new xdr.ReviewRequestOpRequestDetails.withdraw(new xdr.WithdrawalDetails({
                    ext: new xdr.WithdrawalDetailsExt(xdr.LedgerVersion.emptyVersion()),
                    externalDetails: JSON.stringify(opts.externalDetails) }));

                return ReviewRequestBuilder._createOp(opts, attrs);
            }
        },
        reviewTwoStepWithdrawRequest: {

            /**
             * Creates operation to review two step withdraw request
             * @param {object} opts
             * @param {string} opts.requestID - request ID
             * @param {string} opts.requestHash - Hash of the request to be reviewed
             * @param {number} opts.action - action to be performed over request (xdr.ReviewRequestOpAction)
             * @param {string} opts.reason - Reject reason
             * @param {string} opts.externalDetails - External System details
             * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
             * @returns {xdr.ReviewRequestOp}
             */

            value: function reviewTwoStepWithdrawRequest(opts) {
                if (isUndefined(opts.externalDetails)) {
                    throw new Error("opts.externalDetails is invalid");
                }

                var attrs = ReviewRequestBuilder._prepareAttrs(opts);

                attrs.requestDetails = new xdr.ReviewRequestOpRequestDetails.twoStepWithdrawal(new xdr.WithdrawalDetails({
                    ext: new xdr.WithdrawalDetailsExt(xdr.LedgerVersion.emptyVersion()),
                    externalDetails: JSON.stringify(opts.externalDetails) }));

                return ReviewRequestBuilder._createOp(opts, attrs);
            }
        },
        reviewLimitsUpdateRequest: {
            value: function reviewLimitsUpdateRequest(opts) {
                if (isUndefined(opts.newLimits)) {
                    throw new Error("opts.newLimits is invalid");
                }

                var attrs = ReviewRequestBuilder._prepareAttrs(opts);

                attrs.requestDetails = new xdr.ReviewRequestOpRequestDetails.limitsUpdate(new xdr.LimitsUpdateDetails({
                    newLimits: new xdr.Limits({
                        dailyOut: BaseOperation._toXDRAmount(opts.newLimits.dailyOut),
                        weeklyOut: BaseOperation._toXDRAmount(opts.newLimits.weeklyOut),
                        monthlyOut: BaseOperation._toXDRAmount(opts.newLimits.monthlyOut),
                        annualOut: BaseOperation._toXDRAmount(opts.newLimits.annualOut),
                        ext: new xdr.LimitsExt(xdr.LedgerVersion.emptyVersion())
                    }),
                    ext: new xdr.LimitsUpdateDetailsExt(xdr.LedgerVersion.emptyVersion())
                }));

                return ReviewRequestBuilder._createOp(opts, attrs);
            }
        },
        reviewRequestToObject: {
            value: function reviewRequestToObject(result, attrs) {
                result.requestID = attrs.requestId().toString();
                result.requestHash = attrs.requestHash().toString("hex");
                result.requestType = attrs.requestDetails()["switch"]().value;
                switch (attrs.requestDetails()["switch"]()) {
                    case xdr.ReviewableRequestType.withdraw():
                        {
                            result.withdrawal = {
                                externalDetails: attrs.requestDetails().withdrawal().externalDetails() };
                            break;
                        }
                    case xdr.ReviewableRequestType.limitsUpdate():
                        {
                            result.limitsUpdate = {
                                newLimits: {
                                    dailyOut: BaseOperation._fromXDRAmount(attrs.requestDetails().limitsUpdate().newLimits().dailyOut()),
                                    weeklyOut: BaseOperation._fromXDRAmount(attrs.requestDetails().limitsUpdate().newLimits().weeklyOut()),
                                    monthlyOut: BaseOperation._fromXDRAmount(attrs.requestDetails().limitsUpdate().newLimits().monthlyOut()),
                                    annualOut: BaseOperation._fromXDRAmount(attrs.requestDetails().limitsUpdate().newLimits().annualOut())
                                }
                            };
                            break;
                        }
                    case xdr.ReviewableRequestType.twoStepWithdrawal():
                        {
                            result.twoStepWithdrawal = {
                                externalDetails: attrs.requestDetails().twoStepWithdrawal().externalDetails() };
                            break;
                        }
                }
                result.action = attrs.action().value;
                result.reason = attrs.reason();
            }
        }
    });

    return ReviewRequestBuilder;
})();