<!-- 
	@component
	
	A component for displaying individual seed phrase words
 -->
<script lang="ts">
	import CopyIcon from '$icons/CopyIcon.svelte';
	import { onMount } from 'svelte';

	export let seedWord: SeedWord;
	export let secondPage: boolean;
	export let handlePaste: (seedWord: SeedWord) => void;

	let wordBox: HTMLInputElement;
	let initialWidth: number;
	let turned: boolean = false;
	let savedWord: string = '';

	let onPaste = () => {
		setTimeout(() => {
			handlePaste(seedWord);
		}, 0);
	};

	/** onMount callback to set inital input width */
	onMount(() => {
		wordBox.onpaste = onPaste;
		savedWord = seedWord.word.slice();
		initialWidth = seedWord.word.length + 5;
		wordBox.style.width = initialWidth.toString() + 'ch';
	});

	let copyToClipboard = () => {
		navigator.clipboard.writeText(seedWord.word);
	};

	$: if (secondPage) turned = false;

	/** reactive statement for dynamically changing input width */
	$: {
		seedWord;
		if (wordBox != undefined) {
			let currentWidth: number = seedWord.word.length + 5;
			if (currentWidth >= initialWidth) {
				wordBox.style.width = (seedWord.word.length + 5).toString() + 'ch';
			}
		}

		if (savedWord === seedWord.word) {
			seedWord.isEmpty = false;
		}
	}
</script>

<div
	class="wordbox-wrapper"
	on:click={() => {
		if (turned) copyToClipboard();
		else if (!turned && !secondPage) turned = true;
	}}
>
	<input
		bind:value={seedWord.word}
		bind:this={wordBox}
		readonly={!seedWord.isEmpty}
		class="wordbox-input"
		class:empty={seedWord.isEmpty}
	/>
	<div class:empty={seedWord.isEmpty} class="wordbox-id-circle">
		<span class="wordbox-circle-text">
			{#if !turned}
				{seedWord.id}
			{:else if !secondPage}
				<CopyIcon />
			{/if}
		</span>
	</div>
</div>

<style type="postcss" global>
	.wordbox-id-circle {
		@apply bg-light-grey241 dark:bg-white dark:bg-opacity-30;
		@apply rounded-full;
		@apply w-7 h-7 4xl:w-11 4xl:h-11;
		@apply grid place-items-center;
		@apply absolute translate-x-1 4xl:translate-x-2 -translate-y-[2.15rem]  4xl:-translate-y-[3.4rem] ml-1;
		@apply text-dark-gray dark:text-white;
	}

	.wordbox-id-circle.empty {
		@apply focus-within:bg-light-purple;
	}

	input:focus ~ .wordbox-id-circle.empty {
		@apply bg-light-purple text-white;
	}

	.wordbox-circle-text {
		@apply text-sm 4xl:text-3xl font-bold font-display;
		@apply transition-all;
	}

	.wordbox-input {
		@apply transition-all;
		@apply rounded-3xl 4xl:rounded-full dark:bg-dark-grey;
		@apply pl-7 py-2 4xl:py-3;
		@apply text-dark-gray font-display 4xl:text-4xl dark:text-white;
		@apply text-center;
		@apply shadow outline-none;
		@apply cursor-pointer;
	}

	.wordbox-input.empty {
		@apply border border-dashed border-black/40 dark:border-white/40 4xl:border-2;
		@apply dark:bg-dark-background;
		@apply focus:border-solid focus:border-light-purple;
	}
</style>
