import {default as xdr} from "../generated/stellar-xdr_generated";
import isUndefined from 'lodash/isUndefined';
import {BaseOperation} from './base_operation';
import {Keypair} from "../keypair";
import {UnsignedHyper, Hyper} from "js-xdr";

export class ManageExternalSystemAccountIdPoolEntryBuilder {
    /**
     * Creates operation for new pool entry creation
     * @param {object} opts
     *
     * @param {string} opts.externalSystemType - type of external system
     * @param {string} opts.data
     *
     * @param {string} [opts.source] - The source account for the creation. Defaults to the transaction's source account.
     *
     * @returns {xdr.ManageExternalSystemAccountIdPoolEntryOp}
     */
    static createExternalSystemAccountIdPoolEntry(opts) {
        let attrs = {};

        attrs.externalSystemType = BaseOperation._ExternalSystemTypeFromNumber(opts.externalSystemType);

        if (opts.data === "") {
            throw new Error("data cannot be empty string");
        }
        attrs.data = opts.data;

        attrs.ext = new xdr.CreateExternalSystemAccountIdPoolEntryActionInputExt(xdr.LedgerVersion.emptyVersion());

        let createExternalSystemAccountIdPoolEntryActionInput = new xdr.CreateExternalSystemAccountIdPoolEntryActionInput(attrs);
        return ManageExternalSystemAccountIdPoolEntryBuilder._createManageExternalSystemAccountIdPoolEntryOp(
            opts, new xdr.ManageExternalSystemAccountIdPoolEntryOpActionInput.create(
                createExternalSystemAccountIdPoolEntryActionInput));
    }

    static _createManageExternalSystemAccountIdPoolEntryOp(opts, input) {
        let manageExternalSystemAccountIdPoolEntryOp = new xdr.ManageExternalSystemAccountIdPoolEntryOp({
            actionInput: input,
            ext: new xdr.ManageExternalSystemAccountIdPoolEntryOpExt(xdr.LedgerVersion.emptyVersion()),
        });

        let opAttributes = {};
        opAttributes.body = xdr.OperationBody.manageExternalSystemAccountIdPoolEntry(manageExternalSystemAccountIdPoolEntryOp);
        BaseOperation.setSourceAccount(opAttributes, opts);
        return new xdr.Operation(opAttributes);
    }

    static manageExternalSystemAccountIdPoolEntryToObject(result, attrs) {
        result.actionType = attrs.actionInput().switch().name;
        switch (attrs.actionInput().switch()) {
            case xdr.ManageExternalSystemAccountIdPoolEntryAction.create():
            {
                let action = attrs.actionInput().createExternalSystemAccountIdPoolEntryActionInput();
                result.externalSystemType = action.externalSystemType().value;
                result.data = action.data();
                break;
            }
        }
    }
}