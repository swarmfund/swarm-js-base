import {default as xdr} from "../generated/stellar-xdr_generated";
import isUndefined from 'lodash/isUndefined';
import {BaseOperation} from './base_operation';
import {Keypair} from "../keypair";
import {UnsignedHyper, Hyper} from "js-xdr";
import { PaymentV2Builder } from "./payment_v2_builder";

export class BillPayBuilder {

    /**
     * Creates BillPay operation where destination is AccountID or BalanceID
     * @param {object} opts
     * @param {string} opts.requestId
     * @param {string} opts.sourceBalanceId
     * @param {string} opts.destination
     * @param {number|string} opts.amount
     * @param {object} opts.feeData
     * * @param {object} opts.feeData.sourceFee
     * * * @param {number|string} opts.feeData.sourceFee.maxPaymentFee
     * * * @param {number|string} opts.feeData.sourceFee.fixedFee
     * * * @param {string} opts.feeData.sourceFee.feeAsset
     * * @param {object} opts.feeData.destinationFee
     * * * @param {number|string} opts.feeData.destinationFee.maxPaymentFee
     * * * @param {number|string} opts.feeData.destinationFee.fixedFee
     * * * @param {string} opts.feeData.destinationFee.feeAsset
     * * @param {bool} opts.feeData.sourcePaysForDest
     * @param {string} opts.subject
     * @param {string} opts.reference
     * @returns {xdr.BillPayOp}
     */
    static billPay(opts) {
        let paymentAttrs = {};

        if (!Keypair.isValidBalanceKey(opts.sourceBalanceId)) {
            throw new TypeError('sourceBalanceId is invalid');
        }

        if (Keypair.isValidPublicKey(opts.destination)) {
            paymentAttrs.destination = new xdr.PaymentOpV2Destination.account(Keypair.fromAccountId(opts.destination).xdrAccountId());
        } else if (Keypair.isValidBalanceKey(opts.destination)) {
            paymentAttrs.destination = new xdr.PaymentOpV2Destination.balance(Keypair.fromBalanceId(opts.destination).xdrBalanceId());
        } else {
            throw new TypeError('opts.destination is invalid');
        }


        if (!BaseOperation.isValidAmount(opts.amount)) {
            throw new TypeError('amount argument must be of type String and represent a positive number');
        }

        if (isUndefined(opts.feeData)) {
            throw new Error("feeData argument must be defined");
        }

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
        paymentAttrs.feeData = new xdr.PaymentFeeDataV2({
            sourceFee,
            destinationFee,
            sourcePaysForDest: opts.feeData.sourcePaysForDest,
            ext: new xdr.PaymentFeeDataV2Ext(xdr.LedgerVersion.emptyVersion())
        });

        if (!BaseOperation.isValidSubject(opts.subject)) {
            throw new Error("subject argument must be of type String 0-256 long");
        }

        if (isUndefined(opts.reference)) {
            opts.reference = '';
        }

        paymentAttrs.sourceBalanceId = Keypair.fromBalanceId(opts.sourceBalanceId).xdrBalanceId();
        paymentAttrs.amount = BaseOperation._toUnsignedXDRAmount(opts.amount);
        paymentAttrs.subject = opts.subject;
        paymentAttrs.reference = opts.reference;
        paymentAttrs.ext = new xdr.PaymentOpV2Ext(xdr.LedgerVersion.emptyVersion());

        let paymentV2 = new xdr.PaymentOpV2(paymentAttrs);

        let attrs  = {
            paymentDetails: paymentV2,
            requestId: UnsignedHyper.fromString(opts.requestId),
            ext: new xdr.BillPayOpExt(xdr.LedgerVersion.emptyVersion())
        };

        let billPayOp = new xdr.BillPayOp(attrs);

        let opAttrs = {};
        opAttrs.body = xdr.OperationBody.billPay(billPayOp);
        BaseOperation.setSourceAccount(opAttrs, opts);
        return new xdr.Operation(opAttrs);
    }

    static billPayToObject(result, attrs) {
        result.requestId = attrs.requestId().toString();
        let paymentAttrs = attrs.paymentDetails();
        PaymentV2Builder.paymentV2ToObject(result, paymentAttrs);
    }
}