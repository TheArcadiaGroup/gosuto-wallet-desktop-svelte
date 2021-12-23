<script lang="ts">
	import Navbar from '$components/navbar/Navbar.svelte';
	import SplashScreenLoading from '$lib/components/splashScreen/SplashScreenLoading.svelte';
	import SplashScreenFinished from '$lib/components/splashScreen/SplashScreenFinished.svelte';

	import '$styles/tailwind.css';
</script>

<!-- <Navbar />  -->
<SplashScreenLoading />
<!-- <SplashScreenFinished /> -->
<slot />
