<script lang="ts">
	import '$styles/tailwind.css';

	import { onMount } from 'svelte';

	import { initializeTheme } from '$utils/themeSettings';

	onMount(() => {
		initializeTheme();
	});
</script>

<main>
	<slot />
</main>
