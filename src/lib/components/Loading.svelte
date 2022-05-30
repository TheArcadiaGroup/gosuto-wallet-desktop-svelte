<script>
	import { Firework, Diamonds } from 'svelte-loading-spinners';

	export let size = 80;
	export let color = '#FF8266';
	export let useFirework = true;
</script>

<div class="loading-wrapper {$$props.class}">
	{#if useFirework}
		<Firework {size} {color} unit="px" duration="1s" />
	{:else}
		<Diamonds {size} {color} unit="px" duration="1s" />
	{/if}
</div>

<style>
	.loading-wrapper {
		@apply h-full w-full flex items-center justify-center;
	}
</style>
