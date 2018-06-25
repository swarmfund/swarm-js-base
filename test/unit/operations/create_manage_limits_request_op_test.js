import isEqual from "lodash/isEqual";
import {CreateManageLimitsRequestBuilder} from "../../../src/operations/create_manage_limits_request_builder";

describe('.createManageLimitsRequest', function () {
    let documentData = "Some data in document";
    let documentHash = StellarBase.hash(documentData);

    it('valid createManageLimitsRequest', function () {
        let opts = {
            documentHash: documentHash,
        };
        let op = CreateManageLimitsRequestBuilder.createManageLimitsRequest(opts);
        let xdr = op.toXDR("hex");
        let operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdr, "hex"));
        let obj = StellarBase.Operation.operationToObject(operation);
        expect(obj.type).to.be.equal("createManageLimitsRequest");
        expect(obj.documentHash.toString()).to.be.equal(documentHash.toString());
    });

    it('invalid createManageLimitsRequest with undefined document hash', function () {
        let opts = {};
        expect(() => CreateManageLimitsRequestBuilder.createManageLimitsRequest(opts)).to.throw(/opts.documentHash is not defined/);
    });
});