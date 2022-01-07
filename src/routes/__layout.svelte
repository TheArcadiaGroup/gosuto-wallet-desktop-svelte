<script lang="ts">
	import '$styles/tailwind.css';
	import Navbar from '$components/navbar/Navbar.svelte';
	import { onMount } from 'svelte';
	import { initializeTheme } from '$utils/themeSettings';
	onMount(() => {
		initializeTheme();
	});
</script>

<main>
	<Navbar />
	<slot />
</main>
