import isEqual from "lodash/isEqual";
import {ManageSaleBuilder} from "../../../src/operations/manage_sale";

describe("Update sale details request op", function () {
    it("Success", function () {
        let opts = {
            saleID: "1",
            requestID: "0",
            newDetails: {
                short_description: "short description",
                description: "Token sale description",
                logo: {
                    url: "logo_url",
                    type: "logo_type",
                },
                name: "sale name",
            }
        };

        let op = StellarBase.ManageSaleBuilder.createUpdateSaleDetailsRequest(opts);
        var xdr = op.toXDR("hex");
        var operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdr, "hex"));
        var obj = StellarBase.Operation.operationToObject(operation);
        expect(obj.saleID).to.be.equal(opts.saleID);
        expect(obj.requestID).to.be.equal(opts.requestID);
        expect(isEqual(obj.newDetails, opts.newDetails)).to.be.true;
    })
});