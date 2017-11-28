// Automatically generated on 2017-11-28T15:12:47+02:00
// DO NOT EDIT or your changes may be overwritten

/* jshint maxstatements:2147483647  */
/* jshint esnext:true  */

import * as XDR from 'js-xdr';


var types = XDR.config(xdr => {

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("AccountLimitsEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct AccountLimitsEntry
//   {
//       AccountID accountID;
//       Limits limits;
//   
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AccountLimitsEntry", [
  ["accountId", xdr.lookup("AccountId")],
  ["limits", xdr.lookup("Limits")],
  ["ext", xdr.lookup("AccountLimitsEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("AccountTypeLimitsEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct AccountTypeLimitsEntry
//   {
//   	AccountType accountType;
//       Limits limits;
//   
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AccountTypeLimitsEntry", [
  ["accountType", xdr.lookup("AccountType")],
  ["limits", xdr.lookup("Limits")],
  ["ext", xdr.lookup("AccountTypeLimitsEntryExt")],
]);

// === xdr source ============================================================
//
//   enum SignerType
//   {
//   	SIGNER_READER = 1,                  // can only read data from API and Horizon
//   	SIGNER_NOT_VERIFIED_ACC_MANAGER = 2,// can manage not verified account and block/unblock general
//   	SIGNER_GENERAL_ACC_MANAGER = 4,     // allowed to create account, block/unblock, change limits for particular general account
//   	SIGNER_DIRECT_DEBIT_OPERATOR = 8, // allowed to perform direct debit operation
//   	SIGNER_ASSET_MANAGER = 16, // allowed to create assets/asset pairs and update policies, set fees, review pre-issuance requests
//   	SIGNER_ASSET_RATE_MANAGER = 32, // allowed to set physical asset price
//   	SIGNER_BALANCE_MANAGER = 64, // allowed to create balances, spend assets from balances
//   	SIGNER_ISSUANCE_MANAGER = 128, // allowed to make preissuance request, review issuance requests
//   	SIGNER_INVOICE_MANAGER = 256, // allowed to create payment requests to other accounts
//   	SIGNER_PAYMENT_OPERATOR = 512, // allowed to review payment requests
//   	SIGNER_LIMITS_MANAGER = 1024, // allowed to change limits
//   	SIGNER_ACCOUNT_MANAGER = 2048, // allowed to add/delete signers and trust
//   	SIGNER_COMMISSION_BALANCE_MANAGER  = 4096,// allowed to spend from commission balances
//   	SIGNER_OPERATIONAL_BALANCE_MANAGER = 8192 // allowed to spend from operational balances
//   };
//
// ===========================================================================
xdr.enum("SignerType", {
  signerReader: 1,
  signerNotVerifiedAccManager: 2,
  signerGeneralAccManager: 4,
  signerDirectDebitOperator: 8,
  signerAssetManager: 16,
  signerAssetRateManager: 32,
  signerBalanceManager: 64,
  signerIssuanceManager: 128,
  signerInvoiceManager: 256,
  signerPaymentOperator: 512,
  signerLimitsManager: 1024,
  signerAccountManager: 2048,
  signerCommissionBalanceManager: 4096,
  signerOperationalBalanceManager: 8192,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("SignerExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct Signer
//   {
//       AccountID pubKey;
//       uint32 weight; // really only need 1byte
//   	uint32 signerType;
//   	uint32 identity;
//   	string256 name;
//   
//   	 // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("Signer", [
  ["pubKey", xdr.lookup("AccountId")],
  ["weight", xdr.lookup("Uint32")],
  ["signerType", xdr.lookup("Uint32")],
  ["identity", xdr.lookup("Uint32")],
  ["name", xdr.lookup("String256")],
  ["ext", xdr.lookup("SignerExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("TrustEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct TrustEntry
//   {
//       AccountID allowedAccount;
//       BalanceID balanceToUse;
//   
//   	 // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("TrustEntry", [
  ["allowedAccount", xdr.lookup("AccountId")],
  ["balanceToUse", xdr.lookup("BalanceId")],
  ["ext", xdr.lookup("TrustEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("LimitsExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct Limits
//   {
//       int64 dailyOut;
//   	int64 weeklyOut;
//   	int64 monthlyOut;
//       int64 annualOut;
//   
//   	 // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//       
//   };
//
// ===========================================================================
xdr.struct("Limits", [
  ["dailyOut", xdr.lookup("Int64")],
  ["weeklyOut", xdr.lookup("Int64")],
  ["monthlyOut", xdr.lookup("Int64")],
  ["annualOut", xdr.lookup("Int64")],
  ["ext", xdr.lookup("LimitsExt")],
]);

// === xdr source ============================================================
//
//   enum AccountPolicies
//   {
//   	NO_PERMISSIONS = 0,
//   	ALLOW_TO_CREATE_USER_VIA_API = 1
//   };
//
// ===========================================================================
xdr.enum("AccountPolicies", {
  noPermission: 0,
  allowToCreateUserViaApi: 1,
});

// === xdr source ============================================================
//
//   enum AccountType
//   {
//   	OPERATIONAL = 1,       // operational account of the system 
//   	GENERAL = 2,           // general account can perform payments, setoptions, be source account for tx, etc.
//   	COMMISSION = 3,        // commission account
//   	MASTER = 4,            // master account
//       NOT_VERIFIED = 5,
//   	SYNDICATE = 6 // can create asset
//   };
//
// ===========================================================================
xdr.enum("AccountType", {
  operational: 1,
  general: 2,
  commission: 3,
  master: 4,
  notVerified: 5,
  syndicate: 6,
});

// === xdr source ============================================================
//
//   enum BlockReasons
//   {
//   	RECOVERY_REQUEST = 1,
//   	KYC_UPDATE = 2,
//   	SUSPICIOUS_BEHAVIOR = 4
//   };
//
// ===========================================================================
xdr.enum("BlockReasons", {
  recoveryRequest: 1,
  kycUpdate: 2,
  suspiciousBehavior: 4,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("AccountEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct AccountEntry
//   {
//       AccountID accountID;      // master public key for this account
//   
//       // fields used for signatures
//       // thresholds stores unsigned bytes: [weight of master|low|medium|high]
//       Thresholds thresholds;
//   
//       Signer signers<>; // possible signers for this account
//       Limits* limits;
//   
//   	uint32 blockReasons;
//       AccountType accountType; // type of the account
//       
//       // Referral marketing
//       AccountID* referrer;     // parent account
//       int64 shareForReferrer; // share of fee to pay parent
//   	int32 policies;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AccountEntry", [
  ["accountId", xdr.lookup("AccountId")],
  ["thresholds", xdr.lookup("Thresholds")],
  ["signers", xdr.varArray(xdr.lookup("Signer"), 2147483647)],
  ["limits", xdr.option(xdr.lookup("Limits"))],
  ["blockReasons", xdr.lookup("Uint32")],
  ["accountType", xdr.lookup("AccountType")],
  ["referrer", xdr.option(xdr.lookup("AccountId"))],
  ["shareForReferrer", xdr.lookup("Int64")],
  ["policies", xdr.lookup("Int32")],
  ["ext", xdr.lookup("AccountEntryExt")],
]);

// === xdr source ============================================================
//
//   enum AssetPairPolicy
//   {
//   	ASSET_PAIR_TRADEABLE = 1, // if not set pair can not be traided
//   	ASSET_PAIR_PHYSICAL_PRICE_RESTRICTION = 2, // if set, then prices for new offers must be greater then physical price with correction
//   	ASSET_PAIR_CURRENT_PRICE_RESTRICTION = 4 // if set, then price for new offers must be in interval of (1 +- maxPriceStep)*currentPrice
//   };
//
// ===========================================================================
xdr.enum("AssetPairPolicy", {
  assetPairTradeable: 1,
  assetPairPhysicalPriceRestriction: 2,
  assetPairCurrentPriceRestriction: 4,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("AssetPairEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct AssetPairEntry
//   {
//       AssetCode base;
//   	AssetCode quote;
//   
//       int64 currentPrice;
//       int64 physicalPrice;
//   
//   	int64 physicalPriceCorrection; // correction of physical price in percents. If physical price is set and restriction by physical price set, mininal price for offer for this pair will be physicalPrice * physicalPriceCorrection
//   	int64 maxPriceStep; // max price step in percent. User is allowed to set offer with price < (1 - maxPriceStep)*currentPrice and > (1 + maxPriceStep)*currentPrice
//   
//   
//   	int32 policies;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AssetPairEntry", [
  ["base", xdr.lookup("AssetCode")],
  ["quote", xdr.lookup("AssetCode")],
  ["currentPrice", xdr.lookup("Int64")],
  ["physicalPrice", xdr.lookup("Int64")],
  ["physicalPriceCorrection", xdr.lookup("Int64")],
  ["maxPriceStep", xdr.lookup("Int64")],
  ["policies", xdr.lookup("Int32")],
  ["ext", xdr.lookup("AssetPairEntryExt")],
]);

// === xdr source ============================================================
//
//   enum AssetPolicy
//   {
//   	ASSET_TRANSFERABLE = 1
//   };
//
// ===========================================================================
xdr.enum("AssetPolicy", {
  assetTransferable: 1,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("AssetEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct AssetEntry
//   {
//       AssetCode code;
//   	AccountID owner;
//       string64 name;
//   	AccountID preissuedAssetSigner;
//   	longstring description;
//   	string256 externalResourceLink;
//   	uint64 maxIssuanceAmount;
//   	uint64 availableForIssueance;
//   	uint64 issued;
//       uint32 policies;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AssetEntry", [
  ["code", xdr.lookup("AssetCode")],
  ["owner", xdr.lookup("AccountId")],
  ["name", xdr.lookup("String64")],
  ["preissuedAssetSigner", xdr.lookup("AccountId")],
  ["description", xdr.lookup("Longstring")],
  ["externalResourceLink", xdr.lookup("String256")],
  ["maxIssuanceAmount", xdr.lookup("Uint64")],
  ["availableForIssueance", xdr.lookup("Uint64")],
  ["issued", xdr.lookup("Uint64")],
  ["policies", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("AssetEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("BalanceEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct BalanceEntry
//   {
//       BalanceID balanceID;
//       AssetCode asset;
//       AccountID accountID;
//       uint64 amount;
//       uint64 locked;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("BalanceEntry", [
  ["balanceId", xdr.lookup("BalanceId")],
  ["asset", xdr.lookup("AssetCode")],
  ["accountId", xdr.lookup("AccountId")],
  ["amount", xdr.lookup("Uint64")],
  ["locked", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("BalanceEntryExt")],
]);

// === xdr source ============================================================
//
//   enum FeeType
//   {
//       PAYMENT_FEE = 0,
//       REFERRAL_FEE = 1,
//   	OFFER_FEE = 2,
//       FORFEIT_FEE = 3,
//       EMISSION_FEE = 4
//   };
//
// ===========================================================================
xdr.enum("FeeType", {
  paymentFee: 0,
  referralFee: 1,
  offerFee: 2,
  forfeitFee: 3,
  emissionFee: 4,
});

// === xdr source ============================================================
//
//   enum EmissionFeeType
//   {
//   	PRIMARY_MARKET = 1,
//   	SECONDARY_MARKET = 2
//   };
//
// ===========================================================================
xdr.enum("EmissionFeeType", {
  primaryMarket: 1,
  secondaryMarket: 2,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("FeeEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct FeeEntry
//   {
//       FeeType feeType;
//       AssetCode asset;
//       int64 fixedFee; // fee paid for operation
//   	int64 percentFee; // percent of transfer amount to be charged
//   
//       AccountID* accountID;
//       AccountType* accountType;
//       int64 subtype; // for example, different withdrawals — bars or coins
//   
//       int64 lowerBound;
//       int64 upperBound;
//   
//       Hash hash;
//   
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   
//   };
//
// ===========================================================================
xdr.struct("FeeEntry", [
  ["feeType", xdr.lookup("FeeType")],
  ["asset", xdr.lookup("AssetCode")],
  ["fixedFee", xdr.lookup("Int64")],
  ["percentFee", xdr.lookup("Int64")],
  ["accountId", xdr.option(xdr.lookup("AccountId"))],
  ["accountType", xdr.option(xdr.lookup("AccountType"))],
  ["subtype", xdr.lookup("Int64")],
  ["lowerBound", xdr.lookup("Int64")],
  ["upperBound", xdr.lookup("Int64")],
  ["hash", xdr.lookup("Hash")],
  ["ext", xdr.lookup("FeeEntryExt")],
]);

// === xdr source ============================================================
//
//   enum InvoiceState
//   {
//       INVOICE_NEEDS_PAYMENT = 0,
//       INVOICE_NEEDS_PAYMENT_REVIEW = 1
//   };
//
// ===========================================================================
xdr.enum("InvoiceState", {
  invoiceNeedsPayment: 0,
  invoiceNeedsPaymentReview: 1,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("InvoiceEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct InvoiceEntry
//   {
//       uint64 invoiceID;
//       AccountID receiverAccount;
//       BalanceID receiverBalance;
//   	AccountID sender;
//       int64 amount;
//       
//       InvoiceState state;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("InvoiceEntry", [
  ["invoiceId", xdr.lookup("Uint64")],
  ["receiverAccount", xdr.lookup("AccountId")],
  ["receiverBalance", xdr.lookup("BalanceId")],
  ["sender", xdr.lookup("AccountId")],
  ["amount", xdr.lookup("Int64")],
  ["state", xdr.lookup("InvoiceState")],
  ["ext", xdr.lookup("InvoiceEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("OfferEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct OfferEntry
//   {
//       uint64 offerID;
//   	AccountID ownerID;
//   	bool isBuy;
//       AssetCode base; // A
//       AssetCode quote;  // B
//   	BalanceID baseBalance; 
//   	BalanceID quoteBalance;
//       int64 baseAmount;
//   	int64 quoteAmount;
//   	uint64 createdAt;
//   	int64 fee;
//   
//       int64 percentFee;
//   
//   	// price of A in terms of B
//       int64 price;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("OfferEntry", [
  ["offerId", xdr.lookup("Uint64")],
  ["ownerId", xdr.lookup("AccountId")],
  ["isBuy", xdr.bool()],
  ["base", xdr.lookup("AssetCode")],
  ["quote", xdr.lookup("AssetCode")],
  ["baseBalance", xdr.lookup("BalanceId")],
  ["quoteBalance", xdr.lookup("BalanceId")],
  ["baseAmount", xdr.lookup("Int64")],
  ["quoteAmount", xdr.lookup("Int64")],
  ["createdAt", xdr.lookup("Uint64")],
  ["fee", xdr.lookup("Int64")],
  ["percentFee", xdr.lookup("Int64")],
  ["price", xdr.lookup("Int64")],
  ["ext", xdr.lookup("OfferEntryExt")],
]);

// === xdr source ============================================================
//
//   enum RequestType
//   {
//       REQUEST_TYPE_SALE = 0,
//       REQUEST_TYPE_WITHDRAWAL = 1,
//       REQUEST_TYPE_REDEEM = 2,
//       REQUEST_TYPE_PAYMENT = 3
//   };
//
// ===========================================================================
xdr.enum("RequestType", {
  requestTypeSale: 0,
  requestTypeWithdrawal: 1,
  requestTypeRedeem: 2,
  requestTypePayment: 3,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("PaymentRequestEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct PaymentRequestEntry
//   {
//       uint64 paymentID;
//       BalanceID sourceBalance;
//       BalanceID* destinationBalance;
//       int64 sourceSend;
//       int64 sourceSendUniversal;
//       int64 destinationReceive;
//       
//       uint64 createdAt;
//   
//       uint64* invoiceID;
//   
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("PaymentRequestEntry", [
  ["paymentId", xdr.lookup("Uint64")],
  ["sourceBalance", xdr.lookup("BalanceId")],
  ["destinationBalance", xdr.option(xdr.lookup("BalanceId"))],
  ["sourceSend", xdr.lookup("Int64")],
  ["sourceSendUniversal", xdr.lookup("Int64")],
  ["destinationReceive", xdr.lookup("Int64")],
  ["createdAt", xdr.lookup("Uint64")],
  ["invoiceId", xdr.option(xdr.lookup("Uint64"))],
  ["ext", xdr.lookup("PaymentRequestEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ReferenceEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ReferenceEntry
//   {
//   	AccountID sender;
//       string64 reference;
//   
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ReferenceEntry", [
  ["sender", xdr.lookup("AccountId")],
  ["reference", xdr.lookup("String64")],
  ["ext", xdr.lookup("ReferenceEntryExt")],
]);

// === xdr source ============================================================
//
//   enum ReviewableRequestType
//   {
//       ASSET_CREATE = 0,
//   	ASSET_UPDATE = 1,
//   	PRE_ISSUANCE_CREATE = 2,
//   	ISSUANCE_CREATE = 3
//   
//   };
//
// ===========================================================================
xdr.enum("ReviewableRequestType", {
  assetCreate: 0,
  assetUpdate: 1,
  preIssuanceCreate: 2,
  issuanceCreate: 3,
});

// === xdr source ============================================================
//
//   union switch (ReviewableRequestType type) {
//   		case ASSET_CREATE:
//   			AssetCreationRequest assetCreationRequest;
//   		case ASSET_UPDATE:
//   			AssetUpdateRequest assetUpdateRequest;
//   		case PRE_ISSUANCE_CREATE:
//   			PreIssuanceRequest preIssuanceRequest;
//   		case ISSUANCE_CREATE:
//   			IssuanceRequest issuanceRequest;
//   	}
//
// ===========================================================================
xdr.union("ReviewableRequestEntryBody", {
  switchOn: xdr.lookup("ReviewableRequestType"),
  switchName: "type",
  switches: [
    ["assetCreate", "assetCreationRequest"],
    ["assetUpdate", "assetUpdateRequest"],
    ["preIssuanceCreate", "preIssuanceRequest"],
    ["issuanceCreate", "issuanceRequest"],
  ],
  arms: {
    assetCreationRequest: xdr.lookup("AssetCreationRequest"),
    assetUpdateRequest: xdr.lookup("AssetUpdateRequest"),
    preIssuanceRequest: xdr.lookup("PreIssuanceRequest"),
    issuanceRequest: xdr.lookup("IssuanceRequest"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ReviewableRequestEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ReviewableRequestEntry {
//   	uint64 ID;
//   	Hash hash; // hash of the request body
//   	AccountID requestor;
//   	string256 rejectReason;
//   	AccountID reviewer;
//   	string64* reference; // reference for request which will act as an unique key for the request (will reject request with the same reference from same requestor)
//   
//   	union switch (ReviewableRequestType type) {
//   		case ASSET_CREATE:
//   			AssetCreationRequest assetCreationRequest;
//   		case ASSET_UPDATE:
//   			AssetUpdateRequest assetUpdateRequest;
//   		case PRE_ISSUANCE_CREATE:
//   			PreIssuanceRequest preIssuanceRequest;
//   		case ISSUANCE_CREATE:
//   			IssuanceRequest issuanceRequest;
//   	} body;
//   
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ReviewableRequestEntry", [
  ["id", xdr.lookup("Uint64")],
  ["hash", xdr.lookup("Hash")],
  ["requestor", xdr.lookup("AccountId")],
  ["rejectReason", xdr.lookup("String256")],
  ["reviewer", xdr.lookup("AccountId")],
  ["reference", xdr.option(xdr.lookup("String64"))],
  ["body", xdr.lookup("ReviewableRequestEntryBody")],
  ["ext", xdr.lookup("ReviewableRequestEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("StatisticsEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct StatisticsEntry
//   {
//   	AccountID accountID;
//   
//   	int64 dailyOutcome;
//   	int64 weeklyOutcome;
//   	int64 monthlyOutcome;
//   	int64 annualOutcome;
//   
//   	int64 updatedAt;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("StatisticsEntry", [
  ["accountId", xdr.lookup("AccountId")],
  ["dailyOutcome", xdr.lookup("Int64")],
  ["weeklyOutcome", xdr.lookup("Int64")],
  ["monthlyOutcome", xdr.lookup("Int64")],
  ["annualOutcome", xdr.lookup("Int64")],
  ["updatedAt", xdr.lookup("Int64")],
  ["ext", xdr.lookup("StatisticsEntryExt")],
]);

// === xdr source ============================================================
//
//   enum ThresholdIndexes
//   {
//       THRESHOLD_MASTER_WEIGHT = 0,
//       THRESHOLD_LOW = 1,
//       THRESHOLD_MED = 2,
//       THRESHOLD_HIGH = 3
//   };
//
// ===========================================================================
xdr.enum("ThresholdIndices", {
  thresholdMasterWeight: 0,
  thresholdLow: 1,
  thresholdMed: 2,
  thresholdHigh: 3,
});

// === xdr source ============================================================
//
//   enum LedgerEntryType
//   {
//       ACCOUNT = 0,
//       FEE = 2,
//       BALANCE = 4,
//       PAYMENT_REQUEST = 5,
//       ASSET = 6,
//       REFERENCE_ENTRY = 7,
//       ACCOUNT_TYPE_LIMITS = 8,
//       STATISTICS = 9,
//       TRUST = 10,
//       ACCOUNT_LIMITS = 11,
//   	ASSET_PAIR = 12,
//   	OFFER_ENTRY = 13,
//       INVOICE = 14,
//   	REVIEWABLE_REQUEST = 15
//   };
//
// ===========================================================================
xdr.enum("LedgerEntryType", {
  account: 0,
  fee: 2,
  balance: 4,
  paymentRequest: 5,
  asset: 6,
  referenceEntry: 7,
  accountTypeLimit: 8,
  statistic: 9,
  trust: 10,
  accountLimit: 11,
  assetPair: 12,
  offerEntry: 13,
  invoice: 14,
  reviewableRequest: 15,
});

// === xdr source ============================================================
//
//   union switch (LedgerEntryType type)
//       {
//       case ACCOUNT:
//           AccountEntry account;
//       case FEE:
//           FeeEntry feeState;
//       case BALANCE:
//           BalanceEntry balance;
//       case PAYMENT_REQUEST:
//           PaymentRequestEntry paymentRequest;
//       case ASSET:
//           AssetEntry asset;
//       case REFERENCE_ENTRY:
//           ReferenceEntry reference;
//       case ACCOUNT_TYPE_LIMITS:
//           AccountTypeLimitsEntry accountTypeLimits;
//       case STATISTICS:
//           StatisticsEntry stats;
//       case TRUST:
//           TrustEntry trust;
//       case ACCOUNT_LIMITS:
//           AccountLimitsEntry accountLimits;
//   	case ASSET_PAIR: 
//   		AssetPairEntry assetPair;
//   	case OFFER_ENTRY:
//   		OfferEntry offer;
//       case INVOICE:
//           InvoiceEntry invoice;
//   	case REVIEWABLE_REQUEST:
//   		ReviewableRequestEntry reviewableRequest;
//       }
//
// ===========================================================================
xdr.union("LedgerEntryData", {
  switchOn: xdr.lookup("LedgerEntryType"),
  switchName: "type",
  switches: [
    ["account", "account"],
    ["fee", "feeState"],
    ["balance", "balance"],
    ["paymentRequest", "paymentRequest"],
    ["asset", "asset"],
    ["referenceEntry", "reference"],
    ["accountTypeLimit", "accountTypeLimits"],
    ["statistic", "stats"],
    ["trust", "trust"],
    ["accountLimit", "accountLimits"],
    ["assetPair", "assetPair"],
    ["offerEntry", "offer"],
    ["invoice", "invoice"],
    ["reviewableRequest", "reviewableRequest"],
  ],
  arms: {
    account: xdr.lookup("AccountEntry"),
    feeState: xdr.lookup("FeeEntry"),
    balance: xdr.lookup("BalanceEntry"),
    paymentRequest: xdr.lookup("PaymentRequestEntry"),
    asset: xdr.lookup("AssetEntry"),
    reference: xdr.lookup("ReferenceEntry"),
    accountTypeLimits: xdr.lookup("AccountTypeLimitsEntry"),
    stats: xdr.lookup("StatisticsEntry"),
    trust: xdr.lookup("TrustEntry"),
    accountLimits: xdr.lookup("AccountLimitsEntry"),
    assetPair: xdr.lookup("AssetPairEntry"),
    offer: xdr.lookup("OfferEntry"),
    invoice: xdr.lookup("InvoiceEntry"),
    reviewableRequest: xdr.lookup("ReviewableRequestEntry"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("LedgerEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct LedgerEntry
//   {
//       uint32 lastModifiedLedgerSeq; // ledger the LedgerEntry was last changed
//   
//       union switch (LedgerEntryType type)
//       {
//       case ACCOUNT:
//           AccountEntry account;
//       case FEE:
//           FeeEntry feeState;
//       case BALANCE:
//           BalanceEntry balance;
//       case PAYMENT_REQUEST:
//           PaymentRequestEntry paymentRequest;
//       case ASSET:
//           AssetEntry asset;
//       case REFERENCE_ENTRY:
//           ReferenceEntry reference;
//       case ACCOUNT_TYPE_LIMITS:
//           AccountTypeLimitsEntry accountTypeLimits;
//       case STATISTICS:
//           StatisticsEntry stats;
//       case TRUST:
//           TrustEntry trust;
//       case ACCOUNT_LIMITS:
//           AccountLimitsEntry accountLimits;
//   	case ASSET_PAIR: 
//   		AssetPairEntry assetPair;
//   	case OFFER_ENTRY:
//   		OfferEntry offer;
//       case INVOICE:
//           InvoiceEntry invoice;
//   	case REVIEWABLE_REQUEST:
//   		ReviewableRequestEntry reviewableRequest;
//       }
//       data;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("LedgerEntry", [
  ["lastModifiedLedgerSeq", xdr.lookup("Uint32")],
  ["data", xdr.lookup("LedgerEntryData")],
  ["ext", xdr.lookup("LedgerEntryExt")],
]);

// === xdr source ============================================================
//
//   enum EnvelopeType
//   {
//       ENVELOPE_TYPE_SCP = 1,
//       ENVELOPE_TYPE_TX = 2,
//       ENVELOPE_TYPE_AUTH = 3
//   };
//
// ===========================================================================
xdr.enum("EnvelopeType", {
  envelopeTypeScp: 1,
  envelopeTypeTx: 2,
  envelopeTypeAuth: 3,
});

// === xdr source ============================================================
//
//   typedef opaque UpgradeType<128>;
//
// ===========================================================================
xdr.typedef("UpgradeType", xdr.varOpaque(128));

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("StellarValueExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct StellarValue
//   {
//       Hash txSetHash;   // transaction set to apply to previous ledger
//       uint64 closeTime; // network close time
//   
//       // upgrades to apply to the previous ledger (usually empty)
//       // this is a vector of encoded 'LedgerUpgrade' so that nodes can drop
//       // unknown steps during consensus if needed.
//       // see notes below on 'LedgerUpgrade' for more detail
//       // max size is dictated by number of upgrade types (+ room for future)
//       UpgradeType upgrades<6>;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("StellarValue", [
  ["txSetHash", xdr.lookup("Hash")],
  ["closeTime", xdr.lookup("Uint64")],
  ["upgrades", xdr.varArray(xdr.lookup("UpgradeType"), 6)],
  ["ext", xdr.lookup("StellarValueExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("LedgerHeaderExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct LedgerHeader
//   {
//       uint32 ledgerVersion;    // the protocol version of the ledger
//       Hash previousLedgerHash; // hash of the previous ledger header
//       StellarValue scpValue;   // what consensus agreed to
//       Hash txSetResultHash;    // the TransactionResultSet that led to this ledger
//       Hash bucketListHash;     // hash of the ledger state
//   
//       uint32 ledgerSeq; // sequence number of this ledger
//   
//       uint64 idPool; // last used global ID, used for generating objects
//   
//       uint32 baseFee;     // base fee per operation in stroops
//       uint32 baseReserve; // account base reserve in stroops
//   
//       uint32 maxTxSetSize; // maximum size a transaction set can be
//   
//       PublicKey issuanceKeys<>;
//       int64 txExpirationPeriod;
//       
//       Hash skipList[4]; // hashes of ledgers in the past. allows you to jump back
//                         // in time without walking the chain back ledger by ledger
//                         // each slot contains the oldest ledger that is mod of
//                         // either 50  5000  50000 or 500000 depending on index
//                         // skipList[0] mod(50), skipList[1] mod(5000), etc
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("LedgerHeader", [
  ["ledgerVersion", xdr.lookup("Uint32")],
  ["previousLedgerHash", xdr.lookup("Hash")],
  ["scpValue", xdr.lookup("StellarValue")],
  ["txSetResultHash", xdr.lookup("Hash")],
  ["bucketListHash", xdr.lookup("Hash")],
  ["ledgerSeq", xdr.lookup("Uint32")],
  ["idPool", xdr.lookup("Uint64")],
  ["baseFee", xdr.lookup("Uint32")],
  ["baseReserve", xdr.lookup("Uint32")],
  ["maxTxSetSize", xdr.lookup("Uint32")],
  ["issuanceKeys", xdr.varArray(xdr.lookup("PublicKey"), 2147483647)],
  ["txExpirationPeriod", xdr.lookup("Int64")],
  ["skipList", xdr.array(xdr.lookup("Hash"), 4)],
  ["ext", xdr.lookup("LedgerHeaderExt")],
]);

// === xdr source ============================================================
//
//   enum LedgerUpgradeType
//   {
//       LEDGER_UPGRADE_VERSION = 1,
//       LEDGER_UPGRADE_MAX_TX_SET_SIZE = 2,
//       LEDGER_UPGRADE_ISSUANCE_KEYS = 3,
//       LEDGER_UPGRADE_TX_EXPIRATION_PERIOD = 4
//   };
//
// ===========================================================================
xdr.enum("LedgerUpgradeType", {
  ledgerUpgradeVersion: 1,
  ledgerUpgradeMaxTxSetSize: 2,
  ledgerUpgradeIssuanceKey: 3,
  ledgerUpgradeTxExpirationPeriod: 4,
});

// === xdr source ============================================================
//
//   union LedgerUpgrade switch (LedgerUpgradeType type)
//   {
//   case LEDGER_UPGRADE_VERSION:
//       uint32 newLedgerVersion; // update ledgerVersion
//   case LEDGER_UPGRADE_MAX_TX_SET_SIZE:
//       uint32 newMaxTxSetSize; // update maxTxSetSize
//   case LEDGER_UPGRADE_ISSUANCE_KEYS:
//       PublicKey newIssuanceKeys<>;
//   case LEDGER_UPGRADE_TX_EXPIRATION_PERIOD:
//       int64 newTxExpirationPeriod;
//   };
//
// ===========================================================================
xdr.union("LedgerUpgrade", {
  switchOn: xdr.lookup("LedgerUpgradeType"),
  switchName: "type",
  switches: [
    ["ledgerUpgradeVersion", "newLedgerVersion"],
    ["ledgerUpgradeMaxTxSetSize", "newMaxTxSetSize"],
    ["ledgerUpgradeIssuanceKey", "newIssuanceKeys"],
    ["ledgerUpgradeTxExpirationPeriod", "newTxExpirationPeriod"],
  ],
  arms: {
    newLedgerVersion: xdr.lookup("Uint32"),
    newMaxTxSetSize: xdr.lookup("Uint32"),
    newIssuanceKeys: xdr.varArray(xdr.lookup("PublicKey"), 2147483647),
    newTxExpirationPeriod: xdr.lookup("Int64"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyAccountExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct
//       {
//           AccountID accountID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyAccount", [
  ["accountId", xdr.lookup("AccountId")],
  ["ext", xdr.lookup("LedgerKeyAccountExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyFeeStateExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           Hash hash;
//   		int64 lowerBound;
//   		int64 upperBound;
//   		 union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyFeeState", [
  ["hash", xdr.lookup("Hash")],
  ["lowerBound", xdr.lookup("Int64")],
  ["upperBound", xdr.lookup("Int64")],
  ["ext", xdr.lookup("LedgerKeyFeeStateExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyBalanceExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct
//       {
//   		BalanceID balanceID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyBalance", [
  ["balanceId", xdr.lookup("BalanceId")],
  ["ext", xdr.lookup("LedgerKeyBalanceExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyPaymentRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct
//       {
//   		uint64 paymentID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyPaymentRequest", [
  ["paymentId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("LedgerKeyPaymentRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyAssetExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct
//       {
//   		AssetCode code;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyAsset", [
  ["code", xdr.lookup("AssetCode")],
  ["ext", xdr.lookup("LedgerKeyAssetExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyReferenceExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct
//       {
//   		AccountID sender;
//   		string64 reference;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyReference", [
  ["sender", xdr.lookup("AccountId")],
  ["reference", xdr.lookup("String64")],
  ["ext", xdr.lookup("LedgerKeyReferenceExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyAccountTypeLimitsExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           AccountType accountType;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyAccountTypeLimits", [
  ["accountType", xdr.lookup("AccountType")],
  ["ext", xdr.lookup("LedgerKeyAccountTypeLimitsExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyStatsExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           AccountID accountID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyStats", [
  ["accountId", xdr.lookup("AccountId")],
  ["ext", xdr.lookup("LedgerKeyStatsExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyTrustExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           AccountID allowedAccount;
//           BalanceID balanceToUse;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyTrust", [
  ["allowedAccount", xdr.lookup("AccountId")],
  ["balanceToUse", xdr.lookup("BalanceId")],
  ["ext", xdr.lookup("LedgerKeyTrustExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyAccountLimitsExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           AccountID accountID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyAccountLimits", [
  ["accountId", xdr.lookup("AccountId")],
  ["ext", xdr.lookup("LedgerKeyAccountLimitsExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyAssetPairExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//            AssetCode base;
//   		 AssetCode quote;
//   		 union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyAssetPair", [
  ["base", xdr.lookup("AssetCode")],
  ["quote", xdr.lookup("AssetCode")],
  ["ext", xdr.lookup("LedgerKeyAssetPairExt")],
]);

// === xdr source ============================================================
//
//   struct {
//   		uint64 offerID;
//   		AccountID ownerID;
//   	}
//
// ===========================================================================
xdr.struct("LedgerKeyOffer", [
  ["offerId", xdr.lookup("Uint64")],
  ["ownerId", xdr.lookup("AccountId")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyInvoiceExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           uint64 invoiceID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyInvoice", [
  ["invoiceId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("LedgerKeyInvoiceExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("LedgerKeyReviewableRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//           uint64 ID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyReviewableRequest", [
  ["id", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("LedgerKeyReviewableRequestExt")],
]);

// === xdr source ============================================================
//
//   union LedgerKey switch (LedgerEntryType type)
//   {
//   case ACCOUNT:
//       struct
//       {
//           AccountID accountID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } account;
//   case FEE:
//       struct {
//           Hash hash;
//   		int64 lowerBound;
//   		int64 upperBound;
//   		 union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } feeState;
//   case BALANCE:
//       struct
//       {
//   		BalanceID balanceID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } balance;
//   case PAYMENT_REQUEST:
//       struct
//       {
//   		uint64 paymentID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } paymentRequest;
//   case ASSET:
//       struct
//       {
//   		AssetCode code;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } asset;
//   case REFERENCE_ENTRY:
//       struct
//       {
//   		AccountID sender;
//   		string64 reference;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } reference;
//   case ACCOUNT_TYPE_LIMITS:
//       struct {
//           AccountType accountType;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } accountTypeLimits;
//   case STATISTICS:
//       struct {
//           AccountID accountID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } stats;
//   case TRUST:
//       struct {
//           AccountID allowedAccount;
//           BalanceID balanceToUse;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } trust;
//   case ACCOUNT_LIMITS:
//       struct {
//           AccountID accountID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } accountLimits;
//   case ASSET_PAIR:
//   	struct {
//            AssetCode base;
//   		 AssetCode quote;
//   		 union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } assetPair;
//   case OFFER_ENTRY:
//   	struct {
//   		uint64 offerID;
//   		AccountID ownerID;
//   	} offer;
//   case INVOICE:
//       struct {
//           uint64 invoiceID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } invoice;
//   case REVIEWABLE_REQUEST:
//       struct {
//           uint64 ID;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       } reviewableRequest;
//   };
//
// ===========================================================================
xdr.union("LedgerKey", {
  switchOn: xdr.lookup("LedgerEntryType"),
  switchName: "type",
  switches: [
    ["account", "account"],
    ["fee", "feeState"],
    ["balance", "balance"],
    ["paymentRequest", "paymentRequest"],
    ["asset", "asset"],
    ["referenceEntry", "reference"],
    ["accountTypeLimit", "accountTypeLimits"],
    ["statistic", "stats"],
    ["trust", "trust"],
    ["accountLimit", "accountLimits"],
    ["assetPair", "assetPair"],
    ["offerEntry", "offer"],
    ["invoice", "invoice"],
    ["reviewableRequest", "reviewableRequest"],
  ],
  arms: {
    account: xdr.lookup("LedgerKeyAccount"),
    feeState: xdr.lookup("LedgerKeyFeeState"),
    balance: xdr.lookup("LedgerKeyBalance"),
    paymentRequest: xdr.lookup("LedgerKeyPaymentRequest"),
    asset: xdr.lookup("LedgerKeyAsset"),
    reference: xdr.lookup("LedgerKeyReference"),
    accountTypeLimits: xdr.lookup("LedgerKeyAccountTypeLimits"),
    stats: xdr.lookup("LedgerKeyStats"),
    trust: xdr.lookup("LedgerKeyTrust"),
    accountLimits: xdr.lookup("LedgerKeyAccountLimits"),
    assetPair: xdr.lookup("LedgerKeyAssetPair"),
    offer: xdr.lookup("LedgerKeyOffer"),
    invoice: xdr.lookup("LedgerKeyInvoice"),
    reviewableRequest: xdr.lookup("LedgerKeyReviewableRequest"),
  },
});

// === xdr source ============================================================
//
//   enum BucketEntryType
//   {
//       LIVEENTRY = 0,
//       DEADENTRY = 1
//   };
//
// ===========================================================================
xdr.enum("BucketEntryType", {
  liveentry: 0,
  deadentry: 1,
});

// === xdr source ============================================================
//
//   union BucketEntry switch (BucketEntryType type)
//   {
//   case LIVEENTRY:
//       LedgerEntry liveEntry;
//   
//   case DEADENTRY:
//       LedgerKey deadEntry;
//   };
//
// ===========================================================================
xdr.union("BucketEntry", {
  switchOn: xdr.lookup("BucketEntryType"),
  switchName: "type",
  switches: [
    ["liveentry", "liveEntry"],
    ["deadentry", "deadEntry"],
  ],
  arms: {
    liveEntry: xdr.lookup("LedgerEntry"),
    deadEntry: xdr.lookup("LedgerKey"),
  },
});

// === xdr source ============================================================
//
//   struct TransactionSet
//   {
//       Hash previousLedgerHash;
//       TransactionEnvelope txs<>;
//   };
//
// ===========================================================================
xdr.struct("TransactionSet", [
  ["previousLedgerHash", xdr.lookup("Hash")],
  ["txes", xdr.varArray(xdr.lookup("TransactionEnvelope"), 2147483647)],
]);

// === xdr source ============================================================
//
//   struct TransactionResultPair
//   {
//       Hash transactionHash;
//       TransactionResult result; // result for the transaction
//   };
//
// ===========================================================================
xdr.struct("TransactionResultPair", [
  ["transactionHash", xdr.lookup("Hash")],
  ["result", xdr.lookup("TransactionResult")],
]);

// === xdr source ============================================================
//
//   struct TransactionResultSet
//   {
//       TransactionResultPair results<>;
//   };
//
// ===========================================================================
xdr.struct("TransactionResultSet", [
  ["results", xdr.varArray(xdr.lookup("TransactionResultPair"), 2147483647)],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("TransactionHistoryEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct TransactionHistoryEntry
//   {
//       uint32 ledgerSeq;
//       TransactionSet txSet;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("TransactionHistoryEntry", [
  ["ledgerSeq", xdr.lookup("Uint32")],
  ["txSet", xdr.lookup("TransactionSet")],
  ["ext", xdr.lookup("TransactionHistoryEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("TransactionHistoryResultEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct TransactionHistoryResultEntry
//   {
//       uint32 ledgerSeq;
//       TransactionResultSet txResultSet;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("TransactionHistoryResultEntry", [
  ["ledgerSeq", xdr.lookup("Uint32")],
  ["txResultSet", xdr.lookup("TransactionResultSet")],
  ["ext", xdr.lookup("TransactionHistoryResultEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("LedgerHeaderHistoryEntryExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct LedgerHeaderHistoryEntry
//   {
//       Hash hash;
//       LedgerHeader header;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("LedgerHeaderHistoryEntry", [
  ["hash", xdr.lookup("Hash")],
  ["header", xdr.lookup("LedgerHeader")],
  ["ext", xdr.lookup("LedgerHeaderHistoryEntryExt")],
]);

// === xdr source ============================================================
//
//   struct LedgerSCPMessages
//   {
//       uint32 ledgerSeq;
//       SCPEnvelope messages<>;
//   };
//
// ===========================================================================
xdr.struct("LedgerScpMessages", [
  ["ledgerSeq", xdr.lookup("Uint32")],
  ["messages", xdr.varArray(xdr.lookup("ScpEnvelope"), 2147483647)],
]);

// === xdr source ============================================================
//
//   struct SCPHistoryEntryV0
//   {
//       SCPQuorumSet quorumSets<>; // additional quorum sets used by ledgerMessages
//       LedgerSCPMessages ledgerMessages;
//   };
//
// ===========================================================================
xdr.struct("ScpHistoryEntryV0", [
  ["quorumSets", xdr.varArray(xdr.lookup("ScpQuorumSet"), 2147483647)],
  ["ledgerMessages", xdr.lookup("LedgerScpMessages")],
]);

// === xdr source ============================================================
//
//   union SCPHistoryEntry switch (LedgerVersion v)
//   {
//   case EMPTY_VERSION:
//       SCPHistoryEntryV0 v0;
//   };
//
// ===========================================================================
xdr.union("ScpHistoryEntry", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", "v0"],
  ],
  arms: {
    v0: xdr.lookup("ScpHistoryEntryV0"),
  },
});

// === xdr source ============================================================
//
//   enum LedgerEntryChangeType
//   {
//       LEDGER_ENTRY_CREATED = 0, // entry was added to the ledger
//       LEDGER_ENTRY_UPDATED = 1, // entry was modified in the ledger
//       LEDGER_ENTRY_REMOVED = 2, // entry was removed from the ledger
//       LEDGER_ENTRY_STATE = 3    // value of the entry
//   };
//
// ===========================================================================
xdr.enum("LedgerEntryChangeType", {
  ledgerEntryCreated: 0,
  ledgerEntryUpdated: 1,
  ledgerEntryRemoved: 2,
  ledgerEntryState: 3,
});

// === xdr source ============================================================
//
//   union LedgerEntryChange switch (LedgerEntryChangeType type)
//   {
//   case LEDGER_ENTRY_CREATED:
//       LedgerEntry created;
//   case LEDGER_ENTRY_UPDATED:
//       LedgerEntry updated;
//   case LEDGER_ENTRY_REMOVED:
//       LedgerKey removed;
//   case LEDGER_ENTRY_STATE:
//       LedgerEntry state;
//   };
//
// ===========================================================================
xdr.union("LedgerEntryChange", {
  switchOn: xdr.lookup("LedgerEntryChangeType"),
  switchName: "type",
  switches: [
    ["ledgerEntryCreated", "created"],
    ["ledgerEntryUpdated", "updated"],
    ["ledgerEntryRemoved", "removed"],
    ["ledgerEntryState", "state"],
  ],
  arms: {
    created: xdr.lookup("LedgerEntry"),
    updated: xdr.lookup("LedgerEntry"),
    removed: xdr.lookup("LedgerKey"),
    state: xdr.lookup("LedgerEntry"),
  },
});

// === xdr source ============================================================
//
//   typedef LedgerEntryChange LedgerEntryChanges<>;
//
// ===========================================================================
xdr.typedef("LedgerEntryChanges", xdr.varArray(xdr.lookup("LedgerEntryChange"), 2147483647));

// === xdr source ============================================================
//
//   struct OperationMeta
//   {
//       LedgerEntryChanges changes;
//   };
//
// ===========================================================================
xdr.struct("OperationMeta", [
  ["changes", xdr.lookup("LedgerEntryChanges")],
]);

// === xdr source ============================================================
//
//   union TransactionMeta switch (LedgerVersion v)
//   {
//   case EMPTY_VERSION:
//       OperationMeta operations<>;
//   };
//
// ===========================================================================
xdr.union("TransactionMeta", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", "operations"],
  ],
  arms: {
    operations: xdr.varArray(xdr.lookup("OperationMeta"), 2147483647),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;		
//       }
//
// ===========================================================================
xdr.union("CreateAccountOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateAccountOp
//   {
//       AccountID destination; // account to create
//       AccountID* referrer;     // parent account
//   	AccountType accountType;
//   	uint32 policies;
//   
//   	 // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;		
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreateAccountOp", [
  ["destination", xdr.lookup("AccountId")],
  ["referrer", xdr.option(xdr.lookup("AccountId"))],
  ["accountType", xdr.lookup("AccountType")],
  ["policies", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("CreateAccountOpExt")],
]);

// === xdr source ============================================================
//
//   enum CreateAccountResultCode
//   {
//       // codes considered as "success" for the operation
//       CREATE_ACCOUNT_SUCCESS = 0, // account was created
//   
//       // codes considered as "failure" for the operation
//       CREATE_ACCOUNT_MALFORMED = -1,       // invalid destination
//   	CREATE_ACCOUNT_ACCOUNT_TYPE_MISMATCHED = -2, // account already exist and change of account type is not allowed
//   	CREATE_ACCOUNT_TYPE_NOT_ALLOWED = -3, // master or commission account types are not allowed
//       CREATE_ACCOUNT_NAME_DUPLICATION = -4,
//       CREATE_ACCOUNT_REFERRER_NOT_FOUND = -5,
//   	CREATE_ACCOUNT_INVALID_ACCOUNT_VERSION = -6 // if account version is higher than ledger version
//   };
//
// ===========================================================================
xdr.enum("CreateAccountResultCode", {
  createAccountSuccess: 0,
  createAccountMalformed: -1,
  createAccountAccountTypeMismatched: -2,
  createAccountTypeNotAllowed: -3,
  createAccountNameDuplication: -4,
  createAccountReferrerNotFound: -5,
  createAccountInvalidAccountVersion: -6,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateAccountSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateAccountSuccess
//   {
//   	int64 referrerFee;
//   	 // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreateAccountSuccess", [
  ["referrerFee", xdr.lookup("Int64")],
  ["ext", xdr.lookup("CreateAccountSuccessExt")],
]);

// === xdr source ============================================================
//
//   union CreateAccountResult switch (CreateAccountResultCode code)
//   {
//   case CREATE_ACCOUNT_SUCCESS:
//       CreateAccountSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("CreateAccountResult", {
  switchOn: xdr.lookup("CreateAccountResultCode"),
  switchName: "code",
  switches: [
    ["createAccountSuccess", "success"],
  ],
  arms: {
    success: xdr.lookup("CreateAccountSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreateIssuanceRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateIssuanceRequestOp
//   {
//   	IssuanceRequest request;
//   	string64 reference;
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreateIssuanceRequestOp", [
  ["request", xdr.lookup("IssuanceRequest")],
  ["reference", xdr.lookup("String64")],
  ["ext", xdr.lookup("CreateIssuanceRequestOpExt")],
]);

// === xdr source ============================================================
//
//   enum CreateIssuanceRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       CREATE_ISSUANCE_REQUEST_SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       CREATE_ISSUANCE_REQUEST_ASSET_NOT_FOUND = -1,
//   	CREATE_ISSUANCE_REQUEST_INVALID_AMOUNT = -2,
//   	CREATE_ISSUANCE_REQUEST_REFERENCE_DUPLICATION = -3,
//   	CREATE_ISSUANCE_REQUEST_NO_COUNTERPARTY = -4,
//   	CREATE_ISSUANCE_REQUEST_NOT_AUTHORIZED = -5,
//   	CREATE_ISSUANCE_REQUEST_EXCEEDS_MAX_ISSUANCE_AMOUNT = -6,
//   	CREATE_ISSUANCE_REQUEST_RECEIVER_FULL_LINE = -7
//   };
//
// ===========================================================================
xdr.enum("CreateIssuanceRequestResultCode", {
  createIssuanceRequestSuccess: 0,
  createIssuanceRequestAssetNotFound: -1,
  createIssuanceRequestInvalidAmount: -2,
  createIssuanceRequestReferenceDuplication: -3,
  createIssuanceRequestNoCounterparty: -4,
  createIssuanceRequestNotAuthorized: -5,
  createIssuanceRequestExceedsMaxIssuanceAmount: -6,
  createIssuanceRequestReceiverFullLine: -7,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//
// ===========================================================================
xdr.union("CreateIssuanceRequestSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreateIssuanceRequestSuccess {
//   	uint64 requestID;
//   	bool fulfilled;
//   	union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//   	ext;
//   };
//
// ===========================================================================
xdr.struct("CreateIssuanceRequestSuccess", [
  ["requestId", xdr.lookup("Uint64")],
  ["fulfilled", xdr.bool()],
  ["ext", xdr.lookup("CreateIssuanceRequestSuccessExt")],
]);

// === xdr source ============================================================
//
//   union CreateIssuanceRequestResult switch (CreateIssuanceRequestResultCode code)
//   {
//   case CREATE_ISSUANCE_REQUEST_SUCCESS:
//       CreateIssuanceRequestSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("CreateIssuanceRequestResult", {
  switchOn: xdr.lookup("CreateIssuanceRequestResultCode"),
  switchName: "code",
  switches: [
    ["createIssuanceRequestSuccess", "success"],
  ],
  arms: {
    success: xdr.lookup("CreateIssuanceRequestSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CreatePreIssuanceRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CreatePreIssuanceRequestOp
//   {
//       PreIssuanceRequest request;
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CreatePreIssuanceRequestOp", [
  ["request", xdr.lookup("PreIssuanceRequest")],
  ["ext", xdr.lookup("CreatePreIssuanceRequestOpExt")],
]);

// === xdr source ============================================================
//
//   enum CreatePreIssuanceRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       CREATE_PREISSUANCE_REQUEST_SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       CREATE_PREISSUANCE_REQUEST_ASSET_NOT_FOUND = -1,
//       CREATE_PREISSUANCE_REQUEST_REFERENCE_DUPLICATION = -2,    // reference is already used
//       CREATE_PREISSUANCE_REQUEST_NOT_AUTHORIZED_UPLOAD = -3, // tries to pre issue asset for not owned asset
//       CREATE_PREISSUANCE_REQUEST_INVALID_SIGNATURE = -4,
//       CREATE_PREISSUANCE_REQUEST_EXCEEDED_MAX_AMOUNT = -5,
//   	CREATE_PREISSUANCE_REQUEST_INVALID_AMOUNT = -6,
//   	CREATE_PREISSUANCE_REQUEST_INVALID_REFERENCE = -7
//   };
//
// ===========================================================================
xdr.enum("CreatePreIssuanceRequestResultCode", {
  createPreissuanceRequestSuccess: 0,
  createPreissuanceRequestAssetNotFound: -1,
  createPreissuanceRequestReferenceDuplication: -2,
  createPreissuanceRequestNotAuthorizedUpload: -3,
  createPreissuanceRequestInvalidSignature: -4,
  createPreissuanceRequestExceededMaxAmount: -5,
  createPreissuanceRequestInvalidAmount: -6,
  createPreissuanceRequestInvalidReference: -7,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("CreatePreIssuanceRequestResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//   		uint64 requestID;
//   		// reserved for future use
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	}
//
// ===========================================================================
xdr.struct("CreatePreIssuanceRequestResultSuccess", [
  ["requestId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("CreatePreIssuanceRequestResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union CreatePreIssuanceRequestResult switch (CreatePreIssuanceRequestResultCode code)
//   {
//   case CREATE_PREISSUANCE_REQUEST_SUCCESS:
//       struct {
//   		uint64 requestID;
//   		// reserved for future use
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	} success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("CreatePreIssuanceRequestResult", {
  switchOn: xdr.lookup("CreatePreIssuanceRequestResultCode"),
  switchName: "code",
  switches: [
    ["createPreissuanceRequestSuccess", "success"],
  ],
  arms: {
    success: xdr.lookup("CreatePreIssuanceRequestResultSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("DirectDebitOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct DirectDebitOp
//   {
//       AccountID from;
//       PaymentOp paymentOp;
//   	 // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("DirectDebitOp", [
  ["from", xdr.lookup("AccountId")],
  ["paymentOp", xdr.lookup("PaymentOp")],
  ["ext", xdr.lookup("DirectDebitOpExt")],
]);

// === xdr source ============================================================
//
//   enum DirectDebitResultCode
//   {
//       // codes considered as "success" for the operation
//       DIRECT_DEBIT_SUCCESS = 0, // payment successfuly completed
//   
//       // codes considered as "failure" for the operation
//       DIRECT_DEBIT_MALFORMED = -1,       // bad input
//       DIRECT_DEBIT_UNDERFUNDED = -2,     // not enough funds in source account
//       DIRECT_DEBIT_LINE_FULL = -3,       // destination would go above their limit
//   	DIRECT_DEBIT_FEE_MISMATCHED = -4,   // fee is not equal to expected fee
//       DIRECT_DEBIT_BALANCE_NOT_FOUND = -5, // destination balance not found
//       DIRECT_DEBIT_BALANCE_ACCOUNT_MISMATCHED = -6,
//       DIRECT_DEBIT_BALANCE_ASSETS_MISMATCHED = -7,
//   	DIRECT_DEBIT_SRC_BALANCE_NOT_FOUND = -8, // source balance not found
//       DIRECT_DEBIT_REFERENCE_DUPLICATION = -9,
//       DIRECT_DEBIT_STATS_OVERFLOW = -10,
//       DIRECT_DEBIT_LIMITS_EXCEEDED = -11,
//       DIRECT_DEBIT_NOT_ALLOWED_BY_ASSET_POLICY = -12,
//       DIRECT_DEBIT_NO_TRUST = -13
//   };
//
// ===========================================================================
xdr.enum("DirectDebitResultCode", {
  directDebitSuccess: 0,
  directDebitMalformed: -1,
  directDebitUnderfunded: -2,
  directDebitLineFull: -3,
  directDebitFeeMismatched: -4,
  directDebitBalanceNotFound: -5,
  directDebitBalanceAccountMismatched: -6,
  directDebitBalanceAssetsMismatched: -7,
  directDebitSrcBalanceNotFound: -8,
  directDebitReferenceDuplication: -9,
  directDebitStatsOverflow: -10,
  directDebitLimitsExceeded: -11,
  directDebitNotAllowedByAssetPolicy: -12,
  directDebitNoTrust: -13,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("DirectDebitSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct DirectDebitSuccess {
//   	PaymentResponse paymentResponse;
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("DirectDebitSuccess", [
  ["paymentResponse", xdr.lookup("PaymentResponse")],
  ["ext", xdr.lookup("DirectDebitSuccessExt")],
]);

// === xdr source ============================================================
//
//   union DirectDebitResult switch (DirectDebitResultCode code)
//   {
//   case DIRECT_DEBIT_SUCCESS:
//       DirectDebitSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("DirectDebitResult", {
  switchOn: xdr.lookup("DirectDebitResultCode"),
  switchName: "code",
  switches: [
    ["directDebitSuccess", "success"],
  ],
  arms: {
    success: xdr.lookup("DirectDebitSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageAccountOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageAccountOp
//   {
//       AccountID account; // account to manage
//       AccountType accountType;
//       uint32 blockReasonsToAdd;
//       uint32 blockReasonsToRemove; 
//   	 // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageAccountOp", [
  ["account", xdr.lookup("AccountId")],
  ["accountType", xdr.lookup("AccountType")],
  ["blockReasonsToAdd", xdr.lookup("Uint32")],
  ["blockReasonsToRemove", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("ManageAccountOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageAccountResultCode
//   {
//       // codes considered as "success" for the operation
//       MANAGE_ACCOUNT_SUCCESS = 0, // account was created
//   
//       // codes considered as "failure" for the operation
//       MANAGE_ACCOUNT_NOT_FOUND = -1,         // account does not exists
//       MANAGE_ACCOUNT_MALFORMED = -2,
//   	MANAGE_ACCOUNT_NOT_ALLOWED = -3,         // manage account operation is not allowed on this account
//       MANAGE_ACCOUNT_TYPE_MISMATCH = -4
//   };
//
// ===========================================================================
xdr.enum("ManageAccountResultCode", {
  manageAccountSuccess: 0,
  manageAccountNotFound: -1,
  manageAccountMalformed: -2,
  manageAccountNotAllowed: -3,
  manageAccountTypeMismatch: -4,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageAccountSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageAccountSuccess {
//   	uint32 blockReasons;
//    // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageAccountSuccess", [
  ["blockReasons", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("ManageAccountSuccessExt")],
]);

// === xdr source ============================================================
//
//   union ManageAccountResult switch (ManageAccountResultCode code)
//   {
//   case MANAGE_ACCOUNT_SUCCESS:
//       ManageAccountSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageAccountResult", {
  switchOn: xdr.lookup("ManageAccountResultCode"),
  switchName: "code",
  switches: [
    ["manageAccountSuccess", "success"],
  ],
  arms: {
    success: xdr.lookup("ManageAccountSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   enum ManageAssetPairAction
//   {
//       MANAGE_ASSET_PAIR_CREATE = 0,
//       MANAGE_ASSET_PAIR_UPDATE_PRICE = 1,
//       MANAGE_ASSET_PAIR_UPDATE_POLICIES = 2
//   };
//
// ===========================================================================
xdr.enum("ManageAssetPairAction", {
  manageAssetPairCreate: 0,
  manageAssetPairUpdatePrice: 1,
  manageAssetPairUpdatePolicy: 2,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageAssetPairOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageAssetPairOp
//   {
//       ManageAssetPairAction action;
//   	AssetCode base;
//   	AssetCode quote;
//   
//       int64 physicalPrice;
//   
//   	int64 physicalPriceCorrection; // correction of physical price in percents. If physical price is set and restriction by physical price set, mininal price for offer for this pair will be physicalPrice * physicalPriceCorrection
//   	int64 maxPriceStep;
//   
//   	int32 policies;
//   
//   	 // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageAssetPairOp", [
  ["action", xdr.lookup("ManageAssetPairAction")],
  ["base", xdr.lookup("AssetCode")],
  ["quote", xdr.lookup("AssetCode")],
  ["physicalPrice", xdr.lookup("Int64")],
  ["physicalPriceCorrection", xdr.lookup("Int64")],
  ["maxPriceStep", xdr.lookup("Int64")],
  ["policies", xdr.lookup("Int32")],
  ["ext", xdr.lookup("ManageAssetPairOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageAssetPairResultCode
//   {
//       // codes considered as "success" for the operation
//       MANAGE_ASSET_PAIR_SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//   	MANAGE_ASSET_PAIR_NOT_FOUND = -1,           // failed to find asset with such code
//   	MANAGE_ASSET_PAIR_ALREADY_EXISTS = -2,
//       MANAGE_ASSET_PAIR_MALFORMED = -3,
//   	MANAGE_ASSET_PAIR_INVALID_ASSET = -4,
//   	MANAGE_ASSET_PAIR_INVALID_ACTION = -5,
//   	MANAGE_ASSET_PAIR_INVALID_POLICIES = -6,
//   	MANAGE_ASSET_PAIR_ASSET_NOT_FOUND = -7
//   };
//
// ===========================================================================
xdr.enum("ManageAssetPairResultCode", {
  manageAssetPairSuccess: 0,
  manageAssetPairNotFound: -1,
  manageAssetPairAlreadyExist: -2,
  manageAssetPairMalformed: -3,
  manageAssetPairInvalidAsset: -4,
  manageAssetPairInvalidAction: -5,
  manageAssetPairInvalidPolicy: -6,
  manageAssetPairAssetNotFound: -7,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageAssetPairSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageAssetPairSuccess
//   {
//   	int64 currentPrice;
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageAssetPairSuccess", [
  ["currentPrice", xdr.lookup("Int64")],
  ["ext", xdr.lookup("ManageAssetPairSuccessExt")],
]);

// === xdr source ============================================================
//
//   union ManageAssetPairResult switch (ManageAssetPairResultCode code)
//   {
//   case MANAGE_ASSET_PAIR_SUCCESS:
//       ManageAssetPairSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageAssetPairResult", {
  switchOn: xdr.lookup("ManageAssetPairResultCode"),
  switchName: "code",
  switches: [
    ["manageAssetPairSuccess", "success"],
  ],
  arms: {
    success: xdr.lookup("ManageAssetPairSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   enum ManageAssetAction
//   {
//       MANAGE_ASSET_CREATE_ASSET_CREATION_REQUEST = 0,
//       MANAGE_ASSET_CREATE_ASSET_UPDATE_REQUEST = 1,
//   	MANAGE_ASSET_CANCEL_ASSET_REQUEST = 2
//   };
//
// ===========================================================================
xdr.enum("ManageAssetAction", {
  manageAssetCreateAssetCreationRequest: 0,
  manageAssetCreateAssetUpdateRequest: 1,
  manageAssetCancelAssetRequest: 2,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("CancelAssetRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct CancelAssetRequest {
//   	
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("CancelAssetRequest", [
  ["ext", xdr.lookup("CancelAssetRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (ManageAssetAction action) 
//   	{
//   	case MANAGE_ASSET_CREATE_ASSET_CREATION_REQUEST:
//   		AssetCreationRequest createAsset;
//   	case MANAGE_ASSET_CREATE_ASSET_UPDATE_REQUEST:
//   		AssetUpdateRequest updateAsset;
//   	case MANAGE_ASSET_CANCEL_ASSET_REQUEST:
//   		CancelAssetRequest cancelRequest;
//   	}
//
// ===========================================================================
xdr.union("ManageAssetOpRequest", {
  switchOn: xdr.lookup("ManageAssetAction"),
  switchName: "action",
  switches: [
    ["manageAssetCreateAssetCreationRequest", "createAsset"],
    ["manageAssetCreateAssetUpdateRequest", "updateAsset"],
    ["manageAssetCancelAssetRequest", "cancelRequest"],
  ],
  arms: {
    createAsset: xdr.lookup("AssetCreationRequest"),
    updateAsset: xdr.lookup("AssetUpdateRequest"),
    cancelRequest: xdr.lookup("CancelAssetRequest"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageAssetOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageAssetOp
//   {
//   	uint64 requestID; // 0 to create, non zero will try to update
//       union switch (ManageAssetAction action) 
//   	{
//   	case MANAGE_ASSET_CREATE_ASSET_CREATION_REQUEST:
//   		AssetCreationRequest createAsset;
//   	case MANAGE_ASSET_CREATE_ASSET_UPDATE_REQUEST:
//   		AssetUpdateRequest updateAsset;
//   	case MANAGE_ASSET_CANCEL_ASSET_REQUEST:
//   		CancelAssetRequest cancelRequest;
//   	} request;
//   
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageAssetOp", [
  ["requestId", xdr.lookup("Uint64")],
  ["request", xdr.lookup("ManageAssetOpRequest")],
  ["ext", xdr.lookup("ManageAssetOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageAssetResultCode
//   {
//       // codes considered as "success" for the operation
//       MANAGE_ASSET_SUCCESS = 0,                       // request was successfully created/updated/canceled
//   
//       // codes considered as "failure" for the operation
//   	MANAGE_ASSET_REQUEST_NOT_FOUND = -1,           // failed to find asset request with such id
//   	MANAGE_ASSET_ASSET_ALREADY_EXISTS = -3,			   // asset with such code already exist
//       MANAGE_ASSET_INVALID_MAX_ISSUANCE_AMOUNT = -4, // max issuance amount is 0
//   	MANAGE_ASSET_INVALID_CODE = -5,                // asset code is invalid (empty or contains space)
//   	MANAGE_ASSET_INVALID_NAME = -6,                // asset name is invalid (empty)
//   	MANAGE_ASSET_INVALID_POLICIES = -7,            // asset policies (has flag which does not belong to AssetPolicies enum)
//   	MANAGE_ASSET_ASSET_NOT_FOUND = -8
//   };
//
// ===========================================================================
xdr.enum("ManageAssetResultCode", {
  manageAssetSuccess: 0,
  manageAssetRequestNotFound: -1,
  manageAssetAssetAlreadyExist: -3,
  manageAssetInvalidMaxIssuanceAmount: -4,
  manageAssetInvalidCode: -5,
  manageAssetInvalidName: -6,
  manageAssetInvalidPolicy: -7,
  manageAssetAssetNotFound: -8,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageAssetSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageAssetSuccess
//   {
//   	uint64 requestID;
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageAssetSuccess", [
  ["requestId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("ManageAssetSuccessExt")],
]);

// === xdr source ============================================================
//
//   union ManageAssetResult switch (ManageAssetResultCode code)
//   {
//   case MANAGE_ASSET_SUCCESS:
//       ManageAssetSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageAssetResult", {
  switchOn: xdr.lookup("ManageAssetResultCode"),
  switchName: "code",
  switches: [
    ["manageAssetSuccess", "success"],
  ],
  arms: {
    success: xdr.lookup("ManageAssetSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   enum ManageBalanceAction
//   {
//       MANAGE_BALANCE_CREATE = 0,
//       MANAGE_BALANCE_DELETE = 1
//   };
//
// ===========================================================================
xdr.enum("ManageBalanceAction", {
  manageBalanceCreate: 0,
  manageBalanceDelete: 1,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageBalanceOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageBalanceOp
//   {
//       BalanceID balanceID;
//       ManageBalanceAction action;
//       AccountID destination;
//       AssetCode asset;
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageBalanceOp", [
  ["balanceId", xdr.lookup("BalanceId")],
  ["action", xdr.lookup("ManageBalanceAction")],
  ["destination", xdr.lookup("AccountId")],
  ["asset", xdr.lookup("AssetCode")],
  ["ext", xdr.lookup("ManageBalanceOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageBalanceResultCode
//   {
//       // codes considered as "success" for the operation
//       MANAGE_BALANCE_SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       MANAGE_BALANCE_MALFORMED = -1,       // invalid destination
//       MANAGE_BALANCE_NOT_FOUND = -2,
//       MANAGE_BALANCE_DESTINATION_NOT_FOUND = -3,
//       MANAGE_BALANCE_ALREADY_EXISTS = -4,
//       MANAGE_BALANCE_ASSET_NOT_FOUND = -5,
//       MANAGE_BALANCE_INVALID_ASSET = -6
//   };
//
// ===========================================================================
xdr.enum("ManageBalanceResultCode", {
  manageBalanceSuccess: 0,
  manageBalanceMalformed: -1,
  manageBalanceNotFound: -2,
  manageBalanceDestinationNotFound: -3,
  manageBalanceAlreadyExist: -4,
  manageBalanceAssetNotFound: -5,
  manageBalanceInvalidAsset: -6,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageBalanceSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageBalanceSuccess {
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageBalanceSuccess", [
  ["ext", xdr.lookup("ManageBalanceSuccessExt")],
]);

// === xdr source ============================================================
//
//   union ManageBalanceResult switch (ManageBalanceResultCode code)
//   {
//   case MANAGE_BALANCE_SUCCESS:
//       ManageBalanceSuccess success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageBalanceResult", {
  switchOn: xdr.lookup("ManageBalanceResultCode"),
  switchName: "code",
  switches: [
    ["manageBalanceSuccess", "success"],
  ],
  arms: {
    success: xdr.lookup("ManageBalanceSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageForfeitRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageForfeitRequestOp
//   {
//       BalanceID balance;
//       int64 amount;
//   	int64 totalFee;
//       string details<>;
//   	AccountID reviewer;
//   
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   
//   };
//
// ===========================================================================
xdr.struct("ManageForfeitRequestOp", [
  ["balance", xdr.lookup("BalanceId")],
  ["amount", xdr.lookup("Int64")],
  ["totalFee", xdr.lookup("Int64")],
  ["details", xdr.string()],
  ["reviewer", xdr.lookup("AccountId")],
  ["ext", xdr.lookup("ManageForfeitRequestOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageForfeitRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       MANAGE_FORFEIT_REQUEST_SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//   	MANAGE_FORFEIT_REQUEST_UNDERFUNDED = -1,
//       MANAGE_FORFEIT_REQUEST_INVALID_AMOUNT = -2,
//       MANAGE_FORFEIT_REQUEST_LINE_FULL = -3,
//       MANAGE_FORFEIT_REQUEST_BALANCE_MISMATCH = -4,
//       MANAGE_FORFEIT_REQUEST_STATS_OVERFLOW = -5,
//       MANAGE_FORFEIT_REQUEST_LIMITS_EXCEEDED = -6,
//       MANAGE_FORFEIT_REQUEST_REVIEWER_NOT_FOUND = -7,
//       MANAGE_FORFEIT_REQUEST_INVALID_DETAILS = -8,
//   	MANAGE_FORFEIT_REQUEST_FEE_MISMATCH = -9 // fee is not equal to expected fee
//   };
//
// ===========================================================================
xdr.enum("ManageForfeitRequestResultCode", {
  manageForfeitRequestSuccess: 0,
  manageForfeitRequestUnderfunded: -1,
  manageForfeitRequestInvalidAmount: -2,
  manageForfeitRequestLineFull: -3,
  manageForfeitRequestBalanceMismatch: -4,
  manageForfeitRequestStatsOverflow: -5,
  manageForfeitRequestLimitsExceeded: -6,
  manageForfeitRequestReviewerNotFound: -7,
  manageForfeitRequestInvalidDetail: -8,
  manageForfeitRequestFeeMismatch: -9,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
//
// ===========================================================================
xdr.union("ManageForfeitRequestResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct
//           {
//               uint64 paymentID;
//   
//               union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
//               ext;
//           }
//
// ===========================================================================
xdr.struct("ManageForfeitRequestResultSuccess", [
  ["paymentId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("ManageForfeitRequestResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union ManageForfeitRequestResult switch (ManageForfeitRequestResultCode code)
//   {
//       case MANAGE_FORFEIT_REQUEST_SUCCESS:
//           struct
//           {
//               uint64 paymentID;
//   
//               union switch (LedgerVersion v)
//               {
//               case EMPTY_VERSION:
//                   void;
//               }
//               ext;
//           } success;
//       default:
//           void;
//   };
//
// ===========================================================================
xdr.union("ManageForfeitRequestResult", {
  switchOn: xdr.lookup("ManageForfeitRequestResultCode"),
  switchName: "code",
  switches: [
    ["manageForfeitRequestSuccess", "success"],
  ],
  arms: {
    success: xdr.lookup("ManageForfeitRequestResultSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageInvoiceOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageInvoiceOp
//   {
//       BalanceID receiverBalance;
//   	AccountID sender;
//       int64 amount; // if set to 0, delete the invoice
//   
//       // 0=create a new invoice, otherwise edit an existing invoice
//       uint64 invoiceID;
//   
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageInvoiceOp", [
  ["receiverBalance", xdr.lookup("BalanceId")],
  ["sender", xdr.lookup("AccountId")],
  ["amount", xdr.lookup("Int64")],
  ["invoiceId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("ManageInvoiceOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageInvoiceResultCode
//   {
//       // codes considered as "success" for the operation
//       MANAGE_INVOICE_SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       MANAGE_INVOICE_MALFORMED = -1,
//       MANAGE_INVOICE_BALANCE_NOT_FOUND = -2,
//   	MANAGE_INVOICE_OVERFLOW = -3,
//   
//       MANAGE_INVOICE_NOT_FOUND = -4,
//       MANAGE_INVOICE_TOO_MANY_INVOICES = -5,
//       MANAGE_INVOICE_CAN_NOT_DELETE_IN_PROGRESS = -6
//   };
//
// ===========================================================================
xdr.enum("ManageInvoiceResultCode", {
  manageInvoiceSuccess: 0,
  manageInvoiceMalformed: -1,
  manageInvoiceBalanceNotFound: -2,
  manageInvoiceOverflow: -3,
  manageInvoiceNotFound: -4,
  manageInvoiceTooManyInvoice: -5,
  manageInvoiceCanNotDeleteInProgress: -6,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageInvoiceSuccessResultExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageInvoiceSuccessResult 
//   {
//   	uint64 invoiceID;
//   	AssetCode asset;
//   	BalanceID senderBalance;
//   
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageInvoiceSuccessResult", [
  ["invoiceId", xdr.lookup("Uint64")],
  ["asset", xdr.lookup("AssetCode")],
  ["senderBalance", xdr.lookup("BalanceId")],
  ["ext", xdr.lookup("ManageInvoiceSuccessResultExt")],
]);

// === xdr source ============================================================
//
//   union ManageInvoiceResult switch (ManageInvoiceResultCode code)
//   {
//   case MANAGE_INVOICE_SUCCESS:
//       ManageInvoiceSuccessResult success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageInvoiceResult", {
  switchOn: xdr.lookup("ManageInvoiceResultCode"),
  switchName: "code",
  switches: [
    ["manageInvoiceSuccess", "success"],
  ],
  arms: {
    success: xdr.lookup("ManageInvoiceSuccessResult"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageOfferOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageOfferOp
//   {
//       BalanceID baseBalance; // balance for base asset
//   	BalanceID quoteBalance; // balance for quote asset
//   	bool isBuy;
//       int64 amount; // if set to 0, delete the offer
//       int64 price;  // price of base asset in terms of quote
//   
//       int64 fee;
//   
//       // 0=create a new offer, otherwise edit an existing offer
//       uint64 offerID;
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageOfferOp", [
  ["baseBalance", xdr.lookup("BalanceId")],
  ["quoteBalance", xdr.lookup("BalanceId")],
  ["isBuy", xdr.bool()],
  ["amount", xdr.lookup("Int64")],
  ["price", xdr.lookup("Int64")],
  ["fee", xdr.lookup("Int64")],
  ["offerId", xdr.lookup("Uint64")],
  ["ext", xdr.lookup("ManageOfferOpExt")],
]);

// === xdr source ============================================================
//
//   enum ManageOfferResultCode
//   {
//       // codes considered as "success" for the operation
//       MANAGE_OFFER_SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       MANAGE_OFFER_MALFORMED = -1,     // generated offer would be invalid
//       MANAGE_OFFER_PAIR_NOT_TRADED = -2, // it's not allowed to trage with this pair
//       MANAGE_OFFER_BALANCE_NOT_FOUND = -3,  // does not own balance for buying or selling
//       MANAGE_OFFER_UNDERFUNDED = -4,    // doesn't hold what it's trying to sell
//       MANAGE_OFFER_CROSS_SELF = -5,     // would cross an offer from the same user
//   	MANAGE_OFFER_OVERFLOW = -6,
//   	MANAGE_OFFER_ASSET_PAIR_NOT_TRADABLE = -7,
//   	MANAGE_OFFER_PHYSICAL_PRICE_RESTRICTION = -8, // offer price violates physical price restriction
//   	MAANGE_OFFER_CURRENT_PRICE_RESTRICTION = -9,
//       MANAGE_OFFER_NOT_FOUND = -10, // offerID does not match an existing offer
//       MANAGE_OFFER_INVALID_PERCENT_FEE = -11,
//   	MANAGE_OFFER_INSUFFISIENT_PRICE = -12
//   };
//
// ===========================================================================
xdr.enum("ManageOfferResultCode", {
  manageOfferSuccess: 0,
  manageOfferMalformed: -1,
  manageOfferPairNotTraded: -2,
  manageOfferBalanceNotFound: -3,
  manageOfferUnderfunded: -4,
  manageOfferCrossSelf: -5,
  manageOfferOverflow: -6,
  manageOfferAssetPairNotTradable: -7,
  manageOfferPhysicalPriceRestriction: -8,
  maangeOfferCurrentPriceRestriction: -9,
  manageOfferNotFound: -10,
  manageOfferInvalidPercentFee: -11,
  manageOfferInsuffisientPrice: -12,
});

// === xdr source ============================================================
//
//   enum ManageOfferEffect
//   {
//       MANAGE_OFFER_CREATED = 0,
//       MANAGE_OFFER_UPDATED = 1,
//       MANAGE_OFFER_DELETED = 2
//   };
//
// ===========================================================================
xdr.enum("ManageOfferEffect", {
  manageOfferCreated: 0,
  manageOfferUpdated: 1,
  manageOfferDeleted: 2,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ClaimOfferAtomExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ClaimOfferAtom
//   {
//       // emitted to identify the offer
//       AccountID bAccountID; // Account that owns the offer
//       uint64 offerID;
//   	int64 baseAmount;
//   	int64 quoteAmount;
//   	int64 bFeePaid;
//   	int64 aFeePaid;
//   	BalanceID baseBalance;
//   	BalanceID quoteBalance;
//   
//   	int64 currentPrice;
//   
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ClaimOfferAtom", [
  ["bAccountId", xdr.lookup("AccountId")],
  ["offerId", xdr.lookup("Uint64")],
  ["baseAmount", xdr.lookup("Int64")],
  ["quoteAmount", xdr.lookup("Int64")],
  ["bFeePaid", xdr.lookup("Int64")],
  ["aFeePaid", xdr.lookup("Int64")],
  ["baseBalance", xdr.lookup("BalanceId")],
  ["quoteBalance", xdr.lookup("BalanceId")],
  ["currentPrice", xdr.lookup("Int64")],
  ["ext", xdr.lookup("ClaimOfferAtomExt")],
]);

// === xdr source ============================================================
//
//   union switch (ManageOfferEffect effect)
//       {
//       case MANAGE_OFFER_CREATED:
//       case MANAGE_OFFER_UPDATED:
//           OfferEntry offer;
//       default:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageOfferSuccessResultOffer", {
  switchOn: xdr.lookup("ManageOfferEffect"),
  switchName: "effect",
  switches: [
    ["manageOfferCreated", "offer"],
    ["manageOfferUpdated", "offer"],
  ],
  arms: {
    offer: xdr.lookup("OfferEntry"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageOfferSuccessResultExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ManageOfferSuccessResult
//   {
//   
//       // offers that got claimed while creating this offer
//       ClaimOfferAtom offersClaimed<>;
//   	AssetCode baseAsset;
//   	AssetCode quoteAsset;
//   
//       union switch (ManageOfferEffect effect)
//       {
//       case MANAGE_OFFER_CREATED:
//       case MANAGE_OFFER_UPDATED:
//           OfferEntry offer;
//       default:
//           void;
//       }
//       offer;
//   
//   	union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ManageOfferSuccessResult", [
  ["offersClaimed", xdr.varArray(xdr.lookup("ClaimOfferAtom"), 2147483647)],
  ["baseAsset", xdr.lookup("AssetCode")],
  ["quoteAsset", xdr.lookup("AssetCode")],
  ["offer", xdr.lookup("ManageOfferSuccessResultOffer")],
  ["ext", xdr.lookup("ManageOfferSuccessResultExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("ManageOfferResultPhysicalPriceRestrictionExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//   		int64 physicalPrice;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	}
//
// ===========================================================================
xdr.struct("ManageOfferResultPhysicalPriceRestriction", [
  ["physicalPrice", xdr.lookup("Int64")],
  ["ext", xdr.lookup("ManageOfferResultPhysicalPriceRestrictionExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("ManageOfferResultCurrentPriceRestrictionExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//   		int64 currentPrice;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	}
//
// ===========================================================================
xdr.struct("ManageOfferResultCurrentPriceRestriction", [
  ["currentPrice", xdr.lookup("Int64")],
  ["ext", xdr.lookup("ManageOfferResultCurrentPriceRestrictionExt")],
]);

// === xdr source ============================================================
//
//   union ManageOfferResult switch (ManageOfferResultCode code)
//   {
//   case MANAGE_OFFER_SUCCESS:
//       ManageOfferSuccessResult success;
//   case MANAGE_OFFER_PHYSICAL_PRICE_RESTRICTION:
//   	struct {
//   		int64 physicalPrice;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	} physicalPriceRestriction;
//   case MAANGE_OFFER_CURRENT_PRICE_RESTRICTION:
//   	struct {
//   		int64 currentPrice;
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	} currentPriceRestriction;
//   
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageOfferResult", {
  switchOn: xdr.lookup("ManageOfferResultCode"),
  switchName: "code",
  switches: [
    ["manageOfferSuccess", "success"],
    ["manageOfferPhysicalPriceRestriction", "physicalPriceRestriction"],
    ["maangeOfferCurrentPriceRestriction", "currentPriceRestriction"],
  ],
  arms: {
    success: xdr.lookup("ManageOfferSuccessResult"),
    physicalPriceRestriction: xdr.lookup("ManageOfferResultPhysicalPriceRestriction"),
    currentPriceRestriction: xdr.lookup("ManageOfferResultCurrentPriceRestriction"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("InvoiceReferenceExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct InvoiceReference {
//       uint64 invoiceID;
//       bool accept;
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("InvoiceReference", [
  ["invoiceId", xdr.lookup("Uint64")],
  ["accept", xdr.bool()],
  ["ext", xdr.lookup("InvoiceReferenceExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("FeeDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct FeeData {
//       int64 paymentFee;
//       int64 fixedFee;
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("FeeData", [
  ["paymentFee", xdr.lookup("Int64")],
  ["fixedFee", xdr.lookup("Int64")],
  ["ext", xdr.lookup("FeeDataExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("PaymentFeeDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct PaymentFeeData {
//       FeeData sourceFee;
//       FeeData destinationFee;
//       bool sourcePaysForDest;    // if true source account pays fee, else destination
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("PaymentFeeData", [
  ["sourceFee", xdr.lookup("FeeData")],
  ["destinationFee", xdr.lookup("FeeData")],
  ["sourcePaysForDest", xdr.bool()],
  ["ext", xdr.lookup("PaymentFeeDataExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("PaymentOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct PaymentOp
//   {
//       BalanceID sourceBalanceID;
//       BalanceID destinationBalanceID;
//       int64 amount;          // amount they end up with
//   
//       PaymentFeeData feeData;
//   
//       string256 subject;
//       string64 reference;
//       
//       InvoiceReference* invoiceReference;
//   
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("PaymentOp", [
  ["sourceBalanceId", xdr.lookup("BalanceId")],
  ["destinationBalanceId", xdr.lookup("BalanceId")],
  ["amount", xdr.lookup("Int64")],
  ["feeData", xdr.lookup("PaymentFeeData")],
  ["subject", xdr.lookup("String256")],
  ["reference", xdr.lookup("String64")],
  ["invoiceReference", xdr.option(xdr.lookup("InvoiceReference"))],
  ["ext", xdr.lookup("PaymentOpExt")],
]);

// === xdr source ============================================================
//
//   enum PaymentResultCode
//   {
//       // codes considered as "success" for the operation
//       PAYMENT_SUCCESS = 0, // payment successfuly completed
//   
//       // codes considered as "failure" for the operation
//       PAYMENT_MALFORMED = -1,       // bad input
//       PAYMENT_UNDERFUNDED = -2,     // not enough funds in source account
//       PAYMENT_LINE_FULL = -3,       // destination would go above their limit
//   	PAYMENT_FEE_MISMATCHED = -4,   // fee is not equal to expected fee
//       PAYMENT_BALANCE_NOT_FOUND = -5, // destination balance not found
//       PAYMENT_BALANCE_ACCOUNT_MISMATCHED = -6,
//       PAYMENT_BALANCE_ASSETS_MISMATCHED = -7,
//   	PAYMENT_SRC_BALANCE_NOT_FOUND = -8, // source balance not found
//       PAYMENT_REFERENCE_DUPLICATION = -9,
//       PAYMENT_STATS_OVERFLOW = -10,
//       PAYMENT_LIMITS_EXCEEDED = -11,
//       PAYMENT_NOT_ALLOWED_BY_ASSET_POLICY = -12,
//       PAYMENT_INVOICE_NOT_FOUND = -13,
//       PAYMENT_INVOICE_WRONG_AMOUNT = -14,
//       PAYMENT_INVOICE_BALANCE_MISMATCH = -15,
//       PAYMENT_INVOICE_ACCOUNT_MISMATCH = -16,
//       PAYMENT_INVOICE_ALREADY_PAID = -17
//   };
//
// ===========================================================================
xdr.enum("PaymentResultCode", {
  paymentSuccess: 0,
  paymentMalformed: -1,
  paymentUnderfunded: -2,
  paymentLineFull: -3,
  paymentFeeMismatched: -4,
  paymentBalanceNotFound: -5,
  paymentBalanceAccountMismatched: -6,
  paymentBalanceAssetsMismatched: -7,
  paymentSrcBalanceNotFound: -8,
  paymentReferenceDuplication: -9,
  paymentStatsOverflow: -10,
  paymentLimitsExceeded: -11,
  paymentNotAllowedByAssetPolicy: -12,
  paymentInvoiceNotFound: -13,
  paymentInvoiceWrongAmount: -14,
  paymentInvoiceBalanceMismatch: -15,
  paymentInvoiceAccountMismatch: -16,
  paymentInvoiceAlreadyPaid: -17,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("PaymentResponseExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct PaymentResponse {
//       AccountID destination;
//       uint64 paymentID;
//       AssetCode asset;
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("PaymentResponse", [
  ["destination", xdr.lookup("AccountId")],
  ["paymentId", xdr.lookup("Uint64")],
  ["asset", xdr.lookup("AssetCode")],
  ["ext", xdr.lookup("PaymentResponseExt")],
]);

// === xdr source ============================================================
//
//   union PaymentResult switch (PaymentResultCode code)
//   {
//   case PAYMENT_SUCCESS:
//       PaymentResponse paymentResponse;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("PaymentResult", {
  switchOn: xdr.lookup("PaymentResultCode"),
  switchName: "code",
  switches: [
    ["paymentSuccess", "paymentResponse"],
  ],
  arms: {
    paymentResponse: xdr.lookup("PaymentResponse"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("RecoverOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct RecoverOp
//   {
//       AccountID account;
//       PublicKey oldSigner;
//       PublicKey newSigner;
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("RecoverOp", [
  ["account", xdr.lookup("AccountId")],
  ["oldSigner", xdr.lookup("PublicKey")],
  ["newSigner", xdr.lookup("PublicKey")],
  ["ext", xdr.lookup("RecoverOpExt")],
]);

// === xdr source ============================================================
//
//   enum RecoverResultCode
//   {
//       // codes considered as "success" for the operation
//       RECOVER_SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//   
//       RECOVER_MALFORMED = -1,
//       RECOVER_OLD_SIGNER_NOT_FOUND = -2,
//       RECOVER_SIGNER_ALREADY_EXISTS = -3
//   };
//
// ===========================================================================
xdr.enum("RecoverResultCode", {
  recoverSuccess: 0,
  recoverMalformed: -1,
  recoverOldSignerNotFound: -2,
  recoverSignerAlreadyExist: -3,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("RecoverResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//   		// reserved for future use
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	}
//
// ===========================================================================
xdr.struct("RecoverResultSuccess", [
  ["ext", xdr.lookup("RecoverResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union RecoverResult switch (RecoverResultCode code)
//   {
//   case RECOVER_SUCCESS:
//       struct {
//   		// reserved for future use
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	} success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("RecoverResult", {
  switchOn: xdr.lookup("RecoverResultCode"),
  switchName: "code",
  switches: [
    ["recoverSuccess", "success"],
  ],
  arms: {
    success: xdr.lookup("RecoverResultSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//
// ===========================================================================
xdr.union("ReviewPaymentRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ReviewPaymentRequestOp
//   {
//       uint64 paymentID;
//   
//   	bool accept;
//       string256* rejectReason;
//   	// reserved for future use
//   	union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//   	ext;
//   };
//
// ===========================================================================
xdr.struct("ReviewPaymentRequestOp", [
  ["paymentId", xdr.lookup("Uint64")],
  ["accept", xdr.bool()],
  ["rejectReason", xdr.option(xdr.lookup("String256"))],
  ["ext", xdr.lookup("ReviewPaymentRequestOpExt")],
]);

// === xdr source ============================================================
//
//   enum ReviewPaymentRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       REVIEW_PAYMENT_REQUEST_SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//   	REVIEW_PAYMENT_REQUEST_NOT_FOUND = -1,           // failed to find Recovery request with such ID
//       REVIEW_PAYMENT_REQUEST_LINE_FULL = -2
//   };
//
// ===========================================================================
xdr.enum("ReviewPaymentRequestResultCode", {
  reviewPaymentRequestSuccess: 0,
  reviewPaymentRequestNotFound: -1,
  reviewPaymentRequestLineFull: -2,
});

// === xdr source ============================================================
//
//   enum PaymentState
//   {
//       PAYMENT_PENDING = 0,
//       PAYMENT_PROCESSED = 1,
//       PAYMENT_REJECTED = 2
//   };
//
// ===========================================================================
xdr.enum("PaymentState", {
  paymentPending: 0,
  paymentProcessed: 1,
  paymentRejected: 2,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//
// ===========================================================================
xdr.union("ReviewPaymentResponseExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ReviewPaymentResponse {
//       PaymentState state;
//       
//       uint64* relatedInvoiceID;
//   	// reserved for future use
//   	union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//   	ext;
//   };
//
// ===========================================================================
xdr.struct("ReviewPaymentResponse", [
  ["state", xdr.lookup("PaymentState")],
  ["relatedInvoiceId", xdr.option(xdr.lookup("Uint64"))],
  ["ext", xdr.lookup("ReviewPaymentResponseExt")],
]);

// === xdr source ============================================================
//
//   union ReviewPaymentRequestResult switch (ReviewPaymentRequestResultCode code)
//   {
//   case REVIEW_PAYMENT_REQUEST_SUCCESS:
//       ReviewPaymentResponse reviewPaymentResponse;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ReviewPaymentRequestResult", {
  switchOn: xdr.lookup("ReviewPaymentRequestResultCode"),
  switchName: "code",
  switches: [
    ["reviewPaymentRequestSuccess", "reviewPaymentResponse"],
  ],
  arms: {
    reviewPaymentResponse: xdr.lookup("ReviewPaymentResponse"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   enum ReviewRequestOpAction {
//   	APPROVE = 1,
//   	REJECT = 2,
//   	PERMANENT_REJECT = 3
//   };
//
// ===========================================================================
xdr.enum("ReviewRequestOpAction", {
  approve: 1,
  reject: 2,
  permanentReject: 3,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("ReviewRequestOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ReviewRequestOp
//   {
//   	uint64 requestID;
//   	Hash requestHash;
//   	ReviewableRequestType requestType;
//   	ReviewRequestOpAction action;
//   	string256 reason;
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ReviewRequestOp", [
  ["requestId", xdr.lookup("Uint64")],
  ["requestHash", xdr.lookup("Hash")],
  ["requestType", xdr.lookup("ReviewableRequestType")],
  ["action", xdr.lookup("ReviewRequestOpAction")],
  ["reason", xdr.lookup("String256")],
  ["ext", xdr.lookup("ReviewRequestOpExt")],
]);

// === xdr source ============================================================
//
//   enum ReviewRequestResultCode
//   {
//       // codes considered as "success" for the operation
//       REVIEW_REQUEST_SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       REVIEW_REQUEST_INVALID_REASON = -1,        // reason must be empty if approving and not empty if rejecting
//   	REVIEW_REQUEST_INVALID_ACTION = -2,
//   	REVIEW_REQUEST_HASH_MISMATCHED = -3,
//   	REVIEW_REQUEST_NOT_FOUND = -4,
//   	REVIEW_REQUEST_TYPE_MISMATCHED = -5,
//   	REVIEW_REQUEST_REJECT_NOT_ALLOWED = -6, // reject not allowed, use permanent reject
//   
//   	// Asset requests
//   	REVIEW_REQUEST_ASSET_ALREADY_EXISTS = -20,
//   	REVIEW_REQUEST_ASSET_DOES_NOT_EXISTS = -21,
//   
//   	// Issuance requests
//   	REVIEW_REQUEST_MAX_ISSUANCE_AMOUNT_EXCEEDED = -40,
//   	REVIEW_REQUEST_INSUFFICIENT_AVAILABLE_FOR_ISSUANCE_AMOUNT = -41,
//   	REVIEW_REQUEST_FULL_LINE = -42 // can't fund balance - total funds exceed UINT64_MAX
//   	
//   };
//
// ===========================================================================
xdr.enum("ReviewRequestResultCode", {
  reviewRequestSuccess: 0,
  reviewRequestInvalidReason: -1,
  reviewRequestInvalidAction: -2,
  reviewRequestHashMismatched: -3,
  reviewRequestNotFound: -4,
  reviewRequestTypeMismatched: -5,
  reviewRequestRejectNotAllowed: -6,
  reviewRequestAssetAlreadyExist: -20,
  reviewRequestAssetDoesNotExist: -21,
  reviewRequestMaxIssuanceAmountExceeded: -40,
  reviewRequestInsufficientAvailableForIssuanceAmount: -41,
  reviewRequestFullLine: -42,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("ReviewRequestResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//   		// reserved for future use
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	}
//
// ===========================================================================
xdr.struct("ReviewRequestResultSuccess", [
  ["ext", xdr.lookup("ReviewRequestResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union ReviewRequestResult switch (ReviewRequestResultCode code)
//   {
//   case REVIEW_REQUEST_SUCCESS:
//   	struct {
//   		// reserved for future use
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	} success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("ReviewRequestResult", {
  switchOn: xdr.lookup("ReviewRequestResultCode"),
  switchName: "code",
  switches: [
    ["reviewRequestSuccess", "success"],
  ],
  arms: {
    success: xdr.lookup("ReviewRequestResultSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("SetFeesOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct SetFeesOp
//       {
//           FeeEntry* fee;
//   		bool isDelete;
//   		// reserved for future use
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//       };
//
// ===========================================================================
xdr.struct("SetFeesOp", [
  ["fee", xdr.option(xdr.lookup("FeeEntry"))],
  ["isDelete", xdr.bool()],
  ["ext", xdr.lookup("SetFeesOpExt")],
]);

// === xdr source ============================================================
//
//   enum SetFeesResultCode
//       {
//           // codes considered as "success" for the operation
//           SET_FEES_SUCCESS = 0,
//           
//           // codes considered as "failure" for the operation
//           SET_FEES_INVALID_AMOUNT = -1,      // amount is negative
//   		SET_FEES_INVALID_FEE_TYPE = -2,     // operation type is invalid
//           SET_FEES_ASSET_NOT_FOUND = -3,
//           SET_FEES_INVALID_ASSET = -4,
//           SET_FEES_MALFORMED = -5,
//   		SET_FEES_MALFORMED_RANGE = -6,
//   		SET_FEES_RANGE_OVERLAP = -7,
//   		SET_FEES_NOT_FOUND = -8,
//   		SET_FEES_SUB_TYPE_NOT_EXIST = -9
//       };
//
// ===========================================================================
xdr.enum("SetFeesResultCode", {
  setFeesSuccess: 0,
  setFeesInvalidAmount: -1,
  setFeesInvalidFeeType: -2,
  setFeesAssetNotFound: -3,
  setFeesInvalidAsset: -4,
  setFeesMalformed: -5,
  setFeesMalformedRange: -6,
  setFeesRangeOverlap: -7,
  setFeesNotFound: -8,
  setFeesSubTypeNotExist: -9,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   				{
//   				case EMPTY_VERSION:
//   					void;
//   				}
//
// ===========================================================================
xdr.union("SetFeesResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//   				// reserved for future use
//   				union switch (LedgerVersion v)
//   				{
//   				case EMPTY_VERSION:
//   					void;
//   				}
//   				ext;
//   			}
//
// ===========================================================================
xdr.struct("SetFeesResultSuccess", [
  ["ext", xdr.lookup("SetFeesResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union SetFeesResult switch (SetFeesResultCode code)
//       {
//           case SET_FEES_SUCCESS:
//               struct {
//   				// reserved for future use
//   				union switch (LedgerVersion v)
//   				{
//   				case EMPTY_VERSION:
//   					void;
//   				}
//   				ext;
//   			} success;
//           default:
//               void;
//       };
//
// ===========================================================================
xdr.union("SetFeesResult", {
  switchOn: xdr.lookup("SetFeesResultCode"),
  switchName: "code",
  switches: [
    ["setFeesSuccess", "success"],
  ],
  arms: {
    success: xdr.lookup("SetFeesResultSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//
// ===========================================================================
xdr.union("SetLimitsOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct SetLimitsOp
//   {
//       AccountID* account;
//       AccountType* accountType;
//   
//       Limits limits;
//   	// reserved for future use
//   	union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//   	ext;
//   };
//
// ===========================================================================
xdr.struct("SetLimitsOp", [
  ["account", xdr.option(xdr.lookup("AccountId"))],
  ["accountType", xdr.option(xdr.lookup("AccountType"))],
  ["limits", xdr.lookup("Limits")],
  ["ext", xdr.lookup("SetLimitsOpExt")],
]);

// === xdr source ============================================================
//
//   enum SetLimitsResultCode
//   {
//       // codes considered as "success" for the operation
//       SET_LIMITS_SUCCESS = 0,
//       // codes considered as "failure" for the operation
//       SET_LIMITS_MALFORMED = -1
//   };
//
// ===========================================================================
xdr.enum("SetLimitsResultCode", {
  setLimitsSuccess: 0,
  setLimitsMalformed: -1,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("SetLimitsResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//   		// reserved for future use
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	}
//
// ===========================================================================
xdr.struct("SetLimitsResultSuccess", [
  ["ext", xdr.lookup("SetLimitsResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union SetLimitsResult switch (SetLimitsResultCode code)
//   {
//   case SET_LIMITS_SUCCESS:
//       struct {
//   		// reserved for future use
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	} success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("SetLimitsResult", {
  switchOn: xdr.lookup("SetLimitsResultCode"),
  switchName: "code",
  switches: [
    ["setLimitsSuccess", "success"],
  ],
  arms: {
    success: xdr.lookup("SetLimitsResultSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   enum ManageTrustAction
//   {
//       TRUST_ADD = 0,
//       TRUST_REMOVE = 1
//   };
//
// ===========================================================================
xdr.enum("ManageTrustAction", {
  trustAdd: 0,
  trustRemove: 1,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//
// ===========================================================================
xdr.union("TrustDataExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct TrustData {
//       TrustEntry trust;
//       ManageTrustAction action;
//   	// reserved for future use
//   	union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//   	ext;
//   };
//
// ===========================================================================
xdr.struct("TrustData", [
  ["trust", xdr.lookup("TrustEntry")],
  ["action", xdr.lookup("ManageTrustAction")],
  ["ext", xdr.lookup("TrustDataExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//
// ===========================================================================
xdr.union("SetOptionsOpExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct SetOptionsOp
//   {
//       // account threshold manipulation
//       uint32* masterWeight; // weight of the master account
//       uint32* lowThreshold;
//       uint32* medThreshold;
//       uint32* highThreshold;
//   
//       // Add, update or remove a signer for the account
//       // signer is deleted if the weight is 0
//       Signer* signer;
//   
//       TrustData* trustData;
//   	// reserved for future use
//   	union switch (LedgerVersion v)
//   	{
//   	case EMPTY_VERSION:
//   		void;
//   	}
//   	ext;
//       
//   };
//
// ===========================================================================
xdr.struct("SetOptionsOp", [
  ["masterWeight", xdr.option(xdr.lookup("Uint32"))],
  ["lowThreshold", xdr.option(xdr.lookup("Uint32"))],
  ["medThreshold", xdr.option(xdr.lookup("Uint32"))],
  ["highThreshold", xdr.option(xdr.lookup("Uint32"))],
  ["signer", xdr.option(xdr.lookup("Signer"))],
  ["trustData", xdr.option(xdr.lookup("TrustData"))],
  ["ext", xdr.lookup("SetOptionsOpExt")],
]);

// === xdr source ============================================================
//
//   enum SetOptionsResultCode
//   {
//       // codes considered as "success" for the operation
//       SET_OPTIONS_SUCCESS = 0,
//       // codes considered as "failure" for the operation
//       SET_OPTIONS_TOO_MANY_SIGNERS = -1, // max number of signers already reached
//       SET_OPTIONS_THRESHOLD_OUT_OF_RANGE = -2, // bad value for weight/threshold
//       SET_OPTIONS_BAD_SIGNER = -3,             // signer cannot be masterkey
//       SET_OPTIONS_BALANCE_NOT_FOUND = -4,
//       SET_OPTIONS_TRUST_MALFORMED = -5,
//   	SET_OPTIONS_TRUST_TOO_MANY = -6,
//   	SET_OPTIONS_INVALID_SIGNER_VERSION = -7 // if signer version is higher than ledger version
//   };
//
// ===========================================================================
xdr.enum("SetOptionsResultCode", {
  setOptionsSuccess: 0,
  setOptionsTooManySigner: -1,
  setOptionsThresholdOutOfRange: -2,
  setOptionsBadSigner: -3,
  setOptionsBalanceNotFound: -4,
  setOptionsTrustMalformed: -5,
  setOptionsTrustTooMany: -6,
  setOptionsInvalidSignerVersion: -7,
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//
// ===========================================================================
xdr.union("SetOptionsResultSuccessExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct {
//   		// reserved for future use
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	}
//
// ===========================================================================
xdr.struct("SetOptionsResultSuccess", [
  ["ext", xdr.lookup("SetOptionsResultSuccessExt")],
]);

// === xdr source ============================================================
//
//   union SetOptionsResult switch (SetOptionsResultCode code)
//   {
//   case SET_OPTIONS_SUCCESS:
//       struct {
//   		// reserved for future use
//   		union switch (LedgerVersion v)
//   		{
//   		case EMPTY_VERSION:
//   			void;
//   		}
//   		ext;
//   	} success;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("SetOptionsResult", {
  switchOn: xdr.lookup("SetOptionsResultCode"),
  switchName: "code",
  switches: [
    ["setOptionsSuccess", "success"],
  ],
  arms: {
    success: xdr.lookup("SetOptionsResultSuccess"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   enum ErrorCode
//   {
//       ERR_MISC = 0, // Unspecific error
//       ERR_DATA = 1, // Malformed data
//       ERR_CONF = 2, // Misconfiguration error
//       ERR_AUTH = 3, // Authentication failure
//       ERR_LOAD = 4  // System overloaded
//   };
//
// ===========================================================================
xdr.enum("ErrorCode", {
  errMisc: 0,
  errDatum: 1,
  errConf: 2,
  errAuth: 3,
  errLoad: 4,
});

// === xdr source ============================================================
//
//   struct Error
//   {
//       ErrorCode code;
//       string msg<100>;
//   };
//
// ===========================================================================
xdr.struct("Error", [
  ["code", xdr.lookup("ErrorCode")],
  ["msg", xdr.string(100)],
]);

// === xdr source ============================================================
//
//   struct AuthCert
//   {
//       Curve25519Public pubkey;
//       uint64 expiration;
//       Signature sig;
//   };
//
// ===========================================================================
xdr.struct("AuthCert", [
  ["pubkey", xdr.lookup("Curve25519Public")],
  ["expiration", xdr.lookup("Uint64")],
  ["sig", xdr.lookup("Signature")],
]);

// === xdr source ============================================================
//
//   struct Hello
//   {
//       uint32 ledgerVersion;
//       uint32 overlayVersion;
//       uint32 overlayMinVersion;
//       Hash networkID;
//       string versionStr<100>;
//       int listeningPort;
//       NodeID peerID;
//       AuthCert cert;
//       uint256 nonce;
//   };
//
// ===========================================================================
xdr.struct("Hello", [
  ["ledgerVersion", xdr.lookup("Uint32")],
  ["overlayVersion", xdr.lookup("Uint32")],
  ["overlayMinVersion", xdr.lookup("Uint32")],
  ["networkId", xdr.lookup("Hash")],
  ["versionStr", xdr.string(100)],
  ["listeningPort", xdr.int()],
  ["peerId", xdr.lookup("NodeId")],
  ["cert", xdr.lookup("AuthCert")],
  ["nonce", xdr.lookup("Uint256")],
]);

// === xdr source ============================================================
//
//   struct Auth
//   {
//       // Empty message, just to confirm
//       // establishment of MAC keys.
//       int unused;
//   };
//
// ===========================================================================
xdr.struct("Auth", [
  ["unused", xdr.int()],
]);

// === xdr source ============================================================
//
//   enum IPAddrType
//   {
//       IPv4 = 0,
//       IPv6 = 1
//   };
//
// ===========================================================================
xdr.enum("IpAddrType", {
  iPv4: 0,
  iPv6: 1,
});

// === xdr source ============================================================
//
//   union switch (IPAddrType type)
//       {
//       case IPv4:
//           opaque ipv4[4];
//       case IPv6:
//           opaque ipv6[16];
//       }
//
// ===========================================================================
xdr.union("PeerAddressIp", {
  switchOn: xdr.lookup("IpAddrType"),
  switchName: "type",
  switches: [
    ["iPv4", "ipv4"],
    ["iPv6", "ipv6"],
  ],
  arms: {
    ipv4: xdr.opaque(4),
    ipv6: xdr.opaque(16),
  },
});

// === xdr source ============================================================
//
//   struct PeerAddress
//   {
//       union switch (IPAddrType type)
//       {
//       case IPv4:
//           opaque ipv4[4];
//       case IPv6:
//           opaque ipv6[16];
//       }
//       ip;
//       uint32 port;
//       uint32 numFailures;
//   };
//
// ===========================================================================
xdr.struct("PeerAddress", [
  ["ip", xdr.lookup("PeerAddressIp")],
  ["port", xdr.lookup("Uint32")],
  ["numFailures", xdr.lookup("Uint32")],
]);

// === xdr source ============================================================
//
//   enum MessageType
//   {
//       ERROR_MSG = 0,
//       AUTH = 2,
//       DONT_HAVE = 3,
//   
//       GET_PEERS = 4, // gets a list of peers this guy knows about
//       PEERS = 5,
//   
//       GET_TX_SET = 6, // gets a particular txset by hash
//       TX_SET = 7,
//   
//       TRANSACTION = 8, // pass on a tx you have heard about
//   
//       // SCP
//       GET_SCP_QUORUMSET = 9,
//       SCP_QUORUMSET = 10,
//       SCP_MESSAGE = 11,
//       GET_SCP_STATE = 12,
//   
//       // new messages
//       HELLO = 13
//   };
//
// ===========================================================================
xdr.enum("MessageType", {
  errorMsg: 0,
  auth: 2,
  dontHave: 3,
  getPeer: 4,
  peer: 5,
  getTxSet: 6,
  txSet: 7,
  transaction: 8,
  getScpQuorumset: 9,
  scpQuorumset: 10,
  scpMessage: 11,
  getScpState: 12,
  hello: 13,
});

// === xdr source ============================================================
//
//   struct DontHave
//   {
//       MessageType type;
//       uint256 reqHash;
//   };
//
// ===========================================================================
xdr.struct("DontHave", [
  ["type", xdr.lookup("MessageType")],
  ["reqHash", xdr.lookup("Uint256")],
]);

// === xdr source ============================================================
//
//   union StellarMessage switch (MessageType type)
//   {
//   case ERROR_MSG:
//       Error error;
//   case HELLO:
//       Hello hello;
//   case AUTH:
//       Auth auth;
//   case DONT_HAVE:
//       DontHave dontHave;
//   case GET_PEERS:
//       void;
//   case PEERS:
//       PeerAddress peers<>;
//   
//   case GET_TX_SET:
//       uint256 txSetHash;
//   case TX_SET:
//       TransactionSet txSet;
//   
//   case TRANSACTION:
//       TransactionEnvelope transaction;
//   
//   // SCP
//   case GET_SCP_QUORUMSET:
//       uint256 qSetHash;
//   case SCP_QUORUMSET:
//       SCPQuorumSet qSet;
//   case SCP_MESSAGE:
//       SCPEnvelope envelope;
//   case GET_SCP_STATE:
//       uint32 getSCPLedgerSeq; // ledger seq requested ; if 0, requests the latest
//   };
//
// ===========================================================================
xdr.union("StellarMessage", {
  switchOn: xdr.lookup("MessageType"),
  switchName: "type",
  switches: [
    ["errorMsg", "error"],
    ["hello", "hello"],
    ["auth", "auth"],
    ["dontHave", "dontHave"],
    ["getPeer", xdr.void()],
    ["peer", "peers"],
    ["getTxSet", "txSetHash"],
    ["txSet", "txSet"],
    ["transaction", "transaction"],
    ["getScpQuorumset", "qSetHash"],
    ["scpQuorumset", "qSet"],
    ["scpMessage", "envelope"],
    ["getScpState", "getScpLedgerSeq"],
  ],
  arms: {
    error: xdr.lookup("Error"),
    hello: xdr.lookup("Hello"),
    auth: xdr.lookup("Auth"),
    dontHave: xdr.lookup("DontHave"),
    peers: xdr.varArray(xdr.lookup("PeerAddress"), 2147483647),
    txSetHash: xdr.lookup("Uint256"),
    txSet: xdr.lookup("TransactionSet"),
    transaction: xdr.lookup("TransactionEnvelope"),
    qSetHash: xdr.lookup("Uint256"),
    qSet: xdr.lookup("ScpQuorumSet"),
    envelope: xdr.lookup("ScpEnvelope"),
    getScpLedgerSeq: xdr.lookup("Uint32"),
  },
});

// === xdr source ============================================================
//
//   struct
//   {
//      uint64 sequence;
//      StellarMessage message;
//      HmacSha256Mac mac;
//       }
//
// ===========================================================================
xdr.struct("AuthenticatedMessageV0", [
  ["sequence", xdr.lookup("Uint64")],
  ["message", xdr.lookup("StellarMessage")],
  ["mac", xdr.lookup("HmacSha256Mac")],
]);

// === xdr source ============================================================
//
//   union AuthenticatedMessage switch (LedgerVersion v)
//   {
//   case EMPTY_VERSION:
//       struct
//   {
//      uint64 sequence;
//      StellarMessage message;
//      HmacSha256Mac mac;
//       } v0;
//   };
//
// ===========================================================================
xdr.union("AuthenticatedMessage", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", "v0"],
  ],
  arms: {
    v0: xdr.lookup("AuthenticatedMessageV0"),
  },
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("AssetCreationRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct AssetCreationRequest {
//   
//   	AssetCode code;
//   	string64 name;
//   	AccountID preissuedAssetSigner;
//   	longstring description;
//   	string256 externalResourceLink;
//   	uint64 maxIssuanceAmount;
//       uint32 policies;
//   
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AssetCreationRequest", [
  ["code", xdr.lookup("AssetCode")],
  ["name", xdr.lookup("String64")],
  ["preissuedAssetSigner", xdr.lookup("AccountId")],
  ["description", xdr.lookup("Longstring")],
  ["externalResourceLink", xdr.lookup("String256")],
  ["maxIssuanceAmount", xdr.lookup("Uint64")],
  ["policies", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("AssetCreationRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("AssetUpdateRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct AssetUpdateRequest {
//   	AssetCode code;
//   	longstring description;
//   	string256 externalResourceLink;
//   	uint32 policies;
//   
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AssetUpdateRequest", [
  ["code", xdr.lookup("AssetCode")],
  ["description", xdr.lookup("Longstring")],
  ["externalResourceLink", xdr.lookup("String256")],
  ["policies", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("AssetUpdateRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("PreIssuanceRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct PreIssuanceRequest {
//   
//   	AssetCode asset;
//   	uint64 amount;
//   	DecoratedSignature signature;
//   	string64 reference;
//   
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("PreIssuanceRequest", [
  ["asset", xdr.lookup("AssetCode")],
  ["amount", xdr.lookup("Uint64")],
  ["signature", xdr.lookup("DecoratedSignature")],
  ["reference", xdr.lookup("String64")],
  ["ext", xdr.lookup("PreIssuanceRequestExt")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("IssuanceRequestExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct IssuanceRequest {
//   	AssetCode asset;
//   	uint64 amount;
//   	BalanceID receiver;
//   	// reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("IssuanceRequest", [
  ["asset", xdr.lookup("AssetCode")],
  ["amount", xdr.lookup("Uint64")],
  ["receiver", xdr.lookup("BalanceId")],
  ["ext", xdr.lookup("IssuanceRequestExt")],
]);

// === xdr source ============================================================
//
//   typedef opaque Value<>;
//
// ===========================================================================
xdr.typedef("Value", xdr.varOpaque());

// === xdr source ============================================================
//
//   struct SCPBallot
//   {
//       uint32 counter; // n
//       Value value;    // x
//   };
//
// ===========================================================================
xdr.struct("ScpBallot", [
  ["counter", xdr.lookup("Uint32")],
  ["value", xdr.lookup("Value")],
]);

// === xdr source ============================================================
//
//   enum SCPStatementType
//   {
//       SCP_ST_PREPARE = 0,
//       SCP_ST_CONFIRM = 1,
//       SCP_ST_EXTERNALIZE = 2,
//       SCP_ST_NOMINATE = 3
//   };
//
// ===========================================================================
xdr.enum("ScpStatementType", {
  scpStPrepare: 0,
  scpStConfirm: 1,
  scpStExternalize: 2,
  scpStNominate: 3,
});

// === xdr source ============================================================
//
//   struct SCPNomination
//   {
//       Hash quorumSetHash; // D
//       Value votes<>;      // X
//       Value accepted<>;   // Y
//   };
//
// ===========================================================================
xdr.struct("ScpNomination", [
  ["quorumSetHash", xdr.lookup("Hash")],
  ["votes", xdr.varArray(xdr.lookup("Value"), 2147483647)],
  ["accepted", xdr.varArray(xdr.lookup("Value"), 2147483647)],
]);

// === xdr source ============================================================
//
//   struct
//           {
//               Hash quorumSetHash;       // D
//               SCPBallot ballot;         // b
//               SCPBallot* prepared;      // p
//               SCPBallot* preparedPrime; // p'
//               uint32 nC;                // c.n
//               uint32 nH;                // h.n
//           }
//
// ===========================================================================
xdr.struct("ScpStatementPrepare", [
  ["quorumSetHash", xdr.lookup("Hash")],
  ["ballot", xdr.lookup("ScpBallot")],
  ["prepared", xdr.option(xdr.lookup("ScpBallot"))],
  ["preparedPrime", xdr.option(xdr.lookup("ScpBallot"))],
  ["nC", xdr.lookup("Uint32")],
  ["nH", xdr.lookup("Uint32")],
]);

// === xdr source ============================================================
//
//   struct
//           {
//               SCPBallot ballot;   // b
//               uint32 nPrepared;   // p.n
//               uint32 nCommit;     // c.n
//               uint32 nH;          // h.n
//               Hash quorumSetHash; // D
//           }
//
// ===========================================================================
xdr.struct("ScpStatementConfirm", [
  ["ballot", xdr.lookup("ScpBallot")],
  ["nPrepared", xdr.lookup("Uint32")],
  ["nCommit", xdr.lookup("Uint32")],
  ["nH", xdr.lookup("Uint32")],
  ["quorumSetHash", xdr.lookup("Hash")],
]);

// === xdr source ============================================================
//
//   struct
//           {
//               SCPBallot commit;         // c
//               uint32 nH;                // h.n
//               Hash commitQuorumSetHash; // D used before EXTERNALIZE
//           }
//
// ===========================================================================
xdr.struct("ScpStatementExternalize", [
  ["commit", xdr.lookup("ScpBallot")],
  ["nH", xdr.lookup("Uint32")],
  ["commitQuorumSetHash", xdr.lookup("Hash")],
]);

// === xdr source ============================================================
//
//   union switch (SCPStatementType type)
//       {
//       case SCP_ST_PREPARE:
//           struct
//           {
//               Hash quorumSetHash;       // D
//               SCPBallot ballot;         // b
//               SCPBallot* prepared;      // p
//               SCPBallot* preparedPrime; // p'
//               uint32 nC;                // c.n
//               uint32 nH;                // h.n
//           } prepare;
//       case SCP_ST_CONFIRM:
//           struct
//           {
//               SCPBallot ballot;   // b
//               uint32 nPrepared;   // p.n
//               uint32 nCommit;     // c.n
//               uint32 nH;          // h.n
//               Hash quorumSetHash; // D
//           } confirm;
//       case SCP_ST_EXTERNALIZE:
//           struct
//           {
//               SCPBallot commit;         // c
//               uint32 nH;                // h.n
//               Hash commitQuorumSetHash; // D used before EXTERNALIZE
//           } externalize;
//       case SCP_ST_NOMINATE:
//           SCPNomination nominate;
//       }
//
// ===========================================================================
xdr.union("ScpStatementPledges", {
  switchOn: xdr.lookup("ScpStatementType"),
  switchName: "type",
  switches: [
    ["scpStPrepare", "prepare"],
    ["scpStConfirm", "confirm"],
    ["scpStExternalize", "externalize"],
    ["scpStNominate", "nominate"],
  ],
  arms: {
    prepare: xdr.lookup("ScpStatementPrepare"),
    confirm: xdr.lookup("ScpStatementConfirm"),
    externalize: xdr.lookup("ScpStatementExternalize"),
    nominate: xdr.lookup("ScpNomination"),
  },
});

// === xdr source ============================================================
//
//   struct SCPStatement
//   {
//       NodeID nodeID;    // v
//       uint64 slotIndex; // i
//   
//       union switch (SCPStatementType type)
//       {
//       case SCP_ST_PREPARE:
//           struct
//           {
//               Hash quorumSetHash;       // D
//               SCPBallot ballot;         // b
//               SCPBallot* prepared;      // p
//               SCPBallot* preparedPrime; // p'
//               uint32 nC;                // c.n
//               uint32 nH;                // h.n
//           } prepare;
//       case SCP_ST_CONFIRM:
//           struct
//           {
//               SCPBallot ballot;   // b
//               uint32 nPrepared;   // p.n
//               uint32 nCommit;     // c.n
//               uint32 nH;          // h.n
//               Hash quorumSetHash; // D
//           } confirm;
//       case SCP_ST_EXTERNALIZE:
//           struct
//           {
//               SCPBallot commit;         // c
//               uint32 nH;                // h.n
//               Hash commitQuorumSetHash; // D used before EXTERNALIZE
//           } externalize;
//       case SCP_ST_NOMINATE:
//           SCPNomination nominate;
//       }
//       pledges;
//   };
//
// ===========================================================================
xdr.struct("ScpStatement", [
  ["nodeId", xdr.lookup("NodeId")],
  ["slotIndex", xdr.lookup("Uint64")],
  ["pledges", xdr.lookup("ScpStatementPledges")],
]);

// === xdr source ============================================================
//
//   struct SCPEnvelope
//   {
//       SCPStatement statement;
//       Signature signature;
//   };
//
// ===========================================================================
xdr.struct("ScpEnvelope", [
  ["statement", xdr.lookup("ScpStatement")],
  ["signature", xdr.lookup("Signature")],
]);

// === xdr source ============================================================
//
//   struct SCPQuorumSet
//   {
//       uint32 threshold;
//       PublicKey validators<>;
//       SCPQuorumSet innerSets<>;
//   };
//
// ===========================================================================
xdr.struct("ScpQuorumSet", [
  ["threshold", xdr.lookup("Uint32")],
  ["validators", xdr.varArray(xdr.lookup("PublicKey"), 2147483647)],
  ["innerSets", xdr.varArray(xdr.lookup("ScpQuorumSet"), 2147483647)],
]);

// === xdr source ============================================================
//
//   union switch (OperationType type)
//       {
//       case CREATE_ACCOUNT:
//           CreateAccountOp createAccountOp;
//       case PAYMENT:
//           PaymentOp paymentOp;
//       case SET_OPTIONS:
//           SetOptionsOp setOptionsOp;
//   	case CREATE_ISSUANCE_REQUEST:
//   		CreateIssuanceRequestOp createIssuanceRequestOp;
//       case SET_FEES:
//           SetFeesOp setFeesOp;
//   	case MANAGE_ACCOUNT:
//   		ManageAccountOp manageAccountOp;
//   	case MANAGE_FORFEIT_REQUEST:
//   		ManageForfeitRequestOp manageForfeitRequestOp;
//   	case RECOVER:
//   		RecoverOp recoverOp;
//   	case MANAGE_BALANCE:
//   		ManageBalanceOp manageBalanceOp;
//   	case REVIEW_PAYMENT_REQUEST:
//   		ReviewPaymentRequestOp reviewPaymentRequestOp;
//       case MANAGE_ASSET:
//           ManageAssetOp manageAssetOp;
//       case CREATE_PREISSUANCE_REQUEST:
//           CreatePreIssuanceRequestOp createPreIssuanceRequest;
//       case SET_LIMITS:
//           SetLimitsOp setLimitsOp;
//       case DIRECT_DEBIT:
//           DirectDebitOp directDebitOp;
//   	case MANAGE_ASSET_PAIR:
//   		ManageAssetPairOp manageAssetPairOp;
//   	case MANAGE_OFFER:
//   		ManageOfferOp manageOfferOp;
//       case MANAGE_INVOICE:
//           ManageInvoiceOp manageInvoiceOp;
//   	case REVIEW_REQUEST:
//   		ReviewRequestOp reviewRequestOp;
//       }
//
// ===========================================================================
xdr.union("OperationBody", {
  switchOn: xdr.lookup("OperationType"),
  switchName: "type",
  switches: [
    ["createAccount", "createAccountOp"],
    ["payment", "paymentOp"],
    ["setOption", "setOptionsOp"],
    ["createIssuanceRequest", "createIssuanceRequestOp"],
    ["setFee", "setFeesOp"],
    ["manageAccount", "manageAccountOp"],
    ["manageForfeitRequest", "manageForfeitRequestOp"],
    ["recover", "recoverOp"],
    ["manageBalance", "manageBalanceOp"],
    ["reviewPaymentRequest", "reviewPaymentRequestOp"],
    ["manageAsset", "manageAssetOp"],
    ["createPreissuanceRequest", "createPreIssuanceRequest"],
    ["setLimit", "setLimitsOp"],
    ["directDebit", "directDebitOp"],
    ["manageAssetPair", "manageAssetPairOp"],
    ["manageOffer", "manageOfferOp"],
    ["manageInvoice", "manageInvoiceOp"],
    ["reviewRequest", "reviewRequestOp"],
  ],
  arms: {
    createAccountOp: xdr.lookup("CreateAccountOp"),
    paymentOp: xdr.lookup("PaymentOp"),
    setOptionsOp: xdr.lookup("SetOptionsOp"),
    createIssuanceRequestOp: xdr.lookup("CreateIssuanceRequestOp"),
    setFeesOp: xdr.lookup("SetFeesOp"),
    manageAccountOp: xdr.lookup("ManageAccountOp"),
    manageForfeitRequestOp: xdr.lookup("ManageForfeitRequestOp"),
    recoverOp: xdr.lookup("RecoverOp"),
    manageBalanceOp: xdr.lookup("ManageBalanceOp"),
    reviewPaymentRequestOp: xdr.lookup("ReviewPaymentRequestOp"),
    manageAssetOp: xdr.lookup("ManageAssetOp"),
    createPreIssuanceRequest: xdr.lookup("CreatePreIssuanceRequestOp"),
    setLimitsOp: xdr.lookup("SetLimitsOp"),
    directDebitOp: xdr.lookup("DirectDebitOp"),
    manageAssetPairOp: xdr.lookup("ManageAssetPairOp"),
    manageOfferOp: xdr.lookup("ManageOfferOp"),
    manageInvoiceOp: xdr.lookup("ManageInvoiceOp"),
    reviewRequestOp: xdr.lookup("ReviewRequestOp"),
  },
});

// === xdr source ============================================================
//
//   struct Operation
//   {
//       // sourceAccount is the account used to run the operation
//       // if not set, the runtime defaults to "sourceAccount" specified at
//       // the transaction level
//       AccountID* sourceAccount;
//   
//       union switch (OperationType type)
//       {
//       case CREATE_ACCOUNT:
//           CreateAccountOp createAccountOp;
//       case PAYMENT:
//           PaymentOp paymentOp;
//       case SET_OPTIONS:
//           SetOptionsOp setOptionsOp;
//   	case CREATE_ISSUANCE_REQUEST:
//   		CreateIssuanceRequestOp createIssuanceRequestOp;
//       case SET_FEES:
//           SetFeesOp setFeesOp;
//   	case MANAGE_ACCOUNT:
//   		ManageAccountOp manageAccountOp;
//   	case MANAGE_FORFEIT_REQUEST:
//   		ManageForfeitRequestOp manageForfeitRequestOp;
//   	case RECOVER:
//   		RecoverOp recoverOp;
//   	case MANAGE_BALANCE:
//   		ManageBalanceOp manageBalanceOp;
//   	case REVIEW_PAYMENT_REQUEST:
//   		ReviewPaymentRequestOp reviewPaymentRequestOp;
//       case MANAGE_ASSET:
//           ManageAssetOp manageAssetOp;
//       case CREATE_PREISSUANCE_REQUEST:
//           CreatePreIssuanceRequestOp createPreIssuanceRequest;
//       case SET_LIMITS:
//           SetLimitsOp setLimitsOp;
//       case DIRECT_DEBIT:
//           DirectDebitOp directDebitOp;
//   	case MANAGE_ASSET_PAIR:
//   		ManageAssetPairOp manageAssetPairOp;
//   	case MANAGE_OFFER:
//   		ManageOfferOp manageOfferOp;
//       case MANAGE_INVOICE:
//           ManageInvoiceOp manageInvoiceOp;
//   	case REVIEW_REQUEST:
//   		ReviewRequestOp reviewRequestOp;
//       }
//       body;
//   };
//
// ===========================================================================
xdr.struct("Operation", [
  ["sourceAccount", xdr.option(xdr.lookup("AccountId"))],
  ["body", xdr.lookup("OperationBody")],
]);

// === xdr source ============================================================
//
//   enum MemoType
//   {
//       MEMO_NONE = 0,
//       MEMO_TEXT = 1,
//       MEMO_ID = 2,
//       MEMO_HASH = 3,
//       MEMO_RETURN = 4
//   };
//
// ===========================================================================
xdr.enum("MemoType", {
  memoNone: 0,
  memoText: 1,
  memoId: 2,
  memoHash: 3,
  memoReturn: 4,
});

// === xdr source ============================================================
//
//   union Memo switch (MemoType type)
//   {
//   case MEMO_NONE:
//       void;
//   case MEMO_TEXT:
//       string text<28>;
//   case MEMO_ID:
//       uint64 id;
//   case MEMO_HASH:
//       Hash hash; // the hash of what to pull from the content server
//   case MEMO_RETURN:
//       Hash retHash; // the hash of the tx you are rejecting
//   };
//
// ===========================================================================
xdr.union("Memo", {
  switchOn: xdr.lookup("MemoType"),
  switchName: "type",
  switches: [
    ["memoNone", xdr.void()],
    ["memoText", "text"],
    ["memoId", "id"],
    ["memoHash", "hash"],
    ["memoReturn", "retHash"],
  ],
  arms: {
    text: xdr.string(28),
    id: xdr.lookup("Uint64"),
    hash: xdr.lookup("Hash"),
    retHash: xdr.lookup("Hash"),
  },
});

// === xdr source ============================================================
//
//   struct TimeBounds
//   {
//       uint64 minTime;
//       uint64 maxTime; // 0 here means no maxTime
//   };
//
// ===========================================================================
xdr.struct("TimeBounds", [
  ["minTime", xdr.lookup("Uint64")],
  ["maxTime", xdr.lookup("Uint64")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("TransactionExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct Transaction
//   {
//       // account used to run the transaction
//       AccountID sourceAccount;
//   
//       Salt salt;
//   
//       // validity range (inclusive) for the last ledger close time
//       TimeBounds timeBounds;
//   
//       Memo memo;
//   
//       Operation operations<100>;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("Transaction", [
  ["sourceAccount", xdr.lookup("AccountId")],
  ["salt", xdr.lookup("Salt")],
  ["timeBounds", xdr.lookup("TimeBounds")],
  ["memo", xdr.lookup("Memo")],
  ["operations", xdr.varArray(xdr.lookup("Operation"), 100)],
  ["ext", xdr.lookup("TransactionExt")],
]);

// === xdr source ============================================================
//
//   struct TransactionEnvelope
//   {
//       Transaction tx;
//       DecoratedSignature signatures<20>;
//   };
//
// ===========================================================================
xdr.struct("TransactionEnvelope", [
  ["tx", xdr.lookup("Transaction")],
  ["signatures", xdr.varArray(xdr.lookup("DecoratedSignature"), 20)],
]);

// === xdr source ============================================================
//
//   enum OperationResultCode
//   {
//       opINNER = 0, // inner object result is valid
//   
//       opBAD_AUTH = -1,      // too few valid signatures / wrong network
//       opNO_ACCOUNT = -2,    // source account was not found
//   	opNOT_ALLOWED = -3,   // operation is not allowed for this type of source account
//   	opACCOUNT_BLOCKED = -4, // account is blocked
//       opNO_COUNTERPARTY = -5,
//       opCOUNTERPARTY_BLOCKED = -6,
//       opCOUNTERPARTY_WRONG_TYPE = -7,
//   	opBAD_AUTH_EXTRA = -8
//   };
//
// ===========================================================================
xdr.enum("OperationResultCode", {
  opInner: 0,
  opBadAuth: -1,
  opNoAccount: -2,
  opNotAllowed: -3,
  opAccountBlocked: -4,
  opNoCounterparty: -5,
  opCounterpartyBlocked: -6,
  opCounterpartyWrongType: -7,
  opBadAuthExtra: -8,
});

// === xdr source ============================================================
//
//   union switch (OperationType type)
//       {
//       case CREATE_ACCOUNT:
//           CreateAccountResult createAccountResult;
//       case PAYMENT:
//           PaymentResult paymentResult;
//       case SET_OPTIONS:
//           SetOptionsResult setOptionsResult;
//   	case CREATE_ISSUANCE_REQUEST:
//   		CreateIssuanceRequestResult createIssuanceRequestResult;
//       case SET_FEES:
//           SetFeesResult setFeesResult;
//   	case MANAGE_ACCOUNT:
//   		ManageAccountResult manageAccountResult;
//       case MANAGE_FORFEIT_REQUEST:
//   		ManageForfeitRequestResult manageForfeitRequestResult;
//       case RECOVER:
//   		RecoverResult recoverResult;
//       case MANAGE_BALANCE:
//           ManageBalanceResult manageBalanceResult;
//       case REVIEW_PAYMENT_REQUEST:
//           ReviewPaymentRequestResult reviewPaymentRequestResult;
//       case MANAGE_ASSET:
//           ManageAssetResult manageAssetResult;
//       case CREATE_PREISSUANCE_REQUEST:
//           CreatePreIssuanceRequestResult createPreIssuanceRequestResult;
//       case SET_LIMITS:
//           SetLimitsResult setLimitsResult;
//       case DIRECT_DEBIT:
//           DirectDebitResult directDebitResult;
//   	case MANAGE_ASSET_PAIR:
//   		ManageAssetPairResult manageAssetPairResult;
//   	case MANAGE_OFFER:
//   		ManageOfferResult manageOfferResult;
//   	case MANAGE_INVOICE:
//   		ManageInvoiceResult manageInvoiceResult;
//   	case REVIEW_REQUEST:
//   		ReviewRequestResult reviewRequestResult;
//       }
//
// ===========================================================================
xdr.union("OperationResultTr", {
  switchOn: xdr.lookup("OperationType"),
  switchName: "type",
  switches: [
    ["createAccount", "createAccountResult"],
    ["payment", "paymentResult"],
    ["setOption", "setOptionsResult"],
    ["createIssuanceRequest", "createIssuanceRequestResult"],
    ["setFee", "setFeesResult"],
    ["manageAccount", "manageAccountResult"],
    ["manageForfeitRequest", "manageForfeitRequestResult"],
    ["recover", "recoverResult"],
    ["manageBalance", "manageBalanceResult"],
    ["reviewPaymentRequest", "reviewPaymentRequestResult"],
    ["manageAsset", "manageAssetResult"],
    ["createPreissuanceRequest", "createPreIssuanceRequestResult"],
    ["setLimit", "setLimitsResult"],
    ["directDebit", "directDebitResult"],
    ["manageAssetPair", "manageAssetPairResult"],
    ["manageOffer", "manageOfferResult"],
    ["manageInvoice", "manageInvoiceResult"],
    ["reviewRequest", "reviewRequestResult"],
  ],
  arms: {
    createAccountResult: xdr.lookup("CreateAccountResult"),
    paymentResult: xdr.lookup("PaymentResult"),
    setOptionsResult: xdr.lookup("SetOptionsResult"),
    createIssuanceRequestResult: xdr.lookup("CreateIssuanceRequestResult"),
    setFeesResult: xdr.lookup("SetFeesResult"),
    manageAccountResult: xdr.lookup("ManageAccountResult"),
    manageForfeitRequestResult: xdr.lookup("ManageForfeitRequestResult"),
    recoverResult: xdr.lookup("RecoverResult"),
    manageBalanceResult: xdr.lookup("ManageBalanceResult"),
    reviewPaymentRequestResult: xdr.lookup("ReviewPaymentRequestResult"),
    manageAssetResult: xdr.lookup("ManageAssetResult"),
    createPreIssuanceRequestResult: xdr.lookup("CreatePreIssuanceRequestResult"),
    setLimitsResult: xdr.lookup("SetLimitsResult"),
    directDebitResult: xdr.lookup("DirectDebitResult"),
    manageAssetPairResult: xdr.lookup("ManageAssetPairResult"),
    manageOfferResult: xdr.lookup("ManageOfferResult"),
    manageInvoiceResult: xdr.lookup("ManageInvoiceResult"),
    reviewRequestResult: xdr.lookup("ReviewRequestResult"),
  },
});

// === xdr source ============================================================
//
//   union OperationResult switch (OperationResultCode code)
//   {
//   case opINNER:
//       union switch (OperationType type)
//       {
//       case CREATE_ACCOUNT:
//           CreateAccountResult createAccountResult;
//       case PAYMENT:
//           PaymentResult paymentResult;
//       case SET_OPTIONS:
//           SetOptionsResult setOptionsResult;
//   	case CREATE_ISSUANCE_REQUEST:
//   		CreateIssuanceRequestResult createIssuanceRequestResult;
//       case SET_FEES:
//           SetFeesResult setFeesResult;
//   	case MANAGE_ACCOUNT:
//   		ManageAccountResult manageAccountResult;
//       case MANAGE_FORFEIT_REQUEST:
//   		ManageForfeitRequestResult manageForfeitRequestResult;
//       case RECOVER:
//   		RecoverResult recoverResult;
//       case MANAGE_BALANCE:
//           ManageBalanceResult manageBalanceResult;
//       case REVIEW_PAYMENT_REQUEST:
//           ReviewPaymentRequestResult reviewPaymentRequestResult;
//       case MANAGE_ASSET:
//           ManageAssetResult manageAssetResult;
//       case CREATE_PREISSUANCE_REQUEST:
//           CreatePreIssuanceRequestResult createPreIssuanceRequestResult;
//       case SET_LIMITS:
//           SetLimitsResult setLimitsResult;
//       case DIRECT_DEBIT:
//           DirectDebitResult directDebitResult;
//   	case MANAGE_ASSET_PAIR:
//   		ManageAssetPairResult manageAssetPairResult;
//   	case MANAGE_OFFER:
//   		ManageOfferResult manageOfferResult;
//   	case MANAGE_INVOICE:
//   		ManageInvoiceResult manageInvoiceResult;
//   	case REVIEW_REQUEST:
//   		ReviewRequestResult reviewRequestResult;
//       }
//       tr;
//   default:
//       void;
//   };
//
// ===========================================================================
xdr.union("OperationResult", {
  switchOn: xdr.lookup("OperationResultCode"),
  switchName: "code",
  switches: [
    ["opInner", "tr"],
  ],
  arms: {
    tr: xdr.lookup("OperationResultTr"),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   enum TransactionResultCode
//   {
//       txSUCCESS = 0, // all operations succeeded
//   
//       txFAILED = -1, // one of the operations failed (none were applied)
//   
//       txTOO_EARLY = -2,         // ledger closeTime before minTime
//       txTOO_LATE = -3,          // ledger closeTime after maxTime
//       txMISSING_OPERATION = -4, // no operation was specified
//   
//       txBAD_AUTH = -5,             // too few valid signatures / wrong network
//       txNO_ACCOUNT = -6,           // source account not found
//       txBAD_AUTH_EXTRA = -7,      // unused signatures attached to transaction
//       txINTERNAL_ERROR = -8,      // an unknown error occured
//   	txACCOUNT_BLOCKED = -9,     // account is blocked and cannot be source of tx
//       txDUPLICATION = -10         // if timing is stored
//   };
//
// ===========================================================================
xdr.enum("TransactionResultCode", {
  txSuccess: 0,
  txFailed: -1,
  txTooEarly: -2,
  txTooLate: -3,
  txMissingOperation: -4,
  txBadAuth: -5,
  txNoAccount: -6,
  txBadAuthExtra: -7,
  txInternalError: -8,
  txAccountBlocked: -9,
  txDuplication: -10,
});

// === xdr source ============================================================
//
//   union switch (TransactionResultCode code)
//       {
//       case txSUCCESS:
//       case txFAILED:
//           OperationResult results<>;
//       default:
//           void;
//       }
//
// ===========================================================================
xdr.union("TransactionResultResult", {
  switchOn: xdr.lookup("TransactionResultCode"),
  switchName: "code",
  switches: [
    ["txSuccess", "results"],
    ["txFailed", "results"],
  ],
  arms: {
    results: xdr.varArray(xdr.lookup("OperationResult"), 2147483647),
  },
  defaultArm: xdr.void(),
});

// === xdr source ============================================================
//
//   union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//
// ===========================================================================
xdr.union("TransactionResultExt", {
  switchOn: xdr.lookup("LedgerVersion"),
  switchName: "v",
  switches: [
    ["emptyVersion", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct TransactionResult
//   {
//       int64 feeCharged; // actual fee charged for the transaction
//   
//       union switch (TransactionResultCode code)
//       {
//       case txSUCCESS:
//       case txFAILED:
//           OperationResult results<>;
//       default:
//           void;
//       }
//       result;
//   
//       // reserved for future use
//       union switch (LedgerVersion v)
//       {
//       case EMPTY_VERSION:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("TransactionResult", [
  ["feeCharged", xdr.lookup("Int64")],
  ["result", xdr.lookup("TransactionResultResult")],
  ["ext", xdr.lookup("TransactionResultExt")],
]);

// === xdr source ============================================================
//
//   typedef opaque Hash[32];
//
// ===========================================================================
xdr.typedef("Hash", xdr.opaque(32));

// === xdr source ============================================================
//
//   typedef opaque uint256[32];
//
// ===========================================================================
xdr.typedef("Uint256", xdr.opaque(32));

// === xdr source ============================================================
//
//   typedef unsigned int uint32;
//
// ===========================================================================
xdr.typedef("Uint32", xdr.uint());

// === xdr source ============================================================
//
//   typedef int int32;
//
// ===========================================================================
xdr.typedef("Int32", xdr.int());

// === xdr source ============================================================
//
//   typedef unsigned hyper uint64;
//
// ===========================================================================
xdr.typedef("Uint64", xdr.uhyper());

// === xdr source ============================================================
//
//   typedef hyper int64;
//
// ===========================================================================
xdr.typedef("Int64", xdr.hyper());

// === xdr source ============================================================
//
//   enum CryptoKeyType
//   {
//       KEY_TYPE_ED25519 = 0
//   };
//
// ===========================================================================
xdr.enum("CryptoKeyType", {
  keyTypeEd25519: 0,
});

// === xdr source ============================================================
//
//   enum PublicKeyType
//   {
//   	PUBLIC_KEY_TYPE_ED25519 = KEY_TYPE_ED25519
//   };
//
// ===========================================================================
xdr.enum("PublicKeyType", {
  publicKeyTypeEd25519: 0,
});

// === xdr source ============================================================
//
//   union PublicKey switch (CryptoKeyType type)
//   {
//   case KEY_TYPE_ED25519:
//       uint256 ed25519;
//   };
//
// ===========================================================================
xdr.union("PublicKey", {
  switchOn: xdr.lookup("CryptoKeyType"),
  switchName: "type",
  switches: [
    ["keyTypeEd25519", "ed25519"],
  ],
  arms: {
    ed25519: xdr.lookup("Uint256"),
  },
});

// === xdr source ============================================================
//
//   enum LedgerVersion {
//   	EMPTY_VERSION = 0,
//   	IMPROVED_STATS_CALCULATION = 4,
//   	EMISSION_REQUEST_BALANCE_ID = 5,
//   	IMPROVED_TRANSFER_FEES_CALC = 8,
//   	USE_IMPROVED_SIGNATURE_CHECK = 9
//   };
//
// ===========================================================================
xdr.enum("LedgerVersion", {
  emptyVersion: 0,
  improvedStatsCalculation: 4,
  emissionRequestBalanceId: 5,
  improvedTransferFeesCalc: 8,
  useImprovedSignatureCheck: 9,
});

// === xdr source ============================================================
//
//   typedef opaque Signature<64>;
//
// ===========================================================================
xdr.typedef("Signature", xdr.varOpaque(64));

// === xdr source ============================================================
//
//   typedef opaque SignatureHint[4];
//
// ===========================================================================
xdr.typedef("SignatureHint", xdr.opaque(4));

// === xdr source ============================================================
//
//   typedef PublicKey NodeID;
//
// ===========================================================================
xdr.typedef("NodeId", xdr.lookup("PublicKey"));

// === xdr source ============================================================
//
//   struct Curve25519Secret
//   {
//           opaque key[32];
//   };
//
// ===========================================================================
xdr.struct("Curve25519Secret", [
  ["key", xdr.opaque(32)],
]);

// === xdr source ============================================================
//
//   struct Curve25519Public
//   {
//           opaque key[32];
//   };
//
// ===========================================================================
xdr.struct("Curve25519Public", [
  ["key", xdr.opaque(32)],
]);

// === xdr source ============================================================
//
//   struct HmacSha256Key
//   {
//           opaque key[32];
//   };
//
// ===========================================================================
xdr.struct("HmacSha256Key", [
  ["key", xdr.opaque(32)],
]);

// === xdr source ============================================================
//
//   struct HmacSha256Mac
//   {
//           opaque mac[32];
//   };
//
// ===========================================================================
xdr.struct("HmacSha256Mac", [
  ["mac", xdr.opaque(32)],
]);

// === xdr source ============================================================
//
//   typedef PublicKey AccountID;
//
// ===========================================================================
xdr.typedef("AccountId", xdr.lookup("PublicKey"));

// === xdr source ============================================================
//
//   typedef PublicKey BalanceID;
//
// ===========================================================================
xdr.typedef("BalanceId", xdr.lookup("PublicKey"));

// === xdr source ============================================================
//
//   typedef opaque Thresholds[4];
//
// ===========================================================================
xdr.typedef("Thresholds", xdr.opaque(4));

// === xdr source ============================================================
//
//   typedef string string32<32>;
//
// ===========================================================================
xdr.typedef("String32", xdr.string(32));

// === xdr source ============================================================
//
//   typedef string string64<64>;
//
// ===========================================================================
xdr.typedef("String64", xdr.string(64));

// === xdr source ============================================================
//
//   typedef string string256<256>;
//
// ===========================================================================
xdr.typedef("String256", xdr.string(256));

// === xdr source ============================================================
//
//   typedef string longstring<>;
//
// ===========================================================================
xdr.typedef("Longstring", xdr.string());

// === xdr source ============================================================
//
//   typedef string AssetCode<16>;
//
// ===========================================================================
xdr.typedef("AssetCode", xdr.string(16));

// === xdr source ============================================================
//
//   typedef uint64 Salt;
//
// ===========================================================================
xdr.typedef("Salt", xdr.lookup("Uint64"));

// === xdr source ============================================================
//
//   typedef opaque DataValue<64>;
//
// ===========================================================================
xdr.typedef("DataValue", xdr.varOpaque(64));

// === xdr source ============================================================
//
//   enum OperationType
//   {
//       CREATE_ACCOUNT = 0,
//       PAYMENT = 1,
//       SET_OPTIONS = 2,
//       CREATE_ISSUANCE_REQUEST = 3,
//       SET_FEES = 5,
//   	MANAGE_ACCOUNT = 6,
//       MANAGE_FORFEIT_REQUEST = 7,
//       RECOVER = 8,
//       MANAGE_BALANCE = 9,
//       REVIEW_PAYMENT_REQUEST = 10,
//       MANAGE_ASSET = 11,
//       CREATE_PREISSUANCE_REQUEST = 12,
//       SET_LIMITS = 13,
//       DIRECT_DEBIT = 14,
//   	MANAGE_ASSET_PAIR = 15,
//   	MANAGE_OFFER = 16,
//       MANAGE_INVOICE = 17,
//   	REVIEW_REQUEST = 18
//   };
//
// ===========================================================================
xdr.enum("OperationType", {
  createAccount: 0,
  payment: 1,
  setOption: 2,
  createIssuanceRequest: 3,
  setFee: 5,
  manageAccount: 6,
  manageForfeitRequest: 7,
  recover: 8,
  manageBalance: 9,
  reviewPaymentRequest: 10,
  manageAsset: 11,
  createPreissuanceRequest: 12,
  setLimit: 13,
  directDebit: 14,
  manageAssetPair: 15,
  manageOffer: 16,
  manageInvoice: 17,
  reviewRequest: 18,
});

// === xdr source ============================================================
//
//   struct DecoratedSignature
//   {
//       SignatureHint hint;  // last 4 bytes of the public key, used as a hint
//       Signature signature; // actual signature
//   };
//
// ===========================================================================
xdr.struct("DecoratedSignature", [
  ["hint", xdr.lookup("SignatureHint")],
  ["signature", xdr.lookup("Signature")],
]);

});
export default types;
