/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />

import type {
	EraSummary,
	CasperServiceByJsonRPC,
	BalanceServiceByJsonRPC,
	DeployWatcher,
	EventName,
	EventStream,
	parseEvent,
	Contracts,
	Keys,
	Serialization,
	DeployUtil,
	Signer,
	resultHelper,
	CLType,
	ToBytes,
	CLValue,
	CLValueParsers,
	CLValueBytesParsers,
	CLTypeBuilder,
	CLValueBuilder,
	CL_BYTE_ARRAY_MAX_LENGTH,
	CLByteArrayType,
	CLByteArrayBytesParser,
	CLByteArray,
	CLKeyType,
	CLKeyBytesParser,
	CLKey,
	CLListType,
	CLListBytesParser,
	CLList,
	CLMapType,
	CLMapBytesParser,
	CLMap,
	CLI32Type,
	CLI32BytesParser,
	CLI32,
	CLI64Type,
	CLI64BytesParser,
	CLI64,
	CLU8Type,
	CLU8BytesParser,
	CLU8,
	CLU32Type,
	CLU32BytesParser,
	CLU32,
	CLU64Type,
	CLU64BytesParser,
	CLU64,
	CLU128Type,
	CLU128BytesParser,
	CLU128,
	CLU256Type,
	CLU256BytesParser,
	CLU256,
	CLU512Type,
	CLU512BytesParser,
	CLU512,
	CLPublicKeyTag,
	CLPublicKeyType,
	CLPublicKeyBytesParser,
	CLPublicKey,
	CLStringType,
	CLStringBytesParser,
	CLString,
	CLTupleType,
	CLTupleBytesParser,
	CLTuple1Type,
	CLTuple1,
	CLTuple2Type,
	CLTuple2,
	CLTuple3Type,
	CLTuple3,
	AccessRights,
	CLURefType,
	CLURefBytesParser,
	CLURef,
	CLUnitType,
	CLUnitBytesParser,
	CLUnit,
	CLAccountHashType,
	CLAccountHashBytesParser,
	CLAccountHash,
	CLBoolType,
	CLBoolBytesParser,
	CLBool,
	CLResultType,
	CLResultBytesParser,
	CLResult,
	CLOptionType,
	CLOptionBytesParser,
	CLOption,
	ACCOUNT_HASH_LENGTH,
	CLErrorCodes,
	KeyVariant,
	CLTypeTag,
	BOOL_ID,
	KEY_ID,
	PUBLIC_KEY_ID,
	STRING_ID,
	UREF_ID,
	UNIT_ID,
	I32_ID,
	I64_ID,
	U8_ID,
	U32_ID,
	U64_ID,
	U128_ID,
	U256_ID,
	U512_ID,
	BYTE_ARRAY_ID,
	LIST_ID,
	MAP_ID,
	OPTION_ID,
	RESULT_ID,
	TUPLE1_ID,
	TUPLE2_ID,
	TUPLE3_ID,
	ACCOUNT_HASH_ID,
	TUPLE_MATCH_LEN_TO_ID,
	matchTypeToCLType,
	matchByteParserByCLType,
	matchBytesToCLType,
	padNum,
	NamedArg,
	RuntimeArgs,
	CasperClient,
	formatMessageWithHeaders,
	signRawMessage,
	signFormattedMessage,
	verifyMessageSignature,
	base64to16,
	encodeBase16,
	decodeBase16,
	encodeBase64,
	decodeBase64,
} from 'casper-js-sdk';
import CoinGecko from 'coingecko-api';

type dataFunc = (data: string) => void;

declare global {
	interface Window {
		api: {
			receive: (channel: MainReceiveChannels, dataFunc) => void;
			send: (channel: MainSendChannels, data: string) => void;
		};
		CasperSDK: CasperSDKType;
		CoinGecko: typeof CoinGecko;
	}

	interface CasperSdkType {
		EraSummary: EraSummary;
		CasperServiceByJsonRPC: CasperServiceByJsonRPC;
		BalanceServiceByJsonRPC: BalanceServiceByJsonRPC;
		DeployWatcher: DeployWatcher;
		EventName: EventName;
		EventStream: EventStream;
		parseEvent: parseEvent;
		Contracts: Contracts;
		Keys: Keys;
		Serialization: Serialization;
		DeployUtil: DeployUtil;
		Signer: Signer;
		resultHelper: resultHelper;
		CLType: CLType;
		ToBytes: ToBytes;
		CLValue: CLValue;
		CLValueParsers: CLValueParsers;
		CLValueBytesParsers: CLValueBytesParsers;
		CLTypeBuilder: CLTypeBuilder;
		CLValueBuilder: CLValueBuilder;
		CL_BYTE_ARRAY_MAX_LENGTH: CL_BYTE_ARRAY_MAX_LENGTH;
		CLByteArrayType: CLByteArrayType;
		CLByteArrayBytesParser: CLByteArrayBytesParser;
		CLByteArray: CLByteArray;
		CLKeyType: CLKeyType;
		CLKeyBytesParser: CLKeyBytesParser;
		CLKey: CLKey;
		CLListType: CLListType;
		CLListBytesParser: CLListBytesParser;
		CLList: CLList;
		CLMapType: CLMapType;
		CLMapBytesParser: CLMapBytesParser;
		CLMap: CLMap;
		CLI32Type: CLI32Type;
		CLI32BytesParser: CLI32BytesParser;
		CLI32: CLI32;
		CLI64Type: CLI64Type;
		CLI64BytesParser: CLI64BytesParser;
		CLI64: CLI64;
		CLU8Type: CLU8Type;
		CLU8BytesParser: CLU8BytesParser;
		CLU8: CLU8;
		CLU32Type: CLU32Type;
		CLU32BytesParser: CLU32BytesParser;
		CLU32: CLU32;
		CLU64Type: CLU64Type;
		CLU64BytesParser: CLU64BytesParser;
		CLU64: CLU64;
		CLU128Type: CLU128Type;
		CLU128BytesParser: CLU128BytesParser;
		CLU128: CLU128;
		CLU256Type: CLU256Type;
		CLU256BytesParser: CLU256BytesParser;
		CLU256: CLU256;
		CLU512Type: CLU512Type;
		CLU512BytesParser: CLU512BytesParser;
		CLU512: CLU512;
		CLPublicKeyTag: CLPublicKeyTag;
		CLPublicKeyType: CLPublicKeyType;
		CLPublicKeyBytesParser: CLPublicKeyBytesParser;
		CLPublicKey: CLPublicKey;
		CLStringType: CLStringType;
		CLStringBytesParser: CLStringBytesParser;
		CLString: CLString;
		CLTupleType: CLTupleType;
		CLTupleBytesParser: CLTupleBytesParser;
		CLTuple1Type: CLTuple1Type;
		CLTuple1: CLTuple1;
		CLTuple2Type: CLTuple2Type;
		CLTuple2: CLTuple2;
		CLTuple3Type: CLTuple3Type;
		CLTuple3: CLTuple3;
		AccessRights: AccessRights;
		CLURefType: CLURefType;
		CLURefBytesParser: CLURefBytesParser;
		CLURef: CLURef;
		CLUnitType: CLUnitType;
		CLUnitBytesParser: CLUnitBytesParser;
		CLUnit: CLUnit;
		CLAccountHashType: CLAccountHashType;
		CLAccountHashBytesParser: CLAccountHashBytesParser;
		CLAccountHash: CLAccountHash;
		CLBoolType: CLBoolType;
		CLBoolBytesParser: CLBoolBytesParser;
		CLBool: CLBool;
		CLResultType: CLResultType;
		CLResultBytesParser: CLResultBytesParser;
		CLResult: CLResult;
		CLOptionType: CLOptionType;
		CLOptionBytesParser: CLOptionBytesParser;
		CLOption: CLOption;
		ACCOUNT_HASH_LENGTH: ACCOUNT_HASH_LENGTH;
		CLErrorCodes: CLErrorCodes;
		KeyVariant: KeyVariant;
		CLTypeTag: CLTypeTag;
		BOOL_ID: BOOL_ID;
		KEY_ID: KEY_ID;
		PUBLIC_KEY_ID: PUBLIC_KEY_ID;
		STRING_ID: STRING_ID;
		UREF_ID: UREF_ID;
		UNIT_ID: UNIT_ID;
		I32_ID: I32_ID;
		I64_ID: I64_ID;
		U8_ID: U8_ID;
		U32_ID: U32_ID;
		U64_ID: U64_ID;
		U128_ID: U128_ID;
		U256_ID: U256_ID;
		U512_ID: U512_ID;
		BYTE_ARRAY_ID: BYTE_ARRAY_ID;
		LIST_ID: LIST_ID;
		MAP_ID: MAP_ID;
		OPTION_ID: OPTION_ID;
		RESULT_ID: RESULT_ID;
		TUPLE1_ID: TUPLE1_ID;
		TUPLE2_ID: TUPLE2_ID;
		TUPLE3_ID: TUPLE3_ID;
		ACCOUNT_HASH_ID: ACCOUNT_HASH_ID;
		TUPLE_MATCH_LEN_TO_ID: TUPLE_MATCH_LEN_TO_ID;
		matchTypeToCLType: matchTypeToCLType;
		matchByteParserByCLType: matchByteParserByCLType;
		matchBytesToCLType: matchBytesToCLType;
		padNum: padNum;
		NamedArg: NamedArg;
		RuntimeArgs: RuntimeArgs;
		CasperClient: CasperClient;
		formatMessageWithHeaders: formatMessageWithHeaders;
		signRawMessage: signRawMessage;
		signFormattedMessage: signFormattedMessage;
		verifyMessageSignature: verifyMessageSignature;
		base64to16: base64to16;
		encodeBase16: encodeBase16;
		decodeBase16: decodeBase16;
		encodeBase64: encodeBase64;
		decodeBase64: decodeBase64;
	}

	interface infoCategory {
		name: string;
		placeholder: string;
	}

	interface NavIcon {
		id: number;
		active: boolean;
	}

	interface choiceCard {
		id: number;
		header: string;
		description: string;
		route: string;
		isSelected: boolean;
	}

	interface SeedWord {
		id: number;
		word: string;
		isEmpty: boolean;
	}

	interface SwapData {
		fromAmount: number;
		toAmount: number;
		fromPrice: number;
		toPrice: number;
		fromCryptoUnit: string;
		fromPriceUnit: string;
		toCryptoUnit: string;
		toPriceUnit: string;
	}

	interface ChartPrice {
		x: string;
		y: number;
	}

	interface HistoryObject {
		wallet: string;
		status: 'Received' | 'Sent' | 'Stake' | 'Swap' | 'All' | string;
		dateAndTime: string;
		amount: number;
		price: number;
		SwapData: SwapData;
		toAccount: string;
		fromAccount: string;
		cryptoUnit: string;
		currencyUnit: string;
	}

	interface WalletCreationData {
		walletName: string;
		walletAddress: string;
		accountHash: string;
		privateKey: string;
		seedPhrase: string | null;
		password: string;
	}

	interface IWallet {
		walletName: string;
		walletPassword: string;
		walletImage: string;
		seedPhrase: string[];
		availableBalanceUSD: number;
		stakedBalance: number;
		unclaimedRewards: number;
		walletTokens: IToken[];
		walletStakes: IStake[];
		walletHistory: IHistory[];
		walletAddress: string;
		accountHash: string;
		privateKey: string;
	}

	interface IToken {
		tokenName: string;
		tokenTicker: string;
		tokenAmountHeld: number;
		tokenAmountHeldUSD: number;
		limitedSupply: boolean;
		mintableSupply: boolean;
		shareToken: boolean;
		contractString: string;
		contractAddress: string;
		tokenPriceUSD: number;
		decimalsOfPrecision: number;
		walletAddress: string;
	}

	// TODO: RETHINK THE HISTORY OBJECT GIVEN THE DATA WE ARE GETTING BACK
	interface IHistory {
		transactionType:
			| 'send'
			| 'swap'
			| 'recieve'
			| 'stake'
			| 'initialStakeUnlock'
			| 'unstake'
			| 'claimReward';
		transactionInitiationDate: Date & { toDate: () => Date };
		recipientWalletName: string;
		recipientWalletAddress: string;
		senderWalletAddress: string;
		transactionTokenAmount: number;
		transactionUSDEquivalent: number;
		transactionFee: number;
		transactionHash: string;
		transactionDate: Date & { toDate: () => Date };
	}

	interface IValidator {
		validatorName: string;
		uptime: number;
		validatorCommission: number;
		votingPower: number;
		selfDelegation: number;
		delegationReturn: number;
	}

	interface IStake {
		parentWallet: string;
		stakeAmount: number;
		unstakeDatetime: Date & { toDate: () => Date };
		//difference between stakeDate and reclamationDate
		unstakeCountdown: number;
		reclamationDate: Date & { toDate: () => Date };
		initialStakeDate: Date & { toDate: () => Date };
		rewardDate: Date & { toDate: () => Date };
		// difference between rewardDate and initialStakeDate
		rewardCountdown: number;
		reward: number;
		unlocked: number;
		stakePercent: number;
		parentWalletAddress: string;
	}

	interface IUser {
		name: string;
		email: string;
		avatar: string;
		theme: string;
	}

	interface AppSettings {
		name: string;
		email: string;
		avatar: string;
	}

	interface ProfileSettings {
		walletName: string;
		walletAddress: string;
		publicKey: string;
		privateKey: string;
		currentPassword: string;
	}

	interface GetHistoryResponse {
		data: {
			transferId: string; //'1645471218404';
			deployHash: string; //'622c989fbca6e6041050d705980257c1207189a4ab4842d6a3847dff3f56c5f7';
			blockHash: string; //'febb0ee9e474aee90c49dd95d71db9cd43f7c49e9c89c6badc3f47f8b7683e5f';
			sourcePurse: string; //'uref-68413a99bdcf40c249c680dfdefb205f732cab789978b7bf4ef6f8a6165ada66-007';
			targetPurse: string; //'uref-cf76bf4a873d82181eb8f18a52cdfa651bcc44133f8a151b60a894f2f378034f-004';
			amount: string; //'2500000000';
			fromAccount: string; //'34b0394b11dc3ecb1bf6f26c9754aa2e9f38d7bec33003374b4b3fac8566c258';
			toAccount: string; //'a3e43d6224734448496738a31c27b942a1b41b7470de8eac2a0f7b1ddd609ba7';
			timestamp: string; //'2022-02-21T19:22:07.000Z'; => can be transformed to actual dates for sorting
		};
		pageCount: number;
		itemCount: number;
		pages: number[];
	}

	type MainSendChannels =
		| 'createWalletFromMnemonics'
		| 'createWalletFromFile'
		| 'generateMnemonics'
		| 'importWalletFromFile'
		| 'getHistory'
		| 'currentPriceInUsd'
		| 'accountTokenBalance';
	type MainReceiveChannels =
		| 'createWalletFromFileResponse'
		| 'createWalletFromMnemonicsResponse'
		| 'generateMnemonicsResponse'
		| 'importWalletFromFileResponse'
		| 'getHistoryResponse'
		| 'currentPriceInUsdResponse'
		| 'accountTokenBalanceResponse';
}

// declare
