<script lang="ts">
	import 'swiper/css';
	import 'swiper/css/navigation';
	import '$styles/tailwind.css';

	import momentScript from '$scripts/js/moment.js?url';
	import nodePackagesScript from '$scripts/js/nodePackages.js?url';

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

<svelte:head>
	<title>Gosuto</title>
	<script src={momentScript}></script>
	<script src={nodePackagesScript}></script>
</svelte:head>

<main>
	<slot />
</main>
