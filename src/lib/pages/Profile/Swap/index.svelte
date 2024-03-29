<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import ReturnHome from '$lib/components/ReturnHome.svelte';
	import Button from '$lib/components/Button.svelte';
	import PlusIcon from '$icons/PlusIcon.svelte';
	import TokenCard from '$lib/components/TokenCard.svelte';

	import { page } from '$app/stores';
	import { shortenAddress } from '$utils';

	export let tokens: IToken[] = [];
	export let wallet: IWallet;

	/**
	 * This is the currently selected index of TokenCards.
	 * -1 = none
	 * -2 = create token (handled by parent)
	 */
	export let selected = -1;

	let scroll = 0;
	let scrollWidth = 0;
	let currentPage = 0;

	const dispatch = createEventDispatcher();

	function onScroll(event: any) {
		if (!event.target || !event.target.scrollLeft || !event.target.clientWidth) return;
		scroll = event.target.scrollLeft;
		scrollWidth = event.target.scrollWidth;

		const totalPages = Math.ceil(tokens.length / 4);

		currentPage = Math.round(scroll / (scrollWidth / totalPages));
	}

	function deselectListener(event: any): void {
		if (!event.target) return;
		const isInToken = Boolean(event.target.closest('.token-card'));
		const isInAdd = Boolean(event.target.closest('.add-token-button'));
		if (!isInToken && !isInAdd)
			dispatch('selectToken', {
				id: -1,
			});
	}

	function cancelButtonListener(event: any): void {
		if (!event.target) return;
		const isInCancel = Boolean(event.target.closest('.swap-currency-cancel-swap-button'));
		if (isInCancel)
			dispatch('selectToken', {
				id: -1,
			});
	}
</script>

<svelte:body on:click={cancelButtonListener} />

<div class="swap-wallet-swap" on:click={deselectListener}>
	<ReturnHome
		walletName={''}
		publicKey={shortenAddress($page.params.publicKey)}
		profileLocation="Swap"
	/>
	<div class="swap-container">
		<div class="swap-title-row">
			<p class="swap-tokens-in-wallet-title">Tokens in this wallet</p>
			<div class="ml-auto">
				<Button
					class="add-token-button"
					on:click={() => dispatch('selectToken', { tokenName: 'AddToken' })}
					glow={true}
				>
					<div slot="text" class="swap-inner-btn">
						<PlusIcon />
						<span>Add Token</span>
					</div>
				</Button>
			</div>
		</div>
		<div on:scroll={onScroll} class="swap-scroll-container swap-scrollbar-hide">
			{#each Array(Math.ceil(tokens.length / 4)) as _, i}
				<div class="swap-token-group">
					{#each tokens.slice(i * 4, i * 4 + 4) as token, y}
						<TokenCard selected={selected === i * 4 + y} on:selectToken {...token} />
					{/each}
				</div>
			{/each}
		</div>
		<div class="swap-mobile-scrollbar">
			{#each Array(Math.ceil(tokens.length / 4)) as _, i}
				<div
					class="swap-mobile-scrollbar-dot {currentPage === i
						? 'w-3 bg-light-orange'
						: 'w-1.5 bg-light-gray'}"
				/>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss" global>
	.swap-wallet-swap {
		@apply h-max min-h-screen;
		@apply px-4 pt-10;
		@apply dark:bg-dark-gosutoDark;
		@apply lg:px-11 lg:pt-20;
	}

	.swap-container {
		@apply py-6 lg:py-12;
	}

	.swap-title-row {
		@apply px-2;
		@apply flex flex-row items-center;
	}

	.swap-tokens-in-wallet-title {
		@apply font-bold text-base;
		@apply lg:text-xl;
		@apply dark:text-white;
	}

	.swap-scroll-container {
		@apply flex flex-row;
		@apply px-2 py-8 gap-x-3.5 gap-y-5;
		@apply snap-x overflow-x-scroll;
		@apply lg:gap-8 lg:flex-col lg:overflow-auto;
	}

	.swap-token-group {
		@apply w-full shrink-0;
		@apply grid grid-cols-2 auto-rows-fr;
		@apply gap-x-3.5 gap-y-5;
		@apply snap-center;
		@apply lg:gap-8;
	}

	.swap-mobile-scrollbar {
		@apply w-full;
		@apply flex flex-row justify-center;
		@apply mx-auto px-2 pb-2 gap-1 mb-7;
		@apply lg:hidden;
	}

	.swap-mobile-scrollbar-dot {
		@apply h-1.5;
		@apply rounded-full;
		@apply transition-all duration-200;
	}

	.swap-inner-btn {
		@apply flex items-center;
		@apply gap-1 py-1 px-3.5;
		@apply lg:gap-2.5 lg:py-2 lg:px-5 lg:text-base;
	}

	.swap-scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.swap-scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
</style>
