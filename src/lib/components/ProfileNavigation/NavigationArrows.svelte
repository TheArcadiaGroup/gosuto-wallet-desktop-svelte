<script lang="ts">
	import ArrowInCircle from '$lib/Common/ArrowInCircle.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let carouselPosition = 0;
	export let numberOfCards: number;

	function moveWallets(e: CustomEvent) {
		dispatch('move', { direction: e.detail.direction === 'right' ? 1 : -1 });
	}
</script>

<div class="main">
	<ArrowInCircle direction="left" disabled={!(carouselPosition > 0)} on:click={moveWallets} />
	<ArrowInCircle
		direction="right"
		disabled={!(carouselPosition < numberOfCards - 1)}
		on:click={moveWallets}
	/>
</div>

<style lang="postcss" global>
	:local(.main) {
		@apply w-full h-full flex flex-row items-center justify-center gap-2;
	}
</style>
