import BigNumber from 'bignumber.js';
import { Hyper } from "js-xdr";
import isEqual from 'lodash/isEqual';

describe('Create Sale Creation request op', function () {
    it("Success", function () {
        let opt = {
            requestID: "12",
            baseAsset: "BTC",
            quoteAsset: "USD",
            startTime: "4123421",
            endTime: "4123425",
            price: "2.12",
            softCap: "20000.21",
            hardCap: "648251",
            details: {
                short_description: "short description",
                description: "Token sale description",
                logo: "logo",
                name: "sale name",
            }
        }
        let op = StellarBase.SaleRequestBuilder.createSaleCreationRequest(opt);
        var xdr = op.toXDR("hex");
        var operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdr, "hex"));
        var obj = StellarBase.Operation.operationToObject(operation);
        expect(obj.type).to.be.equal(StellarBase.xdr.OperationType.createSaleRequest().name);
        expect(opt.requestID).to.be.equal(obj.requestID);
        expect(opt.baseAsset).to.be.equal(obj.baseAsset);
        expect(opt.quoteAsset).to.be.equal(obj.quoteAsset);
        expect(opt.startTime).to.be.equal(obj.startTime);
        expect(opt.endTime).to.be.equal(obj.endTime);
        expect(opt.softCap).to.be.equal(obj.softCap);
        expect(opt.price).to.be.equal(obj.price);
        expect(isEqual(opt.details, obj.details)).to.be.true;

    });
});