import {default as xdr} from "../generated/stellar-xdr_generated";
import isUndefined from 'lodash/isUndefined';
import {BaseOperation} from './base_operation';
import {Keypair} from "../keypair";
import {UnsignedHyper, Hyper} from "js-xdr";
import {Operation} from "../operation";

export class PaymentV2Builder {
    static paymentV2ForAccount(opts) {
        if (!Keypair.isValidPublicKey(opts.destination)) {
            throw new TypeError('opts.destination is invalid');
        }

        let attrs = PaymentV2Builder._prepateAttrs(opts);

        attrs.destination = new xdr.PaymentOpV2Destination.account(Keypair.fromAccountId(opts.destination).xdrAccountId());

        return PaymentV2Builder._createOp(opts, attrs);
    }

    static paymentV2ForBalance(opts) {
        if (!Keypair.isValidBalanceKey(opts.destination)) {
            throw new TypeError('opts.destination is invalid');
        }

        let attrs = PaymentV2Builder._prepateAttrs(opts);

        attrs.destination = new xdr.PaymentOpV2Destination.balance(Keypair.fromBalanceId(opts.destination).xdrBalanceId());

        return PaymentV2Builder._createOp(opts, attrs);
    }

    static _createOp(opts, attrs) {
        let paymentV2 = new xdr.PaymentOpV2(attrs);
        let opAttrs = {};
        opAttrs.body = xdr.OperationBody.paymentV2(paymentV2);
        BaseOperation.setSourceAccount(opAttrs, opts);
        return new xdr.Operation(opAttrs);
    }

    static _prepateAttrs(opts) {
        let attrs = {};

        if (!Keypair.isValidBalanceKey(opts.sourceBalanceId)) {
            throw new TypeError('sourceBalanceId is invalid');
        }

        if (!BaseOperation.isValidAmount(opts.amount)) {
            throw new TypeError('amount argument must be of type String and represent a positive number');
        }

        if (!isUndefined(opts.feeData)) {
            if (!BaseOperation.isValidAsset(opts.feeData.sourceFee.feeAsset)) {
                throw new TypeError('Source fee asset is invalid');
            }
            if (!BaseOperation.isValidAsset(opts.feeData.destinationFee.feeAsset)) {
                throw new TypeError('Destination fee asset is invalid');
            }

            let sourceFee = new xdr.FeeDataV2({
                maxPaymentFee: BaseOperation._toUnsignedXDRAmount(opts.feeData.sourceFee.maxPaymentFee),
                fixedFee: BaseOperation._toUnsignedXDRAmount(opts.feeData.sourceFee.fixedFee),
                feeAsset: opts.feeData.sourceFee.feeAsset,
                ext: new xdr.FeeDataV2Ext(xdr.LedgerVersion.emptyVersion())
            });
            let destinationFee = new xdr.FeeDataV2({
                maxPaymentFee: BaseOperation._toUnsignedXDRAmount(opts.feeData.destinationFee.maxPaymentFee),
                fixedFee: BaseOperation._toUnsignedXDRAmount(opts.feeData.destinationFee.fixedFee),
                feeAsset: opts.feeData.destinationFee.feeAsset,
                ext: new xdr.FeeDataV2Ext(xdr.LedgerVersion.emptyVersion())
            });
            attrs.feeData = new xdr.PaymentFeeDataV2({
                sourceFee,
                destinationFee,
                sourcePaysForDest: opts.feeData.sourcePaysForDest,
                ext: new xdr.PaymentFeeDataV2Ext(xdr.LedgerVersion.emptyVersion())
            });
        } else {
            throw new Error("feeData argument must be defined");
        }

        if (!BaseOperation.isValidSubject(opts.subject)) {
            throw new Error("subject argument must be of type String 0-256 long");
        }

        if (isUndefined(opts.reference)) {
            opts.reference = '';
        }

        attrs.sourceBalanceId = Keypair.fromBalanceId(opts.sourceBalanceId).xdrBalanceId();
        attrs.amount = BaseOperation._toUnsignedXDRAmount(opts.amount);
        attrs.subject = opts.subject;
        attrs.reference = opts.reference;
        attrs.ext = new xdr.PaymentOpV2Ext(xdr.LedgerVersion.emptyVersion());

        return attrs;
    }

    static paymentV2ToObject(result, attrs) {
        result.sourceBalanceId = BaseOperation.balanceIdtoString(attrs.sourceBalanceId());
        switch (attrs.destination().switch()) {
            case xdr.PaymentDestinationType.account(): {
                result.destination = BaseOperation.accountIdtoAddress(attrs.destination().accountId());
                break;
            }
            case xdr.PaymentDestinationType.balance(): {
                result.destination = BaseOperation.balanceIdtoString(attrs.destination().balanceId());
                break;
            }
        }
        result.amount = BaseOperation._fromXDRAmount(attrs.amount());
        result.feeData = {
            sourceFee: {
                maxPaymentFee: BaseOperation._fromXDRAmount(attrs.feeData().sourceFee().maxPaymentFee()),
                fixedFee: BaseOperation._fromXDRAmount(attrs.feeData().sourceFee().fixedFee()),
                feeAsset: attrs.feeData().sourceFee().feeAsset(),
            },
            destinationFee: {
                maxPaymentFee: BaseOperation._fromXDRAmount(attrs.feeData().destinationFee().maxPaymentFee()),
                fixedFee: BaseOperation._fromXDRAmount(attrs.feeData().destinationFee().fixedFee()),
                feeAsset: attrs.feeData().destinationFee().feeAsset(),
            },
            sourcePaysForDest: attrs.feeData().sourcePaysForDest()
        };
        result.subject = attrs.subject();
        result.reference = attrs.reference();
    }
}