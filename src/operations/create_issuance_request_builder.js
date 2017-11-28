import { default as xdr } from "../generated/stellar-xdr_generated";
import isUndefined from 'lodash/isUndefined';
import { BaseOperation } from './base_operation';
import { Keypair } from "../keypair";
import { UnsignedHyper, Hyper } from "js-xdr";

export class CreateIssuanceRequestBuilder {

    /**
     * Creates operation to create issuance request
     * @param {object} opts
     * @param {string} opts.asset - asset to be issued
     * @param {string} opts.amount - amount to be issued
     * @param {string} opts.receiver - balance ID of the receiver
     * @param {string} opts.reference - Reference of the request
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.CreateIssuanceRequestOp}
     */
    static createIssuanceRequest(opts) {
        let attrs = {};
        if (!BaseOperation.isValidAsset(opts.asset)) {
            throw new Error("opts.asset is invalid");
        }

        attrs.asset = opts.asset;

        if (!BaseOperation.isValidAmount(opts.amount)) {
            throw new Error("opts.amount is invalid");
        }

        attrs.amount = BaseOperation._toUnsignedXDRAmount(opts.amount);

        if (!Keypair.isValidBalanceKey(opts.receiver)) {
            throw new Error("receiver is invalid");
        }

        attrs.receiver = Keypair.fromBalanceId(opts.receiver).xdrBalanceId();

        if (!BaseOperation.isValidString(opts.reference, 1, 64)) {
            throw new Error("opts.reference is invalid");
        }

        attrs.ext = new xdr.IssuanceRequestExt(xdr.LedgerVersion.emptyVersion());
        let request = new xdr.IssuanceRequest(attrs);
        let issuanceRequestOp = new xdr.CreateIssuanceRequestOp({
            request: request,
            reference: opts.reference,
            ext: new xdr.CreateIssuanceRequestOpExt(xdr.LedgerVersion.emptyVersion())
        });
        let opAttributes = {};
        opAttributes.body = xdr.OperationBody.createIssuanceRequest(issuanceRequestOp);
        BaseOperation.setSourceAccount(opAttributes, opts);
        return new xdr.Operation(opAttributes);
    }

    static createIssuanceRequestOpToObject(result, attrs) {
        result.reference = attrs.reference();
        let request = attrs.request();
        result.asset = request.asset();
        result.amount = BaseOperation._fromXDRAmount(request.amount());
        result.receiver = BaseOperation.balanceIdtoString(request.receiver());
    }
}