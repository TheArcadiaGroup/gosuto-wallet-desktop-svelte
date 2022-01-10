<script lang="ts">
	import Swap from '$lib/Home/Swap/index.svelte';
	import SelectCurrency from '$lib/Home/Swap/Forms/SelectCurrency.svelte';
	import SwapCurrency from '$lib/Home/Swap/Forms/SwapCurrency.svelte';

	let selected = false

</script>

<div class="wallet-swap-page dark:bg-dark-background">
	<div class="main-view">
		<Swap on:select={() => selected = true} />
	</div>
	<div class="sidebar">
		{#if !selected}
			<SelectCurrency />
		{:else}
			<SwapCurrency />
		{/if}
	</div>
</div>

<style lang="postcss">
	.wallet-swap-page {
		@apply flex flex-col md:flex-row;
	}

	.main-view {
		@apply md:w-3/4;
	}

	.sidebar {
		@apply md:w-1/4
	}
</style>