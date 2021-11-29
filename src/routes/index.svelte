<script lang="ts">
	import QuickAction from '$lib/QuickAction.svelte';
</script>

<main>
	<QuickAction />
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
		@apply absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2;
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
