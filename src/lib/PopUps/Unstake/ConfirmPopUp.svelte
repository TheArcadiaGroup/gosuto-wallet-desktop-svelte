<script lang="ts">
	import Popup from '$lib/Common/Popup.svelte';
	import { convertDate, dateDifference } from '$utils';
	import { onDestroy } from 'svelte';

	export let amount: number = 15;
	export let stakedOn = new Date(2022, 0, 1, 16, 48, 39);
	export let rewardOn = new Date(2022, 1, 1, 3, 24, 45);

	let realtimeRemaining = dateDifference(rewardOn, new Date());

	let realtimeLoop = setInterval(function () {
		realtimeRemaining = dateDifference(rewardOn, new Date());
	}, 1000);

	onDestroy(() => {
		clearInterval(realtimeLoop);
	});
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
	<p class="total-time-until">Total Time Until Reward: {realtimeRemaining}</p>
	<p class="description">
		If you unstake this position, you will recieve you initial investment, but will forfeit you
		reward
	</p>
</Popup>

<style lang="postcss">
	p {
		@apply text-xs mb-1 font-bold;
	}

	.amount {
		@apply text-lg text-light-purple;
	}

	.highlight {
		@apply text-light-purple;
	}

	.description {
		@apply font-normal mx-4;
	}
</style>
