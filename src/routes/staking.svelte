<script lang="ts">
	import StakingPositionCard from '$lib/components/StakingPositionCard/StakingPositionCard.svelte';
	let stakingPositionCard = {
		walletName: 'Wallet 1',
		tokenAmount: 15,
		percentage: 50,
		stakingDate: '1 Dec 2021',
		unlockedOn: '1 Dec 2021',
		rewardOn: '1 Dec 2021',
		totalTimeUntilReward: '19:12:53:27',
	};
</script>

<!-- <div class="grid grid-cols-1"> -->
<div class="flex flex-col md:flex-row items-center justify-center gap-8 w-full h-screen">
	<StakingPositionCard {...stakingPositionCard} />
	<!-- <StakingPositionCard {...stakingPositionCard} /> -->
</div>
<!-- </div> -->
