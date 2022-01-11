<script lang="ts">
	import '$styles/tailwind.css';
	import { onMount } from 'svelte';
	import { initializeTheme } from '$utils/themeSettings';
	document.documentElement.classList.add('dark');
	localStorage.theme = 'dark';
	onMount(() => {
		initializeTheme();
	});
</script>

<main>
	<slot />
</main>
