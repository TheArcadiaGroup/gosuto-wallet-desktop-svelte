<script lang="ts">
	import CreditCard from '$lib/pages/Profile/CreditCard.svelte';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import Button from '$lib/components/Button.svelte';

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { saveData } from '$utils/dataStorage';
	import { wallets } from '$stores/user/wallets';
	import pollyfillData from '$utils/pollyfillData';

	onMount(() => {
		pollyfillData();
	});
</script>

<div class="flex">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-mid">
		<div class="mid-content">
			<div class="content-header">
				<h1>Select Wallet</h1>
				<div class="button-wrapper" on:click={() => goto('/add-wallet')}>
					<Button>
						<div slot="text" class="button">+ Add wallet</div>
					</Button>
				</div>
			</div>
			<div class="credit-card-wrapper">
				{#each $wallets as wallet}
					<div
						class="single-card-wrap"
						on:click={() => {
							saveData('selectedProfile', JSON.stringify(wallet));
						}}
					>
						<CreditCard name={wallet.walletName} {wallet} />
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.global-grid-mid) {
		@apply dark:bg-dark-background;
		@apply flex justify-center;
	}

	:local(.mid-content) {
		@apply h-full w-1/2 overflow-y-scroll;
		@apply flex flex-col align-middle items-center gap-10;
		@apply mt-20;
	}

	:local(.content-header) {
		@apply flex justify-around gap-4;
		@apply w-1/2;
	}

	:local(h1) {
		@apply font-display font-bold text-2xl text-center dark:text-white;
	}

	:local(.button-wrapper) {
		@apply w-1/3 h-full;
		@apply font-display font-bold text-sm;
	}

	:local(.credit-card-wrapper) {
		@apply flex flex-col place-items-center gap-8 w-1/2;
		@apply mb-8;
	}

	:local(.single-card-wrap) {
		@apply w-full;
		@apply flex justify-center;
	}
</style>
