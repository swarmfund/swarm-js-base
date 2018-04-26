import {Operation} from "../operation";
import {default as xdr} from "../generated/stellar-xdr_generated";

export class ManageKeyValueOpBuilder {
    static manageKeyValueOp(opts) {
        let attributes = {};
        if(isUndefined(opts.action))
        {
            throw new Error("action for KV isn`t defined");
        }
        attributes.key = opts.key;
        attributes.action = new xdr.ManageKeyValueOpAction(Operation._keyValueActionFromNumber(opts.keyValueAction));
        attributes.ext = new xdr.ManageKeyValueExt(xdr.LedgerVersion.emptyVersion());
        if (Operation._keyValueActionFromNumber(opts.keyValueAction) === xdr.ManageKvAction.put()) {
            this.putKV(opts,attributes);
        }
        else
            this.deleteKV(attributes);

        let manageKV = new xdr.ManageKeyValueOp(attributes);

        let opAttributes ={};
        opAttributes.body = xdr.OperationBody.manageKeyValue(manageKV);
        Operation.setSourceAccount(opAttributes, opts);
        return new xdr.Operation(opAttributes);
    }

    static manageKeyValueOpToObject(result, attrs) {
        result.key = attrs.key;
        result.action = new xdr.ManageKeyValueOpAction(Operation._keyValueActionFromNumber(attrs.action));
        if(result.action === xdr.ManageKvAction.put)
        {
            this.putKV(attrs,result);
        }
        else
        {
            this.deleteKV(attrs,result);
        }
    }

    putKV(opts, attributes){
        let KVEntry = {};
        KVEntry.key = opts.key;
        KVEntry.value.type = new xdr.KeyValueEntryValue(Operation._keyValueTypeFromNumber(opts.kvType));
        KvEntry.value.value = opts.value;
        KVEntry.ext = new xdr.ManageKeyValueExt(xdr.LedgerVersion.emptyVersion());
        KVEntry.value.ext = new xdr.ManageKeyValueExt(xdr.LedgerVersion.emptyVersion());
        attributes.action.put.value = KVEntry;
    }

    deleteKV(opts,attributes){
        attributes.action.delete.value = xdr.void();
    }
}