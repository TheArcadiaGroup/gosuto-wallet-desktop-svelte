<!-- @component 
	Describtion:
	> A container (this component is used as a wrapper; has a slot) for individual items in the carousel. Is needed, so the carousel function properly and the scroll snapping works too.
	
	Slots:
	- `-` = General slot for the content of one item in the carousel.
-->
<script lang="ts">
	import { retrieveData, saveData } from '$utils/dataStorage';
	import { SwiperSlide } from 'swiper/svelte';

	export let i: number;
</script>

<!-- <div
	class="main"
	on:click={() => {
		saveData('defaultWalletIndex', (i + 1).toString());
	}}
> -->
<SwiperSlide class="main">
	<slot />
</SwiperSlide>

<!-- </div> -->
<style lang="postcss" global>
	:local(.main) {
		@apply w-full flex-shrink-0 flex items-center justify-center snap-center;
	}
</style>
