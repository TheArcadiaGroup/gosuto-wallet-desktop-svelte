<!-- 
	@component 
	Description:
	> Custom select component to allow user to pick from a list of options.
	
	@author MikeBrandon
	@see history
-->
<script lang="ts">
	import RoundedSelectIcon from '$icons/RoundedSelectIcon.svelte';
	import { slide } from 'svelte/transition';

	export let optionsArray: string[] = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
	export let value: number = 0;
	let droppedDown: boolean = false;
</script>

<div class="select">
	<div
		class="top cursor-pointer"
		on:click={() => {
			droppedDown = !droppedDown;
		}}
	>
		<p class="selection">
			{optionsArray[value]}
		</p>
		<div class="icon" class:rotate={droppedDown}>
			<RoundedSelectIcon />
		</div>
	</div>
	{#if droppedDown}
		<div class="options-holder" transition:slide>
			{#each optionsArray as option, i}
				<p
					class="option {i === value ? 'selected' : ''}"
					on:click={() => {
						value = i;
						droppedDown = false;
					}}
				>
					{option}
				</p>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss" global>
	:local(.select) {
		@apply absolute min-w-max w-[30%] md:w-[15%] cursor-pointer bg-white dark:bg-dark-background rounded-3xl;
		@apply border border-light-lighterGray dark:border-white;
		@apply z-10 text-sm dark:text-white;
		@apply px-5 right-0 md:right-auto;
		@apply transform -translate-y-16 md:translate-y-0;
	}
	:local(.selection) {
		@apply py-3;
	}

	:local(.top) {
		@apply flex justify-between items-center;
	}

	:local(.option) {
		@apply cursor-pointer mb-4;
	}

	:local(.options-holder) {
		@apply border-t pt-2;
	}

	:local(.selected) {
		@apply text-light-purple;
	}

	:local(.rotate) {
		@apply transform rotate-180 transition;
	}
</style>
