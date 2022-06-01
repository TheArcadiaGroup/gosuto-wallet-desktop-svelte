<!-- @component 
	Describtion:
	> A component that displays a progress bar with specified value.
	
	Props:
	- `value` = Value in % of the progress. Determines the size of the inner bar.
-->
<script>
	export let value = 0;
	export let secondaryBar = false;
	export let secondaryBarValue = 0;
	export let secondaryBarClass = '';

	$: total = secondaryBar ? value + secondaryBarValue : value;
</script>

<div class="progress-bar-comp">
	<div
		class="bar primary-bar {secondaryBar ? 'primary-bar-with-secondary' : ''}"
		style="width: {(value / total) * 100}%"
	/>
	{#if secondaryBar}
		<div
			class="bar secondary-bar {secondaryBarClass}"
			style="width: {(secondaryBarValue / total) * 100}%"
		/>
	{/if}
</div>

<style lang="postcss" global>
	:local(.progress-bar-comp) {
		@apply w-full h-full bg-light-scrollBar rounded-full overflow-hidden relative;
	}

	:local(.bar) {
		@apply h-full rounded-full  transition-all;
	}

	:local(.primary-bar) {
		@apply bg-light-orangeShadeOne;
	}

	:local(.primary-bar-with-secondary) {
		@apply rounded-tl-full rounded-bl-full rounded-tr-none rounded-br-none;
	}

	:local(.secondary-bar) {
		@apply rounded-tl-none rounded-bl-none rounded-tr-full rounded-br-full absolute top-0 right-0;
	}
</style>
