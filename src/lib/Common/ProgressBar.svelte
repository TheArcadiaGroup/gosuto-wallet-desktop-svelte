<script>
	export let value = 0;
</script>

<div class="main">
	<div class="bar" style="width: {value}%" />
</div>

<style lang="postcss" global>
	:local(.main) {
		@apply w-full h-full bg-light-scrollBar rounded-full overflow-hidden;
	}

	:local(.bar) {
		@apply h-full rounded-full bg-light-orangeShadeOne transition-all;
	}
</style>
