import {Operation} from "../operation";
import {default as xdr} from "../generated/stellar-xdr_generated";

export class ManageKeyValueOpBuilder {
    static manageKeyValueOp(opts) {
        let attributes = {};
        attributes.key = opts.key;
        attributes.action = new xdr.ManageKeyValueOpAction(Operation._keyValueActionFromNumber(opts.keyValueAction));
        attributes.ext = new xdr.ManageKeyValueExt(xdr.LedgerVersion.emptyVersion());
        if (Operation._keyValueActionFromNumber(opts.keyValueAction) === xdr.ManageKvAction.put()) {
            attributes.action.value = new xdr.KeyValueEntry(opts.value);
        }

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
            result.action.value = attrs.value;
        }
        else
        {
            result.action.value = xdr.void;
        }
    }
}