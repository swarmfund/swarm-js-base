import {default as xdr} from "../generated/stellar-xdr_generated";
import isUndefined from 'lodash/isUndefined';
import {BaseOperation} from './base_operation';
import {Keypair} from "../keypair";
import {UnsignedHyper, Hyper} from "js-xdr";
import {Operation} from "../operation";

export class ManageInvoiceRequestBuilder {

    /**
     * Create invoice request
     * @param {object} opts
     * @param {string} opts.sender - payer account
     * @param {string} opts.receiverBalance - invoice receive balance
     * @param {string} opts.amount - invoice amount
     * @param {string} opts.details - invoice details
     * @param {string} [opts.source] - The source account for the invoice request. Defaults to the transaction's source account.
     * @returns {xdr.ManageInvoiceRequestOp}
     */
    static createInvoiceRequest(opts) {
        let invoiceRequestAttr = {
            ext: new xdr.InvoiceRequestExt(xdr.LedgerVersion.emptyVersion()),
            details: opts.details,
        };
        if (!Keypair.isValidPublicKey(opts.sender)) {
            throw new Error("sender is invalid");
        }
        if (!Keypair.isValidBalanceKey(opts.receiverBalance)) {
            throw new Error("receiverBalance is invalid");
        }
        if (!Operation.isValidAmount(opts.amount)) {
            throw new TypeError('amount argument must be of type String and represent a positive number');
        }
        invoiceRequestAttr.amount = Operation._toUnsignedXDRAmount(opts.amount);
        invoiceRequestAttr.sender = Keypair.fromAccountId(opts.sender).xdrAccountId();
        invoiceRequestAttr.receiverBalance = Keypair.fromBalanceId(opts.receiverBalance).xdrBalanceId();

        let invoiceRequest = new xdr.InvoiceRequest(invoiceRequestAttr);

        let details = new xdr.ManageInvoiceRequestOpDetails.create(invoiceRequest);

        return ManageInvoiceRequestBuilder.manageInvoiceRequest(details, opts);
    }

    /**
     * Remove invoice request
     * @param {object} opts
     * @param {string} opts.requestId - invoice request id to remove
     * @param {string} [opts.source] - The source account for the invoice request. Defaults to the transaction's source account.
     * @returns {xdr.ManageInvoiceRequestOp}
     */
    static removeInvoiceRequest(opts) {
        let requestId = UnsignedHyper.fromString(opts.requestId);
        let details = xdr.ManageInvoiceRequestOpDetails.remove(requestId);

        return ManageInvoiceRequestBuilder.manageInvoiceRequest(details, opts);
    }

    static manageInvoiceRequest(details, opts) {
        let manageInvoiceRequestOp = new xdr.ManageInvoiceRequestOp({
            details: details,
            ext: new xdr.ManageInvoiceRequestOpExt(xdr.LedgerVersion.emptyVersion()),
        });

        let opAttributes = {};
        opAttributes.body = xdr.OperationBody.manageInvoiceRequest(manageInvoiceRequestOp);
        Operation.setSourceAccount(opAttributes, opts);
        return new xdr.Operation(opAttributes);
    }


    static manageInvoiceRequestOpToObject(result, attrs) {
        switch (attrs.details().switch()) {
            case xdr.ManageInvoiceRequestAction.create(): {
                let invoiceRequest = attrs.details().invoiceRequest();

                result.sender = BaseOperation.accountIdtoAddress(invoiceRequest.sender());
                result.receiverBalance = BaseOperation.balanceIdtoString(invoiceRequest.receiverBalance());
                result.amount = BaseOperation._fromXDRAmount(invoiceRequest.amount());
                result.details = invoiceRequest.details();
                break;
            }
            case xdr.ManageInvoiceRequestAction.remove(): {
                result.requestId = attrs.details().requestId().toString();
                break;
            }
        }
    }
}