<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import ReturnHome from '$lib/components/ReturnHome.svelte';
	import Button from '$lib/components/Button.svelte';
	import PlusIcon from '$icons/PlusIcon.svelte';
	import TokenCard from '$lib/components/TokenCard.svelte';

	import { page } from '$app/stores';
	import NetworkSelector from '$lib/components/NetworkSelector.svelte';
	import { selectedWallet } from '$stores/user/wallets.js';
	import _ from 'lodash-es';

	export let tokens: IToken[] = [];
	/**
	 * This is the currently selected index of TokenCards.
	 * -1 = none
	 * -2 = create token (handled by parent)
	 */
	export let selectedToken: IToken | null = null;

	// let scroll = 0;
	// let scrollWidth = 0;
	// let currentPage = 0;

	const dispatch = createEventDispatcher();

	// previously on scroll-container
	// function onScroll(event: any) {
	// 	if (!event.target || !event.target.scrollLeft || !event.target.clientWidth) return;
	// 	// scroll = event.target.scrollLeft;
	// 	// scrollWidth = event.target.scrollWidth;

	// 	// const totalPages = Math.ceil(tokens.length / 4);

	// 	// currentPage = Math.round(scroll / (scrollWidth / totalPages));
	// }

	function deselectListener(event: any): void {
		if (!event.target) return;
		const isInToken = Boolean(event.target.closest('.token-card'));
		const isInAddButton = Boolean(event.target.closest('.add-token-button'));
		// Commented out to prevent the windows from closing by virtue of the user clicking outside the section
		// if (!isInToken && !isInAddButton) dispatch('selectToken', null);
	}

	function cancelButtonListener(event: any): void {
		if (!event.target) return;
		const isInCancel = Boolean(event.target.closest('.send-currency-cancel-send-button'));
		if (isInCancel) dispatch('selectToken', null);
	}
</script>

<svelte:body on:click={cancelButtonListener} />

<div class="wallet-send" on:click={deselectListener}>
	<div class="header-wrapper">
		<div class="header">
			<div class="top-bit">
				<div class="item-1 pl-9">
					<ReturnHome
						walletName={''}
						publicKey={$page.params.publicKey}
						profileLocation="Send Tokens"
					/>
				</div>
				<NetworkSelector />
			</div>
			<div class="lower-bit">
				<div class="title-row">
					<p class="tokens-in-wallet-title">Tokens in this wallet</p>
					{#if !_.isNumber($selectedWallet.ledgerIndex)}
						<div class="ml-auto">
							<Button
								class="add-token-button"
								on:click={() => dispatch('selectToken', { tokenName: 'AddToken' })}
								hasGlow={true}
							>
								<div slot="text" class="inner-btn">
									<PlusIcon />
									<span>Add Token</span>
								</div>
							</Button>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
	<!-- <div class="scroll-container scrollbar-hide"> -->
	<div class="token-group">
		{#each tokens as token, _y}
			<TokenCard {token} selected={selectedToken === token} on:selectToken {...token} />
		{/each}
	</div>
	<!-- </div> -->
</div>

<style lang="postcss" global>
	:local(.wallet-send) {
		@apply h-screen w-full;
		@apply m-0;
		@apply dark:bg-dark-gosutoDark;
		@apply dark:border-0 overflow-hidden pb-20;
	}

	:local(.header-wrapper) {
		@apply px-4 pt-10 bg-white dark:bg-dark-gosutoDark;
		@apply lg:px-11 lg:pt-20 pb-5;
	}

	:local(.title-row) {
		@apply pl-2;
		@apply flex flex-row items-center;
	}

	:local(.tokens-in-wallet-title) {
		@apply font-bold text-base;
		@apply lg:text-xl;
		@apply dark:text-white;
	}

	:local(.token-group) {
		@apply w-full;
		@apply grid;
		@apply gap-x-3.5 gap-y-5;
		@apply snap-center;
		@apply overflow-y-auto h-[85%] overflow-x-hidden;
		@apply px-2 py-8 gap-x-3.5 gap-y-5 lg:gap-8 lg:px-16 pb-20;
		grid-template-columns: repeat(2, minmax(50%, 1fr));
		grid-template-rows: repeat(auto-fit, minmax(140px, 140px));
	}

	:local(.inner-btn) {
		@apply flex items-center;
		@apply gap-1 py-1 px-3.5;
		@apply lg:gap-2.5 lg:py-2 lg:px-5 lg:text-base;
	}

	:local(.header) {
		@apply flex relative flex-col space-y-9 mr-2;
	}

	:local(.bottom-bit) {
		/* @apply mt-3 mb; */
	}
</style>
