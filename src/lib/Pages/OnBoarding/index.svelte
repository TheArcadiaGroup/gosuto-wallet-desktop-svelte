<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import pollyfillData from '$utils/pollyfillData';
	import { user } from '$stores/user';
	import { selectedWallet, wallets } from '$stores/user/wallets';

	// Initialize user object if it does not exist
	onMount(() => {
		pollyfillData();

		if ($user || $wallets || $selectedWallet) {
			goto(`/profile`);
		}
	});
</script>

<div class="onboarding-page-wrapper" in:fade>
	<div class="onboarding-page-tracker">
		<button class="onboarding-active-page" />
		<button class="onboarding-inactive-page" />
		<button class="onboarding-inactive-page" />
	</div>

	<div class="onboarding-text-wrapper">
		<div class="onboarding-large-text">Lorem ipsum dolor sit amet, consectetuer adipiscing</div>
		<div class="onboarding-small-text">
			Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod
			tincidunt ut laoreet dolore magna aliquam erat volutpat.
		</div>
		<div class="onboarding-next-bt">
			<Button on:click={() => goto('/add-wallet')}>
				<p slot="text">Next</p>
			</Button>
		</div>
	</div>
</div>

<style lang="postcss" global>
	.onboarding-page-wrapper {
		@apply absolute inset-0;
		@apply dark:bg-dark-background;
	}

	.onboarding-page-tracker {
		@apply flex gap-2;
		@apply absolute top-24 right-24;
	}

	.onboarding-inactive-page {
		@apply py-3 px-3;
		@apply rounded-full;
		background-color: rgba(196, 196, 196, 0.35);
	}

	.onboarding-active-page {
		@apply bg-light-orange rounded-xl;
		@apply py-3 px-6;
	}

	.onboarding-text-wrapper {
		@apply flex flex-col items-center text-center;
		@apply absolute top-1/2 left-1/2 -translate-x-1/2;
	}

	.onboarding-large-text {
		@apply text-2xl font-bold font-display text-light-grey dark:text-white;
		@apply max-w-sm;
		@apply mb-4;
	}

	.onboarding-small-text {
		@apply text-lg font-display text-light-lighterGray dark:text-white;
		@apply mb-10;
		@apply max-w-lg;
	}

	.onboarding-next-bt {
		@apply h-8 w-1/2;
	}
</style>
