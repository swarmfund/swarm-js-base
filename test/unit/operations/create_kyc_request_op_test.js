import { Hyper } from "js-xdr";
import isEqual from "lodash/isEqual";

describe("KYC request op", function () {
    it("Success", function () {
        let requestID = "0";
        let accountID = "GCEZWKCA5VLDNRLN3RPRJMRZOX3Z6G5CHCGSNFHEYVXM3XOJMDS674JZ";
        let accountType = StellarBase.xdr.AccountType.general().value;
        let kycLevel = 1;
        let kycData = {"hash" : "bb36c7c58c4c32d98947c8781c91c7bb797c3647"};
        let op = StellarBase.CreateKYCRequestBuilder.createKYCRequest({
            requestID: requestID,
            updatedAccount: accountID,
            accountTypeToSet: accountType,
            kycLevel: kycLevel,
            kycData: kycData,
        });
        let xdr = op.toXDR("hex");
        let operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdr, "hex"));
        let obj = StellarBase.Operation.operationToObject(operation);
        expect(obj.type).to.be.equal("createKycRequest");
        expect(obj.updatedAccount).to.be.equal(accountID);
        expect(obj.accountTypeToSet).to.be.equal(accountType);
        expect(obj.kycLevel).to.be.equal(kycLevel);
        expect(isEqual(obj.kycData, kycData)).to.be.true;
    });
});