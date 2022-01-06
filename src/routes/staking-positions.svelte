<script>
	import StakingPositionCard from '$components/StakingPositionCard/StakingPositionCard.svelte';
	let stakingCards = [
		{
			unstaked: false,
			walletName: 'Wallet 1',
			stakedAmount: 15,
			unlockedAmount: 20,
			percentage: 33,
			stakedOn: '1 Dec 2021',
			unstakedOn: '2 Jan 2022',
			unlockedOn: '6 Jan 2022',
			rewardOn: ' 19 Dec 2021',
			reclaimOn: '21 Dec 2021',
			timeOne: '00:00:00:00',
			timeTwo: '19:52:32:23',
			totalTimeUntilReward: '00:00:00:00',
		},
		// {
		// 	unstaked: true,
		// 	walletName: 'Wallet 2',
		// 	stakedAmount: 20,
		// 	unlockedAmount: 5,
		// 	percentage: 57,
		// 	stakedOn: '1 Dec 2021',
		// 	unstakedOn: '2 Jan 2022',
		// 	unlockedOn: '6 Jan 2022',
		// 	rewardOn: ' 19 Dec 2021',
		// 	reclaimOn: '21 Dec 2021',
		// 	timeOne: '00:00:00:00',
		// 	timeTwo: '19:52:32:23',
		// 	totalTimeUntilReward: '00:00:00:00',
		// },
	];
</script>

<!-- <div class="grid grid-cols-[{stakingCards.length}] gap-10 px-10 py-20 bg-gray-300"> -->
<div
	class="inline-grid grid-cols-4 grid-flow-col sm:grid-flow-row gap-10 px-10 py-20 bg-gray-300 overflow-x-scroll"
>
	{#each stakingCards as position}
		<StakingPositionCard {...position} />
	{/each}
</div>
