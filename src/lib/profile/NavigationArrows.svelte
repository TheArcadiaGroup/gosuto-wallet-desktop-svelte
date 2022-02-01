<!-- @component 
	Describtion:
	> Arrows (left and right) used for moving the card carousel in the first column of /profile routes on desktop.
	
	Props:
	- `carouselPositon` = Index of the postition of the card carousel. Is used for determining if the an arrow should be disabled.
	- `numberOfCards` = Size of the card array. Is used for determining if the `carouselPosition` is on a bordering index.

	Events:
	- `move` = Event is dispatched when one of the arrows is clicked. The direction ('left' or 'right') is passed in the detail of the event.
-->
<script lang="ts">
	import ArrowInCircle from '$lib/Common/ArrowInCircle.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let carouselPosition = 0; // index of the carousel in the card array
	export let numberOfCards: number; // size of the card array

	/**Handler for clicking one of the arrows that dispatches the `move` event with the according direction.*/
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
