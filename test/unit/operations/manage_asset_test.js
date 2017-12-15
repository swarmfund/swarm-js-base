import BigNumber from 'bignumber.js';
import { Hyper } from "js-xdr";

describe('ManageAsset', function () {
    describe('assetCreationRequest', function () {
        it("Success", function () {
            var opts = {
                code: "USD",
                name: "USD Name",
                preissuedAssetSigner: "GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ",
                maxIssuanceAmount: "1000.1211",
                policies: 12,
                requestID: "0",
                logoId: "112",
                initialPreissuedAmount: "12.14",
            }
            let op = StellarBase.ManageAssetBuilder.assetCreationRequest(opts);
            var xdr = op.toXDR("hex");
            var operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdr, "hex"));
            var obj = StellarBase.Operation.operationToObject(operation);
            expect(obj.type).to.be.equal("manageAsset");
            expect(obj.requestID).to.be.equal(opts.requestID);
            expect(obj.requestType).to.be.equal("createAssetCreationRequest");
            expect(obj.code).to.be.equal(opts.code);
            expect(obj.name).to.be.equal(opts.name);
            expect(obj.preissuedAssetSigner).to.be.equal(opts.preissuedAssetSigner);
            expect(obj.description).to.be.equal('');
            expect(obj.externalResourceLink).to.be.equal('');
            expect(obj.maxIssuanceAmount).to.be.equal(opts.maxIssuanceAmount);
            expect(obj.policies).to.be.equal(opts.policies);
            expect(obj.logoId).to.be.equal(opts.logoId);
            expect(obj.initialPreissuedAmount).to.be.equal(opts.initialPreissuedAmount);
        });
    });

    describe('assetUpdateRequest', function () {
        it("Success", function () {
            var opts = {
                code: "USD",
                policies: 12,
                requestID: "0",
                logoId: "123234"
            }
            let op = StellarBase.ManageAssetBuilder.assetUpdateRequest(opts);
            var xdr = op.toXDR("hex");
            var operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdr, "hex"));
            var obj = StellarBase.Operation.operationToObject(operation);
            expect(obj.type).to.be.equal("manageAsset");
            expect(obj.requestID).to.be.equal(opts.requestID);
            expect(obj.requestType).to.be.equal("createAssetUpdateRequest");
            expect(obj.code).to.be.equal(opts.code);
            expect(obj.description).to.be.equal('');
            expect(obj.externalResourceLink).to.be.equal('');
            expect(obj.policies).to.be.equal(opts.policies);
            expect(obj.logoId).to.be.equal(opts.logoId);
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
});