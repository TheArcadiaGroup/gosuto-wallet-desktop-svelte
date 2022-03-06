<script lang="ts">
	import Popup from '$lib/components/Popup.svelte';
	import { convertDate, dateDifference } from '$utils';
	import { onDestroy } from 'svelte';

	export let amount: number = 15;
	export let unlockedOn = new Date(2022, 0, 1, 16, 48, 39);
	export let rewardOn = new Date(2022, 1, 1, 3, 24, 45);

	let realtimeRemaining = dateDifference(rewardOn, new Date());

	let realtimeLoop = setInterval(function () {
		realtimeRemaining = dateDifference(rewardOn, new Date());
	}, 1000);

	onDestroy(() => {
		clearInterval(realtimeLoop);
	});
</script>

<Popup title="Are you sure you want to stake?" on:confirm on:cancel hasCancel={true}>
	<p class="amount">{amount} CSPR</p>
	<p class="time-until-date">This CSPR will be locked until {convertDate(unlockedOn)}</p>
	<p class="total-time-until">Total Time Until Reward: {realtimeRemaining}</p>
</Popup>

<style lang="postcss">
	p {
		@apply text-xs mb-1;
	}

	.amount {
		@apply text-lg font-bold text-light-purple;
	}

	.time-until-date {
		@apply font-semibold;
	}

	.total-time-until {
		@apply font-bold;
	}
</style>
