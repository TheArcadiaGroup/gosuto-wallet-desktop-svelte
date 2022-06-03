<script lang="ts">
	import SuccessIcon from '$icons/SuccessIcon.svelte';

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
	<div class="popup-text opacity-50 text-2xs my-3">
		<div class="flex flex-row items-center justify-center bold">
			<SuccessIcon class="mr-1" fill={'#31de90'} /> Successfully {isUnstaking
				? 'Unstaked'
				: 'Staked'}!
		</div>
		<div>
			After the transaction has been included in a block. Your will appear in your history {isUnstaking
				? ''
				: 'and on the stakes list.'}
		</div>
	</div>
</Popup>

<style lang="postcss" global>
	:local(p) {
		@apply text-sm mb-1 dark:text-white;
	}

	:local(.amount) {
		@apply text-lg font-bold text-light-purple;
	}
</style>
