<script lang="ts">
	import Counter from '$lib/Counter.svelte';
	import Dotbar from '$lib/Dotbar.svelte';
	import Logo from '$lib/Logo.svelte';
	import NewToGosuto from '$lib/NewToGosuto.svelte';
	import RoundedButton from '$lib/RoundedButton.svelte';

	import SplashScreen from '$lib/SplashScreen.svelte';
	import TemporyContent from '$lib/TemporyContent.svelte';
	import Toggle from '$lib/Toggle.svelte';
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

<!-- <div class="w-screen flex justify-end pr-5">
			<Toggle bind:DarkModeStatus={status} />
		</div> -->

<!-- <NewToGosuto /> -->
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
		/* @apply absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2; */
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
