<script lang="ts">
	import StakingPositionCard from '$lib/components/StakingPositionCard/StakingPositionCard.svelte';
	let stakingPositionCards = [
		{
			unstaked: false,
			walletName: 'Wallet 1',
			tokenAmount: 15,
			percentage: 50,
			stakedOn: '1 Dec 2021',
			unstakedOn: '1 Dec 2021',
			unlockedOn: '1 Dec 2021',
			rewardOn: '1 Dec 2021',
			reclaimOn: '1 Dec 2021',
			totalTimeUntilReward: '19:12:53:27',
		},
		{
			unstaked: false,
			walletName: 'Wallet 2',
			tokenAmount: 15,
			percentage: 33,
			stakedOn: '1 Dec 2021',
			unstakedOn: '1 Dec 2021',
			unlockedOn: '1 Dec 2021',
			rewardOn: '1 Dec 2021',
			reclaimOn: '1 Dec 2021',
			totalTimeUntilReward: '19:12:53:27',
		},
		{
			unstaked: true,
			walletName: 'Wallet 3',
			tokenAmount: 15,
			percentage: 50,
			stakedOn: '1 Dec 2021',
			unstakedOn: '1 Dec 2021',
			unlockedOn: '1 Dec 2021',
			rewardOn: '1 Dec 2021',
			reclaimOn: '1 Dec 2021',
			totalTimeUntilReward: '19:12:53:27',
		},
		{
			unstaked: true,
			walletName: 'Wallet 4',
			tokenAmount: 15,
			percentage: 100,
			stakedOn: '1 Dec 2021',
			unstakedOn: '1 Dec 2021',
			unlockedOn: '1 Dec 2021',
			rewardOn: '1 Dec 2021',
			reclaimOn: '1 Dec 2021',
			totalTimeUntilReward: '19:12:53:27',
		},
	];
</script>

<div class="bg-gray-200">
	<div class="container mx-auto w-full py-10 grid gap-10 md:grid-cols-2">
		<!-- <div
	class="flex flex-col md:flex-row items-center justify-center gap-8 w-full h-screen bg-gray-200"
> -->
		{#each stakingPositionCards as stakingPositionCard}
			<StakingPositionCard {...stakingPositionCard} />
		{/each}
	</div>
	<!-- </div> -->
</div>
