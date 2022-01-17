<script>
	import StakingPositionCard from '$components/StakingPositionCard/StakingPositionCard.svelte';
	import GridLayout from '$lib/Common/GridLayout.svelte';

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
			timeOne: '19:12:53:27',
			timeTwo: '19:12:53:27',
			totalTimeUntilReward: '19:12:53:27',
		},
		{
			unstaked: true,
			walletName: 'Wallet 2',
			stakedAmount: 20,
			unlockedAmount: 5,
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
			unstaked: false,
			walletName: 'Wallet 3',
			stakedAmount: 20,
			unlockedAmount: 5,
			percentage: 50,
			stakedOn: '1 Dec 2021',
			unstakedOn: '2 Jan 2022',
			unlockedOn: '6 Jan 2022',
			rewardOn: ' 19 Dec 2021',
			reclaimOn: '21 Dec 2021',
			timeOne: '00:00:00:00',
			timeTwo: '19:52:32:23',
			totalTimeUntilReward: '19:12:53:27',
		},

		{
			unstaked: false,
			walletName: 'Wallet 4',
			stakedAmount: 20,
			unlockedAmount: 5,
			percentage: 100,
			stakedOn: '1 Dec 2021',
			unstakedOn: '2 Jan 2022',
			unlockedOn: '6 Jan 2022',
			rewardOn: ' 19 Dec 2021',
			reclaimOn: '21 Dec 2021',
			timeOne: '00:00:00:00',
			timeTwo: '00:00:00:00',
			totalTimeUntilReward: '00:00:00:00',
		},
		{
			unstaked: true,
			walletName: 'Wallet 5',
			stakedAmount: 20,
			unlockedAmount: 5,
			percentage: 100,
			stakedOn: '1 Dec 2021',
			unstakedOn: '2 Jan 2022',
			unlockedOn: '6 Jan 2022',
			rewardOn: ' 19 Dec 2021',
			reclaimOn: '21 Dec 2021',
			timeOne: '00:00:00:00',
			timeTwo: '00:00:00:00',
			totalTimeUntilReward: '00:00:00:00',
		},
	];
</script>

<div class="bg-gray-200">
	<GridLayout>
		<div slot="mid" class="mx-10 py-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
			{#each stakingCards as stakingPositionCard}
				<StakingPositionCard {...stakingPositionCard} />
			{/each}
		</div>
	</GridLayout>
</div>
