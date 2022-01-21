<script lang="ts">
	import { goto } from '$app/navigation';
	import CopyOrange from '$icons/CopyOrange.svelte';
	import GosutoLogoAndText from '$icons/GosutoLogoAndText.svelte';
	import Button from '$lib/Common/Button.svelte';
	import SeedWordBox from '$lib/components/AddWalletComponent/createWallet/seedWordBox.svelte';
	import FailedPopup from '$lib/PopUps/NewToGosuto/FailedPopup.svelte';

	let copied: boolean = false;
	let showPopup: boolean = false;
	let seedPhrase: string[] = [];
	let secondPage: boolean = false;

	let words: SeedWord[] = Array(12)
		.fill(0)
		.map(
			(_, i) =>
				({
					id: i + 1,
					word: 'Text'.repeat(Math.round(Math.random() * 2) + 1),
					isEmpty: false,
				} as SeedWord),
		);

	let copyToClipboard = () => {
		words.forEach((w) => seedPhrase.push(w.word));
		console.log(seedPhrase);
		navigator.clipboard.writeText(seedPhrase.join(' '));
		copied = true;
	};

	let swapToSecond = () => {
		if (!secondPage) {
			if (copied === true) {
				secondPage = true;
				let numbers: Number[] = Array.from({ length: 10 }, (_, i) => i + 1);
				let generatedMissing: Number[] = numbers.sort((a, b) => 0.5 - Math.random()).slice(0, 3);
				words
					.filter((w) => generatedMissing.includes(w.id))
					.forEach((e) => {
						e.isEmpty = true;
						e.word = '';
					});
				words = words;
			} else {
				showPopup = true;
			}
		} else {
			if (words.filter((w) => w.word === seedPhrase[w.id - 1]).length == 12) {
				goto('#');
			}
		}
	};
</script>

<div class="wrapper">
	{#if showPopup}
		<FailedPopup on:confirm={() => (showPopup = false)} />
	{/if}
	<div class="content">
		<GosutoLogoAndText class="gosuto-logo" />
		<h1>Create new wallet</h1>
		<div class="explanation-text">
			{#if secondPage}
				<h2>Complete your seed phrase to continue</h2>
				<ul>
					<li>Type in the missing words</li>
				</ul>
			{:else}
				<h2>Your secret seed phrase</h2>
				<ul>
					<li>This list of words will allow you to access your wallet.</li>
					<li>Write it down and keep it somewhere safe.</li>
					<li>Anyone with the phrase can acces this wallet.</li>
					<li>You will need this list to recover your wallet.</li>
				</ul>
			{/if}
		</div>
		<div class="seed-phrase">
			{#each words as seedWord}
				<SeedWordBox {seedWord} />
			{/each}
		</div>

		{#if !secondPage}
			<button class="clipboard-copy" on:click={copyToClipboard}>
				<span>Copy to clipboard</span>
				<CopyOrange class="clipboard-copy-icon" />
			</button>
		{/if}
		<div class="bt next-bt">
			<Button on:click={swapToSecond}>
				<span slot="text" class="bt-text">Continue</span>
			</Button>
		</div>
	</div>
</div>

<style type="postcss" global>
	:local(.wrapper) {
		@apply absolute inset-0 overflow-auto;
		@apply grid;
		@apply dark:bg-dark-gosutoDark;
	}

	.wrapper :global(.gosuto-logo) {
		@apply w-36 h-12 md:w-64 md:h-20 3xl:w-80 3xl:h-28 4xl:w-full 4xl:h-3/5 max-w-5xl;
		@apply mb-8 4xl:mb-16;
	}

	:local(.content) {
		@apply place-self-start justify-self-center 3xl:place-self-center;
		@apply grid place-items-center;
		@apply mt-10 md:mt-20;
		@apply w-full;
	}

	:local(h1) {
		@apply text-2xl md:text-3xl 3xl:text-4xl 4xl:text-7xl font-display font-bold;
		@apply mb-4 4xl:mb-16;
		@apply text-dark-gray dark:text-white;
	}

	:local(.explanation-text) {
		@apply text-light-fadedText dark:text-white opacity-80;
		@apply text-xs font-display 4xl:text-2xl;
		@apply relative;
		@apply ml-3 md:ml-0;
	}

	:local(h2) {
		@apply -translate-x-4;
		@apply mb-2;
	}

	:local(li) {
		@apply list-item list-disc;
	}

	:local(.seed-phrase) {
		@apply flex flex-wrap justify-center gap-y-6 gap-x-2 4xl:gap-8;
		@apply w-5/6 md:w-[40rem] 2xl:w-1/3;
		@apply mx-10 my-10 4xl:my-24;
	}

	:local(.clipboard-copy) {
		@apply text-light-lighterOrange text-sm 4xl:text-3xl font-display;
		@apply flex gap-3;
	}

	.content :global(.clipboard-copy-icon) {
		@apply 4xl:w-9 4xl:h-9;
	}

	:local(.bt) {
		@apply w-1/2 md:w-1/3 xl:w-1/4 max-w-3xl h-12 4xl:h-28;
		@apply mt-10 4xl:mt-32;
		@apply rounded-3xl;
	}

	:local(.bt:disabled) {
		@apply opacity-50;
	}

	:local(.next-bt) {
		@apply mb-5 mt-28 md:mt-10 4xl:mt-32;
	}

	:local(.bt-text) {
		@apply text-base md:text-lg 3xl:text-2xl 4xl:text-5xl font-display font-bold;
	}
</style>
