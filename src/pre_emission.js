import {Keypair} from './keypair';
import { Operation } from "./operation";
import { default as xdr } from "./generated/stellar-xdr_generated";
import BigNumber from 'bignumber.js';
import { hash } from "./hashing";

export class PreEmission {

    static build(opts) {
        if (!Operation.isValidAmount(opts.amount, false)) {
            throw new TypeError('amount must be of type String and represent a positive number');
        }
        if (!Operation.isValidString(opts.serialNumber, 4, 64)) {
            throw new TypeError('serialNumber must be 4-64 string');
        }
        if (!Operation.isValidArrayOfClass(opts.keyPairs, 1, Keypair)) {
            throw new TypeError('must get array of keyparis');
        }
        if (!Operation.isValidAsset(opts.asset)) {
            throw new TypeError('asset is invalid');
        }

        var xdrAmount = Operation._toXDRAmount(opts.amount);
        var multipliedAmount = new BigNumber(xdrAmount).toString();
        var signatures = [];
        for (var i = 0; i < opts.keyPairs.length; i++) {
            var signature = opts.keyPairs[i].signDecorated(hash(`${opts.serialNumber}:${multipliedAmount}:${opts.asset}`));
            signatures.push(signature);
        }
        return new xdr.PreEmission({
            serialNumber: opts.serialNumber,
            amount: xdrAmount,
            asset: opts.asset,
            signatures: signatures,
            ext: new xdr.PreEmissionExt(xdr.LedgerVersion.emptyVersion()),
        });
    }

    static xdrFromData(data) {
        return new xdr.PreEmission({
            serialNumber: data.serialNumber,
            amount: Operation._toXDRAmount(data.amount),
            asset: data.asset,
            signatures: data.signatures
        });
    }

    static dataFromXdr(xdr) {
        var attributes = {};
        attributes.amount = Operation._fromXDRAmount(xdr.amount());
        attributes.serialNumber = xdr.serialNumber();
        attributes.asset = xdr.asset();
        attributes.signatures = xdr.signatures();
        return attributes;
    }

    static isSigned(attributes, keyPair) {
        var signatures = attributes.signatures;
        var multipliedAmount = this._multipliedAmount(attributes.amount);
        for (var i = 0; i < signatures.length; i++) {
            if (keyPair.verify(hash(`${attributes.serialNumber}:${multipliedAmount}:${attributes.asset}`), signatures[i].signature())) {
                return true;
            }
        }
        return false;
    }

    static addSignature(attributes, keyPair) {
        var multipliedAmount = this._multipliedAmount(attributes.amount);
        var signature = keyPair.signDecorated(hash(`${attributes.serialNumber}:${multipliedAmount}:${attributes.asset}`));
        attributes.signatures.push(signature);
        return attributes;
    }
    static _multipliedAmount(amount) {
        var xdrAmount = Operation._toXDRAmount(amount);
        return new BigNumber(xdrAmount).toString();
    }
}
