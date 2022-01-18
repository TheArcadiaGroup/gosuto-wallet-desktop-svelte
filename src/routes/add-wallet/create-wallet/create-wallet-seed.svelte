<script lang="ts">
	import { goto } from '$app/navigation';

	import GosutoLogoAndText from '$icons/GosutoLogoAndText.svelte';
	import Button from '$lib/Common/Button.svelte';
	import TextInput from '$lib/Common/TextInput.svelte';
</script>

<div class="wrapper">
	<div class="content">
		<GosutoLogoAndText class="gosuto-logo" />
		<h1>Create new wallet</h1>
		<div class="explanation-text">
			<h2>Your secret seed phrase</h2>
			<ul>
				<li>This list of words will allow you to access your wallet.</li>
				<li>Write it down and keep it somewhere safe.</li>
				<li>Anyone with the phrase can acces this wallet.</li>
				<li>You will need this list to recover your wallet.</li>
			</ul>
		</div>
		<div class="seed-phrase" />
		<div class="clipboard-copy" />
		<div class="bt next-bt">
			<Button on:click={() => goto('#')}>
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
		@apply w-36 h-12 md:w-64 md:h-20 3xl:w-80 3xl:h-28 4xl:w-full 4xl:h-3/5;
		@apply mb-8 4xl:mb-16;
	}

	:local(.content) {
		@apply place-self-start justify-self-center 3xl:place-self-center;
		@apply grid place-items-center;
		@apply mt-10 md:mt-20;
		@apply w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/4;
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

	:local(.bt) {
		@apply w-11/12 max-w-3xl h-12 4xl:h-28;
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
