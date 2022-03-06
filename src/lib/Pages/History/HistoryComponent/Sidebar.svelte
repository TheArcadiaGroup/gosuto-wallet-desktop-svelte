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

	export let historyObject: HistoryObject | null = null;
</script>

<!-- Layout -->
<div class={!historyObject ? 'main h-screen justify-center' : 'main'}>
	{#if historyObject}
		<div class="sidebar-holder" transition:slide>
			<SideBarCard
				wallet={$$props.historyObject.wallet}
				status={$$props.historyObject.status}
				dateAndTime={$$props.historyObject.dateAndTime}
				SwapData={$$props.historyObject.SwapData}
				amount={$$props.historyObject.amount}
				price={$$props.historyObject.price}
				cryptoUnit={$$props.historyObject.cryptoUnit}
				currencyUnit={$$props.historyObject.currencyUnit}
			/>
		</div>
	{:else}
		<TextSidebar>Select an entry to view more info about it</TextSidebar>
	{/if}
</div>

<style lang="postcss" global>
	:local(.main) {
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
