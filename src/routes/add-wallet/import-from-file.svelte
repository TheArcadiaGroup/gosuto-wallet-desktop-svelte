<script lang="ts">
	import GosutoLogoAndText from '$icons/GosutoLogoAndText.svelte';
	import Button from '$lib/Common/Button.svelte';
	import TextInput from '$lib/Common/TextInput.svelte';
	import ImportPrivateKey from '$lib/AddWalletComponent/ImportFromFile/ImportPrivateKey.svelte';
</script>

<div class="wrapper">
	<div class="content">
		<GosutoLogoAndText class="gosuto-logo" />
		<h1>Import From File</h1>
		<div class="input-wrapper">
			<TextInput label={'Wallet Name'} />
		</div>
		<ImportPrivateKey />
	</div>
	<div class="buttons">
		<div class="bt next-bt">
			<Button>
				<span slot="text" class="bt-text">Import</span>
			</Button>
		</div>
		<button class="bt cancel-bt">
			<span class="bt-text cancel-bt-text">Back</span>
		</button>
	</div>
</div>

<style type="postcss" global>
	:local(.wrapper) {
		@apply absolute inset-0 overflow-auto;
		@apply grid justify-items-center items-end;
		@apply dark:bg-dark-gosutoDark;
	}

	.wrapper :global(.gosuto-logo) {
		@apply w-36 h-12 md:w-64 md:h-20 3xl:w-80 3xl:h-28 4xl:w-2/3 4xl:h-1/2;
		@apply mb-8 4xl:mb-16;
	}

	:local(.content) {
		@apply flex flex-col place-items-center;
		@apply place-self-start justify-self-center;
		@apply mt-10 md:mt-20;
		@apply w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/4;
	}

	:local(h1) {
		@apply text-xl md:text-3xl 3xl:text-4xl 4xl:text-7xl font-display font-bold;
		@apply mb-4 4xl:mb-16;
		@apply text-dark-gray dark:text-white;
	}

	:local(.input-wrapper) {
		@apply mt-5 4xl:mt-10 mb-10 4xl:mb-20;
		@apply w-5/6;
	}

	:local(.buttons) {
		@apply flex flex-col items-center justify-items-end;
		@apply w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/4;
		@apply mb-10 md:mb-20;
	}

	:local(.bt) {
		@apply w-11/12 max-w-2xl h-12 4xl:h-28;
		@apply mt-10 4xl:mt-20;
		@apply rounded-3xl;
	}

	:local(.bt:disabled) {
		@apply opacity-50;
	}

	:local(.cancel-bt) {
		@apply mb-5;
	}

	:local(.bt-text) {
		@apply text-base md:text-lg 3xl:text-2xl 4xl:text-5xl font-display font-bold;
	}

	:local(.cancel-bt-text) {
		@apply text-dark-gray dark:text-white;
	}
</style>
