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

var _jsXdr = require("js-xdr");

var UnsignedHyper = _jsXdr.UnsignedHyper;
var Hyper = _jsXdr.Hyper;

var SaleRequestBuilder = require("./sale_request_builder").SaleRequestBuilder;

var ManageSaleBuilder = exports.ManageSaleBuilder = (function () {
    function ManageSaleBuilder() {
        _classCallCheck(this, ManageSaleBuilder);
    }

    _createClass(ManageSaleBuilder, null, {
        createUpdateSaleDetailsRequest: {
            /**
             * Creates request to update manage sale details
             * @param {object} opts
             * @param {number|string} opts.requestID - set to zero to create new request
             * @param {string} opts.saleID - ID of the sale to create new update details request
             * @param {object} opts.newDetails - new sale specific details
             * @param {object} opts.newDetails.name - name of the sale
             * @param {object} opts.newDetails.short_description - short description of the sale
             * @param {object} opts.newDetails.description - sale description
             * @param {object} opts.newDetails.logo - details of the logo
             * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
             * @returns {xdr.ManageSaleOp}
             */

            value: function createUpdateSaleDetailsRequest(opts) {
                if (isUndefined(opts.requestID)) {
                    throw new Error("opts.requestID is invalid");
                }

                if (isUndefined(opts.saleID)) {
                    throw new Error("opts.saleID is invalid");
                }

                SaleRequestBuilder.validateDetail(opts.newDetails);

                var updateSaleDetailsData = new xdr.UpdateSaleDetailsData({
                    requestId: UnsignedHyper.fromString(opts.requestID),
                    newDetails: JSON.stringify(opts.newDetails),
                    ext: new xdr.UpdateSaleDetailsDataExt(xdr.LedgerVersion.emptyVersion()) });

                var manageSaleOp = new xdr.ManageSaleOp({
                    saleId: UnsignedHyper.fromString(opts.saleID),
                    data: new xdr.ManageSaleOpData.createUpdateDetailsRequest(updateSaleDetailsData),
                    ext: new xdr.ManageSaleOpExt(xdr.LedgerVersion.emptyVersion()) });

                var opAttrs = {};
                opAttrs.body = xdr.OperationBody.manageSale(manageSaleOp);
                BaseOperation.setSourceAccount(opAttrs, opts);
                return new xdr.Operation(opAttrs);
            }
        },
        createUpdateSaleEndTimeRequest: {

            /**
             * Creates request to update manage sale end time
             * @param {object} opts
             * @param {number|string} opts.requestID - set to zero to create new request
             * @param {string} opts.saleID - ID of the sale to create new update end time request
             * @param {number|string} opts.newEndTime - new sale end time
             * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
             * @returns {xdr.ManageSaleOp}
             */

            value: function createUpdateSaleEndTimeRequest(opts) {
                if (isUndefined(opts.requestID)) {
                    throw new Error("opts.requestID is invalid");
                }

                if (isUndefined(opts.saleID)) {
                    throw new Error("opts.saleID is invalid");
                }

                if (isUndefined(opts.newEndTime)) {
                    throw new Error("opts.newEndTime is invalid");
                }

                var updateSaleEndTimeData = new xdr.UpdateSaleEndTimeData({
                    requestId: UnsignedHyper.fromString(opts.requestID),
                    newEndTime: UnsignedHyper.fromString(opts.newEndTime),
                    ext: new xdr.UpdateSaleEndTimeDataExt(xdr.LedgerVersion.emptyVersion()) });

                var manageSaleOp = new xdr.ManageSaleOp({
                    saleId: UnsignedHyper.fromString(opts.saleID),
                    data: new xdr.ManageSaleOpData.createUpdateEndTimeRequest(updateSaleEndTimeData),
                    ext: new xdr.ManageSaleOpExt(xdr.LedgerVersion.emptyVersion()) });

                var opAttrs = {};
                opAttrs.body = xdr.OperationBody.manageSale(manageSaleOp);
                BaseOperation.setSourceAccount(opAttrs, opts);
                return new xdr.Operation(opAttrs);
            }
        },
        createPromotionUpdateRequest: {

            /**
             * Creates request to update details of the sale in state "PROMOTION"
             * @param {object} opts
             * @param {string} opts.saleID - ID of the sale to create new promotion update request
             * @param {string} opts.requestID - ID of the request. 0 - to create new;
             * @param {string} opts.baseAsset - asset for which sale will be performed
             * @param {string} opts.defaultQuoteAsset - asset in which hardcap/soft cap will be calculated
             * @param {string} opts.startTime - start time of the sale
             * @param {string} opts.endTime - close time of the sale
             * @param {string} opts.softCap - minimum amount of quote asset to be received at which sale will be considered a successful
             * @param {string} opts.hardCap - max amount of quote asset to be received
             * @param {object} opts.details - sale specific details
             * @param {object} opts.details.name - name of the sale
             * @param {object} opts.details.short_description - short description of the sale
             * @param {object} opts.details.desciption - sale specific details
             * @param {object} opts.details.logo - details of the logo
             * @param {array} opts.quoteAssets - accepted assets
             * @param {object} opts.quoteAssets.price - price for 1 baseAsset in terms of quote asset
             * @param {object} opts.quoteAssets.asset - asset code of the quote asset
             * @param {object} opts.saleType - states sale type
             * @param {string} opts.baseAssetForHardCap - specifies the amount of base asset required for hard cap
             * @param {SaleState} opts.saleState - specifies the initial state of the sale
             * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
             * @returns {xdr.ManageSaleOp}
             */

            value: function createPromotionUpdateRequest(opts) {
                if (isUndefined(opts.saleID)) {
                    throw new Error("opts.saleID is invalid");
                }

                var request = SaleRequestBuilder.validateSaleCreationRequest(opts);

                var promotionUpdateData = new xdr.PromotionUpdateData({
                    requestId: UnsignedHyper.fromString(opts.requestID),
                    newPromotionData: request,
                    ext: new xdr.PromotionUpdateDataExt(xdr.LedgerVersion.emptyVersion()) });

                var manageSaleOp = new xdr.ManageSaleOp({
                    saleId: UnsignedHyper.fromString(opts.saleID),
                    data: new xdr.ManageSaleOpData.createPromotionUpdateRequest(promotionUpdateData),
                    ext: new xdr.ManageSaleOpExt(xdr.LedgerVersion.emptyVersion()) });

                var opAttrs = {};
                opAttrs.body = xdr.OperationBody.manageSale(manageSaleOp);
                BaseOperation.setSourceAccount(opAttrs, opts);
                return new xdr.Operation(opAttrs);
            }
        },
        cancelSale: {

            /**
             * Creates manage sale operation for cancel sale
             * @param {object} opts
             * @param {string} opts.saleID - ID of the sale to cancel
             * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
             * @returns {xdr.ManageSaleOp}
             */

            value: function cancelSale(opts) {
                if (isUndefined(opts.saleID)) {
                    throw new Error("opts.saleID is invalid");
                }

                var manageSaleOp = new xdr.ManageSaleOp({
                    saleId: UnsignedHyper.fromString(opts.saleID),
                    data: new xdr.ManageSaleOpData.cancel(),
                    ext: new xdr.ManageSaleOpExt(xdr.LedgerVersion.emptyVersion())
                });

                var opAttrs = {};
                opAttrs.body = xdr.OperationBody.manageSale(manageSaleOp);
                BaseOperation.setSourceAccount(opAttrs, opts);
                return new xdr.Operation(opAttrs);
            }
        },
        setSaleState: {

            /**
             * Sets sale state (only allowed for admins)
             * @param {object} opts
             * @param {string} opts.saleID - ID of the sale to cancel
             * @param {string} opts.saleState - state to set
             * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
             * @returns {xdr.ManageSaleOp}
             */

            value: function setSaleState(opts) {
                if (isUndefined(opts.saleID)) {
                    throw new Error("opts.saleID is invalid");
                }

                if (isUndefined(opts.saleState)) {
                    throw new Error("opts.saleState is invalid");
                }

                var manageSaleOp = new xdr.ManageSaleOp({
                    saleId: UnsignedHyper.fromString(opts.saleID),
                    data: new xdr.ManageSaleOpData.setState(opts.saleState),
                    ext: new xdr.ManageSaleOpExt(xdr.LedgerVersion.emptyVersion())
                });

                var opAttrs = {};
                opAttrs.body = xdr.OperationBody.manageSale(manageSaleOp);
                BaseOperation.setSourceAccount(opAttrs, opts);
                return new xdr.Operation(opAttrs);
            }
        },
        manageSaleToObject: {
            value: function manageSaleToObject(result, attrs) {
                result.saleID = attrs.saleId().toString();
                switch (attrs.data()["switch"]()) {
                    case xdr.ManageSaleAction.createUpdateDetailsRequest():
                        {
                            var data = attrs.data().updateSaleDetailsData();
                            result.requestID = data.requestId().toString();
                            result.newDetails = JSON.parse(data.newDetails());
                            break;
                        }
                    case xdr.ManageSaleAction.setState():
                        {
                            result.saleState = attrs.data().saleState();
                            break;
                        }
                    case xdr.ManageSaleAction.createUpdateEndTimeRequest():
                        {
                            var data = attrs.data().updateSaleEndTimeData();
                            result.requestID = data.requestId().toString();
                            result.newEndTime = data.newEndTime().toString();
                            break;
                        }
                    case xdr.ManageSaleAction.createPromotionUpdateRequest():
                        {
                            var data = attrs.data().promotionUpdateData();
                            result.requestID = data.requestId().toString();
                            var saleCreationRequest = data.newPromotionData();
                            result.baseAsset = saleCreationRequest.baseAsset();
                            result.defaultQuoteAsset = saleCreationRequest.defaultQuoteAsset();
                            result.startTime = saleCreationRequest.startTime().toString();
                            result.endTime = saleCreationRequest.endTime().toString();
                            result.softCap = BaseOperation._fromXDRAmount(saleCreationRequest.softCap());
                            result.hardCap = BaseOperation._fromXDRAmount(saleCreationRequest.hardCap());
                            result.details = JSON.parse(saleCreationRequest.details());
                            result.quoteAssets = [];
                            for (var i = 0; i < saleCreationRequest.quoteAssets().length; i++) {
                                result.quoteAssets.push({
                                    price: BaseOperation._fromXDRAmount(saleCreationRequest.quoteAssets()[i].price()),
                                    asset: saleCreationRequest.quoteAssets()[i].quoteAsset() });
                            }
                            switch (saleCreationRequest.ext()["switch"]()) {
                                case xdr.LedgerVersion.allowToSpecifyRequiredBaseAssetAmountForHardCap():
                                    {
                                        result.baseAssetForHardCap = BaseOperation._fromXDRAmount(saleCreationRequest.ext().extV2().requiredBaseAssetForHardCap());
                                        break;
                                    }
                                case xdr.LedgerVersion.statableSale():
                                    {
                                        result.baseAssetForHardCap = BaseOperation._fromXDRAmount(saleCreationRequest.ext().extV3().requiredBaseAssetForHardCap());
                                        result.saleState = saleCreationRequest.ext().extV3().state();
                                        break;
                                    }
                            }
                            break;
                        }
                }
            }
        }
    });

    return ManageSaleBuilder;
})();