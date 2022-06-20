const { ERC20Client } = require('casper-erc20-js-client');
const { getCasperClientAndService } = require('../index.cjs');
const { mainnetApiUrl, testnetApiUrl } = require('../../constants/index.cjs');
const {
	Keys,
	DeployUtil,
	RuntimeArgs,
	CLString,
	CLU8,
	CLU256,
	CLPublicKey,
	CasperClient,
} = require('casper-js-sdk');
const fs = require('fs');
const path = require('path');
const { ethers } = require('ethers');
const casperHelper = require('casper-js-client-helper');

const erc20ClassInstance = (rpc, network_name, event_stream_address = undefined) => {
	const erc20 = new ERC20Client(
		rpc, // RPC address
		network_name, // Network name
		event_stream_address, // Event stream address
	);

	return erc20;
};

const deployMintableContract = async (
	token_name,
	token_symbol,
	token_decimals,
	token_supply,
	private_key,
	pvk_algorithm = 'ed25519',
	network = 'testnet',
	authorized_minter = null,
) => {
	const { casperClient } = getCasperClientAndService(network);
	const networkName = network === 'mainnet' ? 'casper' : 'casper-test';

	const erc20MintableContractCode = fs.readFileSync(path.join(__dirname, './erc20_mintable.wasm'), {
		encoding: 'hex',
	});

	const contractCode = Uint8Array.from(Buffer.from(erc20MintableContractCode, 'hex'));

	const publicKey =
		pvk_algorithm === 'ed25519'
			? Keys.Ed25519.privateToPublicKey(Buffer.from(private_key, 'hex'))
			: Keys.Secp256K1.privateToPublicKey(Buffer.from(private_key, 'hex'));
	const keyPair =
		pvk_algorithm === 'ed25519'
			? Keys.Ed25519.parseKeyPair(publicKey, Buffer.from(private_key, 'hex'))
			: Keys.Secp256K1.parseKeyPair(publicKey, Buffer.from(private_key, 'hex'));

	const deployParams = new DeployUtil.DeployParams(keyPair.publicKey, networkName);
	const payment = DeployUtil.standardPayment(90000000000);

	const session = DeployUtil.ExecutableDeployItem.newModuleBytes(
		contractCode,
		RuntimeArgs.fromMap({
			name: new CLString(token_name),
			symbol: new CLString(token_symbol),
			decimals: new CLU8(token_decimals),
			total_supply: new CLU256(ethers.utils.parseUnits(token_supply.toString(), token_decimals)),
			authorized_minter: new CLString(authorized_minter),
			contract_key_name: new CLString(token_name),
		}),
	);
	const deploy = DeployUtil.makeDeploy(deployParams, session, payment);
	const signedDeploy = DeployUtil.signDeploy(deploy, keyPair);
	const deployHash = await casperClient.putDeploy(signedDeploy);

	return deployHash;
};

const deployNormalContract = async (
	token_name,
	token_symbol,
	token_decimals,
	token_supply,
	private_key,
	pvk_algorithm = 'ed25519',
	network = 'testnet',
) => {
	// const rpc = network === 'mainnet' ? mainnetApiUrl : testnetApiUrl;
	// const erc20 = erc20ClassInstance(rpc, network === 'mainnet' ? 'casper' : 'casper-test');

	// const publicKey =
	// 	pvk_algorithm === 'ed25519'
	// 		? Keys.Ed25519.privateToPublicKey(Buffer.from(private_key, 'hex'))
	// 		: Keys.Secp256K1.privateToPublicKey(Buffer.from(private_key, 'hex'));
	// const keyPair =
	// 	pvk_algorithm === 'ed25519'
	// 		? Keys.Ed25519.parseKeyPair(publicKey, Buffer.from(private_key, 'hex'))
	// 		: Keys.Secp256K1.parseKeyPair(publicKey, Buffer.from(private_key, 'hex'));

	// const installDeployHash = await erc20.install(
	// 	keyPair, // Key pair used for signing
	// 	token_name, // Name of the token
	// 	token_symbol, // Token Symbol
	// 	token_decimals, // Token decimals
	// 	ethers.utils.parseUnits(token_supply.toString(), token_decimals), // Token supply
	// 	90000000000, // Payment amount 200000000000
	// 	path.join(__dirname, './erc20_token.wasm'), // Path to WASM file
	// );

	const { casperClient } = getCasperClientAndService(network);
	const networkName = network === 'mainnet' ? 'casper' : 'casper-test';

	const erc20MintableContractCode = fs.readFileSync(path.join(__dirname, './erc20_token.wasm'), {
		encoding: 'hex',
	});

	const contractCode = Uint8Array.from(Buffer.from(erc20MintableContractCode, 'hex'));

	const publicKey =
		pvk_algorithm === 'ed25519'
			? Keys.Ed25519.privateToPublicKey(Buffer.from(private_key, 'hex'))
			: Keys.Secp256K1.privateToPublicKey(Buffer.from(private_key, 'hex'));
	const keyPair =
		pvk_algorithm === 'ed25519'
			? Keys.Ed25519.parseKeyPair(publicKey, Buffer.from(private_key, 'hex'))
			: Keys.Secp256K1.parseKeyPair(publicKey, Buffer.from(private_key, 'hex'));

	const deployParams = new DeployUtil.DeployParams(keyPair.publicKey, networkName);
	const payment = DeployUtil.standardPayment(90000000000);

	const session = DeployUtil.ExecutableDeployItem.newModuleBytes(
		contractCode,
		RuntimeArgs.fromMap({
			name: new CLString(token_name),
			symbol: new CLString(token_symbol),
			decimals: new CLU8(token_decimals),
			total_supply: new CLU256(ethers.utils.parseUnits(token_supply.toString(), token_decimals)),
			// authorized_minter: new CLString(authorized_minter),
			contract_key_name: new CLString(token_name),
		}),
	);
	const deploy = DeployUtil.makeDeploy(deployParams, session, payment);
	const signedDeploy = DeployUtil.signDeploy(deploy, keyPair);
	const deployHash = await casperClient.putDeploy(signedDeploy);

	return deployHash;
};

const getTokenNamedKeyValue = async (contractHash, key, network) => {
	const rpc = network === 'mainnet' ? mainnetApiUrl : testnetApiUrl;
	return await casperHelper.helpers.contractSimpleGetter(rpc, contractHash, [key]);
};

const checkIfTokenIsSupported = async (contractHash, network) => {
	try {
		const rpc = network === 'mainnet' ? mainnetApiUrl : testnetApiUrl;
		const casperClient = new CasperClient(rpc);
		// Check contract keys
		const namedKeys =
			(
				await casperClient.nodeClient.getBlockState(
					await casperClient.nodeClient.getStateRootHash(),
					`hash-${contractHash}`,
					[],
				)
			).Contract?.namedKeys.map((item) => item.name) ?? [];
		// required keys - name*, symbol, decimals, balances, allowances, total_supply*

		console.log(namedKeys);

		if (namedKeys.length < 5) {
			return false;
		}

		if (
			namedKeys.includes('name') &&
			namedKeys.includes('symbol') &&
			namedKeys.includes('decimals') &&
			namedKeys.includes('balances') &&
			namedKeys.includes('allowances')
		) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		// Enter a valid contract address
		return false;
	}
};

module.exports = {
	deployErc20Contract: async (
		token_name,
		token_symbol,
		token_decimals,
		token_supply,
		private_key,
		pvk_algorithm = 'ed25519',
		network = 'testnet',
		mintable = true,
		authorized_minter = null,
	) => {
		try {
			let deployHash = '';
			if (mintable) {
				deployHash = await deployMintableContract(
					token_name,
					token_symbol,
					token_decimals,
					token_supply,
					private_key,
					pvk_algorithm,
					network,
					authorized_minter,
				);
			} else {
				deployHash = await deployNormalContract(
					token_name,
					token_symbol,
					token_decimals,
					token_supply,
					private_key,
					pvk_algorithm,
					network,
				);
			}

			if (!deployHash) {
				throw 'Failed To Deploy. Please Try Again Later.';
			}

			return deployHash;
		} catch (err) {
			console.log(err);
			throw err;
		}
	},
	sendErc20Tokens: async (
		contractHash,
		reciepientPublicKey,
		amount,
		tokenDecimals,
		privateKey,
		pvk_algorithm,
		network,
	) => {
		try {
			const rpc = network === 'mainnet' ? mainnetApiUrl : testnetApiUrl;
			const casperClient = new CasperClient(rpc);
			const erc20 = erc20ClassInstance(rpc, network === 'mainnet' ? 'casper' : 'casper-test');

			await erc20.setContractHash(contractHash);

			const publicKey =
				pvk_algorithm === 'ed25519'
					? Keys.Ed25519.privateToPublicKey(Buffer.from(privateKey, 'hex'))
					: Keys.Secp256K1.privateToPublicKey(Buffer.from(privateKey, 'hex'));
			const keyPair =
				pvk_algorithm === 'ed25519'
					? Keys.Ed25519.parseKeyPair(publicKey, Buffer.from(privateKey, 'hex'))
					: Keys.Secp256K1.parseKeyPair(publicKey, Buffer.from(privateKey, 'hex'));

			const deployHash = await erc20.transfer(
				keyPair, // Key pair used for signing
				CLPublicKey.fromHex(reciepientPublicKey), // Receiver public key
				ethers.utils.parseUnits(amount, tokenDecimals), // Amount to transfer
				'1000000000', // Payment amount
			);

			return await casperClient.getDeploy(deployHash);
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
	getErc20TokenBalance: async (contractHash, publicKey, network) => {
		const rpc = network === 'mainnet' ? mainnetApiUrl : testnetApiUrl;

		const erc20 = erc20ClassInstance(rpc, network === 'mainnet' ? 'casper' : 'casper-test');

		await erc20.setContractHash(contractHash);

		const balance = await erc20.balanceOf(CLPublicKey.fromHex(publicKey));

		const decimals = +ethers.utils.formatUnits(
			await getTokenNamedKeyValue(contractHash, 'decimals', network),
			0,
		);

		const parsedBalance = +ethers.utils.formatUnits(balance.toString(), decimals);

		console.log(parsedBalance);

		return parsedBalance;
	},
	getTokenDetails: async (contractHash, network) => {
		if (!(await checkIfTokenIsSupported(contractHash, network))) {
			throw 'Please make sure your token has at least one of the following keys: symbol, decimals, balances, allowances';
		}

		// Add token to page and fetch details from Casper to Confirm the one's entered
		const decimals = +ethers.utils.formatUnits(
			await getTokenNamedKeyValue(contractHash, 'decimals', network),
			0,
		);
		const tokenTicker = await getTokenNamedKeyValue(contractHash, 'symbol', network);
		const tokenName = await getTokenNamedKeyValue(contractHash, 'name', network);

		return {
			tokenName,
			tokenTicker,
			decimals,
			contractHash,
		};
	},
};
