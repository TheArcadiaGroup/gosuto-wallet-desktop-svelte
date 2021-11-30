<script lang="ts">
	import { currentCount } from '$stores/counterStore';
	export let dark = '';
	$: dark;

	const toggle = () => {
		dark = 'dark';
	};
</script>

<button on:click={toggle}>
	<!-- Clicks: {$currentCount} -->
	Toggle
</button>

<style>
	button {
		@apply text-white px-3 py-1 hover:font-semibold;
		@apply bg-purple-500 rounded hover:bg-purple-700;
		font-variant-numeric: tabular-nums;
	}
</style>
