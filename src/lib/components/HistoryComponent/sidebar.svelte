<script lang="ts">
	import { slide } from 'svelte/transition';
	import SideBarCard from '$lib/components/HistoryComponent/SideBarCard.svelte';

	export let historyObject: HistoryObject | null = null;
</script>

<!-- Layout -->
<div class={!$$props.historyObject ? 'main h-screen justify-center' : 'main'}>
	{#if historyObject}
		<div class="sidebar-holder" transition:slide>
			<SideBarCard
				status={historyObject.status}
				dateAndTime={historyObject.dateAndTime}
				SwapData={historyObject.SwapData}
				amount={historyObject.amount}
				price={historyObject.price}
				cryptoUnit={historyObject.cryptoUnit}
				currencyUnit={historyObject.currencyUnit}
			/>
		</div>
	{:else}
		<p class="inactive-text">Select an entry to view more info about it</p>
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
