"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var xdr = _interopRequire(require("./generated/stellar-xdr_generated"));

var Keypair = require("./keypair").Keypair;

var _jsXdr = require("js-xdr");

var UnsignedHyper = _jsXdr.UnsignedHyper;
var Hyper = _jsXdr.Hyper;

var hash = require("./hashing").hash;

var encodeCheck = require("./strkey").encodeCheck;

var BigNumber = _interopRequire(require("bignumber.js"));

var best_r = require("./util/continued_fraction").best_r;

var padEnd = _interopRequire(require("lodash/padEnd"));

var trimEnd = _interopRequire(require("lodash/trimEnd"));

var isEmpty = _interopRequire(require("lodash/isEmpty"));

var isUndefined = _interopRequire(require("lodash/isUndefined"));

var isString = _interopRequire(require("lodash/isString"));

var isNumber = _interopRequire(require("lodash/isNumber"));

var isFinite = _interopRequire(require("lodash/isFinite"));

var crypto = _interopRequire(require("crypto"));

var OperationConverter = exports.OperationConverter = (function () {
    function OperationConverter() {
        _classCallCheck(this, OperationConverter);
    }

    _createClass(OperationConverter, null, {
        operationToObject: {

            /**
             * Converts the XDR Operation object to the opts object used to create the XDR
             * operation.
             * @param {xdr.Operation} operation - An XDR Operation.
             * @return {Operation}
             */

            value: function operationToObject(operation) {
                function accountIdtoAddress(accountId) {
                    return encodeCheck("accountId", accountId.ed25519());
                }

                function balanceIdtoString(balanceId) {
                    return encodeCheck("balanceId", balanceId.ed25519());
                }

                var result = {};
                if (operation.sourceAccount()) {
                    result.source = accountIdtoAddress(operation.sourceAccount());
                }

                var attrs = operation.body().value();
                switch (operation.body()["switch"]().name) {
                    case "createAccount":
                        result.type = "createAccount";
                        result.destination = accountIdtoAddress(attrs.destination());
                        result.accountType = attrs.accountType().value;
                        result.policies = attrs.policies();

                        if (attrs.referrer()) {
                            result.referrer = accountIdtoAddress(attrs.referrer());
                        }
                        break;
                    case "payment":
                        result.type = "payment";
                        result.amount = Operation._fromXDRAmount(attrs.amount());
                        result.feeFromSource = attrs.feeFromSource;
                        result.sourceBalanceId = balanceIdtoString(attrs.sourceBalanceId());
                        result.destinationBalanceId = balanceIdtoString(attrs.destinationBalanceId());
                        result.subject = attrs.subject();
                        result.reference = attrs.reference();
                        result.feeData = {
                            sourceFee: {
                                paymentFee: Operation._fromXDRAmount(attrs.feeData().sourceFee().paymentFee()),
                                fixedFee: Operation._fromXDRAmount(attrs.feeData().sourceFee().fixedFee()) },
                            destinationFee: {
                                paymentFee: Operation._fromXDRAmount(attrs.feeData().destinationFee().paymentFee()),
                                fixedFee: Operation._fromXDRAmount(attrs.feeData().destinationFee().fixedFee()) },
                            sourcePaysForDest: attrs.feeData().sourcePaysForDest()
                        };
                        if (attrs.invoiceReference()) {
                            result.invoiceReference = {
                                invoiceId: attrs.invoiceReference().invoiceId().toString(),
                                accept: attrs.invoiceReference().accept()
                            };
                        }
                        break;
                    case "directDebit":
                        result.type = "directDebit";
                        var paymentOp = attrs.paymentOp();
                        result.amount = Operation._fromXDRAmount(paymentOp.amount());
                        result.feeFromSource = paymentOp.feeFromSource;
                        result.sourceBalanceId = balanceIdtoString(paymentOp.sourceBalanceId());
                        result.destinationBalanceId = balanceIdtoString(paymentOp.destinationBalanceId());
                        result.subject = paymentOp.subject();
                        result.reference = paymentOp.reference();
                        result.from = accountIdtoAddress(attrs.from());
                        result.feeData = {
                            sourceFee: {
                                paymentFee: Operation._fromXDRAmount(paymentOp.feeData().sourceFee().paymentFee()),
                                fixedFee: Operation._fromXDRAmount(paymentOp.feeData().sourceFee().fixedFee()) },
                            destinationFee: {
                                paymentFee: Operation._fromXDRAmount(paymentOp.feeData().destinationFee().paymentFee()),
                                fixedFee: Operation._fromXDRAmount(paymentOp.feeData().destinationFee().fixedFee()) },
                            sourcePaysForDest: paymentOp.feeData().sourcePaysForDest()
                        };
                        break;
                    case "setOption":
                        result.type = "setOptions";
                        result.masterWeight = attrs.masterWeight();
                        result.lowThreshold = attrs.lowThreshold();
                        result.medThreshold = attrs.medThreshold();
                        result.highThreshold = attrs.highThreshold();

                        if (attrs.signer()) {
                            var signer = {};
                            signer.pubKey = accountIdtoAddress(attrs.signer().pubKey());
                            signer.weight = attrs.signer().weight();
                            signer.signerType = attrs.signer().signerType();
                            signer.identity = attrs.signer().identity();
                            signer.name = attrs.signer().name();

                            result.signer = signer;
                        }
                        if (attrs.trustData()) {
                            var trustData = {};
                            trustData.allowedAccount = accountIdtoAddress(attrs.trustData().trust().allowedAccount());
                            trustData.balanceToUse = balanceIdtoString(attrs.trustData().trust().balanceToUse());
                            trustData.action = attrs.trustData().action();
                            result.trustData = trustData;
                        }
                        break;
                    case "setFee":
                        result.type = "setFees";
                        if (!isUndefined(attrs.fee())) {
                            result.fee = {};
                            result.fee.fixedFee = Operation._fromXDRAmount(attrs.fee().fixedFee());
                            result.fee.percentFee = Operation._fromXDRAmount(attrs.fee().percentFee());
                            result.fee.feeType = attrs.fee().feeType();
                            result.fee.asset = attrs.fee().asset();
                            result.fee.subtype = attrs.fee().subtype().toString();
                            result.fee.lowerBound = Operation._fromXDRAmount(attrs.fee().lowerBound());
                            result.fee.upperBound = Operation._fromXDRAmount(attrs.fee().upperBound());
                            if (attrs.fee().accountId()) {
                                result.fee.accountId = accountIdtoAddress(attrs.fee().accountId());
                            }
                            if (attrs.fee().accountType()) {
                                result.fee.accountType = attrs.fee().accountType();
                            }
                            result.fee.hash = attrs.fee().hash();
                        }
                        break;
                    case "manageCoinsEmissionRequest":
                        result.type = "manageCoinsEmissionRequest";
                        result.amount = Operation._fromXDRAmount(attrs.amount());
                        result.requestId = attrs.requestId().toString();
                        result.action = attrs.action();
                        result.asset = attrs.asset();
                        result.reference = attrs.reference();
                        result.receiver = balanceIdtoString(attrs.receiver());
                        break;
                    case "reviewCoinsEmissionRequest":
                        result.type = "reviewCoinsEmissionRequest";
                        result.request = {};
                        result.request.requestId = attrs.request().requestId().toString();
                        result.request.amount = Operation._fromXDRAmount(attrs.request().amount());
                        result.request.issuer = accountIdtoAddress(attrs.request().issuer());
                        result.request.receiver = balanceIdtoString(attrs.request().receiver());
                        result.request.asset = attrs.request().asset();
                        result.request.reference = attrs.request().reference();
                        result.approve = attrs.approve();
                        result.reason = attrs.reason();
                        break;
                    case "manageAccount":
                        result.type = "manageAccount";
                        result.account = accountIdtoAddress(attrs.account());
                        result.blockReasonsToAdd = attrs.blockReasonsToAdd();
                        result.blockReasonsToRemove = attrs.blockReasonsToRemove();
                        result.accountType = attrs.accountType().value;
                        break;
                    case "manageForfeitRequest":
                        result.type = "manageForfeitRequest";
                        result.amount = Operation._fromXDRAmount(attrs.amount());
                        result.totalFee = Operation._fromXDRAmount(attrs.totalFee());
                        result.balance = balanceIdtoString(attrs.balance());
                        result.details = attrs.details();
                        result.reviewer = accountIdtoAddress(attrs.reviewer());
                        break;
                    case "recover":
                        result.type = "recover";
                        result.account = accountIdtoAddress(attrs.account());
                        result.oldSigner = accountIdtoAddress(attrs.oldSigner());
                        result.newSigner = accountIdtoAddress(attrs.newSigner());
                        break;
                    case "reviewRecoveryRequest":
                        result.type = "reviewRecoveryRequest";
                        result.accept = attrs.accept();
                        result.requestId = attrs.requestId().toString();
                        result.oldAccount = accountIdtoAddress(attrs.oldAccount());
                        result.newAccount = accountIdtoAddress(attrs.newAccount());
                        break;
                    case "manageBalance":
                        result.type = "manageBalance";
                        result.action = attrs.action();
                        result.balanceId = balanceIdtoString(attrs.balanceId());
                        result.destination = accountIdtoAddress(attrs.destination());
                        result.asset = attrs.asset();
                        break;
                    case "reviewPaymentRequest":
                        result.type = "reviewPaymentRequest";
                        result.accept = attrs.accept();
                        result.paymentId = attrs.paymentId().toString();
                        if (attrs.rejectReason()) {
                            result.rejectReason = attrs.rejectReason();
                        }
                        break;
                    case "manageAsset":
                        result.type = "manageAsset";
                        result.action = attrs.action();
                        result.code = attrs.code();
                        result.policies = attrs.policies();
                        break;
                    case "uploadPreemission":
                        result.type = "uploadPreemissions";
                        result.preEmissions = attrs.preEmissions();
                        break;
                    case "setLimit":
                        result.type = "setLimits";
                        if (attrs.account()) {
                            result.account = accountIdtoAddress(attrs.account());
                        }
                        if (attrs.accountType()) {
                            result.accountType = attrs.accountType().value;
                        }
                        result.limits = {};
                        result.limits.dailyOut = Operation._fromXDRAmount(attrs.limits().dailyOut());
                        result.limits.weeklyOut = Operation._fromXDRAmount(attrs.limits().weeklyOut());
                        result.limits.monthlyOut = Operation._fromXDRAmount(attrs.limits().monthlyOut());
                        result.limits.annualOut = Operation._fromXDRAmount(attrs.limits().annualOut());
                        break;
                    case "manageOffer":
                        result.type = "manageOffer";
                        result.amount = Operation._fromXDRAmount(attrs.amount());
                        result.price = Operation._fromXDRAmount(attrs.price());
                        result.fee = Operation._fromXDRAmount(attrs.fee());
                        result.isBuy = attrs.isBuy();
                        result.baseBalance = balanceIdtoString(attrs.baseBalance());
                        result.quoteBalance = balanceIdtoString(attrs.quoteBalance());
                        result.offerID = attrs.offerId().toString();
                        break;
                    case "manageInvoice":
                        result.type = "manageInvoice";
                        result.amount = Operation._fromXDRAmount(attrs.amount());
                        result.sender = accountIdtoAddress(attrs.sender());
                        result.receiverBalance = balanceIdtoString(attrs.receiverBalance());
                        result.invoiceId = attrs.invoiceId().toString();
                        break;
                    case "manageAssetPair":
                        result.type = "manageAssetPair";
                        result.action = attrs.action();
                        result.base = attrs.base();
                        result.quote = attrs.quote();
                        result.policies = attrs.policies();
                        result.physicalPriceCorrection = Operation._fromXDRAmount(attrs.physicalPriceCorrection());
                        result.maxPriceStep = Operation._fromXDRAmount(attrs.maxPriceStep());
                        break;
                    default:
                        throw new Error("Unknown operation");

                }
                return result;
            }
        }
    });

    return OperationConverter;
})();