<script lang="ts">
	import '$styles/tailwind.css';
	import { fade } from 'svelte/transition';
	import { darkOverlay } from '$stores/popupStore';
</script>

<main>
	{#if $darkOverlay}
		<div transition:fade class="darker" />
	{/if}
	<slot />
</main>

<style lang="postcss">
	.darker {
		@apply fixed top-0 bottom-0 left-0 right-0 z-30 bg-[#00000077];
	}
</style>
