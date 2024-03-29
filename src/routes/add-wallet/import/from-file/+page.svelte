<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import LockIcon from '$icons/LockIcon.svelte';
	import OpenEyeIcon from '$icons/OpenEyeIcon.svelte';

	import GosutoLogoAndText from '$icons/GosutoLogoAndText.svelte';

	import ImportPrivateKey from '$lib/pages/AddWallet/ImportFromFile/ImportPrivateKey.svelte';

	import { goto } from '$app/navigation';
	import { encryptPrvKey, retrieveData, saveData } from '$utils/dataStorage';
	import { walletNameIsValid } from '$utils/profiles';
	import { passwordsAreSimilar, validatePassword } from '$utils/validators/passwordValidation';
	import ClosedEyeIcon from '$icons/ClosedEyeIcon.svelte';
	import pollyfillData from '$utils/pollyfillData';
	import { loadWalletData } from '$utils/dataLoaders';
	import { walletLoaders } from '$stores/dataLoaders';

	let walletName: string;
	let password: string;
	let confirmPassword: string;
	let accountHash: string;
	let accountHex: string;
	let privateKey: string;
	let walletValid = true;
	let certificateIsInvalid = false;
	let walletExists = false;
	let algorithm: 'secp256k1' | 'ed25519' = 'ed25519';

	let passwordInput: HTMLInputElement;
	let confirmPasswordInput: HTMLInputElement;

	let passwordShown = false;
	let confirmPasswordShown = false;

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

	/** function for opening the file and getting data private key or json data */
	const selectFile = () => {
		const data: {
			accountHex: string;
			accountHash: string;
			privateKey: string;
			algorithm: 'secp256k1' | 'ed25519';
		} | null = window.api.sendSync('importWalletFromFile', '');
		try {
			if (data?.accountHex && data?.accountHash && data?.privateKey) {
				const walletCreationResult = data;

				certificateIsInvalid = false;
				const wallets: IWallet[] = retrieveData('wallets') ?? [];

				if (wallets?.find((item) => item.accountHash === walletCreationResult['accountHash'])) {
					walletExists = true;
				} else {
					accountHex = walletCreationResult['accountHex'];
					accountHash = walletCreationResult['accountHash'];
					privateKey = walletCreationResult['privateKey'];
					algorithm = walletCreationResult['algorithm'];
					walletExists = false;
				}

				console.log(walletCreationResult);
			} else if (data) {
				certificateIsInvalid = true;
			}
		} catch (error) {
			console.log(error);
		}
	};

	/** Sends wallet creation data to api route to create a wallet */
	const postData = async () => {
		if (walletName && password && accountHex && accountHash && privateKey) {
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
				algorithm: algorithm,
				publicKey: accountHex.trim(),
				accountHash: accountHash.trim(),
				privateKey: encryptPrvKey(privateKey.trim()),
				lockStatus: {
					lastUnlocked: Date.now(),
					lockTimeout: 300,
					isLocked: false,
				},
			};
			wallets.push(newWallet);

			saveData('wallets', wallets);
			saveData('selectedWallet', newWallet);
			pollyfillData();

			if (!$walletLoaders[accountHex.trim()]) {
				loadWalletData(accountHex.trim());
			}

			goto(`/profile/${accountHex.trim()}`);
		}
	};

	$: passwordErrors = password
		? validatePassword(password).length > 0
			? validatePassword(password).join('<br />')
			: false
		: false;
</script>

<div class="fileImport-wrapper">
	<div class="fileImport-content">
		<GosutoLogoAndText class="gosuto-logo" />
		<h1 class="fileImport-header">Import Wallet From File</h1>

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
				<button type="button" on:click={() => togglePasswordVisibility(passwordInput, 'password')}>
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

		<ImportPrivateKey on:click={selectFile} />
		{#if certificateIsInvalid || walletExists}
			<div class="error-div pt-6 items-center justify-center text-center leading-5">
				{#if certificateIsInvalid}
					Error, the app only supports private keys encrypted using the ED25519 or SECP256K1
					Algorithm
				{/if}
				{#if walletExists}
					Wallet already exists, please import a different private key
				{/if}
			</div>
		{/if}
		{#if !certificateIsInvalid && !walletExists && accountHash && accountHex && privateKey}
			<div class="success-div text-center leading-5">Wallet File Imported</div>
		{/if}
	</div>
	<div class="fileImport-buttons">
		<div class="fileImport-bt next-bt">
			<Button
				isDisabled={!walletValid ||
					!confirmPassword ||
					!password ||
					!passwordsAreSimilar(password, confirmPassword) ||
					Boolean(passwordErrors) ||
					!walletName ||
					walletName?.length > 20 ||
					!accountHash ||
					!accountHex ||
					!privateKey ||
					walletExists}
				on:click={() => postData()}
			>
				<span slot="text" class="fileImport-bt-text">Import</span>
			</Button>
		</div>
		<div class="fileImport-bt">
			<Button
				class="fileImport-cancel-bt"
				isTransparent={true}
				on:click={() => goto('/add-wallet')}
			>
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

	.fileImport-wrapper .gosuto-logo {
		@apply w-36 h-12 md:w-64 md:h-20 3xl:w-80 3xl:h-28 4xl:w-2/3 4xl:h-1/2;
		@apply mb-8 4xl:mb-16;
	}

	.fileImport-content {
		@apply flex flex-col place-items-center;
		@apply place-self-start justify-self-center;
		@apply mt-10 md:mt-20;
		@apply w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/4;
	}

	.fileImport-header {
		@apply text-xl md:text-3xl 3xl:text-4xl 4xl:text-7xl font-display font-bold;
		@apply mb-4 4xl:mb-16;
		@apply text-dark-gray dark:text-white;
	}

	/* .fileImport-input-wrapper {
		@apply mt-5 4xl:mt-10 mb-10 4xl:mb-20;
		@apply w-5/6;
	} */

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

	:local(.error-div) {
		@apply text-left text-xs text-red-300 -mt-2 mb-5 flex w-96 px-2;
	}

	:local(.success-div) {
		@apply text-center text-xs text-green-300 mt-0 mb-5 flex items-center justify-center w-96 px-2;
	}
</style>
