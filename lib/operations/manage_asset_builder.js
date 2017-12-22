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

var ManageAssetBuilder = exports.ManageAssetBuilder = (function () {
    function ManageAssetBuilder() {
        _classCallCheck(this, ManageAssetBuilder);
    }

    _createClass(ManageAssetBuilder, null, {
        assetCreationRequest: {

            /**
             * Creates operation to create asset creation request
             * @param {object} opts
             * @param {string} opts.requestID - request ID, if 0 - creates new, updates otherwise
             * @param {string} opts.code - Asset code
             * @param {string} opts.preissuedAssetSigner - accountID of keypair which will sign request for asset to be authrorized to be issued
             * @param {string} opts.maxIssuanceAmount - max amount can be issued of that asset
             * @param {number} opts.policies - asset policies
             * @param {string} opts.initialPreissuedAmount - amount of pre issued tokens available after creation of the asset
             * @param {string} opts.name - Name of the asset
             * @param {string} opts.logoId - logo id for asset picture
             * @param {string} opts.description - desciption of the asset
             * @param {string} opts.externalResourceLink - Link to external resource link
             * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
             * @returns {xdr.ManageAssetOp}
             */

            value: function assetCreationRequest(opts) {
                var attrs = ManageAssetBuilder._createUpdateAttrs(opts);

                if (!Keypair.isValidPublicKey(opts.preissuedAssetSigner)) {
                    throw new Error("opts.preissuedAssetSigner is invalid");
                }

                attrs.preissuedAssetSigner = Keypair.fromAccountId(opts.preissuedAssetSigner).xdrAccountId();

                if (!BaseOperation.isValidAmount(opts.maxIssuanceAmount, true)) {
                    throw new Error("opts.maxIssuanceAmount is invalid");
                }

                attrs.maxIssuanceAmount = BaseOperation._toUnsignedXDRAmount(opts.maxIssuanceAmount);

                if (isUndefined(opts.initialPreissuedAmount)) {
                    opts.initialPreissuedAmount = "0";
                }

                if (!BaseOperation.isValidAmount(opts.initialPreissuedAmount, true)) {
                    throw new Error("opts.initialPreissuedAmount is invalid");
                }

                attrs.initialPreissuedAmount = BaseOperation._toUnsignedXDRAmount(opts.initialPreissuedAmount);

                attrs.ext = new xdr.AssetCreationRequestExt(xdr.LedgerVersion.emptyVersion());

                var assetCreationRequest = new xdr.AssetCreationRequest(attrs);
                return ManageAssetBuilder._createManageAssetOp(opts, new xdr.ManageAssetOpRequest.createAssetCreationRequest(assetCreationRequest));
            }
        },
        assetUpdateRequest: {

            /**
             * Creates operation to create asset update request
             * @param {object} opts
             * @param {string} opts.requestID - request ID, if 0 - creates new, updates otherwise
             * @param {string} opts.code - Asset code
             * @param {string} opts.name - Name of the asset
             * @param {string} opts.description - desciption of the asset
             * @param {string} opts.externalResourceLink - Link to external resource link
             * @param {number} opts.policies - asset policies
             * @param {string} opts.logoId - logo id for asset picture
             * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
             * @returns {xdr.ManageAssetOp}
             */

            value: function assetUpdateRequest(opts) {
                var attrs = ManageAssetBuilder._createUpdateAttrs(opts);
                attrs.ext = new xdr.AssetUpdateRequestExt(xdr.LedgerVersion.emptyVersion());
                var assetUpdateRequest = new xdr.AssetUpdateRequest(attrs);

                return ManageAssetBuilder._createManageAssetOp(opts, new xdr.ManageAssetOpRequest.createAssetUpdateRequest(assetUpdateRequest));
            }
        },
        cancelAssetRequest: {

            /**
             * Creates operation to cancel asset creation/update request
             * @param {object} opts
             * @param {string} opts.requestID - request ID
             * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
             * @returns {xdr.ManageAssetOp}
             */

            value: function cancelAssetRequest(opts) {
                var attrs = {
                    ext: new xdr.CancelAssetRequestExt(xdr.LedgerVersion.emptyVersion())
                };
                var cancelAssetRequest = new xdr.CancelAssetRequest(attrs);

                return ManageAssetBuilder._createManageAssetOp(opts, new xdr.ManageAssetOpRequest.cancelAssetRequest(cancelAssetRequest));
            }
        },
        _getValidDetails: {
            value: function _getValidDetails(opts) {
                if (isUndefined(opts.logoId)) {
                    opts.logoId = "";
                }

                if (isUndefined(opts.name)) {
                    opts.name = "";
                }

                if (isUndefined(opts.description)) {
                    opts.description = "";
                }

                if (isUndefined(opts.externalResourceLink)) {
                    opts.externalResourceLink = "";
                }

                return {
                    logo_id: opts.logoId,
                    name: opts.name,
                    description: opts.description,
                    external_resource_link: opts.externalResourceLink };
            }
        },
        _createUpdateAttrs: {
            value: function _createUpdateAttrs(opts) {
                if (!BaseOperation.isValidAsset(opts.code)) {
                    throw new Error("opts.code is invalid");
                }

                if (isUndefined(opts.policies) || opts.policies < 0) {
                    throw new Error("opts.policies must be nonnegative number");
                }

                var details = ManageAssetBuilder._getValidDetails(opts);

                var attrs = {
                    code: opts.code,
                    policies: opts.policies,
                    details: JSON.stringify(details) };

                return attrs;
            }
        },
        _createManageAssetOp: {
            value: function _createManageAssetOp(opts, request) {
                if (isUndefined(opts.requestID)) {
                    throw new Error("opts.requestID is invalid");
                }

                var assetUpdateOp = new xdr.ManageAssetOp({
                    requestId: UnsignedHyper.fromString(opts.requestID),
                    request: request,
                    ext: new xdr.ManageAssetOpExt(xdr.LedgerVersion.emptyVersion()) });

                var opAttributes = {};
                opAttributes.body = xdr.OperationBody.manageAsset(assetUpdateOp);
                BaseOperation.setSourceAccount(opAttributes, opts);
                return new xdr.Operation(opAttributes);
            }
        },
        manageAssetToObject: {
            value: function manageAssetToObject(result, attrs) {
                result.requestID = attrs.requestId().toString();
                result.requestType = attrs.request()["switch"]().name;
                switch (attrs.request()["switch"]()) {
                    case xdr.ManageAssetAction.createAssetCreationRequest():
                        {
                            var request = attrs.request().createAsset();
                            result.code = request.code();
                            result.preissuedAssetSigner = BaseOperation.accountIdtoAddress(request.preissuedAssetSigner());
                            result.policies = request.policies();
                            result.maxIssuanceAmount = BaseOperation._fromXDRAmount(request.maxIssuanceAmount());
                            result.initialPreissuedAmount = BaseOperation._fromXDRAmount(request.initialPreissuedAmount());
                            result.details = JSON.parse(request.details());
                            break;
                        }
                    case xdr.ManageAssetAction.createAssetUpdateRequest():
                        {
                            var request = attrs.request().updateAsset();
                            result.code = request.code();
                            result.policies = request.policies();
                            result.details = JSON.parse(request.details());
                            break;
                        }
                    case xdr.ManageAssetAction.cancelAssetRequest():
                        {}
                }
            }
        }
    });

    return ManageAssetBuilder;
})();

// nothing to do here