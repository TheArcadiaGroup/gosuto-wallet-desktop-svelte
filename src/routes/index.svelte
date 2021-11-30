<script lang="ts">
	import Dotbar from '$lib/Dotbar.svelte';
	import SplashScreen from '$lib/SplashScreen.svelte';
	import TemporyContent from '$lib/TemporyContent.svelte';

	let dark = '';
	let status = false;
	$: status;
	$: status ? (dark = 'dark') : (dark = '');
</script>

<main>
	<SplashScreen />
	<div class={dark}>
		<div class="z-10 w-screen h-screen dark:bg-gray-700 overflow-hidden">
			<Dotbar />
			<TemporyContent />
		</div>
	</div>
</main>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}

	main {
		@apply text-center mx-auto my-0;
		animation: fade 1s;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
