<!-- @component 
	Describtion:
	> Carousel for card in the first column of /profile routes. Includes arrows for switching them and supports swiping on mobile.
	
	Props:
	- `position` = Index in the array of cards.
	- `numberOfCard` = Size of the array with cards. Used for checking if moving the carousel will end up behind boundaries.

	Bindables:
	- `position` = Index in the array of cards.
-->
<script>
	import { swipe } from 'svelte-gestures';
	import NavigationArrows from '../NavigationArrows.svelte';

	export let position = 0; // position of the carousel
	export let numberOfCards = 0; // number of cards in the carousel

	/**Handler for siwping left or right on the carousel on mobile*/
	function handler(e) {
		e.detail.direction = e.detail.direction === 'right' ? -1 : 1;
		moveCardCarousel(e);
	}

	/**Function that moves the cards in the carousel only, if the move wont end up behind boundaires.*/
	function moveCardCarousel(e) {
		const direction = e.detail.direction;
		if (position + direction >= 0 && position + direction < numberOfCards) {
			position += direction;
		}
	}
</script>

<div
	class="no-scrollbar carousel"
	style="--scroll: translateX({-position * 100}%);"
	use:swipe={{ timeframe: 300, minSwipeDistance: 60 }}
	on:swipe={handler}
>
	<slot />
</div>

{#if numberOfCards > 1}
	<div class="arrows not-on-mobile">
		<NavigationArrows on:move={moveCardCarousel} carouselPosition={position} {numberOfCards} />
	</div>
{/if}

<style lang="postcss" global>
	/* Removing scrollbar */
	:local(.no-scrollbar) {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}

	:local(.no-scrollbar)::-webkit-scrollbar {
		display: none;
	}

	:local(.carousel) {
		@apply py-2 transition-all duration-1000 w-full flex flex-row overflow-x-visible snap-x md:px-1 md:gap-2;
		/* Using a CSS variable to move the items in the carousel via transform property */
		transform: var(--scroll);
	}

	:local(.not-on-mobile) {
		@apply hidden md:block;
	}

	:local(.arrows) {
		@apply h-6 w-full mt-4;
	}
</style>
