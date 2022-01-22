<script>
	import { swipe } from 'svelte-gestures';
	import NavigationArrows from './NavigationArrows.svelte';
	let direction;
	let target;

	export let position = 0;
	export let numberOfCards = 1; // TODO this will be later the length of an array with cards

	function handler(e) {
		e.detail.direction = e.detail.direction === 'right' ? -1 : 1;
		moveCardCarousel(e);
	}

	function moveCardCarousel(e) {
		const direction = e.detail.direction;
		if (position + direction >= 0 && position + direction < numberOfCards) {
			position += direction;
		}
	}

	$: console.log('position', position);
</script>

<div
	class="w-full flex flex-row overflow-x-visible snap-x md:px-1 md:gap-2 no-scrollbar py-2 transition-all duration-1000 carousel"
	style="--scroll: translateX({-position * 100}%);"
	use:swipe={{ timeframe: 300, minSwipeDistance: 60 }}
	on:swipe={handler}
>
	<div class="w-full flex-shrink-0 flex items-center justify-center snap-center">
		<slot />
	</div>
</div>

<div class="h-6 w-full mt-4 not-on-mobile">
	<NavigationArrows on:move={moveCardCarousel} carouselPosition={position} {numberOfCards} />
</div>

<style lang="postcss" global>
	:local(.no-scrollbar) {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}

	:local(.no-scrollbar)::-webkit-scrollbar {
		display: none;
	}

	:local(.carousel) {
		transform: var(--scroll);
	}

	:local(.not-on-mobile) {
		@apply hidden md:block;
	}
</style>
