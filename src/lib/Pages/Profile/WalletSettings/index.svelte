<script lang="ts">
	import CopyOrange from '$icons/CopyOrange.svelte';

	import PasswordToCopyPopup from '$lib/components/PopUps/WalletSettings/PasswordToCopyPopup.svelte';
	import PasswordToExportPopup from '$lib/components/PopUps/WalletSettings/PasswordToExportPopup.svelte';
	import WalletCopiedPopup from '$lib/components/PopUps/WalletSettings/WalletCopiedPopup.svelte';
	import ReturnHome from '$lib/components/ReturnHome.svelte';

	import TextInput from '$lib/components/TextInput.svelte';
	import Button from '$lib/components/Button.svelte';

	import { onMount } from 'svelte';
	import { selectedWallet, wallets } from '$stores/user/wallets';
	import pollyfillData, { pollyfillSelectedWallet } from '$utils/pollyfillData';

	import { goto } from '$app/navigation';
	import { retrieveData, saveData } from '$utils/dataStorage';
	import { page } from '$app/stores';
	import { passwordsAreSimilar, validatePassword } from '$utils/validators/passwordValidation';
	import { userHistory } from '$stores/user/history';
	import { user } from '$stores/user';
	import { walletAsPem } from '$utils/exportWallet';

	let walletName = '';
	let privateKey = '';
	let newPassword = '';
	let confirmPassword = '';
	let canSave = false;
	let canChangePassword = false;
	let currentPassword = '';

	let showCopyWalletPasswordPopup: boolean = false;
	let showExportWalletFilePopup: boolean = false;
	let showWalletCopiedPopup: boolean = false;

	let exportWalletPassword = '';
	let copyPrivateKeyPassword = '';

	let wallet: IWallet = $selectedWallet!;

	onMount(() => {
		if (!$selectedWallet) {
			pollyfillData();
			wallet = $selectedWallet!;
		}

		if (!wallet) {
			wallet = pollyfillSelectedWallet();
			if (!wallet) {
				goto('/profile');
			}
		}

		walletName = wallet.walletName;
		privateKey = wallet.privateKey.substring(0, 30);
	});

	let copyToClipboard = (copyText: string) => {
		navigator.clipboard.writeText(copyText);
	};

	let changePassword = () => {
		if (newPassword && newPassword === confirmPassword) {
			wallet.walletPassword = newPassword;
			canChangePassword = false;

			// clear form state
			newPassword = '';
			confirmPassword = '';
			currentPassword = '';

			const storedWallets: IWallet[] = retrieveData('wallets');
			saveData(
				'wallets',
				JSON.stringify(
					storedWallets.map((_wallet) => {
						if (_wallet.publicKey === wallet.publicKey) {
							_wallet = wallet;
						}

						return _wallet;
					}),
				),
			);

			saveData('selectedWallet', JSON.stringify(wallet));
			pollyfillData();
		}
	};

	const updateWalletDetails = () => {
		if (canSave) {
			wallet.walletName = walletName;
			const _wallets = $wallets.map((_wallet) => {
				if (_wallet.publicKey === wallet.publicKey) {
					_wallet = wallet;

					// Update the item everywhere
					const history = retrieveData('history') ?? {};
					if (history?.['mainnet']?.[wallet.publicKey]?.data) {
						history['mainnet'][wallet.publicKey]?.data.map((item: any) => {
							item.walletName = walletName;

							return item;
						});
					}
					if (history?.['testnet']?.[wallet.publicKey]?.data) {
						history['testnet'][wallet.publicKey]?.data.map((item: any) => {
							item.walletName = walletName;

							return item;
						});
					}

					saveData('history', JSON.stringify(history));
					userHistory.set(history[$user?.network ?? 'testnet']);
				}

				return _wallet;
			});

			saveData('wallets', JSON.stringify(_wallets));
			saveData('selectedWallet', JSON.stringify(wallet));
			pollyfillData();
		}
	};

	$: ((walletName) => {
		if (walletName.trim() && walletName.trim() !== wallet.walletName.trim()) {
			canSave = true;
		} else {
			canSave = false;
		}
	})(walletName);

	$: ((newPassword, confirmPassword) => {
		if (
			newPassword.trim() &&
			confirmPassword.trim() &&
			newPassword.trim() === confirmPassword.trim() &&
			newPassword.trim() !== wallet.walletPassword.trim()
		) {
			canChangePassword = true;
		} else {
			canChangePassword = false;
		}
	})(newPassword, confirmPassword);

	$: passwordErrors = newPassword
		? validatePassword(newPassword).length > 0
			? validatePassword(newPassword).join('<br />')
			: false
		: false;
</script>

{#if wallet}
	<div class="main">
		<!-- Popups -->
		{#if showCopyWalletPasswordPopup}
			<PasswordToCopyPopup
				bind:password={copyPrivateKeyPassword}
				okDisabled={copyPrivateKeyPassword !== wallet.walletPassword}
				on:confirm={() => {
					showCopyWalletPasswordPopup = false;
					if (copyPrivateKeyPassword === wallet.walletPassword) {
						copyToClipboard(wallet.privateKey);
						showWalletCopiedPopup = true;
						copyPrivateKeyPassword = '';
					}
				}}
				on:cancel={() => {
					showCopyWalletPasswordPopup = false;
					copyPrivateKeyPassword = '';
				}}
			/>
		{/if}
		{#if showExportWalletFilePopup}
			<PasswordToExportPopup
				bind:password={exportWalletPassword}
				okDisabled={exportWalletPassword !== wallet.walletPassword}
				on:confirm={() => {
					showExportWalletFilePopup = false;
					// TODO: Validate password then export file
					if (exportWalletPassword === wallet.walletPassword) {
						walletAsPem(wallet.walletName, wallet.privateKey, wallet.algorithm);
						exportWalletPassword = '';
					}
				}}
				on:cancel={() => {
					showExportWalletFilePopup = false;
					exportWalletPassword = '';
				}}
			/>
		{/if}
		{#if showWalletCopiedPopup}
			<WalletCopiedPopup
				on:confirm={() => {
					showWalletCopiedPopup = false;
				}}
				on:cancel={() => {
					showWalletCopiedPopup = false;
				}}
			/>
		{/if}

		<div class="settings-holder">
			<div class="header">
				<ReturnHome
					walletName={''}
					publicKey={$page.params.publicKey}
					profileLocation="Wallet Settings"
				/>
				<div class="confirm-button settings-btn">
					<Button
						hasGlow={true}
						on:click={() => {
							showExportWalletFilePopup = true;
						}}
					>
						<p slot="text" class="settings-btn-text">Export Wallet File</p>
					</Button>
				</div>
			</div>
			<TextInput bind:value={walletName} label="Wallet Name" type="text" addTextBg={true} />
			<div class="error-div">
				{#if $wallets?.filter((item) => item.walletName === walletName).length > 0 && wallet.walletName !== walletName}
					Wallet Name Already Exists
				{/if}
				{#if walletName && walletName?.length > 20}
					<br />
					Maximum of 20 Characters Allowed
				{/if}
			</div>
			<br />
			<TextInput
				isDisabled={true}
				bind:value={wallet.publicKey}
				label="Public Key"
				type="text"
				addTextBg={true}
			/>
			<br />
			<div class="private-container">
				<div
					class="img"
					on:click={() => {
						showCopyWalletPasswordPopup = true;
					}}
				>
					<CopyOrange />
				</div>
				<TextInput
					isDisabled={true}
					bind:value={privateKey}
					label="Private Key"
					type="password"
					addTextBg={true}
				/>
			</div>
			<br />
			<h2>Change Password</h2>
			<br />
			<TextInput
				bind:value={currentPassword}
				label="Current Password"
				type="password"
				addTextBg={true}
			/>
			<div class="error-div">
				{#if currentPassword && wallet.walletPassword && !passwordsAreSimilar(currentPassword, wallet.walletPassword)}
					Enter correct wallet password
				{/if}
			</div>
			<br />
			<TextInput bind:value={newPassword} label="New Password" type="password" addTextBg={true} />
			<div class="error-div">
				{#if passwordErrors}
					{@html passwordErrors}
				{/if}
			</div>
			<br />
			<TextInput
				bind:value={confirmPassword}
				label="Re-Enter New Password"
				type="password"
				addTextBg={true}
			/>
			<div class="error-div">
				{#if newPassword && confirmPassword && !passwordsAreSimilar(newPassword, confirmPassword)}
					Passwords do no match
				{/if}
			</div>
			<br />
			<div class="button-holder">
				<div class="settings-btn">
					<Button
						hasGlow={true}
						isDisabled={!canChangePassword ||
							(currentPassword &&
								wallet.walletPassword &&
								!passwordsAreSimilar(currentPassword, wallet.walletPassword)) ||
							($wallets?.filter((item) => item.walletName === walletName) &&
								wallet.walletName !== walletName) ||
							!passwordsAreSimilar(newPassword, confirmPassword)}
						on:click={changePassword}
					>
						<p slot="text" class="settings-btn-text">Change Password</p>
					</Button>
				</div>
			</div>
			<div class="ok-cancel">
				<div class="save-bt" on:click={updateWalletDetails}>
					<Button isDisabled={!canSave || walletName?.length > 20}>
						<p slot="text" class="btn-text">Save</p>
					</Button>
				</div>
				<div class="cancel-bt">
					<Button hasRing={true}>
						<p slot="text" class="btn-text">Cancel</p>
					</Button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="postcss" global>
	:local(.main) {
		@apply w-screen md:w-full min-h-screen flex md:flex-col md:items-center px-4 md:px-0 mt-8 md:mt-0;
	}

	:local(.settings-holder) {
		@apply w-full md:w-[65%];
	}

	:local(.header) {
		@apply flex justify-center items-center h-12 md:my-[8vh] gap-8;
	}

	:local(.cancel-button) {
		@apply text-light-orange bg-transparent;
		@apply border border-light-orange;
	}

	:local(.settings-btn) {
		@apply text-xs md:text-base h-9 md:h-12 min-w-fit;
	}

	:local(.back-btn) {
		@apply flex items-center h-3/4;
	}

	:local(.back-btn) > .img {
		@apply cursor-pointer hidden md:block;
	}

	:local(h1) {
		@apply text-base md:text-xl font-bold md:ml-2;
		@apply dark:text-white;
	}

	:local(.address) {
		@apply flex;
	}

	:local(.address) > p {
		@apply font-normal md:font-medium text-base md:text-xl text-light-gardenText mr-2;
		@apply dark:text-white;
	}

	:local(.address) > .img {
		@apply cursor-pointer;
	}

	:local(h2) {
		@apply font-bold text-base text-light-grey dark:text-white;
	}

	:local(.button-holder) {
		@apply h-12;
	}

	:local(.ok-cancel) {
		@apply flex m-auto md:w-[68%] h-[50px] justify-center md:justify-between;
		@apply my-4 md:my-[4vh] mb-4;
	}

	:local(.left-holder) {
		@apply flex flex-col md:flex-row;
	}

	:local(.private-container) {
		@apply relative;
	}

	:local(.private-container) > .img {
		@apply absolute z-40 transform translate-y-4 right-4 cursor-pointer;
	}

	:local(.left-holder) > .address {
		@apply md:hidden;
	}

	:local(.header) > .address {
		@apply hidden md:flex;
	}

	:local(.save-bt) {
		@apply w-full mr-4 md:mr-0 md:w-2/5 min-w-fit;
	}

	:local(.cancel-bt) {
		@apply w-full md:w-2/5 min-w-fit;
	}

	:local(.btn-text) {
		@apply py-3;
	}

	:local(.settings-btn-text) {
		@apply px-4;
	}

	:local(.button-holder) {
		@apply max-w-[45%] md:max-w-[25%];
	}

	:local(.error-div) {
		@apply text-left text-xs text-red-300 mb-1 flex w-full px-2 mt-2;
	}

	:local(.wallet-name-error-div) {
		@apply -mt-8 mb-6;
	}
</style>
