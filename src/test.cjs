const TransportNodeHid = require('@ledgerhq/hw-transport-node-hid').default;
const AppCasper = require('@zondax/ledger-casper').default;
const { listen } = require('@ledgerhq/logs');
const { LedgerError } = require('@zondax/ledger-casper');
const { CLPublicKey, CLPublicKeyTag, DeployUtil } = require('casper-js-sdk');
const { ethers } = require('ethers');
const { getCasperClientAndService } = require('./electron/utils/index.cjs');
const { signTransaction } = require('./electron/utils/legder/index.cjs');

listen((log) => {
	console.log(log);
	if (log.message === 'Device add detected:') {
		console.log('New Device Detected');
	}
});
const createTransport = async () => {
	const Transport = await TransportNodeHid.create();
	const CasperApp = new AppCasper(Transport);
	return [CasperApp, Transport];
};

// Get the first Five Accounts Recursively from a specific Index Onwards
// async function getFiveAccounts(startIndex = 0) {
// 	const [CasperApp] = await createTransport();
// 	const arr = [];
// 	for (let i = startIndex; i < startIndex + 5; i++) {
// 		arr.push(
// 			await new Promise((resolve) => {
// 				CasperApp.getAddressAndPubKey(`m/44'/506'/0'/0/${i}`).then((result) => {
// 					const publicKey = Buffer.from(result.publicKey).toString('hex');
// 					resolve({
// 						accountHash: Buffer.from(CLPublicKey.fromHex(publicKey).toAccountHash()).toString(
// 							'hex',
// 						),
// 						publicKey: publicKey,
// 					});
// 				});
// 			}),
// 		);
// 	}

// 	return arr;
// }

// Check the Status of the Device
// async function getAppActiveStatus() {
// 	const [CasperApp, Transport] = await createTransport();
// 	const appInfo = await CasperApp.getAppInfo().catch((err) => null);
// 	const firstAddress = await CasperApp.getAddressAndPubKey("m/44'/506'/0'/0/0");
// 	await Transport.close();

// 	// When Casper App is Active, we get the name Casper
// 	// Inform user to unlock the device and select Casper App. If it is not installed, they should install from Ledger Live
// 	// When the casper app is active, we can get the first account so it can be used to verify that the app is active
// 	return {
// 		isActive: appInfo?.appName.toLowerCase() === 'casper',
// 		isLocked: !firstAddress?.publicKey?.toString('hex'),
// 	};
// }

// const accountHashFromPublicKey = (publicKey) => {
// 	return CLPublicKey.fromSecp256K1(decodeBase16(publicKey))
// 		.toAccountHashStr()
// 		.replace('account-hash-', '');
// };

async function publicToAccountHash() {
	const items = [
		{
			index: 0,
			publicKey: '02a7d95b873327a40fc31c35f77df7fbef6d5066fb862b5906474a108666bd3343',
		},
		{
			index: 1,
			publicKey: '02a188fcf1f3765dd2b4d35007cb1ea455b43d028bea529e7cd88ca3d32a6e45e6',
		},
		{
			index: 2,
			publicKey: '02593d51ed1a7378f88a5dd9b5c63b7010048158c9f28c58950fc8f8ab665cbc01',
		},
		{
			index: 3,
			publicKey: '026fd135f841f60ad3b3cef487bed31f72f2ecaa0b71bb971f6fef810e328967c3',
		},
		{
			index: 4,
			publicKey: '03c6775c936f4ee40b107c95e58f191e25bbafcdfabe7104e017273ad0c3383aa8',
		},
	];

	// CLPublicKey.
	// console.log(CLPublicKey.fromHex(items[0].publicKey).toAccountHashStr());
	// const clPbk = CLPublicKeyTag.SECP256K1
	// console.log(CLPublicKey.fromSecp256K1(decodeBase16(items[0].publicKey)).toAccountHashStr());
	// const [CasperApp] = await createTransport();
	// CasperApp.getAddressAndPubKey(`m/44'/506'/0'/0/4`).then((result) => {
	// 	const pbk = result.publicKey.toString('hex');
	// 	console.log({ publicKey: '02' + pbk, accountHash: accountHashFromPublicKey(pbk) });
	// });
	console.log(CLPublicKey.fromHex('02' + items[0].publicKey).toAccountHashStr());
	// console.log(
	// 	items.map((item) => CLPublicKey.fromSecp256K1(decodeBase16(item.publicKey)).toAccountHashStr()),
	// );
}

function decodeBase16(base16String) {
	return new Uint8Array(Buffer.from(base16String, 'hex'));
}

async function sendUsingLedger(fromPublicKey, ledgerAccountIndex, toPublicKey, amount, network) {
	const { _casperService, casperClient } = getCasperClientAndService(network);

	const amountAsBigNumber = ethers.utils.parseUnits(amount.toString(), 9); // Convert the digit amount to BigNumber

	let networkName = network === 'mainnet' ? 'casper' : 'casper-test';

	// For native-transfers the payment price is fixed
	const paymentAmount = 100000000; // previously 10000000000

	// transfer_id field in the request to tag the transaction and to correlate it to your back-end storage
	const id = 187821;

	// gasPrice for native transfers can be set to 1
	const gasPrice = 1;

	// Time that the deploy will remain valid for, in milliseconds
	// The default value is 1800000 ms (30 minutes)
	const ttl = 1800000;

	const publicKey = CLPublicKey.fromHex(fromPublicKey);

	let deployParams = new DeployUtil.DeployParams(publicKey, networkName, gasPrice, ttl);

	// We create a public key from account-address (it is the hex representation of the public-key with an added prefix)
	const toKey = CLPublicKey.fromHex(toPublicKey);

	const session = DeployUtil.ExecutableDeployItem.newTransfer(amountAsBigNumber, toKey, null, id);

	const payment = DeployUtil.standardPayment(paymentAmount);
	const deploy = DeployUtil.makeDeploy(deployParams, session, payment);

	// To Sign the Deploy, we basically change the signature parameter of the deploy and then send it over.
	//  So...
	const approval = new DeployUtil.Approval();
	const [CasperApp, _Transport] = await createTransport();
	console.log(CasperApp.deviceModel);
	console.log(deploy);
	const path = "m/44'/506'/0'/0/0";
	console.log();
	const getChunks = await CasperApp.signGetChunks(path, Buffer.from(deploy.hash));
	console.log(await CasperApp.signSendChunk(2, 2, getChunks[1]));
	// CasperApp.signSendChunk(1, getChunks.length, getChunks[0])
	// 	.then(async (response) => {
	// 		let result = {
	// 			returnCode: response.returnCode,
	// 			errorMessage: response.errorMessage,
	// 			signatureRSV: null,
	// 		};
	// 		for (let i = 1; i < getChunks.length; i += 1) {
	// 			// eslint-disable-next-line no-await-in-loop
	// 			result = await CasperApp.signSendChunk(1 + i, getChunks.length, getChunks[i]);
	// 			if (result.returnCode !== LedgerError.NoErrors) {
	// 				break;
	// 			}
	// 		}
	// 		console.log(result);
	// 		return result;
	// 	})
	// 	.catch((err) => console.log(err));
	// console.log(await CasperApp.sign("m/44'/506'/0'/0/0", Buffer.from(deploy.header.bodyHash)));

	// console.log(signature);

	// if (!signature || !signature?.error) {
	// 	throw 'Failed to sign transaction. Please make sure your ledger is unlocked and Casper App is Active/Open and try again';
	// }

	// DeployUtil.setSignature(deploy, signature);

	// approval.signature = Keys.Secp256K1.accountHex(signature);

	// deploy.approvals.push(approval);

	// const deployHash = await casperClient.putDeploy(deploy);

	// Return the deploy info using the deployHash
	return await casperClient.getDeploy(deployHash);

	// export const signDeploy = (
	// 	deploy: Deploy,
	// 	signingKey: AsymmetricKey
	//   ): Deploy => {
	// 	const approval = new Approval();
	// 	const signature = signingKey.sign(deploy.hash);
	// 	approval.signer = signingKey.accountHex();
	// 	switch (signingKey.signatureAlgorithm) {
	// 	  case SignatureAlgorithm.Ed25519:
	// 		approval.signature = Keys.Ed25519.accountHex(signature);
	// 		break;
	// 	  case SignatureAlgorithm.Secp256K1:
	// 		approval.signature = Keys.Secp256K1.accountHex(signature);
	// 		break;
	// 	}
	// 	deploy.approvals.push(approval);

	// 	return deploy;
	//   };
}

// publicToAccountHash();

sendUsingLedger(
	'0202a7d95b873327a40fc31c35f77df7fbef6d5066fb862b5906474a108666bd3343',
	0,
	'0202a188fcf1f3765dd2b4d35007cb1ea455b43d028bea529e7cd88ca3d32a6e45e6',
	10,
	'testnet',
)
	.then((res) => console.log(res))
	.catch((err) => console.log(err));
// { returnCode: 28161, errorMessage: 'Unknown Status Code: 28161' } App is not open
// Path Format => m / purpose' / coin_type' / account' / change / address_index => change/chain (0 is external chain, 1 is external chain)
// getFiveAccounts(5)
// 	.then((res) => console.log(res))
// 	.catch((err) => console.log(err));
// getAppActiveStatus()
// 	.then((res) => console.log(res))
// 	.catch((err) => console.log('Errors: ', err));
