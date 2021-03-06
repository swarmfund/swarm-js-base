import BigNumber from 'bignumber.js';
import { Hyper } from "js-xdr";

describe('ManageAsset', function () {
    describe('assetCreationRequest', function () {
        it("Success", function () {
            var opts = {
                code: "USD",
                preissuedAssetSigner: "GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ",
                maxIssuanceAmount: "1000.1211",
                policies: 12,
                requestID: "0",
                initialPreissuedAmount: "12.14",
                details: {
                    name: "USD Name",
                }
            }
            let op = StellarBase.ManageAssetBuilder.assetCreationRequest(opts);
            var xdr = op.toXDR("hex");
            var operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdr, "hex"));
            var obj = StellarBase.Operation.operationToObject(operation);
            expect(obj.type).to.be.equal("manageAsset");
            expect(obj.requestID).to.be.equal(opts.requestID);
            expect(obj.requestType).to.be.equal("createAssetCreationRequest");
            expect(obj.code).to.be.equal(opts.code);
            expect(obj.details.name).to.be.equal(opts.details.name);
            expect(obj.preissuedAssetSigner).to.be.equal(opts.preissuedAssetSigner);
            expect(obj.maxIssuanceAmount).to.be.equal(opts.maxIssuanceAmount);
            expect(obj.policies).to.be.equal(opts.policies);
            expect(obj.initialPreissuedAmount).to.be.equal(opts.initialPreissuedAmount);
        });
    });

    describe('assetUpdateRequest', function () {
        it("Success", function () {
            var opts = {
                code: "USD",
                policies: 12,
                requestID: "0",
            }
            let op = StellarBase.ManageAssetBuilder.assetUpdateRequest(opts);
            var xdr = op.toXDR("hex");
            var operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdr, "hex"));
            var obj = StellarBase.Operation.operationToObject(operation);
            expect(obj.type).to.be.equal("manageAsset");
            expect(obj.requestID).to.be.equal(opts.requestID);
            expect(obj.requestType).to.be.equal("createAssetUpdateRequest");
            expect(obj.code).to.be.equal(opts.code);
            expect(obj.policies).to.be.equal(opts.policies);
        });
    });

    describe('cancelAssetRequest', function () {
        it("Success", function () {
            var opts = {
                requestID: "0",
            }
            let op = StellarBase.ManageAssetBuilder.cancelAssetRequest(opts);
            var xdr = op.toXDR("hex");
            var operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdr, "hex"));
            var obj = StellarBase.Operation.operationToObject(operation);
            expect(obj.type).to.be.equal("manageAsset");
            expect(obj.requestID).to.be.equal(opts.requestID);
            expect(obj.requestType).to.be.equal("cancelAssetRequest");
        });
    });

    describe('changePreIssuedAssetSigner', function () {
        it("Success", function () {
            var opts = {
                code: "USD",
                accountID: "GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ",
            }
            let op = StellarBase.ManageAssetBuilder.changeAssetPreIssuer(opts);
            var xdr = op.toXDR("hex");
            var operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdr, "hex"));
            var obj = StellarBase.Operation.operationToObject(operation);
            expect(obj.type).to.be.equal("manageAsset");
            expect(obj.requestID).to.be.equal(opts.requestID);
            expect(obj.requestType).to.be.equal("changePreissuedAssetSigner");
            expect(obj.code).to.be.equal(opts.code);
            expect(obj.accountID).to.be.equal(opts.accountID);
        });
    });
});