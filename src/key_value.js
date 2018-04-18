export class KeyValue {
    /**
     * Create a new Account object.
     *
     * `KeyValue` represents a single KeyValue in Stellar network and it's key.
     * @constructor
     * @param {string} key of the KeyVlaue
     */
    constructor(key) {
        this._key = key;
    }

    /**
     * @returns {string}, a key of current KeyValue entry
     */
    keyValueKey() {
        return this._key;
    }
};