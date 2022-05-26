<script lang="ts">
	import Popup from '$lib/components/Popup.svelte';
	// import { convertDate, dateDifference } from '$utils';
	// import { onDestroy } from 'svelte';

	export let amount: number = 0;
	// export let unlockedOn: Date | null = null;
	// export let rewardOn: Date | null = null;

	// let realtimeRemaining = dateDifference(rewardOn || new Date(), new Date());

	// let realtimeLoop = setInterval(function () {
	// 	realtimeRemaining = dateDifference(rewardOn || new Date(), new Date());
	// }, 1000);

	// onDestroy(() => {
	// 	clearInterval(realtimeLoop);
	// });
</script>

<Popup title="Are you sure you want to stake?" on:confirm on:cancel hasCancel={true}>
	<p class="amount">{amount} CSPR</p>
	<!-- <p class="time-until-date">
		Your CSPR will be locked until {convertDate(unlockedOn || new Date())}
	</p>
	<p class="total-time-until">Total Time Until Reward: {realtimeRemaining}</p> -->
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
