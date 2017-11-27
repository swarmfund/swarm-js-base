"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var Keypair = require("./keypair").Keypair;

var Operation = require("./operation").Operation;

var xdr = _interopRequire(require("./generated/stellar-xdr_generated"));

var BigNumber = _interopRequire(require("bignumber.js"));

var hash = require("./hashing").hash;

var PreEmission = exports.PreEmission = (function () {
    function PreEmission() {
        _classCallCheck(this, PreEmission);
    }

    _createClass(PreEmission, null, {
        build: {
            value: function build(opts) {
                if (!Operation.isValidAmount(opts.amount, false)) {
                    throw new TypeError("amount must be of type String and represent a positive number");
                }
                if (!Operation.isValidString(opts.serialNumber, 4, 64)) {
                    throw new TypeError("serialNumber must be 4-64 string");
                }
                if (!Operation.isValidArrayOfClass(opts.keyPairs, 1, Keypair)) {
                    throw new TypeError("must get array of keyparis");
                }
                if (!Operation.isValidAsset(opts.asset)) {
                    throw new TypeError("asset is invalid");
                }

                var xdrAmount = Operation._toXDRAmount(opts.amount);
                var multipliedAmount = new BigNumber(xdrAmount).toString();
                var signatures = [];
                for (var i = 0; i < opts.keyPairs.length; i++) {
                    var signature = opts.keyPairs[i].signDecorated(hash("" + opts.serialNumber + ":" + multipliedAmount + ":" + opts.asset));
                    signatures.push(signature);
                }
                return new xdr.PreEmission({
                    serialNumber: opts.serialNumber,
                    amount: xdrAmount,
                    asset: opts.asset,
                    signatures: signatures,
                    ext: new xdr.PreEmissionExt(xdr.LedgerVersion.emptyVersion()) });
            }
        },
        xdrFromData: {
            value: function xdrFromData(data) {
                return new xdr.PreEmission({
                    serialNumber: data.serialNumber,
                    amount: Operation._toXDRAmount(data.amount),
                    asset: data.asset,
                    signatures: data.signatures
                });
            }
        },
        dataFromXdr: {
            value: function dataFromXdr(xdr) {
                var attributes = {};
                attributes.amount = Operation._fromXDRAmount(xdr.amount());
                attributes.serialNumber = xdr.serialNumber();
                attributes.asset = xdr.asset();
                attributes.signatures = xdr.signatures();
                return attributes;
            }
        },
        isSigned: {
            value: function isSigned(attributes, keyPair) {
                var signatures = attributes.signatures;
                var multipliedAmount = this._multipliedAmount(attributes.amount);
                for (var i = 0; i < signatures.length; i++) {
                    if (keyPair.verify(hash("" + attributes.serialNumber + ":" + multipliedAmount + ":" + attributes.asset), signatures[i].signature())) {
                        return true;
                    }
                }
                return false;
            }
        },
        addSignature: {
            value: function addSignature(attributes, keyPair) {
                var multipliedAmount = this._multipliedAmount(attributes.amount);
                var signature = keyPair.signDecorated(hash("" + attributes.serialNumber + ":" + multipliedAmount + ":" + attributes.asset));
                attributes.signatures.push(signature);
                return attributes;
            }
        },
        _multipliedAmount: {
            value: function _multipliedAmount(amount) {
                var xdrAmount = Operation._toXDRAmount(amount);
                return new BigNumber(xdrAmount).toString();
            }
        }
    });

    return PreEmission;
})();