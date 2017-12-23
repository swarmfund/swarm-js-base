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
            externalDetails: "External details",
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
        expect(obj.withdrawal.externalDetails).to.be.equal(opts.externalDetails);
    });
});