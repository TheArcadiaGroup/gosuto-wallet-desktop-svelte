<script lang="ts">
	import GosutoLogoAndText from '$icons/GosutoLogoAndText.svelte';
	import Button from '$lib/components/Button.svelte';
	import LockIcon from '$icons/LockIcon.svelte';
	import OpenEyeIcon from '$icons/OpenEyeIcon.svelte';

	import { goto } from '$app/navigation';
	import { walletNameIsValid } from '$utils/profiles';
	import { passwordsAreSimilar, validatePassword } from '$utils/validators/passwordValidation';
	import ClosedEyeIcon from '$icons/ClosedEyeIcon.svelte';
	import {
		isLedgerConnected,
		selectedLedgerAccount,
		ledgerAccounts,
		loadingLedgerAccounts,
	} from '$stores/ledger';
	import ErrorIcon from '$icons/ErrorIcon.svelte';
	import { onMount } from 'svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { retrieveData, saveData } from '$utils/dataStorage';
	import { wallets } from '$stores/user/wallets';
	import pollyfillData from '$utils/pollyfillData';
	import { loadWalletData } from '$utils/dataLoaders';
	import { walletLoaders } from '$stores/dataLoaders';
	import { user } from '$stores/user';
	import _ from 'lodash-es';

	let walletName: string;
	let password: string;
	let confirmPassword: string;
	let walletValid = true;
	let walletExists = false;

	let savingWallet = false;

	let step = 1;

	let passwordInput: HTMLInputElement;
	let confirmPasswordInput: HTMLInputElement;

	let passwordShown = false;
	let confirmPasswordShown = false;

	function goBack() {
		if (step === 3) {
			if (!$ledgerAccounts || $ledgerAccounts.length <= 0) {
				step = 1;
			} else {
				selectedLedgerAccount.set(null);
				step = 2;
			}
		} else if (step === 2) {
			step = 1;
			if (!$ledgerAccounts || $ledgerAccounts.length <= 0) {
				loadMoreAddresses();
			}
		} else {
			return goto('/add-wallet');
		}
	}

	function performAction() {
		if (step === 3) {
			// Add Public key to wallets and navigate to profile
			// Clear Wallet Addresses after since user might use another ledger device later
			return postData();
		} else if (step === 2) {
			// Go to Next Step as Wallets are Loaded in the First Step's Successful Completion
			if (!$ledgerAccounts || $ledgerAccounts.length <= 0 || !$selectedLedgerAccount) {
				step = 1;
				loadingLedgerAccounts.set(true);
				window.api.send(
					'ledger',
					JSON.stringify({
						action: 'AppStatus',
						nextAction: 'FiveAccounts',
						network: $user?.network ?? 'testnet',
						fromIndex: $ledgerAccounts && $ledgerAccounts.length > 0 ? $ledgerAccounts.length : 0,
					}),
				);
			} else {
				step = 3;
			}
		} else {
			if (!$ledgerAccounts || $ledgerAccounts.length <= 0) {
				// Connect to Ledger
				loadingLedgerAccounts.set(true);

				window.api.send(
					'ledger',
					JSON.stringify({
						action: 'AppStatus',
						nextAction: 'FiveAccounts',
						network: $user?.network ?? 'testnet',
					}),
				);
			} else {
				if ($ledgerAccounts?.length > 0) {
					step = 2;
				}
			}
		}
	}

	function loadMoreAddresses() {
		loadingLedgerAccounts.set(true);

		window.api.send(
			'ledger',
			JSON.stringify({
				action: 'FiveAccounts',
				fromIndex: $ledgerAccounts && $ledgerAccounts.length > 0 ? $ledgerAccounts.length : 0,
				network: $user?.network ?? 'testnet',
			}),
		);
	}

	/**
	 * @function
	 * A function to toggle whether password in the input field is visible or hidden
	 */
	const togglePasswordVisibility = (
		inputElement: HTMLInputElement,
		whichPassword: 'confirmPassword' | 'password',
	) => {
		if (inputElement.type === 'text') {
			inputElement.type = 'password';
			if (whichPassword === 'confirmPassword') {
				confirmPasswordShown = false;
			} else if (whichPassword === 'password') {
				passwordShown = false;
			}
		} else {
			inputElement.type = 'text';
			if (whichPassword === 'confirmPassword') {
				confirmPasswordShown = true;
			} else if (whichPassword === 'password') {
				passwordShown = true;
			}
		}
	};

	/** Sends wallet creation data to api route to create a wallet */
	const postData = async () => {
		savingWallet = true;
		if (
			walletName &&
			password &&
			$selectedLedgerAccount?.publicKey &&
			$selectedLedgerAccount?.accountHash
		) {
			let wallets: IWallet[] = retrieveData('wallets') || [];

			const newWallet: IWallet = {
				walletName: walletName.trim(),
				walletPassword: { password: password.trim(), isEncrypted: false },
				walletImage: '',
				seedPhrase: [],
				availableBalanceUSD: {
					mainnet: 0.0,
					testnet: 0.0,
				},
				availableBalance: {
					mainnet: 0.0,
					testnet: 0.0,
				},
				stakedBalance: {
					mainnet: 0.0,
					testnet: 0.0,
				},
				stakingRewards: {
					mainnet: 0.0,
					testnet: 0.0,
				},
				unclaimedRewards: {
					mainnet: 0.0,
					testnet: 0.0,
				},
				walletTokens: {
					mainnet: [],
					testnet: [],
				},
				walletStakes: {
					mainnet: [],
					testnet: [],
				},
				ledgerIndex: $selectedLedgerAccount.index,
				algorithm: 'secp256k1',
				publicKey: $selectedLedgerAccount.publicKey.trim(),
				privateKey: $selectedLedgerAccount.index.toString(),
				accountHash: $selectedLedgerAccount.accountHash.trim(),
				lockStatus: {
					lastUnlocked: Date.now(),
					lockTimeout: 300,
					isLocked: false,
				},
			};
			wallets.push(newWallet);
			console.log(wallets);

			saveData('wallets', wallets);
			saveData('selectedWallet', newWallet);
			pollyfillData();

			if (!$walletLoaders[$selectedLedgerAccount.publicKey.trim()]) {
				loadWalletData($selectedLedgerAccount.publicKey.trim());
			}

			goto(`/profile/${$selectedLedgerAccount.publicKey.trim()}`);
		}
		savingWallet = false;
	};

	onMount(() => {
		// Check for the ledger connection and fetch accounts, if not possible, just take user to step 1, if possible, take them to two

		if ($ledgerAccounts && $ledgerAccounts.length > 0) {
			step = 2;
			ledgerAccounts.set(_.uniqBy($ledgerAccounts, 'publicKey'));
		} else if (!$ledgerAccounts || $ledgerAccounts?.length <= 0) {
			window.api.send(
				'ledger',
				JSON.stringify({
					action: 'AppStatus',
					nextAction: 'FiveAccounts',
					network: $user?.network ?? 'testnet',
					fromIndex: $ledgerAccounts && $ledgerAccounts.length > 0 ? $ledgerAccounts.length : 0,
				}),
			);
		}
	});

	$: passwordErrors = password
		? validatePassword(password).length > 0
			? validatePassword(password).join('<br />')
			: false
		: false;

	isLedgerConnected.subscribe((connected) => {
		runChecker(connected, $ledgerAccounts, $selectedLedgerAccount);
	});

	ledgerAccounts.subscribe((accounts) => {
		if (accounts && accounts.length > 0) {
			loadingLedgerAccounts.set(false);
		}
		runChecker($isLedgerConnected, accounts, $selectedLedgerAccount);
	});

	loadingLedgerAccounts.subscribe((loading) => console.log(loading));

	selectedLedgerAccount.subscribe((selectedAcc) => {
		const localWallets: IWallet[] = $wallets ?? retrieveData('wallets') ?? [];
		if (
			localWallets.some(
				(item) => item.publicKey.toLowerCase() === selectedAcc?.publicKey.toLowerCase(),
			)
		) {
			walletExists = true;
		} else {
			walletExists = false;
		}

		runChecker($isLedgerConnected, $ledgerAccounts, selectedAcc);
	});

	function runChecker(
		isConnected: boolean,
		ledgerAccounts:
			| { index: number; publicKey: string; accountHash: string; balance: number }[]
			| null,
		selectedLedgerAcc: {
			index: number;
			publicKey: string;
			accountHash: string;
			balance: number;
		} | null,
	) {
		if (isConnected && (ledgerAccounts?.length ?? 0) > 0) {
			step = selectedLedgerAcc ? 3 : 2;
		} else {
			step = 1;
		}
	}
</script>

<div class="fileImport-wrapper">
	<div class="fileImport-content">
		<GosutoLogoAndText class="gosuto-logo" />

		{#if step === 3}
			<!-- Must be step 3 - Set Wallet Name and Password -->
			<h1 class="fileImport-header">Import Wallet From Ledger</h1>
			<h5 class="subtext">Set Wallet Name and Password</h5>
			<div class="fileImport-input-wrapper">
				<label class="fileImport-label" for="name">Wallet Name</label>

				<input
					name="name"
					id="name"
					type="text"
					class="fileImport-details-input"
					bind:value={walletName}
					on:input={() => {
						walletValid = walletNameIsValid(walletName);
					}}
				/>
			</div>

			{#if !walletValid || (walletName && walletName?.length > 20)}
				<div class="error-div">
					{#if !walletValid}
						Wallet Name Already Exists
					{/if}
					{#if walletName && walletName?.length > 20}
						Maximum of 20 Characters Allowed
					{/if}
				</div>
			{/if}

			<div class="fileImport-input-wrapper">
				<label class="fileImport-label" for="name">New Password</label>
				<div class="fileImport-password-input-wrapper">
					<span class="w-6 h-6">
						<LockIcon />
					</span>
					<input
						name="password"
						id="password"
						type="password"
						placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
						class="fileImport-details-input"
						bind:value={password}
						bind:this={passwordInput}
					/>
					<button
						type="button"
						on:click={() => togglePasswordVisibility(passwordInput, 'password')}
					>
						{#if passwordShown}
							<ClosedEyeIcon class="createWallet-eye-icon" />
						{:else}
							<OpenEyeIcon class="createWallet-eye-icon" />
						{/if}
					</button>
				</div>
			</div>
			{#if passwordErrors}
				<div class="error-div">
					{@html passwordErrors}
				</div>
			{/if}

			<div class="fileImport-input-wrapper">
				<label class="fileImport-label" for="name">Confirm Password</label>
				<div class="fileImport-password-input-wrapper">
					<span class="w-6 h-6">
						<LockIcon />
					</span>
					<input
						name="confirm-password"
						id="confirm-password"
						type="password"
						placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
						class="fileImport-details-input"
						bind:value={confirmPassword}
						bind:this={confirmPasswordInput}
					/>
					<button
						type="button"
						on:click={() => togglePasswordVisibility(confirmPasswordInput, 'confirmPassword')}
					>
						{#if confirmPasswordShown}
							<ClosedEyeIcon class="createWallet-eye-icon" />
						{:else}
							<OpenEyeIcon class="createWallet-eye-icon" />
						{/if}
					</button>
				</div>
			</div>
			{#if password && confirmPassword && !passwordsAreSimilar(password, confirmPassword)}
				<div class="error-div">Passwords do no match</div>
			{/if}
		{:else if step === 2}
			<!-- Must be step 1 Connecting to Ledger Device and Selecting Account - Ledger Must be Connected by this point -->
			<h1 class="fileImport-header">Select Account</h1>

			{#if $ledgerAccounts}
				<div
					class="grid grid-cols-3 gap-2 w-full overflow-y-scroll text-dark-gray dark:text-white z-10 px-3"
					style="max-height: 45vh;"
				>
					{#each $ledgerAccounts as account}
						{#if account}
							<button
								class="rounded-xl border border-light-grayShadeOne hover:bg-light-lighterOrange hover:border-light-lighterOrange hover:bg-opacity-50 cursor-pointer px-3 py-2 overflow-clip text-sm
							flex flex-col items-start justify-evenly space-y-2 disabled:cursor-not-allowed"
								class:cursor-not-allowed={account.exists}
								class:bg-light-lighterOrange={account.exists}
								class:border-light-lighterOrange={account.exists}
								class:bg-opacity-50={account.exists}
								on:click={() => !account.exists && selectedLedgerAccount.set(account)}
								disabled={account.exists}
								title={account.publicKey}
							>
								<div class="overflow-clip w-full flex flex-col items-start">
									<div class="text-xs text-light-grayShadeOne">Public Key</div>
									<div>
										{account.publicKey}
									</div>
								</div>
								<div class="w-full flex flex-col items-start">
									<div class="text-xs text-light-grayShadeOne">Balance</div>
									<div class="balance">
										{account.balance} CSPR
									</div>
								</div>
							</button>
						{/if}
					{/each}
				</div>
			{/if}
			<button
				class="text-light-lighterOrange mt-10 -mb-16 text-left hover:border hover:border-light-lighterOrange px-4 py-2 transition-all rounded-full font-bold
				disabled:bg-opacity-50 z-50"
				on:click={loadMoreAddresses}
				disabled={$loadingLedgerAccounts}
			>
				Load More Addresses
				{#if $loadingLedgerAccounts}
					<Loading size={30} useFirework={false} />
				{/if}
			</button>
		{:else if step === 1}
			<h1 class="fileImport-header w-10/12 text-center">Connect & Unlock your Ledger</h1>

			<div class="text-dark-gray dark:text-white text-base my-10 w-10/12">
				Please open the Casper App on your Ledger device and follow the on-screen instructions to
				add this account.
				<div class="mt-8 text-xs text-light-gray">
					<span class="font-bold text-error-red">Notice:</span>
					If the Casper App on your Ledger device is closing automatically make sure to close the Ledger
					Live application on your desktop computer. This is a known issue of Ledger Software.
				</div>
			</div>
		{/if}
	</div>

	<div class="fileImport-buttons">
		{#if !$isLedgerConnected && !$loadingLedgerAccounts}
			<div class="text-left text-xs text-red-300 -mt-2 mb-5 flex px-2 items-center justify-center">
				<ErrorIcon class="mr-1" fill="#e6332a" />
				You must open the Casper app on your Ledger device to connect.
			</div>
		{/if}
		<div class="fileImport-bt next-bt">
			{#if step === 3}
				<Button
					on:click={performAction}
					isDisabled={!$selectedLedgerAccount ||
						!walletValid ||
						!confirmPassword ||
						!password ||
						!passwordsAreSimilar(password, confirmPassword) ||
						Boolean(passwordErrors) ||
						!walletName ||
						walletName?.length > 20 ||
						walletExists}
					class="relative"
				>
					<div slot="text" class="fileImport-bt-text">Import</div>
					{#if savingWallet}
						<Loading size={30} useFirework={false} color="white" class="absolute -right-1/3" />
					{/if}
				</Button>
			{:else if step !== 2}
				<Button isDisabled={$loadingLedgerAccounts} on:click={performAction} class="relative">
					<span slot="text" class="fileImport-bt-text">
						{#if $loadingLedgerAccounts}
							Fetching Accounts
						{:else}
							Connect Ledger
						{/if}
					</span>
					{#if $loadingLedgerAccounts}
						<Loading size={30} useFirework={false} color="white" class="absolute -right-1/3" />
					{/if}
				</Button>
			{/if}
		</div>
		<div class="fileImport-bt">
			<Button class="fileImport-cancel-bt" isTransparent={true} on:click={goBack}>
				<span slot="text" class="addWallet-bt-text">Back</span>
			</Button>
		</div>
	</div>
</div>

<style type="postcss" global>
	.fileImport-wrapper {
		@apply absolute inset-0 overflow-auto;
		@apply grid place-items-center;
		@apply bg-white dark:bg-dark-gosutoDark;
	}

	:local(.fileImport-wrapper .gosuto-logo) {
		@apply w-36 h-12 md:w-64 md:h-20 3xl:w-80 3xl:h-28 4xl:w-2/3 4xl:h-1/2;
		@apply mb-8 4xl:mb-16 max-w-[25%];
	}

	:local(.fileImport-content) {
		@apply flex flex-col place-items-center;
		@apply place-self-start justify-self-center;
		@apply mt-10 md:mt-20;
		@apply w-11/12 sm:w-[80%] md:w-3/4 lg:w-4/5 xl:w-1/2;
	}

	:local(.fileImport-header) {
		@apply text-xl md:text-3xl 3xl:text-4xl 4xl:text-6xl font-display font-bold;
		@apply mb-4 4xl:mb-16 mt-2;
		@apply text-dark-gray dark:text-white;
	}

	.fileImport-buttons {
		@apply flex flex-col items-center justify-items-end;
		@apply w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/4;
		@apply mt-3;
		@apply mb-1;
	}

	.fileImport-bt {
		@apply w-11/12 max-w-2xl h-12 4xl:h-28;
		@apply rounded-3xl my-2;
	}

	.fileImport-bt:disabled {
		@apply opacity-50;
	}

	.fileImport-cancel-bt {
		/* @apply mb-5; */
	}

	.fileImport-bt-text {
		@apply text-base md:text-lg 3xl:text-2xl 4xl:text-5xl font-display font-bold;
	}

	.fileImport-cancel-bt-text {
		@apply text-dark-gray dark:text-white;
	}

	.fileImport-form-inputs {
		@apply flex flex-col md:flex-row gap-y-8 gap-x-16;
	}

	.fileImport-input-wrapper {
		@apply relative items-center w-96  border border-black border-opacity-10 dark:border-white dark:border-opacity-40 rounded-2xl h-16 flex mt-3 mb-4;
	}

	.fileImport-label {
		@apply absolute -top-2 left-5 -mt-px inline-block px-1 text-xs font-medium text-light-grey bg-white dark:text-white dark:bg-dark-background;
	}

	.fileImport-details-input {
		@apply w-full h-full bg-transparent px-7 py-3 border-0 resize-none focus:ring-0 sm:text-sm text-opacity-40 text-black dark:text-white;
	}

	.fileImport-password-input-wrapper {
		@apply w-full flex items-center px-5 text-opacity-40 text-black dark:text-white dark:text-opacity-40 h-14;
	}

	:local(.subtext) {
		@apply text-sm text-white my-2 text-left w-10/12;
	}

	:local(.error-div) {
		@apply text-left text-xs text-red-300 -mt-2 mb-5 flex w-96 px-2;
	}
	/* 
	:local(.success-div) {
		@apply text-center text-xs text-green-300 mt-0 mb-5 flex items-center justify-center w-96 px-2;
	} */
</style>
