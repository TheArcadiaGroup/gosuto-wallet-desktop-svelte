<script lang="ts">
	import GosutoLogoAndText from '$icons/GosutoLogoAndText.svelte';
	import TextInput from '$lib/Common/TextInput.svelte';
	import ImportPrivateKey from '$lib/components/AddWalletComponent/ImportFromSeedPhrase/ImportFromFile/ImportPrivateKey.svelte';
</script>

<div class="wrapper">
	<GosutoLogoAndText class="gosuto-logo" />
	<div class="content">
		<h1>Import From File</h1>
		<div class="input-wrapper">
			<TextInput label={'Wallet Name'} />
		</div>
		<ImportPrivateKey />
	</div>
</div>

<style type="postcss" global>
	:local(.wrapper) {
		@apply absolute inset-0 overflow-auto;
		@apply grid justify-center;
		@apply dark:bg-dark-gosutoDark;
	}

	.wrapper :global(.gosuto-logo) {
		@apply w-36 h-12 md:w-32 md:h-10 3xl:w-40 3xl:h-14 4xl:w-72 4xl:h-28;
		@apply relative md:absolute top-6 md:left-16;
	}

	:local(.content) {
		@apply flex flex-col place-items-center;
		@apply mt-10 md:mt-20;
		@apply w-11/12 sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/4;
	}

	:local(h1) {
		@apply text-xl md:text-2xl 3xl:text-4xl 4xl:text-7xl font-display font-bold;
		@apply mb-4 4xl:mb-8;
		@apply text-dark-gray dark:text-white;
	}

	:local(.input-wrapper) {
		@apply my-5;
	}
</style>
