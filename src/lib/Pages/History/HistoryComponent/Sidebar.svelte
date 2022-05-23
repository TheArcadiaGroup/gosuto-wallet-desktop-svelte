<!-- 
	@component 
	Description:
	> Right Sidebar for History page with History SideBar Cards.
	
	@author MikeBrandon
	@see historyComponent
-->
<script lang="ts">
	import { slide } from 'svelte/transition';

	import SideBarCard from './SideBarCard.svelte';
	import TextSidebar from '$lib/components/TextSidebar.svelte';
	import { wallets } from '$stores/user/wallets';
	import { shortenAddress } from '$utils';

	export let historyObject: IHistory | null = null;

	let walletName = $wallets.find(
		(item) => item.accountHash.toLowerCase() === historyObject?.accountHash.toLowerCase(),
	)?.walletName;
</script>

<!-- Layout -->
<div class={!historyObject ? 'history-sidebar h-screen justify-center' : 'history-sidebar'}>
	{#if historyObject}
		<div class="sidebar-holder" transition:slide|local>
			<SideBarCard
				walletName={walletName || shortenAddress(historyObject.accountHash)}
				sidebarData={historyObject}
			/>
		</div>
	{:else}
		<TextSidebar>Select an entry to view more info about it</TextSidebar>
	{/if}
</div>

<style lang="postcss" global>
	:local(.history-sidebar) {
		@apply flex flex-col items-center md:pt-20 px-12 md:px-5 h-full md:h-screen w-full;
	}

	:local(.inactive-text) {
		@apply text-xs md:text-lg text-light-inactiveText max-w-[50%] md:max-w-[60%] 2xl:max-w-[55%] text-center;
		@apply my-12;
	}

	:local(.sidebar-holder) {
		@apply flex flex-col items-center h-full w-full;
	}
</style>
