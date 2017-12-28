import { default as xdr } from "../generated/stellar-xdr_generated";
import isUndefined from 'lodash/isUndefined';
import { BaseOperation } from './base_operation';
import { Keypair } from "../keypair";
import { UnsignedHyper, Hyper } from "js-xdr";

export class SaleRequestBuilder {

    /**
     * Creates operation to create withdraw request with autoconversion
     * @param {object} opts
     * @param {string} opts.requestID - ID of the request. 0 - to create new;
     * @param {string} opts.baseAsset - asset for which sale will be performed
     * @param {string} opts.quoteAsset - asset in which participation will be accepted
     * @param {string} opts.startTime - start time of the sale
     * @param {string} opts.endTime - close time of the sale
     * @param {string} opts.price - price for 1 baseAsset in terms of quote asset
     * @param {string} opts.softCap - minimum amount of quote asset to be received at which sale will be considered a successful
     * @param {string} opts.hardCap - max amount of quote asset to be received
     * @param {object} opts.details - sale specific details
     * @param {object} opts.details.name - name of the sale
     * @param {object} opts.details.short_description - short description of the sale
     * @param {object} opts.details.desciption - sale specific details
     * @param {object} opts.details.logo - details of the logo
     * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
     * @returns {xdr.CreateSaleCreationRequestOp}
     */
    static createSaleCreationRequest(opts) {
        let attrs = {};

        if (!BaseOperation.isValidAsset(opts.baseAsset)) {
            throw new Error("opts.baseAsset is invalid");
        }
        attrs.baseAsset = opts.baseAsset;

        if (!BaseOperation.isValidAsset(opts.quoteAsset)) {
            throw new Error("opts.quoteAsset is invalid");
        }
        attrs.quoteAsset = opts.quoteAsset;

        if (isUndefined(opts.startTime)) {
            throw new Error("opts.startTime is invalid");
        }
        attrs.startTime = UnsignedHyper.fromString(opts.startTime);

        if (isUndefined(opts.endTime)) {
            throw new Error("opts.endTime is invalid");
        }
        attrs.endTime = UnsignedHyper.fromString(opts.endTime);

        if (!BaseOperation.isValidAmount(opts.price, false)) {
            throw new Error("opts.price is invalid");
        }
        attrs.price = BaseOperation._toUnsignedXDRAmount(opts.price);

        if (!BaseOperation.isValidAmount(opts.softCap, true)) {
            throw new Error("opts.price is invalid");
        }
        attrs.softCap = BaseOperation._toUnsignedXDRAmount(opts.softCap);

        if (!BaseOperation.isValidAmount(opts.hardCap, true)) {
            throw new Error("opts.hardCap is invalid");
        }
        attrs.hardCap = BaseOperation._toUnsignedXDRAmount(opts.hardCap);

        SaleRequestBuilder.validateDetail(opts.details);
        attrs.details = JSON.stringify(opts.details);
        attrs.ext = new xdr.SaleCreationRequestExt(xdr.LedgerVersion.emptyVersion());
        let request = new xdr.SaleCreationRequest(attrs);

        if (isUndefined(opts.requestID)) {
            opts.requestID = "0";
        }

        let withdrawRequestOp = new xdr.CreateSaleCreationRequestOp({
            requestId: UnsignedHyper.fromString(opts.requestID),
            request: request,
            ext: new xdr.CreateSaleCreationRequestOpExt(xdr.LedgerVersion.emptyVersion())
        });
        let opAttributes = {};
        opAttributes.body = xdr.OperationBody.createSaleRequest(withdrawRequestOp);
        BaseOperation.setSourceAccount(opAttributes, opts);
        return new xdr.Operation(opAttributes);
    }

    static validateDetail(details) {
        if (isUndefined(details)) {
            throw new Error("details is invalid");
        }

        if (isUndefined(details.short_description)) {
            throw new Error("details.short_description is invalid");
        }

        if (isUndefined(details.description)) {
            throw new Error("details.description is invalid");
        }

        if (isUndefined(details.logo)) {
            throw new Error("details.logo is invalid");
        }

        if (isUndefined(details.name)) {
            throw new Error("details.name is invalid");
        }
    }

    static crateSaleCreationRequestToObject(result, attrs) {
        result.requestID = attrs.requestId().toString();
        let request = attrs.request();
        result.baseAsset = request.baseAsset();
        result.quoteAsset = request.quoteAsset();
        result.startTime = request.startTime().toString();
        result.endTime = request.endTime().toString();
        result.price = BaseOperation._fromXDRAmount(request.price());
        result.softCap = BaseOperation._fromXDRAmount(request.softCap());
        result.hardCap = BaseOperation._fromXDRAmount(request.hardCap());
        result.details = JSON.parse(request.details());
    }

    /**
     * Creates operation to check sale state
     * @param {object} opts
     * @param {string} [opts.source] - The source account for the operation. Defaults to the transaction's source account.
     * @returns {xdr.CheckSaleStateOp}
     */
    static checkSaleState(opts) {
        let attrs = {};

        let checkSaleStateOp = new xdr.CheckSaleStateOp({
            ext: new xdr.CheckSaleStateOpExt(xdr.LedgerVersion.emptyVersion())
        });
        let opAttributes = {};
        opAttributes.body = xdr.OperationBody.checkSaleState(checkSaleStateOp);
        BaseOperation.setSourceAccount(opAttributes, opts);
        return new xdr.Operation(opAttributes);
    }

    static checkSaleStateToObject(result, attrs) {
       // nothing to add here
    }
}