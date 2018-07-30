import {default as xdr} from "../generated/stellar-xdr_generated";
import isUndefined from 'lodash/isUndefined';
import {BaseOperation} from './base_operation';
import {Keypair} from "../keypair";
import {UnsignedHyper, Hyper} from "js-xdr";
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
     * @param {number|string} opts.tasksToAdd - new tasks for reviewable request to be accomplished before fulfill
     * @param {number|string} opts.tasksToRemove - tasks, which were done by the reviewer and should be removed
     * @param {string} opts.ExternalDetails - the reviewer's commentary
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

        if (isUndefined(opts.tasksToAdd)) {
            throw new Error("opts.tasksToAdd is invalid");
        }

        if (isUndefined(opts.tasksToRemove)) {
            throw new Error("opts.tasksToRemove is invalid");
        }

        let reviewDetails = new xdr.ReviewDetails({
            tasksToAdd: opts.tasksToAdd,
            tasksToRemove: opts.tasksToRemove,
            externalDetails: JSON.stringify(opts.externalDetails),
            ext: new xdr.ReviewDetailsExt(xdr.LedgerVersion.emptyVersion())
        });

        attrs.ext = new xdr.ReviewRequestOpExt.addTasksToReviewableRequest(reviewDetails);

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

    /**
     * Creates operation to review aml alert request
     * @param {object} opts
     * @param {string} opts.requestID - request ID
     * @param {string} opts.requestHash - Hash of the request to be reviewed
     * @param {number} opts.action - action to be performed over request (xdr.ReviewRequestOpAction)
     * @param {string} opts.reason - Reject reason
     * @param {string} opts.comment - Comment to review
     * @param {string} [opts.source] - The source account for the payment. Defaults to the transaction's source account.
     * @returns {xdr.ReviewRequestOp}
     */
    static reviewAmlAlertRequest(opts) {
        if (isUndefined(opts.comment)) {
            throw new Error("opts.comment is invalid");
        }

        let attrs = ReviewRequestBuilder._prepareAttrs(opts);

        attrs.requestDetails = new xdr.ReviewRequestOpRequestDetails.amlAlert(new xdr.AmlAlertDetails({
            ext: new xdr.AmlAlertDetailsExt(xdr.LedgerVersion.emptyVersion()),
            comment: opts.comment,
        }));

        return ReviewRequestBuilder._createOp(opts, attrs);
    }

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
    static reviewTwoStepWithdrawRequest(opts) {
        if (isUndefined(opts.externalDetails)) {
            throw new Error("opts.externalDetails is invalid");
        }

        let attrs = ReviewRequestBuilder._prepareAttrs(opts);

        attrs.requestDetails = new xdr.ReviewRequestOpRequestDetails.twoStepWithdrawal(new xdr.WithdrawalDetails({
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

        let rawLimitsV2Entry = {};

        if(isUndefined(opts.newLimits.id)) {
            throw new Error('opts.newLimits.id is not defined');
        }
        rawLimitsV2Entry.id = UnsignedHyper.fromString(opts.newLimits.id);

        if (!isUndefined(opts.newLimits.accountID) && !isUndefined(opts.newLimits.accountType)) {
            throw new Error('opts.newLimits.accountID and opts.newLimits.accountType cannot be set for same limits');
        }

        if (!isUndefined(opts.newLimits.accountID)) {
            if (!Keypair.isValidPublicKey(opts.newLimits.accountID)) {
                throw new Error('opts.newLimits.accountID is invalid');
            }
            rawLimitsV2Entry.accountId = Keypair.fromAccountId(opts.newLimits.accountID).xdrAccountId();
        }

        if (!isUndefined(opts.newLimits.accountType)) {
            rawLimitsV2Entry.accountType = BaseOperation._accountTypeFromNumber(opts.newLimits.accountType);
        }

        if (isUndefined(opts.newLimits.statsOpType)) {
            throw new Error('opts.newLimits.statsOpType is not defined');
        }
        rawLimitsV2Entry.statsOpType = BaseOperation._statsOpTypeFromNumber(opts.newLimits.statsOpType);

        if (isUndefined(opts.newLimits.assetCode) || !BaseOperation.isValidAsset(opts.newLimits.assetCode)) {
            throw new Error('opts.newLimits.assetCode is invalid');
        }
        rawLimitsV2Entry.assetCode = opts.newLimits.assetCode;

        if (isUndefined(opts.newLimits.isConvertNeeded)) {
            throw new Error('opts.newLimits.isConvertNeeded is not defined');
        }
        rawLimitsV2Entry.isConvertNeeded = opts.newLimits.isConvertNeeded;

        rawLimitsV2Entry.dailyOut = BaseOperation._toUnsignedXDRAmount(opts.newLimits.dailyOut);
        rawLimitsV2Entry.weeklyOut = BaseOperation._toUnsignedXDRAmount(opts.newLimits.weeklyOut);
        rawLimitsV2Entry.monthlyOut = BaseOperation._toUnsignedXDRAmount(opts.newLimits.monthlyOut);
        rawLimitsV2Entry.annualOut = BaseOperation._toUnsignedXDRAmount(opts.newLimits.annualOut);
        rawLimitsV2Entry.ext = new xdr.LimitsV2EntryExt(xdr.LedgerVersion.emptyVersion());

        attrs.requestDetails = new xdr.ReviewRequestOpRequestDetails.limitsUpdate(new xdr.LimitsUpdateDetails({
            newLimitsV2: new xdr.LimitsV2Entry(rawLimitsV2Entry),
            ext: new xdr.LimitsUpdateDetailsExt(xdr.LedgerVersion.emptyVersion()),
        }));

        return ReviewRequestBuilder._createOp(opts, attrs);
    }

    static reviewUpdateKYCRequest(opts) {
        let attrs = ReviewRequestBuilder._prepareAttrs(opts);

        attrs.requestDetails = new xdr.ReviewRequestOpRequestDetails.updateKyc(new xdr.UpdateKycDetails({
            tasksToAdd: opts.tasksToAdd,
            tasksToRemove: opts.tasksToRemove,
            externalDetails: JSON.stringify(opts.externalDetails),
            ext: new xdr.UpdateKycDetailsExt(xdr.LedgerVersion.emptyVersion())
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
                let newLimitsV2 = attrs.requestDetails().limitsUpdate().newLimitsV2();

                result.limitsUpdate = {
                    newLimits: {
                        id: newLimitsV2.id().toString(),
                        statsOpType: newLimitsV2.statsOpType().value,
                        assetCode: newLimitsV2.assetCode(),
                        isConvertNeeded: newLimitsV2.isConvertNeeded(),
                        dailyOut: BaseOperation._fromXDRAmount(newLimitsV2.dailyOut()),
                        weeklyOut: BaseOperation._fromXDRAmount(newLimitsV2.weeklyOut()),
                        monthlyOut: BaseOperation._fromXDRAmount(newLimitsV2.monthlyOut()),
                        annualOut: BaseOperation._fromXDRAmount(newLimitsV2.annualOut())
                    }
                };

                if (newLimitsV2.accountId()) {
                    result.limitsUpdate.newLimits.accountID = BaseOperation.accountIdtoAddress(newLimitsV2.accountId());
                }

                if (newLimitsV2.accountType()) {
                    result.limitsUpdate.newLimits.accountType = newLimitsV2.accountType().value;
                }

                break;
            }
            case xdr.ReviewableRequestType.twoStepWithdrawal(): {
                result.twoStepWithdrawal = {
                    externalDetails: attrs.requestDetails().twoStepWithdrawal().externalDetails(),
                };
                break;
            }
            case xdr.ReviewableRequestType.updateKyc(): {
                result.updateKyc = {
                    tasksToAdd: attrs.requestDetails().updateKyc().tasksToAdd(),
                    tasksToRemove: attrs.requestDetails().updateKyc().tasksToRemove(),
                    externalDetails: attrs.requestDetails().updateKyc().externalDetails(),
                };
                break;
            }
            case xdr.ReviewableRequestType.amlAlert(): {
                result.amlAlert = {
                    comment: attrs.requestDetails().amlAlertDetails().comment(),
                };
                break;
            }
        }
        result.action = attrs.action().value;
        result.reason = attrs.reason();

        switch (attrs.ext().switch())
        {
            case xdr.LedgerVersion.addTasksToReviewableRequest(): {
                let reviewDetails = attrs.ext().reviewDetails();
                result.tasksToAdd = reviewDetails.tasksToAdd();
                result.tasksToRemove = reviewDetails.tasksToRemove();
                result.externalDetails = reviewDetails.externalDetails();
                break;
            }
        }
    }
}