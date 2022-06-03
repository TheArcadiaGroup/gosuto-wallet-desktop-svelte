<script lang="ts">
	import ErrorIcon from '$icons/ErrorIcon.svelte';

	import Popup from '$lib/components/Popup.svelte';

	export let amount: number = 0;
</script>

<Popup title={'Are you sure you want to unstake?'} on:confirm on:cancel hasCancel={true}>
	<p class="amount">{amount} CSPR</p>
	<div class="dark:text-white break-words opacity-50 text-2xs my-3">
		<div class="flex flex-row items-center justify-center bold">
			<ErrorIcon class="mr-1" fill={'#f1bf0b'} /> PLEASE NOTE!
		</div>
		<div>
			There is a 7 era delay to undelegate. Era duration is approximately 120 minutes. Once done,
			the undelegated funds will appear in your wallet.
		</div>
	</div>
</Popup>

<style lang="postcss">
	p {
		@apply text-sm mb-1;
	}

	.amount {
		@apply text-lg font-bold text-light-purple;
	}
</style>
