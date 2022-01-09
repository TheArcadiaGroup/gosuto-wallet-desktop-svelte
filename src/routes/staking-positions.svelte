<script>
	import StakingPositionCard from '$components/StakingPositionCard/StakingPositionCard.svelte';
	let stakingCards = [
		{
			unstaked: true,
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
		{
			unstaked: true,
			walletName: 'Wallet 2',
			stakedAmount: 20,
			unlockedAmount: 5,
			percentage: 57,
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
		// 	unstaked: false,
		// 	walletName: 'Wallet 2',
		// 	stakedAmount: 20,
		// 	unlockedAmount: 5,
		// 	percentage: 100,
		// 	stakedOn: '1 Dec 2021',
		// 	unstakedOn: '2 Jan 2022',
		// 	unlockedOn: '6 Jan 2022',
		// 	rewardOn: ' 19 Dec 2021',
		// 	reclaimOn: '21 Dec 2021',
		// 	timeOne: '00:00:00:00',
		// 	timeTwo: '19:52:32:23',
		// 	totalTimeUntilReward: '00:00:00:00',
		// },

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

<!-- <div class="bg-gray-200"> -->
<div class="container mx-auto py-10 grid auto-cols-auto grid-cols-1 md:grid-cols-4 gap-10">
	{#each stakingCards as stakingPositionCard}
		<StakingPositionCard {...stakingPositionCard} />
	{/each}
</div>
<!-- </div> -->
