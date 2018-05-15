import {BaseOperation} from "./base_operation";
import {default as xdr} from "../generated/stellar-xdr_generated";
import isUndefined from 'lodash/isUndefined';
import isString from 'lodash/isString';

export class  ManageKeyValueBuilder {

    /**
     * Creates manage key value operation
     * @param {object} opts
     *
     * @param {string} opts.key
     * @param {number|string} opts.value
     *
     * @param {string} [opts.source] - The source account for the creation. Defaults to the transaction's source account.
     *
     * @returns {xdr.ManageKeyValueOp}
     */
    static putKeyValueOp(opts){
        let attributes = {};

        let value = new xdr.KeyValueEntryValue.uint32(Number(opts.value));

        let KVEntry = new xdr.KeyValueEntry({
            key: opts.key,
            value: value,
            ext: new xdr.KeyValueEntryExt(xdr.LedgerVersion.emptyVersion())
        });

        attributes.action = new xdr.ManageKeyValueOpAction(xdr.ManageKvAction.put(), KVEntry);

        return ManageKeyValueBuilder.createManageKeyValueOp(attributes, opts);
    }

    static deleteKeyValueOp(opts){
        let attributes = {};

        attributes.action = new xdr.ManageKeyValueOpAction(BaseOperation._keyValueActionFromNumber(
                                                                                xdr.ManageKvAction.delete().value));

        return ManageKeyValueBuilder.createManageKeyValueOp(attributes, opts);
    }

    static createManageKeyValueOp(attributes, opts) {
        if(isUndefined(opts.key))
        {
            throw new Error("key_value key must be defined");
        }
        if(!isString(opts.key))
        {
            throw new Error("key value key must be string");
        }

        attributes.key = opts.key;
        attributes.ext = new xdr.ManageKeyValueOpExt(xdr.LedgerVersion.emptyVersion());

        let manageKV = new xdr.ManageKeyValueOp(attributes);

        let opAttributes ={};
        opAttributes.body = xdr.OperationBody.manageKeyValue(manageKV);
        BaseOperation.setSourceAccount(opAttributes, opts);
        return new xdr.Operation(opAttributes);
    }

    static manageKeyValueOpToObject(result, attrs) {
        result.key = attrs.key();
        var action = attrs.action().value();
        switch (attrs.action().switch()) {
            case xdr.ManageKvAction.put():
                result.action = new xdr.ManageKvAction.put().value;
                result.value = action.value().defaultMask().toString();
                break;
            case xdr.ManageKvAction.delete():
                result.action = new xdr.ManageKvAction.delete().value;
                break;
            default:
                throw new Error("invalid KV action type");
        }
    }
}