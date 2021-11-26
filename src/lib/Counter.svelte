<script lang="ts">
	import { currentCount } from '$stores/counterStore';

	const increment = () => {
		currentCount.update((e) => e + 1);
	};
</script>

<button on:click={increment}>
	Clicks: {$currentCount}
</button>

<style>
	button {
		@apply text-white px-3 py-1 hover:font-semibold;
		@apply bg-purple-500 rounded hover:bg-purple-700;
		font-variant-numeric: tabular-nums;
	}
</style>
