<script lang="ts">
	import ReturnHome from '$components/Home/ReturnHome.svelte';
	import PlusIcon from '$icons/PlusIcon.svelte';
	import TokenCard from '$lib/components/Home/TokenCard.svelte';
	import Button from '$lib/Common/Button.svelte';
	import { createEventDispatcher } from 'svelte';

	export let tokens = [
		{
			cryptoUnit: 'CSPR',
			cryptoName: 'Casper',
			positive: false,
		},
		{},
		{},
		{
			positive: false,
		},
		{
			cryptoName: 'Test',
			cryptoUnit: 'TST',
		},
		{},
		{},
		{},
		{},
	];

	const dispatch = createEventDispatcher();

	let scroll = 0;
	let scrollWidth = 0;
	let currentPage = 0;

	let selectedTokenIndex = 0;

	function selectToken(e: { detail: { id: number } }): void {
		selectedTokenIndex = e.detail.id;
		dispatch('tokenSelected', {
			selectedToken: tokens[selectedTokenIndex],
		});
	}

	function onScroll(event) {
		if (!event.target || !event.target.scrollLeft || !event.target.clientWidth) return;
		scroll = event.target.scrollLeft;
		scrollWidth = event.target.scrollWidth;

		const totalPages = Math.ceil(tokens.length / 4);

		currentPage = Math.round(scroll / (scrollWidth / totalPages));
	}
</script>

<div class="px-4 pt-10 md:px-11 md:pt-20 dark:bg-dark-background">
	<ReturnHome />
	<div class="my-6 md:my-12">
		<div class="px-2 flex flex-row items-center">
			<p class="font-bold text-base md:text-xl dark:text-white">Tokens in this wallet</p>
			<div class="ml-auto">
				<Button glow={true} on:click>
					<div slot="text" class="inner-btn">
						<PlusIcon />
						<span>Add Token</span>
					</div>
				</Button>
			</div>
		</div>
		<div
			on:scroll={onScroll}
			class="flex flex-row overflow-x-scroll scrollbar-hide gap-x-3.5 gap-y-5 px-2 py-8 snap-x
      md:gap-8 md:flex-col md:overflow-auto"
		>
			{#each Array(Math.ceil(tokens.length / 4)) as _, i}
				<div
					class="w-full shrink-0 snap-center grid grid-cols-2 grid-rows-2 gap-x-3.5 gap-y-5 md:gap-8"
				>
					{#each tokens.slice(i * 4, i * 4 + 4) as token, y}
						<TokenCard
							cardId={i * 4 + y}
							selected={selectedTokenIndex === i * 4 + y}
							on:select={selectToken}
							{...token}
						/>
					{/each}
				</div>
			{/each}
		</div>
		<div class="w-full mx-auto px-2 flex flex-row justify-center gap-1 mb-7 md:hidden">
			{#each Array(Math.ceil(tokens.length / 4)) as _, i}
				<div
					class="h-1.5 rounded-full {currentPage === i
						? 'w-3 bg-light-orange'
						: 'w-1.5 bg-light-gray'} transition-all duration-200"
				/>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
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
