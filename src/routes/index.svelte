<script lang="ts">
	import QuickAction from '$lib/QuickAction.svelte';
	import WalletsContainer from '$lib/WalletsContainer.svelte';
</script>

<main>
	<section>
		<QuickAction />
	</section>
	<section>
		<WalletsContainer />
	</section>
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
		@apply flex justify-between;
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
