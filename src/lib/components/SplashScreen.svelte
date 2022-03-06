<script lang="ts">
	import GosutoLogoVertical from '$icons/GosutoLogoVertical.svelte';
	import { fade } from 'svelte/transition';
</script>

<div class="page" out:fade>
	<div class="logo">
		<GosutoLogoVertical />
	</div>
</div>

<style type="postcss">
	.page {
		@apply absolute inset-0;
		@apply bg-light-orange;
	}

	.logo {
		@apply absolute top-1/2 left-1/2;
		@apply -translate-x-1/2 -translate-y-1/2;
	}
</style>
