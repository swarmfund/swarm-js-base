import { default as xdr } from "../generated/stellar-xdr_generated";
import isUndefined from 'lodash/isUndefined';
import { BaseOperation } from './base_operation';
import { Keypair } from "../keypair";
import { UnsignedHyper, Hyper } from "js-xdr";
import {Hasher} from '../util/hasher';
import {Operation} from "../operation";

export class ReviewRequestBuilder {

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
    static reviewRequest(opts) {
        let attrs = ReviewRequestBuilder._prepareAttrs(opts);

        if (isUndefined(opts.requestType) || !xdr.ReviewableRequestType._byValue.has(opts.requestType)) {
            throw new Error("opts.requestType is invalid");
        }

        let requestType = xdr.ReviewableRequestType._byValue.get(opts.requestType);
        attrs.requestDetails = new xdr.ReviewRequestOpRequestDetails(requestType);

        return ReviewRequestBuilder._createOp(opts, attrs);
    }

    static _createOp(opts, attrs) {
        let reviewRequestOp = new xdr.ReviewRequestOp(attrs);
        let opAttributes = {};
        opAttributes.body = xdr.OperationBody.reviewRequest(reviewRequestOp);
        BaseOperation.setSourceAccount(opAttributes, opts);
        return new xdr.Operation(opAttributes);
    }

    static _prepareAttrs(opts) {
        let attrs = {};
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
    static reviewWithdrawRequest(opts) {
        if (isUndefined(opts.externalDetails)) {
            throw new Error("opts.externalDetails is invalid");
        }

        let attrs = ReviewRequestBuilder._prepareAttrs(opts);

        attrs.requestDetails = new xdr.ReviewRequestOpRequestDetails.withdraw(new xdr.WithdrawalDetails({
            ext: new xdr.WithdrawalDetailsExt(xdr.LedgerVersion.emptyVersion()),
            externalDetails: JSON.stringify(opts.externalDetails),
        }));

        return ReviewRequestBuilder._createOp(opts, attrs);
    }

    static reviewLimitsUpdateRequest(opts) {
        if (isUndefined(opts.newLimits)) {
            throw new Error("opts.newLimits is invalid");
        }

        let attrs = ReviewRequestBuilder._prepareAttrs(opts);

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

    static reviewRequestToObject(result, attrs) {
        result.requestID = attrs.requestId().toString();
        result.requestHash = attrs.requestHash().toString('hex');
        result.requestType = attrs.requestDetails().switch().value;
        switch (attrs.requestDetails().switch()) {
            case xdr.ReviewableRequestType.withdraw(): {
                result.withdrawal = {
                    externalDetails: attrs.requestDetails().withdrawal().externalDetails(),
                };
                break;
            }
            case xdr.ReviewableRequestType.limitsUpdate(): {
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
        }
        result.action = attrs.action().value;
        result.reason = attrs.reason();
        
    }
}