<script lang="ts">
	import '$styles/tailwind.css';

	import { onMount } from 'svelte';

	import { initializeTheme } from '$utils/themeSettings';
	import pollyfillData from '$utils/pollyfillData';

	onMount(async () => {
		initializeTheme();

		// Fetch and add data to stores
		pollyfillData();
	});
</script>

<main>
	<slot />
</main>
