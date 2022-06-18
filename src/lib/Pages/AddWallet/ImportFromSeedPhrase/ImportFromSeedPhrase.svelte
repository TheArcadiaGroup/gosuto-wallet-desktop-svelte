<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	import EyeIcon from '$icons/EyeIcon.svelte';
	import GosutoLogoAndText from '$icons/GosutoLogoAndText.svelte';
	import LockIcon from '$icons/LockIcon.svelte';

	import { goto } from '$app/navigation';
	import { encryptPassword, encryptPrvKey, retrieveData, saveData } from '$utils/dataStorage';
	import { walletNameIsValid } from '$utils/profiles';
	import { passwordsAreSimilar, validatePassword } from '$utils/validators/passwordValidation';

	let seedPhrase: string;
	let walletName: string;
	let password: string;
	let confirmPassword: string;
	let passwordInput: HTMLInputElement;
	let confirmPasswordInput: HTMLInputElement;
	let accountHash: string;
	let accountHex: string;
	let privateKey: string;
	let walletValid = true;
	let walletExists = false;
	let algorithm: 'secp256k1' | 'ed25519' = 'ed25519';

	/**
	 * @function
	 * A function to toggle whether is password in the input field is visible or hidden
	 */
	const togglePasswordVisibility = (inputElement: HTMLInputElement) => {
		if (inputElement.type === 'text') {
			inputElement.type = 'password';
		} else {
			inputElement.type = 'text';
		}
	};

	/**
	 * @function
	 * A function that handles pasting the seed phrase from the clipboard
	 */
	const paste = async () => {
		if (navigator.clipboard) {
			seedPhrase = await navigator.clipboard.readText();
		}
	};

	/** Sends wallet creation data to api route to create a wallet*/
	const postData = async () => {
		if (walletName && accountHash && accountHex && password && privateKey && algorithm) {
			let wallets: IWallet[] = retrieveData('wallets') || [];

			wallets.push({
				walletName: walletName.trim(),
				walletPassword: encryptPassword(password.trim()),
				walletImage: '',
				seedPhrase: seedPhrase.trim().split(' '),
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
				algorithm,
				// walletHistory: [],
				publicKey: accountHex.trim(),
				accountHash: accountHash.trim(),
				privateKey: encryptPrvKey(privateKey.trim()),
			});

			saveData('wallets', wallets);
			goto(`/profile/${accountHex.trim()}`);
		} else {
			goto('/add-wallet/import/from-seed-phrase');
		}
	};

	const confirmAndSendMnemonics = () => {
		const data: {
			accountHex: string;
			accountHash: string;
			privateKey: string;
			algorithm: 'secp256k1' | 'ed25519';
		} = window.api.sendSync('createWalletFromMnemonics', seedPhrase);
		try {
			if (data?.accountHex && data?.accountHash && data?.privateKey) {
				const walletCreationResult = data;

				const wallets: IWallet[] = retrieveData('wallets') ?? [];

				if (wallets?.find((item) => item.accountHash === walletCreationResult['accountHash'])) {
					walletExists = true;
				} else {
					console.log(walletCreationResult);
					accountHex = walletCreationResult['accountHex'];
					accountHash = walletCreationResult['accountHash'];
					privateKey = walletCreationResult['privateKey'];
					algorithm = walletCreationResult['algorithm'];
					walletExists = false;
					postData();
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	$: passwordErrors = password
		? validatePassword(password).length > 0
			? validatePassword(password).join('<br />')
			: false
		: false;
</script>

<div class="seedImport-wrapper">
	<div class="seedImport-logo-gosuto">
		<GosutoLogoAndText />
	</div>
	<h1 class="seedImport-page-heading">Import your wallet</h1>
	<div class="seedImport-instructions">
		<p>Import from seed phrase:</p>
		<ul class="seedImport-instruction-list">
			<li>Enter your seed phrase with a space between each word.</li>
			<li>Setup a password for this specific instance of Gosuto.</li>
		</ul>
	</div>
	<div class="seedImport-form-wrapper">
		<div class="form">
			<div class="seedImport-form-inputs">
				<div class="h-56 px-3 py-2 seedImport-input-wrapper">
					<label class="seedImport-label" for="name">Seed Phrase</label>
					<textarea
						rows="3"
						name="seedPhrase"
						id="seedPhrase"
						class="seedImport-seedphrase"
						bind:value={seedPhrase}
					/>
					<button type="button" on:click={paste} class="seedImport-btn-paste">Paste</button>
					<div class="error-div">
						{#if seedPhrase && seedPhrase.split(' ').length < 12}
							You seed phrase must have at least 12 words
						{/if}
					</div>
				</div>
				<div class="seedImport-details-wrapper">
					<div class="hidden h-16 seedImport-input-wrapper sm:flex">
						<label class="seedImport-label" for="name">Wallet Name</label>

						<input
							name="name"
							id="name"
							type="text"
							class="seedImport-details-input"
							bind:value={walletName}
							on:input={() => {
								walletValid = walletNameIsValid(walletName);
							}}
						/>
					</div>
					<div class="error-div">
						{#if !walletValid}
							Wallet Name Already Exists
						{/if}
						{#if walletName && walletName?.length > 20}
							<br />
							Maximum of 20 Characters Allowed
						{/if}
					</div>

					<div class="flex h-16 seedImport-input-wrapper">
						<label class="seedImport-label" for="name">New Password</label>
						<div class="seedImport-password-input-wrapper">
							<span class="w-6 h-6">
								<LockIcon />
							</span>
							<input
								name="password"
								id="password"
								type="password"
								placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
								class="seedImport-details-input"
								bind:value={password}
								bind:this={passwordInput}
							/>
							<button type="button" on:click={() => togglePasswordVisibility(passwordInput)}>
								<span class="w-6 h-6">
									<EyeIcon />
								</span>
							</button>
						</div>
					</div>
					<div class="error-div">
						{#if passwordErrors}
							{@html passwordErrors}
						{/if}
					</div>

					<div class="flex h-16 seedImport-input-wrapper">
						<label class="seedImport-label" for="name">Confirm Password</label>
						<div class="seedImport-password-input-wrapper">
							<span class="w-6 h-6">
								<LockIcon />
							</span>
							<input
								name="confirm-password"
								id="confirm-password"
								type="password"
								placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
								class="seedImport-details-input"
								bind:value={confirmPassword}
								bind:this={confirmPasswordInput}
							/>
							<button type="button" on:click={() => togglePasswordVisibility(confirmPasswordInput)}>
								<span class="w-6 h-6">
									<EyeIcon />
								</span>
							</button>
						</div>
					</div>
					<div class="error-div">
						{#if password && confirmPassword && !passwordsAreSimilar(password, confirmPassword)}
							Passwords do no match
						{/if}
					</div>
					<div class="error-div">
						{#if walletExists}
							Wallet already exists, please import a different seed phrase
						{/if}
					</div>
				</div>
			</div>
			<div class="seedImport-btns">
				<Button
					isDisabled={!walletValid ||
						!confirmPassword ||
						!password ||
						!passwordsAreSimilar(password, confirmPassword) ||
						Boolean(passwordErrors) ||
						!seedPhrase ||
						!walletName ||
						seedPhrase.split(' ').length < 12}
					on:click={() => confirmAndSendMnemonics()}
				>
					<div slot="text">
						<span class="hidden sm:block">Import</span>
						<span class="block sm:hidden">Import</span>
					</div>
				</Button>
			</div>
			<div class="seedImport-btns">
				<Button
					class="seedImport-btn-back"
					isTransparent={true}
					on:click={() => goto('/add-wallet')}
				>
					<span slot="text" class="addWallet-bt-text">Back</span>
				</Button>
			</div>
		</div>
	</div>
</div>

<style lang="postcss" global>
	.seedImport-wrapper {
		@apply font-display dark:bg-dark-background flex items-center justify-center flex-col px-3;
	}

	.seedImport-logo-gosuto {
		@apply mt-5 md:mt-10 2xl:mt-32;
	}

	.seedImport-page-heading {
		@apply mt-5 2xl:mt-9 text-light-grey dark:text-white text-center font-bold text-2xl sm:text-3xl;
	}

	.seedImport-instructions {
		@apply mt-7 sm:mt-9 mx-auto text-xs sm:text-sm leading-6 sm:leading-8 text-light-lighterGray dark:text-white dark:text-opacity-80 text-left font-normal;
	}

	.seedImport-instruction-list {
		@apply list-disc ml-4 sm:list-none sm:ml-0;
	}

	.seedImport-form-wrapper {
		@apply mt-8 sm:mt-12 mx-auto;
	}

	:local(.form) {
		@apply flex flex-col items-center justify-center;
	}

	.seedImport-form-inputs {
		@apply flex flex-col md:flex-row gap-y-8 gap-x-16;
	}

	.seedImport-input-wrapper {
		@apply relative items-center w-96  border border-black border-opacity-10 dark:border-white dark:border-opacity-40 rounded-2xl;
	}

	.seedImport-label {
		@apply absolute -top-2 left-5 -mt-px inline-block px-1 text-xs font-medium text-light-grey bg-white dark:text-white dark:bg-dark-background;
	}

	.seedImport-seedphrase {
		@apply block w-full h-full bg-transparent py-3 border-0 resize-none focus:ring-0 sm:text-sm text-opacity-40 text-black dark:text-white dark:text-opacity-40;
	}

	.seedImport-btn-paste {
		@apply absolute right-5 bottom-3.5 font-bold leading-6 text-sm text-light-orange dark:text-dark-lighterGray;
	}

	.seedImport-details-wrapper {
		@apply flex flex-col gap-y-6;
	}

	.seedImport-details-input {
		@apply w-full h-full bg-transparent px-7 py-3 border-0 resize-none focus:ring-0 sm:text-sm text-opacity-40 text-black dark:text-white;
	}

	.seedImport-password-input-wrapper {
		@apply w-full flex items-center px-5 text-opacity-40 text-black dark:text-white dark:text-opacity-40;
	}

	.seedImport-btns {
		@apply w-96 h-14 mb-3;
	}

	.seedImport-btn-back {
		@apply text-light-grey dark:text-white;
	}

	.error-div {
		@apply text-left text-xs text-red-300 -mt-5 mb-1 flex w-full px-2;
	}
</style>
