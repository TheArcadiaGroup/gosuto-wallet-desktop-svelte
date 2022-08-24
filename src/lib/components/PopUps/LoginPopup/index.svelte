<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import Popup from '$lib/components/Popup.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { selectedWallet, walletToUnlock, wallets } from '$stores/user/wallets';
	import { loadWalletData } from '$utils/dataLoaders';
	import { walletLoaders } from '$stores/dataLoaders';
	import { decryptPassword, saveData } from '$utils/dataStorage';
	import { onMount, onDestroy } from 'svelte';

	export let unlockData: { wallet: IWallet; path: string } | null = null;
	let correctPassword = '';
	let okDisabled = true;
	let userEnteredPassword = '';

	function switchWalletInternal(wallet: IWallet, path: string) {
		try {
			// Check whether wallet is locked yet
			if (
				wallet.lockStatus.isLocked ||
				(wallet.lockStatus.lastUnlocked + wallet.lockStatus.lockTimeout * 1000 < Date.now() &&
					!wallet.lockStatus.isLocked)
			) {
				// Trigger unlock popup
				selectedWallet.set(wallet);
				walletToUnlock.set({ wallet, path });
				return;
			}

			wallet.lockStatus = {
				...wallet.lockStatus,
				isLocked: false,
			};

			walletToUnlock.set(null);
			selectedWallet.set(wallet);

			saveData('selectedWallet', wallet);

			saveData(
				'wallets',
				$wallets.map((_wallet) => {
					if (_wallet.publicKey === wallet.publicKey) {
						return wallet;
					}
					return _wallet;
				}),
			);

			// There's a bug related to this and we don't want to break this until we find the culprit
			if ($page.params.publicKey && $page.params.publicKey !== wallet.publicKey) {
				const newUrl = $page.url.pathname.replace($page.params.publicKey, wallet.publicKey);

				// Only send load request when it is not currently loading
				if (!$walletLoaders[wallet.publicKey]) {
					loadWalletData(wallet.publicKey);
				}

				goto(newUrl);
				return;
			} else if ($page.params.publicKey && $page.params.publicKey === wallet.publicKey) {
				// Only send load request when it is not currently loading
				if (!$walletLoaders[wallet.publicKey]) {
					loadWalletData(wallet.publicKey);
				}
				return;
			}

			// if ($page.url.pathname === '/profile') {
			goto(`/profile/${$selectedWallet?.publicKey}/history`);
			// }

			return;
		} catch (error) {
			console.log(error, path);
			return;
		}
	}

	function isPasswordAccurate(enteredPassword: string) {
		if (correctPassword === enteredPassword) {
			okDisabled = false;
		} else {
			okDisabled = true;
		}

		return !okDisabled;
	}

	function cancelClicked() {
		walletToUnlock.set(null);
		goto('/profile');
		return;
	}

	function okClicked() {
		if (isPasswordAccurate(userEnteredPassword) && unlockData) {
			// Switch Wallet
			unlockData.wallet.lockStatus = {
				...unlockData.wallet.lockStatus,
				isLocked: false,
				lastUnlocked: Date.now(),
			};
			switchWalletInternal(unlockData.wallet, unlockData.path);
			return;
		} else {
			// Navigate to Profiles
			return cancelClicked();
		}
	}

	onMount(() => {
		if (unlockData) {
			if (unlockData?.wallet.walletPassword.isEncrypted) {
				correctPassword = decryptPassword(unlockData?.wallet.walletPassword.password);
			} else {
				correctPassword = unlockData?.wallet.walletPassword.password;
			}
		} else {
			goto('/profile');
			return;
		}
	});

	onDestroy(() => {
		okDisabled = true;
		userEnteredPassword = '';
		correctPassword = '';
		unlockData = null;
	});
</script>

<Popup
	title="Enter wallet password to unlock your {unlockData?.wallet.walletName} wallet"
	on:confirm={okClicked}
	on:cancel={cancelClicked}
	hasCancel={true}
	{okDisabled}
>
	<TextInput
		bind:value={userEnteredPassword}
		on:input={() => isPasswordAccurate(userEnteredPassword)}
		label="Password"
		type="password"
		addTextBg={true}
	/>
</Popup>

<style lang="postcss">
	:local(.wallet-picture-and-name) {
		@apply h-20 w-full;
	}

	:local(.wallet-profile-picture) {
		@apply w-8 h-8 rounded-xl overflow-hidden border border-light-orangeShadeOne;
	}
</style>
