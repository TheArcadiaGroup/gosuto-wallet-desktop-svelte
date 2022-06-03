<script lang="ts">
	import Button from '$lib/components/Button.svelte';

	import CopyOrange from '$icons/CopyOrange.svelte';
	import GosutoLogoAndText from '$icons/GosutoLogoAndText.svelte';

	import SeedWordBox from '$lib/pages/AddWallet/CreateWallet/SeedWordBox.svelte';
	import FailedPopup from '$lib/components/PopUps/NewToGosuto/FailedPopup.svelte';

	import { walletName } from '$stores/WalletCreation';
	import { password } from '$stores/WalletCreation';
	import { onMount } from 'svelte';

	import { goto } from '$app/navigation';
	import { retrieveData, saveData } from '$utils/dataStorage';

	/** True if user copied seed phrase*/
	let copied: boolean = false;

	/** Used for showing warning popup when user doesn't copy seed phrase*/
	let showPopup: boolean = false;

	/** A backup array of strings representing the seed phrase*/
	let seedPhrase: string[] = [];

	/** True if user is in filling missing words phase*/
	let secondPage: boolean = false;

	/** An array representing a seed phrase */
	let words: SeedWord[];

	let walletNameValue: string;
	let passwordValue: string;
	let accountHash: string;
	let accountHex: string;
	let privateKey: string;

	walletName.subscribe((value) => {
		walletNameValue = value;
	});

	password.subscribe((value) => {
		passwordValue = value;
	});

	/**
	 * @function
	 * A function handling copying to clipboard on button click
	 */
	let copyToClipboard = () => {
		words.forEach((w) => seedPhrase.push(w.word));
		navigator.clipboard.writeText(seedPhrase.join(' '));
		copied = true;
	};

	/**
	 * @function
	 * A function handling continue button click
	 */
	let swapToSecond = () => {
		if (!secondPage) {
			if (copied === true) {
				secondPage = true;
				words.forEach((e) => {
					e.isEmpty = true;
					e.word = '';
				});
				words = words;
			} else {
				showPopup = true;
			}
		} else {
			if (words.filter((w) => w.word === seedPhrase[w.id - 1]).length === 12) {
				confirmAndSendMnemonics();
			}
		}
	};

	let handlePaste = (seedWord: SeedWord) => {
		let seedWords: string[] = seedWord.word.split(' ');
		seedWords.forEach((s, i) => {
			if (i < words.length) {
				words[i].word = s;
				words[0].word = seedWords[0];
			}
		});
		words[0].word = seedWords[0];
		words = words;
	};

	/** Sends wallet creation data to api route to create a wallet*/
	const postData = async () => {
		if (walletNameValue && accountHash && accountHex && passwordValue && privateKey) {
			let wallets: IWallet[] = retrieveData('wallets') || [];

			wallets.push({
				walletName: walletNameValue.trim(),
				walletPassword: passwordValue.trim(),
				walletImage: '',
				seedPhrase: seedPhrase,
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
			goto('/add-wallet/create');
		}
	};

	const confirmAndSendMnemonics = () => {
		const data: { accountHex: string; accountHash: string; privateKey: string } =
			window.api.sendSync('createWalletFromMnemonics', words.join(' '));
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
		const mnemonicData: string = window.api.sendSync('generateMnemonics', '');

		words = mnemonicData.split(' ').map(
			(word, i) =>
				({
					id: i + 1,
					word,
					isEmpty: false,
				} as SeedWord),
		);
	});
</script>

<div class="createSeed-wrapper">
	{#if showPopup}
		<FailedPopup on:confirm={() => (showPopup = false)} />
	{/if}
	{#if words}
		<div class="createSeed-content">
			<GosutoLogoAndText class="createSeed-gosuto-logo" />
			<h1 class="createSeed-header">Create new wallet</h1>
			<div class="createSeed-explanation-text">
				{#if secondPage}
					<h2 class="createSeed-explanation-header">Complete your seed phrase to continue</h2>
					<ul>
						<li class="createSeed-listItem">Type in the missing words</li>
					</ul>
				{:else}
					<h2 class="createSeed-explanation-header">Your secret seed phrase</h2>
					<ul>
						<li class="createSeed-listItem">
							This list of words will allow you to access your wallet.
						</li>
						<li class="createSeed-listItem">Write it down and keep it somewhere safe.</li>
						<li class="createSeed-listItem">Anyone with the phrase can acces this wallet.</li>
						<li class="createSeed-listItem">You will need this list to recover your wallet.</li>
					</ul>
				{/if}
			</div>
			<div class="createSeed-seed-phrase">
				{#each words as seedWord}
					<SeedWordBox {seedWord} {secondPage} {handlePaste} />
				{/each}
			</div>

			{#if !secondPage}
				<button class="createSeed-clipboard-copy" on:click={copyToClipboard}>
					<span>Copy to clipboard</span>
					<CopyOrange class="createSeed-clipboard-copy-icon" />
				</button>
			{/if}
			<div class="createSeed-bt createSeed-next-bt">
				<Button on:click={swapToSecond}>
					<span slot="text" class="createSeed-bt-text">Continue</span>
				</Button>
			</div>
		</div>
	{/if}
</div>

<style type="postcss" global>
	.createSeed-wrapper {
		@apply absolute inset-0 overflow-auto;
		@apply grid;
		@apply dark:bg-dark-gosutoDark;
	}

	.createSeed-wrapper .createSeed-gosuto-logo {
		@apply w-36 h-12 md:w-64 md:h-20 3xl:w-80 3xl:h-28 4xl:w-full 4xl:h-3/5 max-w-5xl;
		@apply mb-8 4xl:mb-16;
	}

	.createSeed-content {
		@apply place-self-start justify-self-center 3xl:place-self-center;
		@apply grid place-items-center;
		@apply mt-10 md:mt-20;
		@apply w-full;
	}

	.createSeed-header {
		@apply text-2xl md:text-3xl 3xl:text-4xl 4xl:text-7xl font-display font-bold;
		@apply mb-4 4xl:mb-16;
		@apply text-dark-gray dark:text-white;
	}

	.createSeed-explanation-text {
		@apply text-light-fadedText dark:text-white opacity-80;
		@apply text-xs font-display 4xl:text-2xl;
		@apply relative;
		@apply ml-3 md:ml-0;
	}

	.createSeed-explanation-header {
		@apply -translate-x-4;
		@apply mb-2;
	}

	.createSeed-listItem {
		@apply list-item list-disc;
	}

	.createSeed-seed-phrase {
		@apply flex flex-wrap justify-center gap-y-6 gap-x-2 4xl:gap-8;
		@apply w-5/6 md:w-[40rem] 2xl:w-1/3;
		@apply mx-10 my-10 4xl:my-24;
	}

	.createSeed-clipboard-copy {
		@apply text-light-lighterOrange text-sm 4xl:text-3xl font-display;
		@apply flex gap-3;
	}

	.createSeed-content .createSeed-clipboard-copy-icon {
		@apply 4xl:w-9 4xl:h-9;
	}

	.createSeed-bt {
		@apply w-1/2 md:w-1/3 xl:w-1/4 max-w-3xl h-12 4xl:h-28;
		@apply mt-10 4xl:mt-32;
		@apply rounded-3xl;
	}

	.createSeed-bt:disabled {
		@apply opacity-50;
	}

	.createSeed-next-bt {
		@apply mb-5 mt-28 md:mt-10 4xl:mt-32;
	}

	.createSeed-bt-text {
		@apply text-base md:text-lg 3xl:text-2xl 4xl:text-5xl font-display font-bold;
	}
</style>
