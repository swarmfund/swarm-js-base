import {BaseOperation} from "./base_operation";
import {default as xdr} from "../generated/stellar-xdr_generated";
import isUndefined from 'lodash/isUndefined';
import isString from 'lodash/isString';

export class  ManageKeyValueBuilder {

    static putKeyValue(opts){
        let attributes = {};

        let value = new xdr.KeyValueEntryValue.uint32(opts.value);

        let KVEntry = new xdr.KeyValueEntry({
            key: opts.key,
            value: value,
            ext: new xdr.KeyValueEntryExt(xdr.LedgerVersion.emptyVersion())
        });

        attributes.action = new xdr.ManageKeyValueOpAction(xdr.ManageKvAction.put(), KVEntry);

        return ManageKeyValueBuilder.createManageKeyValueOp(attributes, opts);
    }

    static deleteKeyValue(opts){
        let attributes = {};

        attributes.action = new xdr.ManageKeyValueOpAction(BaseOperation._keyValueActionFromNumber(
                                                                        StellarBase.xdr.ManageKvAction.delete().value));

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
                result.value = action.value().defaultMask();
                break;
            case xdr.ManageKvAction.delete():
                result.action = new xdr.ManageKvAction.delete().value;
                break;
            default:
                throw new Error("invalid KV action type");
        }
    }

    static putKV(opts, attributes){
        if(isUndefined(opts.KvType) || !xdr.KeyValueEntryType._byValue.has(opts.KvType))
        {
            throw new Error("key_value type is invalid");
        }

        let value = new xdr.KeyValueEntryValue.uint32(opts.value);
        let KVEntry = new xdr.KeyValueEntry({
            key : opts.key,
            value: value,
            ext : new xdr.ManageKeyValueExt(xdr.LedgerVersion.emptyVersion())
        });

        attributes.action = new xdr.ManageKeyValueOpAction.put(KVEntry);

        return attributes;
    }

}