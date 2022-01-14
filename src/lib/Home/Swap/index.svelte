<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import ReturnHome from '$components/Home/ReturnHome.svelte';
	import PlusIcon from '$icons/PlusIcon.svelte';
	import TokenCard from '$lib/Home/Swap/TokenCard.svelte';
	import Button from '$lib/Common/Button.svelte';

	export let tokens = []

	let dispatch = createEventDispatcher()

	let scroll = 0;
	let scrollWidth = 0;
	let currentPage = 0;

	export let selected = -1;

	function onScroll(event) {
		if (!event.target || !event.target.scrollLeft || !event.target.clientWidth) return;
		scroll = event.target.scrollLeft;
		scrollWidth = event.target.scrollWidth;

		const totalPages = Math.ceil(tokens.length / 4);

		currentPage = Math.round(scroll / (scrollWidth / totalPages));
	}
</script>

<div class="wallet-swap">
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
		<div
			on:scroll={onScroll}
			class="scroll-container scrollbar-hide"
		>
			{#each Array(Math.ceil(tokens.length / 4)) as _, i}
				<div class="token-group">
					{#each tokens.slice(i * 4, i * 4 + 4) as token, y}
						<TokenCard
							cardId={i * 4 + y}
							selected={selected === i * 4 + y}
							on:select
							{...token}
						/>
					{/each}
				</div>
			{/each}
		</div>
		<div class="mobile-scrollbar">
			{#each Array(Math.ceil(tokens.length / 4)) as _, i}
				<div class="mobile-scrollbar-dot {currentPage === i ? 'w-3 bg-light-orange' : 'w-1.5 bg-light-gray'}"></div>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">

	.wallet-swap {
		@apply px-4 pt-10 md:px-11 md:pt-20;
	}

	.tokens-in-wallet-title {
		@apply font-bold text-base md:text-xl dark:text-white;
	}

	.wallet-swap-title {
		@apply px-2 flex flex-row items-center;
	}

	.wallet-swap-title-text {
		@apply font-bold text-base md:text-xl;
	}

	.scroll-container {
		@apply flex flex-row overflow-x-scroll gap-x-3.5 gap-y-5 px-2 py-8 snap-x;
		@apply md:gap-8 md:flex-col md:overflow-auto;
	}

	.token-group {
		@apply w-full shrink-0 snap-center grid grid-cols-2 grid-rows-2 gap-x-3.5 gap-y-5 md:gap-8;
	}

	.mobile-scrollbar {
		@apply w-full mx-auto px-2 pb-2 flex flex-row justify-center gap-1 mb-7 md:hidden;
	}

	.mobile-scrollbar-dot {
        @apply h-1.5 rounded-full transition-all duration-200;
    }

	.inner-btn {
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
