<script lang="ts">
	import '$styles/tailwind.css';
	import Navbar from '$components/navbar/Navbar.svelte';
	import { onMount } from 'svelte';
	import { initializeTheme, toggleDarkMode } from '$utils/themeSettings';

	onMount(() => {
		toggleDarkMode();
		initializeTheme();
	});
</script>

<Navbar />
<slot />
