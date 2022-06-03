<script lang="ts">
	import ImportFromSeedPhrase from '$lib/pages/AddWallet/ImportFromSeedPhrase/ImportFromSeedPhrase.svelte';
</script>

<div class="import-seed-content-wrapper">
	<ImportFromSeedPhrase />
</div>

<style type="postcss" global>
	:local(.import-seed-content-wrapper) {
		@apply absolute inset-0 overflow-auto;
		@apply grid;
		@apply dark:bg-dark-gosutoDark;
	}
</style>
