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
	import { Swiper } from 'swiper/svelte';
	import { Navigation } from 'swiper';
	import WalletSwitcherIcons from '$lib/components/ProfileNavigation/WalletSwitcherIcons.svelte';
</script>

<Swiper
	spaceBetween={5}
	slidesPerView={1}
	class="no-scrollbar carousel"
	modules={[Navigation]}
	navigation={{ nextEl: '.card-carousel-next', prevEl: '.card-carousel-prev' }}
	allowTouchMove={true}
>
	<slot />
</Swiper>

<div class="arrows">
	<div class="nav-arrows">
		<WalletSwitcherIcons direction="left" customClass="card-carousel-prev" />
		<WalletSwitcherIcons direction="right" customClass="card-carousel-next" />
	</div>
</div>

<style lang="postcss" global>
	/* Removing scrollbar */
	:local(.no-scrollbar) {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}

	:local(.no-scrollbar::-webkit-scrollbar) {
		display: none;
	}

	.carousel {
		@apply py-2 w-full relative px-1;
		/* // flex flex-row overflow-x-hidden snap-x md:px-1 */
	}

	:local(.not-on-mobile) {
		@apply hidden md:block;
	}

	:local(.arrows) {
		@apply h-6 w-full mt-4;
	}

	:local(.nav-arrows) {
		@apply w-full h-full flex flex-row items-center justify-center gap-2;
	}
</style>
