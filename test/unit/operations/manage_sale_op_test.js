import BigNumber from 'bignumber.js';
import { Hyper } from "js-xdr";
import isEqual from 'lodash/isEqual';


describe('Manage sale op', function () {
    it("Success", function () {
        let opts = {
            saleId: "123",
            action: StellarBase.xdr.ManageSaleAction.delete().value
        };

        let op = StellarBase.SaleRequestBuilder.manageSale(opts);
        var xdr = op.toXDR("hex");
        var operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdr, "hex"));
        var obj = StellarBase.Operation.operationToObject(operation);
        expect(obj.type).to.be.equal(StellarBase.xdr.OperationType.manageSale().name);
        expect(obj.saleId).to.be.equal(opts.saleId);
        expect(obj.action).to.be.equal(opts.action);
    });
});