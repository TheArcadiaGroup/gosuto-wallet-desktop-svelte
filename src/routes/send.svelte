<script lang="ts">
	import GridLayout from '$lib/Common/GridLayout.svelte';
	import AddTokenSidebar from '$lib/components/Home/addTokenSidebar.svelte';
	import Send from '$lib/Home/Send/index.svelte';
	import Sidebar from '$lib/Home/Send/sidebar.svelte';

	let addingTokenActive: boolean = false;
	let mainSidebarActive: boolean = false;

	let selectedToken = null;
</script>

<GridLayout>
	<div class="left-sidebar" slot="first">Sidebar</div>
	<Send
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
		<Sidebar slot="mainSideBar" {selectedToken} />
		<p class="inactive-text" slot="inactiveTextSlot">Select a currency to send</p>
	</AddTokenSidebar>
</GridLayout>

<style lang="postcss">
	.inactive-text {
		@apply text-lg text-light-inactiveText max-w-[60%] text-center;
	}
</style>
