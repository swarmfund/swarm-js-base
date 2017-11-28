import { default as xdr } from "../generated/stellar-xdr_generated";
import isUndefined from 'lodash/isUndefined';
import { BaseOperation } from './base_operation';
import { Keypair } from "../keypair";
import { UnsignedHyper, Hyper } from "js-xdr";
import {Hasher} from '../util/hasher';

export class ReviewRequestBuilder {

    /**
     * Creates operation to review reviewable request
     * @param {object} opts
     * @param {string} opts.requestID - request ID
     * @param {string} opts.requestHash - Hash of the request to be reviewed
     * @param {xdr.ReviewableRequestType} opts.requestType - Type of the request to be reviewed
     * @param {xdr.ReviewRequestOpAction} opts.action - action to be performed over request
     * @param {string} opts.reason - Reject reason
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.ReviewRequestOp}
     */
    static reviewRequest(opts) {
        let attrs = {};
        if (isUndefined(opts.requestID) || opts.requestID == "0") {
            throw new Error("opts.requestID is invalid");
        }

        attrs.requestId = UnsignedHyper.fromString(opts.requestID);
        attrs.requestHash = Hasher.hash(opts.requestHash);

        if (isUndefined(opts.requestType) || !xdr.ReviewableRequestType._byValue.has(opts.requestType)) {
            throw new Error("opts.requestType is invalid");
        }

        attrs.requestType = xdr.ReviewableRequestType._byValue.get(opts.requestType);

        if (isUndefined(opts.action) || !xdr.ReviewRequestOpAction._byValue.has(opts.action)) {
            throw new Error("opts.action is invalid");
        }

        attrs.action = xdr.ReviewRequestOpAction._byValue.get(opts.action);

        if (!BaseOperation.isValidString(opts.reason, 0, 256)) {
            throw new Error("opts.reason is invalid");
        }

        attrs.reason = opts.reason;
        attrs.ext = new xdr.ReviewRequestOpExt(xdr.LedgerVersion.emptyVersion());

        let reviewRequestOp = new xdr.ReviewRequestOp(attrs);
        let opAttributes = {};
        opAttributes.body = xdr.OperationBody.reviewRequest(reviewRequestOp);
        BaseOperation.setSourceAccount(opAttributes, opts);
        return new xdr.Operation(opAttributes);
    }


    static reviewRequestToObject(result, attrs) {
        result.requestID = attrs.requestId().toString();
        result.requestHash = attrs.requestHash().toString('hex');
        result.requestType = attrs.requestType().value;
        result.action = attrs.action().value;
        result.reason = attrs.reason();
        
    }
}