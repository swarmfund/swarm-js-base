'use strict';
let sdk = require('./lib/index');

let attributes = {};
attributes.key = "1234";

let putAction = sdk.xdr.ManageKvAction.put().value;
// console.log(putAction);


let value = new sdk.xdr.KeyValueEntryValue.uint32(10);

let entry = new sdk.xdr.KeyValueEntry({
    key: "key",
    value: value,
    ext: new sdk.xdr.KeyValueEntryExt(sdk.xdr.LedgerVersion.emptyVersion())
});
console.log(entry);

let action = new sdk.xdr.ManageKeyValueOpAction(sdk.xdr.ManageKvAction.put(), entry);
console.log(action);

let manageKeyValueOp = new sdk.xdr.ManageKeyValueOp({
    key: "key",
    action: action,
    ext: new sdk.xdr.ManageKeyValueOpExt.emptyVersion()
});
console.log(manageKeyValueOp);

let opAttrs = {
    body: new sdk.xdr.OperationBody.manageKeyValue(manageKeyValueOp)
};

let op = new sdk.xdr.Operation(opAttrs);
console.log(op);

let hex = op.toXDR("hex");







// let value = sdk.xdr.KeyValueEntryValue.uint32(123);

/*
let ext = new sdk.KeyValueEntryExt(sdk.LedgerVersion.emptyVersion());
let KVEntry = new sdk.KeyValueEntry({
    key: "1234",
    value: value,
    ext: ext
});

attributes.action = new sdk.ManageKeyValueOpAction(BaseOperation._keyValueActionFromNumber(1), KVEntry);

attributes.ext = new sdk.ManageKeyValueOpExt(sdk.LedgerVersion.emptyVersion());

let manageKV = new sdk.ManageKeyValueOp(attributes);

//console.log(attributes);
console.log(manageKV);
console.log(manageKV.key());
console.log(manageKV.action());
console.log(manageKV.action().value());
console.log(manageKV.action().value().value());
console.log("111111");
*/