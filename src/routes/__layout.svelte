<script lang="ts">
	import 'swiper/css';
	import 'swiper/css/navigation';
	import '$styles/tailwind.css';

	import { onMount } from 'svelte';

	import { initializeTheme } from '$utils/themeSettings';
	import pollyfillData from '$utils/pollyfillData';
	import globalListeners from '$utils/globalListeners';

	onMount(async () => {
		initializeTheme();

		// Global Listeners
		globalListeners();

		// Fetch and add data to stores
		pollyfillData();
	});
</script>

<main>
	<slot />
</main>
