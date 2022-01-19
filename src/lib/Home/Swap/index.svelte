<script lang="ts">
	import ReturnHome from '$components/Home/ReturnHome.svelte';
	import PlusIcon from '$icons/PlusIcon.svelte';
	import TokenCard from '$lib/components/Home/TokenCard.svelte';
	import Button from '$lib/Common/Button.svelte';
	import { createEventDispatcher } from 'svelte';

	export let tokens: any = [];

	const dispatch = createEventDispatcher();

	let scroll = 0;
	let scrollWidth = 0;
	let currentPage = 0;

	let selectedTokenIndex = -1;

	function selectToken(e: { detail: { id: number } }): void {
		selectedTokenIndex = e.detail.id;
		dispatch('tokenSelected', {
			selectedToken: tokens[selectedTokenIndex],
		});
	}

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
		if (!isInToken) selectedTokenIndex = -1;
	}

	function cancelButtonListener(event: any): void {
		if (!event.target) return;
		const isInCancel = Boolean(event.target.closest('.cancel-swap-button'));
		if (isInCancel) selectedTokenIndex = -1;
	}
</script>

<svelte:body on:click={cancelButtonListener} />

<div class="wallet-swap" on:click={deselectListener}>
	<ReturnHome />
	<div class="my-6 md:my-12">
		<div class="px-2 flex flex-row items-center">
			<p class="tokens-in-wallet-title">Tokens in this wallet</p>
			<div class="ml-auto">
				<Button glow={true}>
					<div slot="text" class="inner-btn">
						<PlusIcon />
						<span>Add Token</span>
					</div>
				</Button>
			</div>
		</div>
		<div on:scroll={onScroll} class="scroll-container scrollbar-hide">
			{#each Array(Math.ceil(tokens.length / 4)) as _, i}
				<div class="token-group">
					{#each tokens.slice(i * 4, i * 4 + 4) as token, y}
						<TokenCard
							cardId={i * 4 + y}
							selected={selectedTokenIndex === i * 4 + y}
							on:select
							{...token}
						/>
					{/each}
				</div>
			{/each}
		</div>
		<div class="mobile-scrollbar">
			{#each Array(Math.ceil(tokens.length / 4)) as _, i}
				<div
					class="mobile-scrollbar-dot {currentPage === i
						? 'w-3 bg-light-orange'
						: 'w-1.5 bg-light-gray'}"
				/>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.wallet-swap) {
		@apply px-4 pt-10 md:px-11 md:pt-20;
	}

	:local(.tokens-in-wallet-title) {
		@apply font-bold text-base md:text-xl dark:text-white;
	}

	:local(.wallet-swap-title) {
		@apply px-2 flex flex-row items-center;
	}

	:local(.wallet-swap-title-text) {
		@apply font-bold text-base md:text-xl;
	}

	:local(.scroll-container) {
		@apply flex flex-row overflow-x-scroll gap-x-3.5 gap-y-5 px-2 py-8 snap-x;
		@apply md:gap-8 md:flex-col md:overflow-auto;
	}

	:local(.token-group) {
		@apply w-full shrink-0 snap-center grid grid-cols-2 grid-rows-2 gap-x-3.5 gap-y-5 md:gap-8;
	}

	:local(.mobile-scrollbar) {
		@apply w-full mx-auto px-2 pb-2 flex flex-row justify-center gap-1 mb-7 md:hidden;
	}

	:local(.mobile-scrollbar-dot) {
		@apply h-1.5 rounded-full transition-all duration-200;
	}

	:local(.inner-btn) {
		@apply flex gap-1 items-center py-1 px-3.5 md:gap-2.5 md:py-2 md:px-5 md:text-base;
	}

	.scrollbar-hide {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.scrollbar-hide::-webkit-scrollbar {
		display: none;
	}
</style>
