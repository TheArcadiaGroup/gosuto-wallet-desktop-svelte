<script lang="ts">
	import Popup from '$lib/components/Popup.svelte';

	export let amount = 0;
</script>

<Popup title="Success!" on:confirm on:cancel>
	<p>
		Successfully delegated <span class="amount">
			{amount}
		</span>
		CSPR.
	</p>
</Popup>

<style lang="postcss" global>
	:local(p) {
		@apply text-xs mb-1 dark:text-white;
	}

	:local(.amount) {
		@apply text-lg font-bold text-light-purple;
	}
</style>
