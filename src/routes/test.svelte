<script lang="ts">
	import GridLayout from '$lib/Common/GridLayout.svelte';
</script>

<GridLayout>
	<div slot="first" class="first">First</div>
	<div slot="mid" class="mid">Mid</div>
	<div slot="last" class="last">Last</div>
</GridLayout>

<style lang="postcss">
	.first {
		@apply bg-light-red h-full;
	}
	.mid {
		@apply bg-light-orange h-full;
	}
	.last {
		@apply bg-light-purple h-full;
	}
</style>
