<script lang="ts">
	import Swap from '$lib/Home/Swap/index.svelte';
	import SelectCurrency from '$lib/Home/Swap/Forms/SelectCurrency.svelte';
	import SwapCurrency from '$lib/Home/Swap/Forms/SwapCurrency.svelte';
	import ConfirmSelectMobile from '$lib/Home/Swap/Forms/ConfirmSelectMobile.svelte';
	import GridLayout from '$lib/Common/GridLayout.svelte'

	let tokens = [
		{
			cryptoUnit: 'CSPR',
			cryptoName: 'Casper',
			positive: false,
		},
		{},
		{},
		{
			positive: false,
		},
		{
			cryptoName: 'Test',
			cryptoUnit: 'TST',
		},
	];

	let selected = -1

	function selectToken(e: { detail: { id: number } }): void {
		selected = e.detail.id;
	}

	function deselectToken(): void {
		selected = -1
	}

</script>

<GridLayout>
	<div slot="mid">
		<Swap on:select={selectToken} bind:tokens={tokens} bind:selected={selected}/>
	</div>
	<div class="sidebar" slot="last">
		{#if selected === -1}
			<!--<ConfirmSelectMobile />-->
			<SelectCurrency />
		{:else}
			<SwapCurrency on:deselect={deselectToken} />
		{/if}
	</div>
</GridLayout>

<style lang="postcss" global>
	:local(.wallet-swap-page) {
		@apply min-h-screen flex flex-col md:flex-row;
		@apply dark:bg-dark-background;
	}

	:local(.sidebar) {
		@apply h-full w-full;
		@apply md:right-0 md:h-screen;
	}
</style>