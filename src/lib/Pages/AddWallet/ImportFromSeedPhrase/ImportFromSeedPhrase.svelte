<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	import EyeIcon from '$icons/EyeIcon.svelte';
	import GosutoLogoAndText from '$icons/GosutoLogoAndText.svelte';
	import LockIcon from '$icons/LockIcon.svelte';

	import { goto } from '$app/navigation';
	import { retrieveData, saveData } from '$utils/dataStorage';
	import { onMount } from 'svelte';
	import { walletNameIsValid } from '$utils/profiles';

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
		if (walletName && accountHash && accountHex && password && privateKey) {
			let wallets: IWallet[] = retrieveData('wallets') || [];

			wallets.push({
				walletName: walletName.trim(),
				walletPassword: password.trim(),
				walletImage: '',
				seedPhrase: seedPhrase.trim().split(' '),
				availableBalanceUSD: 0.0,
				availableBalance: 0.0,
				stakedBalance: 0.0,
				unclaimedRewards: 0.0,
				walletTokens: [],
				walletStakes: [],
				// walletHistory: [],
				walletAddress: accountHex.trim(),
				accountHash: accountHash.trim(),
				privateKey: privateKey.trim(),
			});

			saveData('wallets', JSON.stringify(wallets));
			goto(`/profile/${accountHex.trim()}`);
		} else {
			goto('/add-wallet/import/from-seed-phrase');
		}
	};

	const confirmAndSendMnemonics = () => {
		const data: { accountHex: string; accountHash: string; privateKey: string } =
			window.api.sendSync('createWalletFromMnemonics', seedPhrase);
		try {
			if (data?.accountHex && data?.accountHash && data?.privateKey) {
				const walletCreationResult = data;
				accountHex = walletCreationResult['accountHex'];
				accountHash = walletCreationResult['accountHash'];
				privateKey = walletCreationResult['privateKey'];

				console.log(walletCreationResult);

				postData();
			}
		} catch (error) {
			console.log(error);
		}
	};

	onMount(() => {
		// window.api.receive(
		// 	'createWalletFromMnemonicsResponse',
		// 	(data: { accountHex: string; accountHash: string; privateKey: string }) => {
		// 		try {
		// 			if (data?.accountHex && data?.accountHash && data?.privateKey) {
		// 				const walletCreationResult = data;
		// 				accountHex = walletCreationResult['accountHex'];
		// 				accountHash = walletCreationResult['accountHash'];
		// 				privateKey = walletCreationResult['privateKey'];
		// 				console.log(walletCreationResult);
		// 				postData();
		// 			}
		// 		} catch (error) {
		// 			console.log(error);
		// 		}
		// 	},
		// );
	});

	//TODO: input restrictions
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
						{#if confirmPassword !== password && password && confirmPassword}
							Passwords do not match.
						{/if}
					</div>
				</div>
			</div>
			<div class="seedImport-btn-continue">
				<Button
					isDisabled={!walletValid ||
						!confirmPassword ||
						!password ||
						confirmPassword !== password ||
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
			<button
				type="button"
				class="seedImport-btn seedImport-btn-back"
				on:click={() => goto('/add-wallet')}
			>
				Back
			</button>
		</div>
	</div>
</div>

<style lang="postcss" global>
	.seedImport-wrapper {
		@apply font-display dark:bg-dark-background flex flex-col items-center;
	}

	.seedImport-logo-gosuto {
		@apply mt-20 sm:mt-32;
	}

	.seedImport-page-heading {
		@apply mt-6 sm:mt-9 text-light-grey dark:text-white text-center font-bold text-2xl sm:text-3xl;
	}

	.seedImport-instructions {
		@apply mt-7 sm:mt-11 mx-auto text-xs sm:text-sm leading-6 sm:leading-8 text-light-lighterGray dark:text-white dark:text-opacity-80 text-left font-normal;
	}

	.seedImport-instruction-list {
		@apply list-disc ml-4 sm:list-none sm:ml-0;
	}

	.seedImport-form-wrapper {
		@apply mt-8 sm:mt-14 mx-auto;
	}

	:local(.form) {
		@apply flex flex-col items-center;
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
		@apply flex flex-col gap-y-8;
	}

	.seedImport-details-input {
		@apply w-full h-full bg-transparent px-7 py-3 border-0 resize-none focus:ring-0 sm:text-sm text-opacity-40 text-black dark:text-white;
	}

	.seedImport-password-input-wrapper {
		@apply w-full flex items-center px-5 text-opacity-40 text-black dark:text-white dark:text-opacity-40;
	}

	.seedImport-btn-continue {
		@apply sm:mt-12 w-96 h-14 mt-8;
	}

	.seedImport-btn-back {
		@apply my-9 sm:my-48 sm:mt-11 text-light-grey dark:text-white;
	}

	.error-div {
		@apply text-left text-xs text-red-300 -mt-6 mb-1 flex w-full px-2;
	}
</style>
