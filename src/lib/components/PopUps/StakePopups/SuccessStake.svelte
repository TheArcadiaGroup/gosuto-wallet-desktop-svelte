<script lang="ts">
	import Popup from '$lib/components/Popup.svelte';

	export let amount = 0;
	export let isUnstaking = false;
</script>

<Popup title="Success!" on:confirm on:cancel>
	<p>
		Successfully {isUnstaking ? 'Unstaked' : 'Staked'}
		<span class="amount">
			{amount}
		</span>
		CSPR.
	</p>
</Popup>

<style lang="postcss" global>
	:local(p) {
		@apply text-sm mb-1 dark:text-white;
	}

	:local(.amount) {
		@apply text-lg font-bold text-light-purple;
	}
</style>
