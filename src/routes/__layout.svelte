<script lang="ts">
	import '$styles/tailwind.css';
	import { onMount } from 'svelte';
	import { initializeTheme } from '$utils/themeSettings';
	document.documentElement.classList.add('light');
	localStorage.theme = 'light';
	onMount(() => {
		initializeTheme();
	});
</script>

<main>
	<slot />
</main>
