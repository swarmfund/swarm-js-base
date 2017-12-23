import BigNumber from 'bignumber.js';
import { Hyper } from "js-xdr";

describe('Issuance request op', function () {
    it("Success", function () {
        let amount = "200.123";
        let reference = StellarBase.Keypair.random().accountId();
        let asset = "BLC";
        let receiver = StellarBase.Keypair.random().balanceId();
        let externalDetails = { a: "some external details" };
        let op = StellarBase.CreateIssuanceRequestBuilder.createIssuanceRequest({
            asset: asset,
            amount: amount,
            reference: reference,
            receiver: receiver,
            externalDetails: externalDetails,
        });
        var xdr = op.toXDR("hex");
        var operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdr, "hex"));
        var obj = StellarBase.Operation.operationToObject(operation);
        expect(obj.type).to.be.equal("createIssuanceRequest");
        expect(reference).to.be.equal(obj.reference);
        expect(amount).to.be.equal(obj.amount);
        expect(asset).to.be.equal(obj.asset);
        expect(receiver).to.be.equal(obj.receiver);
        expect(JSON.stringify(externalDetails)).to.be.equal(JSON.stringify(obj.externalDetails));
    });
});