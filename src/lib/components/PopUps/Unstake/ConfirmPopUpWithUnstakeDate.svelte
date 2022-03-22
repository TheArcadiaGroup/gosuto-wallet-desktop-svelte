<script lang="ts">
	import Popup from '$lib/components/Popup.svelte';
	import { convertDate } from '$utils';

	export let amount: number = 15;
	export let stakedOn = new Date(2022, 0, 1, 16, 48, 39);
	export let unstakeOn = new Date(2022, 1, 1, 3, 24, 45);
</script>

<Popup
	title="Are you sure you want to unstake this position?"
	on:confirm
	on:cancel
	hasCancel={true}
>
	<p class="amount">{amount} CSPR</p>
	<p class="staked-on">
		Staked on <span class="highlight">{convertDate(stakedOn)}</span>
	</p>
	<p class="total-time-until">
		Unstaking will take until <span class="highlight">{convertDate(unstakeOn)}</span>
	</p>
</Popup>

<style lang="postcss">
	p {
		@apply text-xs mb-1 font-bold;
	}

	.amount {
		@apply text-lg text-light-purple;
	}

	.staked-on > .highlight {
		@apply text-light-purple;
	}

	.total-time-until > .highlight {
		@apply text-light-orange;
	}
</style>
