import { Hyper } from "js-xdr";

describe("BindExternalSystemAccountId", function () {
   describe('Success', function () {
       let externalSystemType = StellarBase.xdr.ExternalSystemType.bitcoin().value;
       let opts = {
           externalSystemType: externalSystemType,
       };
       let op = StellarBase.BindExternalSystemAccountIdBuilder.createBindExternalSystemAccountIdOp(opts);
       let xdr = op.toXDR("hex");
       let operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdr, "hex"));
       let obj = StellarBase.Operation.operationToObject(operation);
       expect(obj.externalSystemType).to.be.equal(externalSystemType);
   });
});