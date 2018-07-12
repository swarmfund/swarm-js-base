import isEqual from "lodash/isEqual";
import {ManageSaleBuilder} from "../../../src/operations/manage_sale";

describe("Manage sale", function () {
    it("Update sale details request op", function () {
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
    });
    it('Update sale end time request op', function () {
        let opts = {
            saleID: '1',
            requestID: '0',
            newEndTime: '1000'
        };

        let op = StellarBase.ManageSaleBuilder.createUpdateSaleEndTimeRequest(opts);
        let xdr = op.toXDR("hex");
        let operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdr, "hex"));
        var obj = StellarBase.Operation.operationToObject(operation);
        expect(obj.saleID).to.be.equal(opts.saleID);
        expect(obj.requestID).to.be.equal(opts.requestID);
        expect(obj.newEndTime).to.be.equal(opts.newEndTime);
    });
    it('Cancel sale', () => {
        let opts = {
            saleID: '1'
        }
        let op = ManageSaleBuilder.cancelSale(opts)
        let xdrOp = op.toXDR('hex')
        let operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdrOp, 'hex'))
        let obj = StellarBase.Operation.operationToObject(operation)
        expect(obj.saleID).to.be.equal(opts.saleID)
    });
    it('Set sale state', () => {
        let opts = {
            saleID: '1',
            saleState: StellarBase.xdr.SaleState.promotion() 
        }
        let op = ManageSaleBuilder.setSaleState(opts)
        let xdrOp = op.toXDR('hex')
        let operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdrOp, 'hex'))
        let obj = StellarBase.Operation.operationToObject(operation)
        expect(obj.saleID).to.be.equal(opts.saleID)
        expect(obj.saleState).to.be.equal(opts.saleState)
    });
});