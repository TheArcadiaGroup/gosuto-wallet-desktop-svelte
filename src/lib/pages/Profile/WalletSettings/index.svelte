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
	import _ from 'lodash-es';
	import {
		decryptPassword,
		decryptPrvKey,
		encryptPassword,
		retrieveData,
		saveData,
	} from '$utils/dataStorage';
	import { page } from '$app/stores';
	import { passwordsAreSimilar, validatePassword } from '$utils/validators/passwordValidation';
	import { userHistory } from '$stores/user/history';
	import { walletAsPem } from '$utils/exportWallet';
	import LockDurationSelector from '$lib/components/LockDurationSelector.svelte';
	import PasswordToRemoveWalletPopup from '$lib/components/PopUps/WalletSettings/PasswordToRemoveWalletPopup.svelte';

	let walletName = '';
	let unlockDuration = 300;
	let privateKey: string | null = null;
	let newPassword = '';
	let confirmPassword = '';
	let canSave = false;
	let canChangePassword = false;
	let currentPassword = '';
	let walletCurrentPassword = ''; // current wallet password loaded before hand

	let showCopyWalletPasswordPopup: boolean = false;
	let showExportWalletFilePopup: boolean = false;
	let showRemoveWalletPopup: boolean = false;
	let showWalletCopiedPopup: boolean = false;

	let exportWalletPassword = '';
	let removeWalletPassword = '';
	let copyPrivateKeyPassword = '';

	$: allWalletNames = $wallets.map((wallet) => wallet.walletName);

	let wallet = $selectedWallet;

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
		unlockDuration = wallet.lockStatus.lockTimeout;
		privateKey =
			isNaN(wallet.ledgerIndex ?? 0.1) && !wallet.privateKey
				? null
				: wallet.privateKey?.substring(0, 30) ?? null;
		walletCurrentPassword = wallet.walletPassword.isEncrypted
			? decryptPassword(wallet.walletPassword.password).trim()
			: wallet.walletPassword.password.trim();
	});

	let copyToClipboard = (copyText: string) => {
		navigator.clipboard.writeText(copyText);
	};

	let changePassword = () => {
		if (wallet && newPassword && newPassword === confirmPassword) {
			wallet.walletPassword = { password: encryptPassword(newPassword), isEncrypted: true };

			canChangePassword = false;

			// clear form state
			newPassword = '';
			confirmPassword = '';
			currentPassword = '';

			const storedWallets: IWallet[] = retrieveData('wallets');
			saveData(
				'wallets',
				storedWallets.map((_wallet) => {
					if (wallet && _wallet.publicKey === wallet.publicKey) {
						_wallet = wallet;
					}

					return _wallet;
				}),
			);

			saveData('selectedWallet', wallet);
			pollyfillData();
		}
	};

	const updateWalletDetails = () => {
		if (canSave && wallet) {
			wallet.walletName = walletName;
			wallet.lockStatus = {
				...wallet.lockStatus,
				lockTimeout: unlockDuration as 300 | 600 | 900 | 1800 | 3600,
			};

			const _wallets = $wallets.map((_wallet) => {
				if (_wallet.publicKey === wallet?.publicKey) {
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

					saveData('history', history);
					userHistory.set(history);
				}

				return _wallet;
			});

			saveData('wallets', _wallets);
			saveData('selectedWallet', wallet);
			pollyfillData();
		}
	};

	const goBackToProfile = () => {
		goto('/profile/' + $page.params.publicKey);
	};

	const removeWallet = () => {
		if (wallet) {
			const _wallets = $wallets.filter((_wallet) => _wallet.walletName !== wallet?.walletName);
			if (wallet.publicKey === $selectedWallet?.walletName) {
				selectedWallet.set(null);
			}
			saveData('wallets', _wallets);
			saveData('selectedWallet', null);

			pollyfillData();

			goto('/profile');
		}
	};

	$: walletNameIsDuplicate =
		walletName.trim() &&
		allWalletNames.some((name) => name.trim() === walletName.trim()) &&
		wallet?.walletName !== walletName;

	$: ((walletName, unlockDuration) => {
		if (
			((walletName.trim() && walletName.trim() !== wallet?.walletName.trim()) ||
				unlockDuration !== wallet?.lockStatus.lockTimeout) &&
			!walletNameIsDuplicate &&
			walletName.trim().length < 20
		) {
			canSave = true;
		} else {
			canSave = false;
		}
	})(walletName, unlockDuration);

	$: ((newPassword, confirmPassword) => {
		if (
			newPassword.trim() &&
			confirmPassword.trim() &&
			newPassword.trim() === confirmPassword.trim() &&
			newPassword.trim() !== walletCurrentPassword.trim()
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
				okDisabled={copyPrivateKeyPassword !== walletCurrentPassword}
				on:confirm={() => {
					showCopyWalletPasswordPopup = false;
					if (wallet && copyPrivateKeyPassword === walletCurrentPassword && wallet.privateKey) {
						copyToClipboard(decryptPrvKey(wallet.privateKey));
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
				okDisabled={exportWalletPassword !== walletCurrentPassword}
				on:confirm={() => {
					showExportWalletFilePopup = false;
					// TODO: Validate password then export file
					if (wallet && exportWalletPassword === walletCurrentPassword && wallet.privateKey) {
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
		{#if showRemoveWalletPopup}
			<PasswordToRemoveWalletPopup
				bind:password={removeWalletPassword}
				okDisabled={removeWalletPassword !== walletCurrentPassword}
				on:confirm={() => {
					showRemoveWalletPopup = false;
					// TODO: Validate password then export file
					if (removeWalletPassword === walletCurrentPassword) {
						removeWallet();
						removeWalletPassword = '';
					}
				}}
				on:cancel={() => {
					showRemoveWalletPopup = false;
					removeWalletPassword = '';
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
							showRemoveWalletPopup = true;
						}}
					>
						<p slot="text" class="settings-btn-text">Remove Wallet</p>
					</Button>

					{#if !_.isNumber(wallet.ledgerIndex)}
						<Button
							hasGlow={true}
							on:click={() => {
								showExportWalletFilePopup = true;
							}}
						>
							<p slot="text" class="settings-btn-text">Export Wallet</p>
						</Button>
					{/if}
				</div>
			</div>
			<TextInput
				bind:value={walletName}
				class="gosuto-dark"
				label="Wallet Name"
				type="text"
				addTextBg={true}
			/>
			<div class="error-div">
				{#if walletNameIsDuplicate}
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
				class="gosuto-dark"
				label="Public Key"
				type="text"
				addTextBg={true}
			/>
			<br />
			{#if privateKey && !_.isNumber(wallet.ledgerIndex)}
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
						class="gosuto-dark"
						label="Private Key"
						type="password"
						addTextBg={true}
					/>
				</div>
				<br />
			{/if}
			<h2>Change Password</h2>
			<br />
			<TextInput
				bind:value={currentPassword}
				label="Current Password"
				class="gosuto-dark"
				type="password"
				addTextBg={true}
			/>
			<div class="error-div">
				{#if currentPassword && walletCurrentPassword && !passwordsAreSimilar(currentPassword, walletCurrentPassword)}
					Enter correct wallet password
				{/if}
			</div>
			<br />
			<TextInput
				bind:value={newPassword}
				class="gosuto-dark"
				label="New Password"
				type="password"
				addTextBg={true}
			/>
			<div class="error-div">
				{#if passwordErrors}
					{@html passwordErrors}
				{/if}
			</div>
			<div class="error-div">
				{#if newPassword && walletCurrentPassword && passwordsAreSimilar(newPassword, walletCurrentPassword)}
					For security reasons, please Enter a different password from your previous one.
				{/if}
			</div>
			<br />
			<TextInput
				bind:value={confirmPassword}
				label="Re-Enter New Password"
				class="gosuto-dark"
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
								walletCurrentPassword &&
								!passwordsAreSimilar(currentPassword, walletCurrentPassword)) ||
							($wallets?.filter((item) => item.walletName === walletName) &&
								wallet.walletName !== walletName) ||
							!passwordsAreSimilar(newPassword, confirmPassword)}
						on:click={changePassword}
					>
						<p slot="text" class="settings-btn-text">Change Password</p>
					</Button>
				</div>
			</div>
			<br />
			<div class="flex justify-between relative">
				<h2>Lock Wallet After:</h2>
				<div>
					<LockDurationSelector bind:selectedDuration={unlockDuration} />
				</div>
			</div>
			<br />
			<div class="ok-cancel">
				<div class="save-bt" on:click={updateWalletDetails}>
					<Button isDisabled={!canSave}>
						<p slot="text" class="btn-text">Save</p>
					</Button>
				</div>
				<div class="cancel-bt">
					<Button hasRing={true} on:click={goBackToProfile}>
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
		@apply flex justify-between items-center h-12 md:my-[8vh] gap-8 pl-6;
	}

	:local(.cancel-button) {
		@apply text-light-orange bg-transparent;
		@apply border border-light-orange;
	}

	:local(.settings-btn) {
		@apply text-xs h-9 md:h-12 min-w-fit flex gap-x-1;
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
