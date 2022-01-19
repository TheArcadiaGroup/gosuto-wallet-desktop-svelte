<script lang="ts">
	import GridLayout from '$lib/Common/GridLayout.svelte';
	import AddTokenSidebar from '$lib/components/Home/addTokenSidebar.svelte';
	import Swap from '$lib/Home/Swap/index.svelte';
	import Sidebar from '$lib/Home/Swap/sidebar.svelte';

	let addingTokenActive: boolean = false;
	let mainSidebarActive: boolean = false;

	let selectedToken: any = null;
</script>

<GridLayout>
	<div class="left-sidebar" slot="first">Sidebar</div>
	<Swap
		slot="mid"
		on:click={() => {
			mainSidebarActive = false;
			addingTokenActive = true;
		}}
		on:tokenSelected={(event) => {
			addingTokenActive = false;
			mainSidebarActive = true;
			selectedToken = event.detail.selectedToken;
		}}
	/>
	<AddTokenSidebar
		slot="last"
		{addingTokenActive}
		{mainSidebarActive}
		on:closeSidebar={() => {
			addingTokenActive = false;
		}}
	>
		<Sidebar
			slot="mainSideBar"
			cryptoUnit={selectedToken.cryptoUnit}
			cryptoAmount={selectedToken.cryptoAmount}
			currencyUnit={selectedToken.currencyUnit}
			currencySymbol={selectedToken.currencySymbol}
		/>
		<p class="inactive-text" slot="inactiveTextSlot">Select currency you want to swap</p>
	</AddTokenSidebar>
</GridLayout>

<style lang="postcss">
	.inactive-text {
		@apply text-lg text-light-inactiveText max-w-[60%] text-center;
	}
</style>
