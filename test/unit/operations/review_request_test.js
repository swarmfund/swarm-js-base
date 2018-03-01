import BigNumber from 'bignumber.js';
import { Hyper } from "js-xdr";

describe('ReviewRequest', function () {
    it("Success", function () {
        var opts = {
            requestID: "1",
            requestHash: "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
            requestType: StellarBase.xdr.ReviewableRequestType.assetCreate().value,
            action: StellarBase.xdr.ReviewRequestOpAction.reject().value,
            reason: "Something is invalid"
        }
        let op = StellarBase.ReviewRequestBuilder.reviewRequest(opts);
        var xdr = op.toXDR("hex");
        var operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdr, "hex"));
        var obj = StellarBase.Operation.operationToObject(operation);
        expect(obj.type).to.be.equal("reviewRequest");
        expect(obj.requestID).to.be.equal(opts.requestID);
        expect(obj.requestHash).to.be.equal(opts.requestHash);
        expect(obj.requestType).to.be.equal(opts.requestType);
        expect(obj.action).to.be.equal(opts.action);
        expect(obj.reason).to.be.equal(opts.reason);
    });
    it("Withdraw request success", function () {
        var opts = {
            requestID: "1",
            requestHash: "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
            externalDetails: {details: "External details"},
            action: StellarBase.xdr.ReviewRequestOpAction.reject().value,
            reason: "Something is invalid"
        }
        let op = StellarBase.ReviewRequestBuilder.reviewWithdrawRequest(opts);
        var xdr = op.toXDR("hex");
        var operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdr, "hex"));
        var obj = StellarBase.Operation.operationToObject(operation);
        expect(obj.type).to.be.equal("reviewRequest");
        expect(obj.requestID).to.be.equal(opts.requestID);
        expect(obj.requestHash).to.be.equal(opts.requestHash);
        expect(obj.action).to.be.equal(opts.action);
        expect(obj.reason).to.be.equal(opts.reason);
        expect(obj.withdrawal.externalDetails).to.be.equal(JSON.stringify(opts.externalDetails));
    });
    it("LimitsUpdate request success", function () {
        var opts = {
            requestID: "1",
            requestHash: "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
            newLimits: {
                dailyOut: '100',
                weeklyOut: '200',
                monthlyOut: '300',
                annualOut: '500'
            },
            action: StellarBase.xdr.ReviewRequestOpAction.reject().value,
            reason: "Something is invalid"
        };
        let op = StellarBase.ReviewRequestBuilder.reviewLimitsUpdateRequest(opts);
        var xdr = op.toXDR("hex");
        var operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdr, "hex"));
        var obj = StellarBase.Operation.operationToObject(operation);
        expect(obj.type).to.be.equal("reviewRequest");
        expect(obj.requestID).to.be.equal(opts.requestID);
        expect(obj.requestHash).to.be.equal(opts.requestHash);
        expect(obj.action).to.be.equal(opts.action);
        expect(obj.reason).to.be.equal(opts.reason);
        expect(obj.limitsUpdate.newLimits.dailyOut).to.be.equal(opts.newLimits.dailyOut);
        expect(obj.limitsUpdate.newLimits.weeklyOut).to.be.equal(opts.newLimits.weeklyOut);
        expect(obj.limitsUpdate.newLimits.monthlyOut).to.be.equal(opts.newLimits.monthlyOut);
        expect(obj.limitsUpdate.newLimits.annualOut).to.be.equal(opts.newLimits.annualOut);
    });
    it("Two step Withdraw request success", function () {
        var opts = {
            requestID: "1",
            requestHash: "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
            externalDetails: {details: "External details of two step request"},
            action: StellarBase.xdr.ReviewRequestOpAction.reject().value,
            reason: "Something is invalid"
        }
        let op = StellarBase.ReviewRequestBuilder.reviewTwoStepWithdrawRequest(opts);
        var xdr = op.toXDR("hex");
        var operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdr, "hex"));
        var obj = StellarBase.Operation.operationToObject(operation);
        expect(obj.type).to.be.equal("reviewRequest");
        expect(obj.requestID).to.be.equal(opts.requestID);
        expect(obj.requestHash).to.be.equal(opts.requestHash);
        expect(obj.action).to.be.equal(opts.action);
        expect(obj.reason).to.be.equal(opts.reason);
        expect(obj.twoStepWithdrawal.externalDetails).to.be.equal(JSON.stringify(opts.externalDetails));
    });
});