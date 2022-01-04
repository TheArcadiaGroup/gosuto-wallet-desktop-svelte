<script lang="ts">
	import ChevronDownIcon from '$icons/ChevronDownIcon.svelte';

	export let rangeOptions: string[] = ['1 Day', '1 Week', '1 Month'];
	export let selectedRange: string = rangeOptions[0];
	let dropDown: boolean = false;
</script>

<div class="relative inline-block text-left">
	<div>
		<button
			on:click={() => {
				dropDown = !dropDown;
			}}
			type="button"
			class="inline-flex items-center justify-center w-full text-[10px] sm:text-[13px] text-[#4F4F4F] leading-6 font-medium border border-black border-opacity-10 rounded-3xl pl-4 sm:pl-[52px] pr-[9px] sm:pr-4 py-[9px] bg-transparent "
			id="menu-button"
			aria-expanded="true"
			aria-haspopup="true"
		>
			<!-- <span> -->
			{selectedRange}
			<!-- </span> -->
			<div class="-mr-1 ml-2 sm:ml-7 h-4 w-4">
				<ChevronDownIcon />
			</div>
		</button>
	</div>

	<div
		class:hidden={!dropDown}
		class="origin-top-right absolute right-0 mt-1 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
		role="menu"
		aria-orientation="vertical"
		aria-labelledby="menu-button"
		tabindex="-1"
	>
		<div class="py-1">
			{#each rangeOptions as rangeOption}
				<button
					on:click={() => {
						selectedRange = rangeOption;
						dropDown = false;
					}}
					class="w-full text-[10px] text-[#4F4F4F] leading-6 font-medium block px-4 py-2 text-sm hover:bg-slate-100"
					role="menuitem"
					tabindex="-1"
					id="menu-item-0"
				>
					{rangeOption}
				</button>
			{/each}
		</div>
	</div>
</div>
