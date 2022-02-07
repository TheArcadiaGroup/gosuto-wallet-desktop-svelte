<script lang="ts">
	import GosutoLogoVertical from '$icons/GosutoLogoVertical.svelte';

	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';

	onMount(async () => {
		setTimeout(() => goto('/onboarding'), 1000);
	});
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
