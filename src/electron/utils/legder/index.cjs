const TransportNodeHid = require('@ledgerhq/hw-transport-node-hid').default;
const AppCasper = require('@zondax/ledger-casper').default;
const { listen } = require('@ledgerhq/logs');
const { CLPublicKey, DeployUtil } = require('casper-js-sdk');
const { getBalance } = require('../account.cjs');
const fs = require('fs');

listen((log) => {
	console.log(log);
	if (log.message === 'Device add detected:') {
		console.log('New Device Detected');
	}
});

const createTransport = async (openTimeout = undefined, listenTimeout = undefined) => {
	const Transport = await TransportNodeHid.create(openTimeout, listenTimeout);
	const CasperApp = new AppCasper(Transport);
	return [CasperApp, Transport];
};

const getAppStatus = async (openTimeout = undefined, listenTimeout = undefined) => {
	const [CasperApp, Transport] = await createTransport(openTimeout, listenTimeout);
	const appInfo = await CasperApp.getAppInfo().catch(() => null);
	const firstAddress = await CasperApp.getAddressAndPubKey("m/44'/506'/0'/0/0").catch(() => {
		return null;
	});

	await Transport.close();

	// When Casper App is Active, we get the name Casper
	// Inform user to unlock the device and select Casper App. If it is not installed, they should install from Ledger Live
	// When the casper app is active, we can get the first account so it can be used to verify that the app is active
	return {
		isActive: appInfo?.appName.toLowerCase() === 'casper',
		isLocked: !firstAddress?.publicKey?.toString('hex'),
	};
};

const queryAppStatus = async () => {
	const appStatus = await getAppStatus(3000, 5000);

	if (!appStatus.isActive || appStatus.isLocked) {
		throw 'not-connected';
	}

	return appStatus;
};

const getCasperLedgerAppInformation = async () => {
	await queryAppStatus().catch((err) => {
		throw err;
	});
	const [CasperApp, Transport] = await createTransport();
	const response = await CasperApp.getAppInfo();
	await Transport.close();
	return response;
};

const getFiveAccounts = async (startIndex = 0, network = 'testnet') => {
	await queryAppStatus().catch((err) => {
		throw err;
	});
	const [CasperApp, Transport] = await createTransport();
	const accountsArray = [];
	for (let i = startIndex; i < startIndex + 5; i++) {
		accountsArray.push(
			await new Promise((resolve) => {
				return CasperApp.getAddressAndPubKey(`m/44'/506'/0'/0/${i}`).then(async (result) => {
					const publicKey = '02' + result.publicKey.toString('hex');
					const accountHash = Buffer.from(CLPublicKey.fromHex(publicKey).toAccountHash()).toString(
						'hex',
					);
					const balance = await getBalance(accountHash, publicKey, network || 'testnet');
					resolve({
						index: i,
						publicKey: publicKey,
						balance: balance,
						accountHash: accountHash,
					});
				});
			}),
		);
	}

	await Transport.close();

	return { accounts: accountsArray };
};

const signTransactionUsingLedger = async (accountIndex, deploy) => {
	await queryAppStatus().catch((err) => {
		throw err;
	});
	const [CasperApp, Transport] = await createTransport();
	const result = await CasperApp.sign(
		`m/44'/506'/0'/0/${accountIndex}`,
		DeployUtil.deployToBytes(deploy),
	);

	await Transport.close();
	return result;
};

// { returnCode: 28161, errorMessage: 'Unknown Status Code: 28161' } App is not open

module.exports = {
	queryAppStatus,
	getCasperLedgerAppInformation,
	getFiveAccounts,
	signTransactionUsingLedger,
};
