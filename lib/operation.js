"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

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

var BaseOperation = require("./operations/base_operation").BaseOperation;

var ManageAssetBuilder = require("./operations/manage_asset_builder").ManageAssetBuilder;

var ReviewRequestBuilder = require("./operations/review_request_builder").ReviewRequestBuilder;

var PreIssuanceRequestOpBuilder = require("./operations/pre_issuance_request_op_builder").PreIssuanceRequestOpBuilder;

var CreateIssuanceRequestBuilder = require("./operations/create_issuance_request_builder").CreateIssuanceRequestBuilder;

/**
 * When set using `{@link Operation.setOptions}` option, requires the issuing account to
 * give other accounts permission before they can hold the issuing account’s credit.
 * @constant
 * @see [Account flags](https://www.stellar.org/developers/guides/concepts/accounts.html#flags)
 */
var AuthRequiredFlag = 1 << 0;
exports.AuthRequiredFlag = AuthRequiredFlag;
/**
 * When set using `{@link Operation.setOptions}` option, allows the issuing account to
 * revoke its credit held by other accounts.
 * @constant
 * @see [Account flags](https://www.stellar.org/developers/guides/concepts/accounts.html#flags)
 */
var AuthRevocableFlag = 1 << 1;
exports.AuthRevocableFlag = AuthRevocableFlag;
/**
 * When set using `{@link Operation.setOptions}` option, then none of the authorization flags
 * can be set and the account can never be deleted.
 * @constant
 * @see [Account flags](https://www.stellar.org/developers/guides/concepts/accounts.html#flags)
 */
var AuthImmutableFlag = 1 << 2;

exports.AuthImmutableFlag = AuthImmutableFlag;
/**
 * `Operation` class represents [operations](https://www.stellar.org/developers/learn/concepts/operations.html) in Stellar network.
 */

var Operation = exports.Operation = (function (_BaseOperation) {
    function Operation() {
        _classCallCheck(this, Operation);

        if (_BaseOperation != null) {
            _BaseOperation.apply(this, arguments);
        }
    }

    _inherits(Operation, _BaseOperation);

    _createClass(Operation, null, {
        createAccount: {

            /**
             * Create and fund a non existent account.
             * @param {object} opts
             * @param {string} opts.destination - Destination account ID to create an account for.
             * @param {string} opts.KYCdata - KYC data for account to be created.
             * @param {string} opts.accountType - Type of the account to be created.
             * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
             * * @param {string} opts.accountPolicies - The policies of the account.
             * @returns {xdr.CreateAccountOp}
             */

            value: function createAccount(opts) {
                if (!Keypair.isValidPublicKey(opts.destination)) {
                    throw new Error("destination is invalid");
                }
                var attributes = {};
                attributes.destination = Keypair.fromAccountId(opts.destination).xdrAccountId();
                attributes.accountType = Operation._accountTypeFromNumber(opts.accountType);

                if (!isUndefined(opts.accountPolicies)) {
                    if (opts.accountPolicies < 0) {
                        throw new TypeError("accountPolicies should be positive or zero");
                    }
                    attributes.policies = opts.accountPolicies;
                } else {
                    attributes.policies = 0; //default no_permissions
                }

                if (opts.referrer) {
                    if (!Keypair.isValidPublicKey(opts.referrer)) {
                        throw new TypeError("referrer is invalid");
                    }
                    attributes.referrer = Keypair.fromAccountId(opts.referrer).xdrAccountId();
                }

                attributes.ext = new xdr.CreateAccountOpExt(xdr.LedgerVersion.emptyVersion());
                var createAccount = new xdr.CreateAccountOp(attributes);

                var opAttributes = {};
                opAttributes.body = xdr.OperationBody.createAccount(createAccount);
                Operation.setSourceAccount(opAttributes, opts);
                return new xdr.Operation(opAttributes);
            }
        },
        payment: {

            /**
             * Create a payment operation.
             * @param {object} opts
             * @param {string} opts.sourceBalanceId - The balance id of source.
             * @param {string} opts.destinationBalanceId - The destination balance ID.
             * @param {boolean} opts.feeFromSource - if true - fee charged from source account, if false - from destination
             * @param {string} opts.amount - The amount to send.
             * @param {string} opts.paymentFee - The payment fee.
             * @param {string} opts.fixedFee - The fixed fee.
             * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
             * @returns {xdr.PaymentOp}
             */

            value: function payment(opts) {
                var attributes = {};
                if (!Operation.isValidAmount(opts.amount)) {
                    throw new TypeError("amount argument must be of type String and represent a positive number");
                }
                if (!Keypair.isValidBalanceKey(opts.sourceBalanceId)) {
                    throw new TypeError("sourceBalanceId is invalid");
                }
                if (!Keypair.isValidBalanceKey(opts.destinationBalanceId)) {
                    throw new TypeError("destinationBalanceId is invalid");
                }
                if (!Operation.isValidSubject(opts.subject)) {
                    throw new Error("subject argument must be of type String 0-256 long");
                }

                if (!isUndefined(opts.feeData)) {
                    var sourceFee = new xdr.FeeData({
                        paymentFee: Operation._toXDRAmount(opts.feeData.sourceFee.paymentFee),
                        fixedFee: Operation._toXDRAmount(opts.feeData.sourceFee.fixedFee),
                        ext: new xdr.FeeDataExt(xdr.LedgerVersion.emptyVersion())
                    });
                    var destinationFee = new xdr.FeeData({
                        paymentFee: Operation._toXDRAmount(opts.feeData.destinationFee.paymentFee),
                        fixedFee: Operation._toXDRAmount(opts.feeData.destinationFee.fixedFee),
                        ext: new xdr.FeeDataExt(xdr.LedgerVersion.emptyVersion())
                    });
                    attributes.feeData = new xdr.PaymentFeeData({
                        sourceFee: sourceFee,
                        destinationFee: destinationFee,
                        sourcePaysForDest: opts.feeData.sourcePaysForDest,
                        ext: new xdr.PaymentFeeDataExt(xdr.LedgerVersion.emptyVersion())
                    });
                } else {
                    throw new Error("feeData argument must be defined");
                }

                if (isUndefined(opts.reference)) {
                    opts.reference = "";
                }

                if (!isUndefined(opts.invoiceReference)) {
                    var invoiceReference = new xdr.InvoiceReference({
                        invoiceId: UnsignedHyper.fromString(opts.invoiceReference.invoiceId),
                        accept: opts.invoiceReference.accept,
                        ext: new xdr.InvoiceReferenceExt(xdr.LedgerVersion.emptyVersion())
                    });
                    attributes.invoiceReference = invoiceReference;
                }

                attributes.amount = Operation._toXDRAmount(opts.amount);
                attributes.sourceBalanceId = Keypair.fromBalanceId(opts.sourceBalanceId).xdrBalanceId();
                attributes.destinationBalanceId = Keypair.fromBalanceId(opts.destinationBalanceId).xdrBalanceId();
                attributes.subject = opts.subject;
                attributes.reference = opts.reference;
                attributes.ext = new xdr.PaymentOpExt(xdr.LedgerVersion.emptyVersion());
                var payment = new xdr.PaymentOp(attributes);

                var opAttributes = {};
                opAttributes.body = xdr.OperationBody.payment(payment);
                Operation.setSourceAccount(opAttributes, opts);
                return new xdr.Operation(opAttributes);
            }
        },
        directDebit: {
            value: function directDebit(opts) {
                if (!Keypair.isValidPublicKey(opts.from)) {
                    throw new TypeError("from is invalid");
                }

                var attributes = {};
                attributes.from = Keypair.fromAccountId(opts.from).xdrAccountId();
                attributes.paymentOp = Operation.payment(opts.paymentOp).body().value();
                attributes.ext = new xdr.DirectDebitOpExt(xdr.LedgerVersion.emptyVersion());
                var directDebit = new xdr.DirectDebitOp(attributes);

                var opAttributes = {};
                opAttributes.body = xdr.OperationBody.directDebit(directDebit);
                Operation.setSourceAccount(opAttributes, opts);
                return new xdr.Operation(opAttributes);
            }
        },
        manageForfeitRequest: {

            /**
             * Create a manage forfeit request.
             * @param {object} opts
             * @param {string} opts.balance - The target balance ID.
             * @param {string} opts.amount - The amount to forfeit.
             * @param {string} reviewer - The master account to review forfeit request
             * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
             * @returns {xdr.ManageForfeitRequestOp}
             */

            value: function manageForfeitRequest(opts) {
                if (!Keypair.isValidBalanceKey(opts.balance)) {
                    throw new Error("balance is invalid");
                }
                if (!Operation.isValidAmount(opts.amount)) {
                    throw new TypeError("amount argument must be of type String and represent a positive number");
                }
                if (!Operation.isValidAmount(opts.totalFee, true)) {
                    throw new TypeError("totalFee must be of type String and represent a positive number or zero");
                }
                if (!this.isValidString(opts.details, 0, 4096)) {
                    throw new Error("details are invalid");
                }
                if (!Keypair.isValidPublicKey(opts.reviewer)) {
                    throw new Error("Reviewer is invalid");
                }

                var attributes = {
                    ext: new xdr.ManageForfeitRequestOpExt(xdr.LedgerVersion.emptyVersion()) };

                attributes.amount = Operation._toXDRAmount(opts.amount);
                attributes.totalFee = Operation._toXDRAmount(opts.totalFee);
                attributes.balance = Keypair.fromBalanceId(opts.balance).xdrBalanceId();
                attributes.details = opts.details;
                attributes.reviewer = Keypair.fromAccountId(opts.reviewer).xdrAccountId();
                var manageRequest = new xdr.ManageForfeitRequestOp(attributes);

                var opAttributes = {};
                opAttributes.body = xdr.OperationBody.manageForfeitRequest(manageRequest);
                Operation.setSourceAccount(opAttributes, opts);
                return new xdr.Operation(opAttributes);
            }
        },
        recover: {

            /**
             * Create a recovery op.
             * @param {object} opts
             * @param {string} opts.account - The target account to recover
             * @param {string} opts.oldSigner - Signer to recover.
             * @param {string} opts.newSigner - Signer to recover to.
             * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
             * @returns {xdr.RecoverOp}
             */

            value: function recover(opts) {
                if (!Keypair.isValidPublicKey(opts.account)) {
                    throw new TypeError("account is invalid");
                }
                if (!Keypair.isValidPublicKey(opts.oldSigner)) {
                    throw new TypeError("oldSigner is invalid");
                }
                if (!Keypair.isValidPublicKey(opts.newSigner)) {
                    throw new TypeError("newSigner is invalid");
                }

                var attributes = {
                    ext: new xdr.RecoverOpExt(xdr.LedgerVersion.emptyVersion()) };
                attributes.account = Keypair.fromAccountId(opts.account).xdrAccountId();
                attributes.oldSigner = Keypair.fromAccountId(opts.oldSigner).xdrAccountId();
                attributes.newSigner = Keypair.fromAccountId(opts.newSigner).xdrAccountId();
                attributes.action = opts.action;

                var recover = new xdr.RecoverOp(attributes);

                var opAttributes = {};
                opAttributes.body = xdr.OperationBody.recover(recover);
                Operation.setSourceAccount(opAttributes, opts);
                return new xdr.Operation(opAttributes);
            }
        },
        setFees: {

            /**
             * Set Fees to the ledger
             * @param {object} opts
             * @param {string} opts.destination - Destination account ID to create an account for.
             * @param {Object} [opts.fee] - Amount in XLM the account should be funded for.
             * @param {string} opts.fee.feeType - feeType
             * @param {string} opts.fee.feeAmount - fee amount
             * @param {bool} [opts.isDelete] - isDelete - true for remove fee
             * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
             * @returns {xdr.SetFeesOp}
             */

            value: function setFees(opts) {
                var attributes = {
                    ext: new xdr.SetFeesOpExt(xdr.LedgerVersion.emptyVersion()) };

                if (!isUndefined(opts.fee)) {
                    if (!Operation.isValidAmount(opts.fee.fixedFee, true)) {
                        throw new TypeError("fixedFee argument must be of type String and represent a non-negative number");
                    }
                    if (!Operation.isValidAmount(opts.fee.percentFee, true, 100)) {
                        throw new TypeError("percentFee argument must be of type String and represent a non-negative number less than 100");
                    }
                    if (isUndefined(opts.fee.feeType)) {
                        throw new TypeError("feeType must be defined");
                    }
                    if (!(opts.fee.feeType instanceof xdr.FeeType)) {
                        throw new TypeError("feeType must be xdr.FeeType");
                    }
                    if (!Operation.isValidAsset(opts.fee.asset)) {
                        throw new TypeError("Asset is invalid");
                    }
                    if (isUndefined(opts.fee.period)) {
                        opts.fee.period = "0"; //<<clear
                    }
                    if (isUndefined(opts.fee.subtype)) {
                        opts.fee.subtype = 0;
                    }
                    if (isUndefined(opts.fee.lowerBound)) {
                        opts.fee.lowerBound = "0";
                    }
                    if (isUndefined(opts.fee.upperBound)) {
                        opts.fee.upperBound = BaseOperation.MAX_INT64_AMOUNT;
                    }

                    var feeData = {
                        fixedFee: Operation._toXDRAmount(opts.fee.fixedFee),
                        percentFee: Operation._toXDRAmount(opts.fee.percentFee),
                        feeType: opts.fee.feeType,
                        asset: opts.fee.asset,
                        subtype: Hyper.fromString(opts.fee.subtype),
                        lowerBound: Operation._toXDRAmount(opts.fee.lowerBound),
                        upperBound: Operation._toXDRAmount(opts.fee.upperBound),
                        ext: new xdr.FeeEntryExt(xdr.LedgerVersion.emptyVersion()) };
                    var data = "type:" + opts.fee.feeType.value + "asset:" + opts.fee.asset + "subtype:" + opts.fee.subtype.toString();
                    if (opts.fee.accountId) {
                        if (!Keypair.isValidPublicKey(opts.fee.accountId)) {
                            throw new TypeError("accountId is invalid");
                        } else {
                            feeData.accountId = Keypair.fromAccountId(opts.fee.accountId).xdrAccountId();
                            data += "accountID:" + opts.fee.accountId;
                        }
                    }
                    if (opts.fee.accountType) {
                        feeData.accountType = Operation._accountTypeFromNumber(opts.fee.accountType);
                        data += "accountType:" + opts.fee.accountType;
                    }
                    feeData.hash = hash(data);
                    var entry = new xdr.FeeEntry(feeData);
                    attributes.fee = entry;
                }

                if (isUndefined(opts.isDelete)) {
                    attributes.isDelete = false;
                } else {
                    attributes.isDelete = opts.isDelete;
                }

                var setfees = new xdr.SetFeesOp(attributes);
                var opAttributes = {};
                opAttributes.body = xdr.OperationBody.setFee(setfees);
                Operation.setSourceAccount(opAttributes, opts);
                return new xdr.Operation(opAttributes);
            }
        },
        setOptions: {

            /**
             * Returns an XDR SetOptionsOp. A "set options" operations set or clear account flags,
             * set the account's inflation destination, and/or add new signers to the account.
             * The flags used in `opts.clearFlags` and `opts.setFlags` can be the following:
             *   - `{@link AuthRequiredFlag}`
             *   - `{@link AuthRevocableFlag}`
             *   - `{@link AuthImmutableFlag}`
             *
             * It's possible to set/clear multiple flags at once using logical or.
             * @param {object} opts
             * @param {number|string} [opts.masterWeight] - The master key weight.
             * @param {number|string} [opts.lowThreshold] - The sum weight for the low threshold.
             * @param {number|string} [opts.medThreshold] - The sum weight for the medium threshold.
             * @param {number|string} [opts.highThreshold] - The sum weight for the high threshold.
             * @param {object} [opts.signer] - Add or remove a signer from the account. The signer is
             *                                 deleted if the weight is 0.
             * @param {string} [opts.signer.pubKey] - The public key of the new signer (old `address` field name is deprecated).
             * @param {number|string} [opts.signer.weight] - The weight of the new signer (0 to delete or 1-255)
             * @param {number|string} [opts.signer.signerType] - The type of the new signer
             * @param {number|string} [opts.signer.identity] - The identity of the new signer
             * * @param {string} [opts.signer.name] - Name of the signer
             * @param {string} [opts.source] - The source account (defaults to transaction source).
             * @returns {xdr.SetOptionsOp}
             * @see [Account flags](https://www.stellar.org/developers/guides/concepts/accounts.html#flags)
             */

            value: function setOptions(opts) {
                var attributes = {
                    ext: new xdr.SetOptionsOpExt(xdr.LedgerVersion.emptyVersion()) };

                var weightCheckFunction = function (value, name) {
                    if (value >= 0 && value <= 255) {
                        return true;
                    } else {
                        throw new Error("" + name + " value must be between 0 and 255");
                    }
                };
                attributes.masterWeight = Operation._checkUnsignedIntValue("masterWeight", opts.masterWeight, weightCheckFunction);
                attributes.lowThreshold = Operation._checkUnsignedIntValue("lowThreshold", opts.lowThreshold, weightCheckFunction);
                attributes.medThreshold = Operation._checkUnsignedIntValue("medThreshold", opts.medThreshold, weightCheckFunction);
                attributes.highThreshold = Operation._checkUnsignedIntValue("highThreshold", opts.highThreshold, weightCheckFunction);

                if (opts.signer) {
                    if (opts.signer.address) {
                        console.warn("signer.address is deprecated. Use signer.pubKey instead.");
                        opts.signer.pubKey = opts.signer.address;
                    }

                    if (!Keypair.isValidPublicKey(opts.signer.pubKey)) {
                        throw new Error("signer.pubKey is invalid");
                    }

                    opts.signer.weight = Operation._checkUnsignedIntValue("signer.weight", opts.signer.weight, weightCheckFunction);
                    opts.signer.signerType = Operation._checkUnsignedIntValue("signer.signerType", opts.signer.signerType);
                    if (isUndefined(opts.signer.signerType)) {
                        throw new Error("signer.signerType is invalid");
                    }

                    opts.signer.identity = Operation._checkUnsignedIntValue("signer.identity", opts.signer.identity);
                    if (isUndefined(opts.signer.identity)) {
                        throw new Error("signer.identity is invalid");
                    }

                    var signerName = "";
                    if (!isUndefined(opts.signer.name) && opts.signer.name.length > 0) {
                        if (opts.signer.name.length > 256) {
                            throw new Error("Signer name must be less that 256 chars");
                        }
                        signerName = opts.signer.name;
                    }

                    var signerExt = new xdr.SignerExt(xdr.LedgerVersion.emptyVersion());
                    attributes.signer = new xdr.Signer({
                        pubKey: Keypair.fromAccountId(opts.signer.pubKey).xdrAccountId(),
                        weight: opts.signer.weight,
                        signerType: opts.signer.signerType,
                        identity: opts.signer.identity,
                        name: signerName,
                        ext: signerExt });
                }

                if (opts.trustData) {
                    if (isUndefined(opts.trustData.action)) {
                        throw new Error("trustData.action is not defined");
                    }
                    if (!Keypair.isValidPublicKey(opts.trustData.allowedAccount)) {
                        throw new Error("trustData.allowedAccount is invalid");
                    }
                    if (!Keypair.isValidBalanceKey(opts.trustData.balanceToUse)) {
                        throw new Error("trustData.balanceToUse is invalid");
                    }
                    var trust = new xdr.TrustEntry({
                        allowedAccount: Keypair.fromAccountId(opts.trustData.allowedAccount).xdrAccountId(),
                        balanceToUse: Keypair.fromBalanceId(opts.trustData.balanceToUse).xdrBalanceId(),
                        ext: new xdr.TrustEntryExt(xdr.LedgerVersion.emptyVersion()) });

                    attributes.trustData = new xdr.TrustData({
                        trust: trust,
                        action: opts.trustData.action,
                        ext: new xdr.TrustDataExt(xdr.LedgerVersion.emptyVersion()) });
                }

                var setOptionsOp = new xdr.SetOptionsOp(attributes);

                var opAttributes = {};
                opAttributes.body = xdr.OperationBody.setOption(setOptionsOp);
                Operation.setSourceAccount(opAttributes, opts);
                return new xdr.Operation(opAttributes);
            }
        },
        manageAccount: {

            /**
             * Returns an XDR ManageAccountOp. A "manage account" operations block|ublocks account.
             * @param {object} opts
             * @param {string} opts.account - Account to be managed.
             * @param {boolean} [opts.block] - True to block account.
             * @returns {xdr.ManageAccountOp}
             */

            value: function manageAccount(opts) {
                var attributes = {
                    ext: new xdr.ManageAccountOpExt(xdr.LedgerVersion.emptyVersion())
                };

                if (!Keypair.isValidPublicKey(opts.account)) {
                    throw new Error("account is invalid");
                }

                attributes.account = Keypair.fromAccountId(opts.account).xdrAccountId();
                if (isUndefined(opts.blockReasonsToAdd)) {
                    opts.blockReasonsToAdd = 0;
                }
                if (isUndefined(opts.blockReasonsToRemove)) {
                    opts.blockReasonsToRemove = 0;
                }

                if (isUndefined(opts.accountType)) {
                    throw new Error("accountType should be defined");
                }

                attributes.accountType = Operation._accountTypeFromNumber(opts.accountType);
                attributes.blockReasonsToAdd = opts.blockReasonsToAdd;
                attributes.blockReasonsToRemove = opts.blockReasonsToRemove;

                var manageAccountOp = new xdr.ManageAccountOp(attributes);

                var opAttributes = {};
                opAttributes.body = xdr.OperationBody.manageAccount(manageAccountOp);
                Operation.setSourceAccount(opAttributes, opts);
                return new xdr.Operation(opAttributes);
            }
        },
        manageBalance: {

            /**
             * Returns an XDR ManageBalanceOp. A "manage account" operations creates|deletes balance for account.
             * @param {object} opts
             * @param {string} opts.destination - Account to create account for.
             * @param {xdr.ManageBalanceAction} – Delete or create
             * @returns {xdr.ManageBalanceOp}
             */

            value: function manageBalance(opts) {
                var attributes = {
                    ext: new xdr.ManageBalanceOpExt(xdr.LedgerVersion.emptyVersion())
                };

                if (!Keypair.isValidPublicKey(opts.destination)) {
                    throw new Error("account is invalid");
                }
                if (!(opts.action instanceof xdr.ManageBalanceAction)) {
                    throw new TypeError("action argument should be value of xdr.ManageBalanceAction enum");
                }
                if (!Operation.isValidAsset(opts.asset)) {
                    throw new TypeError("asset is invalid");
                }

                attributes.destination = Keypair.fromAccountId(opts.destination).xdrAccountId();
                attributes.action = opts.action;
                attributes.asset = opts.asset;

                var manageBalanceOp = new xdr.ManageBalanceOp(attributes);

                var opAttributes = {};
                opAttributes.body = xdr.OperationBody.manageBalance(manageBalanceOp);
                Operation.setSourceAccount(opAttributes, opts);
                return new xdr.Operation(opAttributes);
            }
        },
        reviewPaymentRequest: {
            value: function reviewPaymentRequest(opts) {
                var attributes = {
                    ext: new xdr.ReviewPaymentRequestOpExt(xdr.LedgerVersion.emptyVersion())
                };

                if (isUndefined(opts.paymentId)) {
                    throw new Error("paymentId should be defined");
                }
                if (isUndefined(opts.accept)) {
                    throw new TypeError("accept should be defined");
                }

                if (!isUndefined(opts.rejectReason)) {
                    attributes.rejectReason = opts.rejectReason;
                }

                attributes.paymentId = UnsignedHyper.fromString(opts.paymentId);
                attributes.accept = opts.accept;

                var reviewPaymentRequestOp = new xdr.ReviewPaymentRequestOp(attributes);

                var opAttributes = {};
                opAttributes.body = xdr.OperationBody.reviewPaymentRequest(reviewPaymentRequestOp);
                Operation.setSourceAccount(opAttributes, opts);
                return new xdr.Operation(opAttributes);
            }
        },
        manageAssetPair: {

            /**
             * Returns an XDR ManageAssetPairOp. A "manage asset pair" operations creates|updates asset pair.
             * @param {object} opts
             * @param {string} opts.base - base asset
             * @param {string} opts.quote - quote asset
             * @param {number|string} opts.policies - asset pair policies
             * @param {number|string} opts.physicalPriceCorrection - correction of physical price in percents. If physical price is set and restriction by physical price set, mininal price for offer for this pair will be physicalPrice * physicalPriceCorrection
             * @param {number|string} opts.maxPriceStep - max price step in percent. User is allowed to set offer with price < (1 - maxPriceStep)*currentPrice and > (1 + maxPriceStep)*currentPrice
             * @param {xdr.ManageAssetPairAction} – Create or update
             * @returns {xdr.ManageBalanceOp}
             */

            value: function manageAssetPair(opts) {
                var attributes = {
                    ext: new xdr.ManageAssetPairOpExt(xdr.LedgerVersion.emptyVersion())
                };
                if (!Operation.isValidAsset(opts.base)) {
                    throw new TypeError("base is invalid");
                }

                if (!Operation.isValidAsset(opts.quote)) {
                    throw new TypeError("quote is invalid");
                }

                if (!(opts.action instanceof xdr.ManageAssetPairAction)) {
                    throw new TypeError("action argument should be value of xdr.ManageAssetPairAction enum");
                }

                if (isUndefined(opts.policies)) {
                    throw new TypeError("policies are not defined");
                }

                if (!Operation.isValidAmount(opts.physicalPriceCorrection, true)) {
                    throw new TypeError("physicalPriceCorrection argument must be of type String and represent a positive number or zero");
                }

                if (!Operation.isValidAmount(opts.maxPriceStep, true)) {
                    throw new TypeError("maxPriceStep argument must be of type String and represent a positive number or zero");
                }

                attributes.base = opts.base;
                attributes.quote = opts.quote;
                attributes.policies = opts.policies;
                attributes.action = opts.action;
                attributes.physicalPriceCorrection = Operation._toXDRAmount(opts.physicalPriceCorrection);
                // won't be updated
                attributes.physicalPrice = Operation._toXDRAmount("0");
                attributes.maxPriceStep = Operation._toXDRAmount(opts.maxPriceStep);

                var manageAssetPairOp = new xdr.ManageAssetPairOp(attributes);

                var opAttributes = {};
                opAttributes.body = xdr.OperationBody.manageAssetPair(manageAssetPairOp);
                Operation.setSourceAccount(opAttributes, opts);
                return new xdr.Operation(opAttributes);
            }
        },
        manageOffer: {

            /**
             * Returns an XDR ManageOffer. A "manage offer" operations creates|deletes offer.
             * @param {object} opts
             * @param {string} opts.baseBalance
             * @param {string} opts.quoteBalance
             * @param {boolean} opts.isBuy - if true - buys base asset, false - sells base asset
             * @param {number|string} opts.amount - Amount of the base asset
             * @param {number|string} opts.price - Price of the offer
             * @param [number|string] opts.offerID - offer id, 0 to create new offer. Else deletes offer.
             * @returns {xdr.ManageBalanceOp}
             */

            value: function manageOffer(opts) {
                var attributes = {
                    ext: new xdr.ManageOfferOpExt(xdr.LedgerVersion.emptyVersion())
                };
                if (!Keypair.isValidBalanceKey(opts.baseBalance)) {
                    throw new Error("baseBalance is invalid");
                }

                if (!Keypair.isValidBalanceKey(opts.quoteBalance)) {
                    throw new Error("quoteBalance is invalid");
                }

                if (typeof opts.isBuy !== "boolean") {
                    throw new Error("isBuy must be boolean");
                }

                if (!Operation.isValidAmount(opts.amount, true)) {
                    throw new TypeError("amount argument must be of type String and represent a positive number or zero");
                }
                attributes.amount = Operation._toXDRAmount(opts.amount);

                if (!Operation.isValidAmount(opts.price, true)) {
                    throw new TypeError("price argument must be of type String and represent a positive number or zero");
                }
                attributes.price = Operation._toXDRAmount(opts.price);

                if (!Operation.isValidAmount(opts.fee, true)) {
                    throw new TypeError("fee argument must be of type String and represent a positive number or zero");
                }
                attributes.fee = Operation._toXDRAmount(opts.fee);

                if (isUndefined(opts.offerID)) {
                    throw new TypeError("offerID must be specified");
                }

                attributes.offerId = UnsignedHyper.fromString(opts.offerID);
                attributes.baseBalance = Keypair.fromBalanceId(opts.baseBalance).xdrBalanceId();
                attributes.quoteBalance = Keypair.fromBalanceId(opts.quoteBalance).xdrBalanceId();
                attributes.isBuy = opts.isBuy;
                attributes.action = opts.action;

                var manageOfferOp = new xdr.ManageOfferOp(attributes);

                var opAttributes = {};
                opAttributes.body = xdr.OperationBody.manageOffer(manageOfferOp);
                Operation.setSourceAccount(opAttributes, opts);
                return new xdr.Operation(opAttributes);
            }
        },
        manageInvoice: {
            value: function manageInvoice(opts) {
                var attributes = {
                    ext: new xdr.ManageInvoiceOpExt(xdr.LedgerVersion.emptyVersion())
                };
                if (!Keypair.isValidPublicKey(opts.sender)) {
                    throw new Error("sender is invalid");
                }
                if (!Keypair.isValidBalanceKey(opts.receiverBalance)) {
                    throw new Error("receiverBalance is invalid");
                }
                if (!Operation.isValidAmount(opts.amount, true)) {
                    throw new TypeError("amount argument must be of type String and represent a positive number or zero");
                }
                attributes.amount = Operation._toXDRAmount(opts.amount);

                if (isUndefined(opts.invoiceId)) {
                    throw new TypeError("invoiceId must be specified");
                }

                attributes.invoiceId = UnsignedHyper.fromString(opts.invoiceId);
                attributes.sender = Keypair.fromAccountId(opts.sender).xdrAccountId();
                attributes.receiverBalance = Keypair.fromBalanceId(opts.receiverBalance).xdrBalanceId();

                var manageInvoiceOp = new xdr.ManageInvoiceOp(attributes);

                var opAttributes = {};
                opAttributes.body = xdr.OperationBody.manageInvoice(manageInvoiceOp);
                Operation.setSourceAccount(opAttributes, opts);
                return new xdr.Operation(opAttributes);
            }
        },
        setLimits: {
            value: function setLimits() {
                var opts = arguments[0] === undefined ? {} : arguments[0];

                var attributes = {
                    ext: new xdr.SetLimitsOpExt(xdr.LedgerVersion.emptyVersion()),
                    limits: new xdr.Limits({
                        dailyOut: Operation._toXDRAmount(opts.limits.dailyOut),
                        weeklyOut: Operation._toXDRAmount(opts.limits.weeklyOut),
                        monthlyOut: Operation._toXDRAmount(opts.limits.monthlyOut),
                        annualOut: Operation._toXDRAmount(opts.limits.annualOut),
                        ext: new xdr.LimitsExt(xdr.LedgerVersion.emptyVersion())
                    })
                };
                if (opts.account) {
                    if (!Keypair.isValidPublicKey(opts.account)) {
                        throw new Error("account is invalid");
                    }
                    attributes.account = Keypair.fromAccountId(opts.account).xdrAccountId();
                } else if (opts.accountType) {
                    attributes.accountType = Operation._accountTypeFromNumber(opts.accountType);
                }
                var setLimitsOp = new xdr.SetLimitsOp(attributes);

                var opAttributes = {};
                opAttributes.body = xdr.OperationBody.setLimit(setLimitsOp);
                Operation.setSourceAccount(opAttributes, opts);
                return new xdr.Operation(opAttributes);
            }
        },
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
                result.type = operation.body()["switch"]().name;
                switch (operation.body()["switch"]().name) {
                    case "createAccount":
                        result.destination = accountIdtoAddress(attrs.destination());
                        result.accountType = attrs.accountType().value;
                        result.policies = attrs.policies();

                        if (attrs.referrer()) {
                            result.referrer = accountIdtoAddress(attrs.referrer());
                        }
                        break;
                    case "payment":
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
                    case "manageAccount":
                        result.account = accountIdtoAddress(attrs.account());
                        result.blockReasonsToAdd = attrs.blockReasonsToAdd();
                        result.blockReasonsToRemove = attrs.blockReasonsToRemove();
                        result.accountType = attrs.accountType().value;
                        break;
                    case "manageForfeitRequest":
                        result.amount = Operation._fromXDRAmount(attrs.amount());
                        result.totalFee = Operation._fromXDRAmount(attrs.totalFee());
                        result.balance = balanceIdtoString(attrs.balance());
                        result.details = attrs.details();
                        result.reviewer = accountIdtoAddress(attrs.reviewer());
                        break;
                    case "recover":
                        result.account = accountIdtoAddress(attrs.account());
                        result.oldSigner = accountIdtoAddress(attrs.oldSigner());
                        result.newSigner = accountIdtoAddress(attrs.newSigner());
                        break;
                    case "reviewRecoveryRequest":
                        result.accept = attrs.accept();
                        result.requestId = attrs.requestId().toString();
                        result.oldAccount = accountIdtoAddress(attrs.oldAccount());
                        result.newAccount = accountIdtoAddress(attrs.newAccount());
                        break;
                    case "manageBalance":
                        result.action = attrs.action();
                        result.destination = accountIdtoAddress(attrs.destination());
                        result.asset = attrs.asset();
                        break;
                    case "reviewPaymentRequest":
                        result.accept = attrs.accept();
                        result.paymentId = attrs.paymentId().toString();
                        if (attrs.rejectReason()) {
                            result.rejectReason = attrs.rejectReason();
                        }
                        break;
                    case "manageAsset":
                        ManageAssetBuilder.manageAssetToObject(result, attrs);
                        break;
                    case "createPreissuanceRequest":
                        PreIssuanceRequestOpBuilder.preIssuanceRequestOpToObject(result, attrs);
                        break;
                    case "setLimit":
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
                        result.amount = Operation._fromXDRAmount(attrs.amount());
                        result.price = Operation._fromXDRAmount(attrs.price());
                        result.fee = Operation._fromXDRAmount(attrs.fee());
                        result.isBuy = attrs.isBuy();
                        result.baseBalance = balanceIdtoString(attrs.baseBalance());
                        result.quoteBalance = balanceIdtoString(attrs.quoteBalance());
                        result.offerID = attrs.offerId().toString();
                        break;
                    case "manageInvoice":
                        result.amount = Operation._fromXDRAmount(attrs.amount());
                        result.sender = accountIdtoAddress(attrs.sender());
                        result.receiverBalance = balanceIdtoString(attrs.receiverBalance());
                        result.invoiceId = attrs.invoiceId().toString();
                        break;
                    case "manageAssetPair":
                        result.action = attrs.action();
                        result.base = attrs.base();
                        result.quote = attrs.quote();
                        result.policies = attrs.policies();
                        result.physicalPriceCorrection = Operation._fromXDRAmount(attrs.physicalPriceCorrection());
                        result.maxPriceStep = Operation._fromXDRAmount(attrs.maxPriceStep());
                        break;
                    case "reviewRequest":
                        ReviewRequestBuilder.reviewRequestToObject(result, attrs);
                        break;
                    case "createIssuanceRequest":
                        CreateIssuanceRequestBuilder.createIssuanceRequestOpToObject(result, attrs);
                        break;
                    default:
                        throw new Error("Unknown operation");

                }
                return result;
            }
        }
    });

    return Operation;
})(BaseOperation);