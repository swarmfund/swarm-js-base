import BigNumber from 'bignumber.js';
import { Hyper } from "js-xdr";

describe('ManageExternalSystemAccountIdPoolEntry', function () {
    describe('Create external system account id pool entry', function () {
        it("Success", function () {
            let externalSystemType = StellarBase.xdr.ExternalSystemType.bitcoin().value;
            let data = "Some data";
            let opts = {
                externalSystemType: externalSystemType,
                data: data,
            };
            let op = StellarBase.ManageExternalSystemAccountIdPoolEntryBuilder.createExternalSystemAccountIdPoolEntry(opts);
            let xdr = op.toXDR("hex");
            let operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdr, "hex"));
            let obj = StellarBase.Operation.operationToObject(operation);
            expect(obj.type).to.be.equal("manageExternalSystemAccountIdPoolEntry");
            expect(obj.actionType).to.be.equal("create");
            expect(obj.externalSystemType).to.be.equal(externalSystemType);
            expect(obj.data).to.be.equal(data);
        });
    });
});