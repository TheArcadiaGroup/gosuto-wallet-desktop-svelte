<script lang="ts">
	import RoundedSelectIcon from '$icons/RoundedSelectIcon.svelte';

	import { slide } from 'svelte/transition';

	const options = {
		'300': '5min',
		'600': '10min',
		'900': '15min',
		'1800': '30min',
		'3600': '1h',
	};

	const durationOptionsArr = Object.values(options);
	const durationNamesArr = Object.keys(options);

	export let selectedDuration = 300;
	$: durationOptionValue = durationNamesArr.indexOf(selectedDuration.toString()) || 0;
	let droppedDown = false;
</script>

<svelte:window
	on:click={(e) => {
		// @ts-ignore
		if (!e?.target?.closest('.lockup-duration-selector')) {
			droppedDown = false;
		}
	}}
/>

<div class="lockup-duration-selector">
	<div
		class="top cursor-pointer"
		on:click={() => {
			droppedDown = !droppedDown;
		}}
	>
		<p class="selection">
			{durationOptionsArr[durationOptionValue]}
		</p>
		<div class="icon" class:rotate={droppedDown}>
			<RoundedSelectIcon />
		</div>
	</div>
	{#if droppedDown}
		<div class="options-holder" transition:slide|local>
			{#each durationOptionsArr as option, i}
				<p
					class="option {i === durationOptionValue ? 'selected' : ''}"
					on:click={() => {
						selectedDuration = +durationNamesArr[i];
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
	:local(.lockup-duration-selector) {
		@apply min-w-max cursor-pointer bg-white dark:bg-dark-background rounded-3xl;
		@apply border border-light-lighterGray dark:border-white;
		@apply text-sm dark:text-white;
		@apply px-4 absolute right-0;
	}

	:local(.selection) {
		@apply py-3 mr-4 capitalize;
	}

	:local(.top) {
		@apply flex justify-between items-center;
	}

	:local(.option) {
		@apply cursor-pointer mb-4 capitalize;
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
