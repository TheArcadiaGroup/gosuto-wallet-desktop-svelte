import { checkLockStatus } from '$utils/profiles';

export default async function functionCallerWithLock(
	wallet: IWallet | null,
	to: string,
	func: (...rest: any) => any,
	...params: any
) {
	const cancel = () => undefined;
	// Any function passing through this must define the wallet otherwise it will fail (must have wallet defined)
	if (checkLockStatus(wallet, to, cancel)) {
		return await func(...params);
	} else {
		throw Error('Panic: Wallet is Locked');
	}
}
