<script>
	import { Firework } from 'svelte-loading-spinners';

	export let size = 80;
	export let color = '#FF8266';
</script>

<div class="loading-wrapper">
	<Firework {size} {color} unit="px" duration="1s" />
</div>

<style>
	.loading-wrapper {
		@apply h-full w-full flex items-center justify-center;
	}
</style>
