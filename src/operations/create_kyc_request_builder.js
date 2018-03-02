import {default as xdr} from "../generated/stellar-xdr_generated";
import isUndefined from 'lodash/isUndefined';
import {BaseOperation} from './base_operation';
import {Keypair} from "../keypair";
import {UnsignedHyper, Hyper} from "js-xdr";

export class CreateKYCRequestBuilder {
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
    static createKYCRequest(opts) {
        let attrs = {};

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
        let request = new xdr.ChangeKycRequest(attrs);
        let kycRequestOp = new xdr.CreateKycRequestOp({
            requestId: UnsignedHyper.fromString(opts.requestID),
            changeKycRequest: request,
            ext: new xdr.CreateKycRequestOpExt(xdr.LedgerVersion.emptyVersion()),
        });
        let opAttributes = {};
        opAttributes.body = xdr.OperationBody.createKycRequest(kycRequestOp);
        BaseOperation.setSourceAccount(opAttributes, opts);
        return new xdr.Operation(opAttributes);
    }

    static createKYCRequestOpToObject(result, attrs) {
        result.requestID = attrs.requestId;
        result.updatedAccount = BaseOperation.accountIdtoAddress(attrs.changeKycRequest().updatedAccount());
        result.accountTypeToSet = attrs.changeKycRequest().accountTypeToSet().value;
        result.kycLevel = attrs.changeKycRequest().kycLevel();
        result.kycData = JSON.parse(attrs.changeKycRequest().kycData());
    }
}