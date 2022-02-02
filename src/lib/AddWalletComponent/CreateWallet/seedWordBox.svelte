<!-- 
	@component
	
	A component for displaying individual seed phrase words
 -->
<script lang="ts">
	import { onMount } from 'svelte';

	export let seedWord: SeedWord;

	let wordBox: HTMLInputElement;
	let initialWidth: number;

	/** onMount callback to set inital input width */
	onMount(() => {
		initialWidth = seedWord.word.length + 5;
		wordBox.style.width = initialWidth.toString() + 'ch';
	});

	/** reactive statement for dynamically changing input width */
	$: {
		seedWord.word;
		if (wordBox != undefined) {
			let currentWidth: number = seedWord.word.length + 5;
			if (currentWidth > initialWidth) {
				wordBox.style.width = (seedWord.word.length + 5).toString() + 'ch';
			}
		}
	}
</script>

<div class="wordbox-wrapper">
	<input
		bind:value={seedWord.word}
		bind:this={wordBox}
		readonly={!seedWord.isEmpty}
		class="wordbox-input"
		class:empty={seedWord.isEmpty}
	/>
	<div class:empty={seedWord.isEmpty} class="wordbox-id-circle">
		<span class="wordbox-circle-text">{seedWord.id}</span>
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
	}

	.wordbox-input {
		@apply transition-all;
		@apply rounded-3xl 4xl:rounded-full dark:bg-dark-grey;
		@apply pl-7 py-2 4xl:py-3;
		@apply text-dark-gray font-display 4xl:text-4xl dark:text-white;
		@apply text-center;
		@apply shadow outline-none;
	}

	.wordbox-input.empty {
		@apply border border-dashed border-black/40 dark:border-white/40 4xl:border-2;
		@apply dark:bg-dark-background;
		@apply focus:border-solid focus:border-light-purple;
	}
</style>
