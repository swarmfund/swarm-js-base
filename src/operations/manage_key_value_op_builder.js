import {BaseOperation} from "./base_operation";
import {default as xdr} from "../generated/stellar-xdr_generated";
import isUndefined from 'lodash/isUndefined';

export class  ManageKeyValueOpBuilder {
    static createManageKeyValueOp(opts) {
        let attributes = {};
        if(isUndefined(opts.action) || !xdr.ManageKvAction._byValue.has(opts.action))
        {
            throw new Error("key-value action is invalid");
        }

        if(isUndefined(opts.key))
        {
            throw new Error("key-value key must be defined");
        }

        attributes.key = opts.key;
        attributes.action = new xdr.ManageKeyValueOpAction(BaseOperation._keyValueActionFromNumber(opts.action));
        attributes.ext = new xdr.ManageKeyValueOpExt(xdr.LedgerVersion.emptyVersion());

        if (opts.action === xdr.ManageKvAction.put()) {
            ManageKeyValueOpBuilder.putKV(opts,attributes);
        }

        let manageKV = new xdr.ManageKeyValueOp(attributes);

        let opAttributes ={};
        opAttributes.body = xdr.OperationBody.manageKeyValue(manageKV);
        BaseOperation.setSourceAccount(opAttributes, opts);
        return new xdr.Operation(opAttributes);
    }

    static manageKeyValueOpToObject(result, attrs) {
        result.key = attrs.key;
        let action  = attrs.action().value();
        switch (attrs.action().switch())
        {
            case xdr.ManageKvAction.put():
                result.action = new xdr.ManageKvAction.put().value;
                result.value = action.value().value();
                break;
            case xdr.ManageKvAction.delete():
                result.action = new xdr.ManageKvAction.delete().value;
                result.value = xdr.void();
                break;
            default:
                throw new Error("invalid KV action type");
        }
    }

    static putKV(opts, attributes){
        let KVEntry = new xdr.KeyValueEntry({
            key : opts.key,
            ext : new xdr.ManageKeyValueExt(xdr.LedgerVersion.emptyVersion())
        });

        if(isUndefined(opts.KvType) || !xdr.KeyValueEntryType._byValue.has(opts.KvType))
        {
            throw new Error("key-value type is invalid");
        }

        KVEntry.value = new xdr.KeyValueEntryValue(opts.KvType);
        KVEntry.value().defaultMask= opts.value;

        attributes.action().value = new xdr.KeyValueEntry(KVEntry);
    }

}