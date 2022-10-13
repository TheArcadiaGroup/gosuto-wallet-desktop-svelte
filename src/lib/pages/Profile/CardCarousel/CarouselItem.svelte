<!-- @component 
	Describtion:
	> A container (this component is used as a wrapper; has a slot) for individual items in the carousel. Is needed, so the carousel function properly and the scroll snapping works too.
	
	Slots:
	- `-` = General slot for the content of one item in the carousel.
-->
<script lang="ts">
	import { SwiperSlide } from 'swiper/svelte';
</script>

<SwiperSlide class="carousel-item-wrapper">
	<slot />
</SwiperSlide>

<style lang="postcss" global>
	:local(.carousel-item-wrapper) {
		@apply w-full flex-shrink-0 flex items-center justify-center snap-center;
	}
</style>
