import {ManageInvoiceRequestBuilder} from "../../../src/operations/manage_invoice_request_builder";

describe(".manageInvoice()", function () {
    it("create invoiceRequest", function () {
        var sender = StellarBase.Keypair.random().accountId();
        var receiverBalance = StellarBase.Keypair.random().balanceId();
        var amount = "1000";
        let details = "Some details about invoice request";
        let op = StellarBase.ManageInvoiceRequestBuilder.createInvoiceRequest({
            sender, receiverBalance, amount, details
        });
        var xdr = op.toXDR("hex");
        var operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdr, "hex"));
        var obj = StellarBase.Operation.operationToObject(operation);
        expect(obj.type).to.be.equal("manageInvoiceRequest");
        expect(obj.sender).to.be.equal(sender);
        expect(obj.receiverBalance).to.be.equal(receiverBalance);
        expect(operation.body().value().details().invoiceRequest().amount().toString()).to.be.equal(amount + "000000");
        expect(obj.amount).to.be.equal(amount);
        expect(obj.details).to.be.equal(details);
    });
    it("remove invoiceRequest", function () {
        let requestId = "123";
        let op = StellarBase.ManageInvoiceRequestBuilder.removeInvoiceRequest({
            requestId
        });
        var xdr = op.toXDR("hex");
        var operation = StellarBase.xdr.Operation.fromXDR(new Buffer(xdr, "hex"));
        var obj = StellarBase.Operation.operationToObject(operation);
        expect(obj.type).to.be.equal("manageInvoiceRequest");
        expect(obj.requestId).to.be.equal(requestId);
    });
});