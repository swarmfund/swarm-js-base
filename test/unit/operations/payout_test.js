import BigNumber from 'bignumber.js';
import { Hyper } from "js-xdr";
import isEqual from 'lodash/isEqual'

describe(".payout()", function () {
    it("Success", function () {
        let asset = "USD";
        let sourceBalanceId = StellarBase.Keypair.random().balanceId();
        let maxPayoutAmount = "1000";
        let fee = {
            fixed: "15",
            percent: "5"
        };
        let opts = {};
        opts.asset = asset;
        opts.sourceBalanceId = sourceBalanceId;
        opts.maxPayoutAmount = maxPayoutAmount;
        opts.fee = fee;

        let op = StellarBase.PayoutOpBuilder.payoutOp(opts);
        let xdr = op.toXDR("hex");
        let operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdr, "hex"));
        let obj = StellarBase.Operation.operationToObject(operation);

        expect(obj.type).to.be.equal("payout");
        expect(obj.asset).to.be.equal(asset);
        expect(obj.sourceBalanceId).to.be.equal(sourceBalanceId);
        expect(obj.maxPayoutAmount).to.be.equal(maxPayoutAmount);
        expect(obj.fee.fixed).to.be.equal(fee.fixed);
        expect(obj.fee.percent).to.be.equal(fee.percent);
    });
});