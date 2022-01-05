<script lang="ts">
	import '$styles/tailwind.css';
	import Navbar from '$components/navbar/Navbar.svelte';
	import { onMount } from 'svelte';
	import { initializeTheme, toggleDarkMode } from '$utils/themeSettings';

	onMount(() => {
		//TODO Remove the dark theme setting here and use the universal theme.
		document.documentElement.classList.add('dark');
		localStorage.theme = 'dark';
		initializeTheme();
	});
</script>

<Navbar />
<slot />
