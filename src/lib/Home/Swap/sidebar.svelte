<script lang="ts">
	import { fly } from 'svelte/transition';
	import Button from '$lib/Common/Button.svelte';
	import { createEventDispatcher } from 'svelte';
	import TextInput from '$lib/Common/TextInput.svelte';
	import SwapSidebarIcon from '$icons/SwapSidebarIcon.svelte';
	import RoundedSelect from '$lib/Common/RoundedSelect.svelte';

	const dispatch = createEventDispatcher();

	let swapFrom: any = null;
	let swapTo: any = null;

	export let cryptoUnit = 'USDT';
	export let cryptoAmount = 2000;
	export let currencyUnit = 'USD';
	export let currencySymbol = '$';

	export let cryptoList = ['USDT', 'FIRO', 'CSPR'];

	let swapAmount: number;

	let showConfirmPopup: boolean = false;
</script>

<div class="sidebar-holder" in:fly={{ x: 200, duration: 500 }} out:fly={{ x: 200, duration: 500 }}>
	<h4>Swap</h4>

	<div class="swap-text-input-holder">
		<TextInput bind:value={swapAmount} label="From" type="number" />
		<p class="center-item">{cryptoUnit}</p>
	</div>
	<p class="value">{`${currencySymbol}0.00 ${currencyUnit}`}</p>

	<div class="icon-holder">
		<SwapSidebarIcon />
	</div>

	<div class="swap-text-input-holder">
		<TextInput bind:value={swapAmount} label="From" type="number" />
		<RoundedSelect optionsArray={cryptoList} />
	</div>
	<p class="value">{`${currencySymbol}0.00 ${currencyUnit}`}</p>
	<div class="lower-button-holder">
		<Button
			on:click={() => {
				if ((swapFrom || swapTo) && swapFrom <= cryptoAmount) {
					showConfirmPopup = true;
				} else {
					// What happens when user doesn't enter values
				}
			}}
		>
			<p class="lower-btn-text" slot="text">Swap</p>
		</Button>
	</div>
	<div
		class="cancel-holder"
		on:click={() => {
			dispatch('closeSidebar');
		}}
	>
		<p>Cancel</p>
	</div>
</div>

<style lang="postcss" global>
	:local(h4) {
		@apply font-bold text-xl md:mb-4 2xl:mb-12 dark:text-white;
		@apply hidden md:block;
	}

	:local(.btn) {
		@apply flex flex-col md:flex-row items-center justify-center;
		@apply font-semibold text-sm 2xl:text-lg;
		@apply rounded-3xl h-full;
		@apply px-3 py-1 md:py-2 md:px-3 2xl:px-7;
		@apply transition duration-300;
	}

	:local(.orange-btn) {
		@apply bg-light-orange text-white;
		box-shadow: 0px 2px 15px #ff826688;
	}

	:local(.white-btn) {
		@apply text-light-grey dark:text-white;
		box-shadow: 0px 2px 15px #0000001a;
	}

	:local(.sidebar-holder) {
		@apply flex flex-col items-center h-full w-full;
	}

	:local(.lower-button-holder) {
		@apply w-full mt-12;
	}

	:local(.cancel-holder) {
		@apply flex justify-center items-center w-full cursor-pointer my-5;
		@apply text-base md:text-lg font-semibold text-light-grey dark:text-white;
	}

	:local(.lower-btn-text) {
		@apply text-base md:text-lg;
		@apply py-1 md:py-2;
	}

	:local(.swap-text-input-holder) {
		@apply flex items-center justify-between w-full mb-4;
	}

	:local(.swap-text-input-holder) > .center-item {
		@apply transform translate-y-1;
	}

	:local(.swap-text-input-holder) > p {
		@apply pr-5 text-sm;
	}

	:local(.value) {
		@apply self-start;
	}

	:local(.icon-holder) {
		@apply my-6;
	}
</style>
