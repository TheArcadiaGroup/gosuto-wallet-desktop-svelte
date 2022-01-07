<script lang="ts">
	import '$styles/tailwind.css';
	import Navbar from '$components/navbar/Navbar.svelte';

	import { initializeTheme } from '$utils/themeSettings';
	import { onMount } from 'svelte';

	onMount(() => {
		initializeTheme();
	});
</script>

<main>
	<Navbar />
	<slot />
</main>
