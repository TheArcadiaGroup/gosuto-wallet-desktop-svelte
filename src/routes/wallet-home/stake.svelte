<script lang="ts">
	import GridLayout from '$lib/Common/GridLayout.svelte';
	import LandingPage from '$lib/WalletHome/LandingPage/LandingPage.svelte';
	import ActionPanel from '$lib/WalletHome/ActionPanel/ActionPanel.svelte';
	import StakeForm from '$lib/WalletHome/ActionPanel/StakeForm.svelte';
	let wallet = {
		walletName: 'Wallet 1',
		walletAddress: '0x5645gj4ju6kh47kkh7884kk74k43jt774',
		stakePositions: [
			{
				unstaked: false,
				walletName: 'Wallet 1',
				stakedAmount: 15,
				unlockedAmount: 15,
				percentage: 33,
				stakedOn: '1 Dec 2021',
				unstakedOn: '1 Dec 2021',
				unlockedOn: '1 Dec 2021',
				rewardOn: '1 Dec 2021',
				reclaimOn: '1 Dec 2021',
				timeOne: '19.12:53:27',
				timeTwo: '19.12:53:27',
				totalTimeUntilReward: '19.12:53:27',
			},
			{
				unstaked: false,
				walletName: 'Wallet 1',
				stakedAmount: 15,
				unlockedAmount: 15,
				percentage: 50,
				stakedOn: '1 Dec 2021',
				unstakedOn: '1 Dec 2021',
				unlockedOn: '1 Dec 2021',
				rewardOn: '1 Dec 2021',
				reclaimOn: '1 Dec 2021',
				timeOne: '19.12:53:27',
				timeTwo: '19.12:53:27',
				totalTimeUntilReward: '19.12:53:27',
			},
			{
				unstaked: false,
				walletName: 'Wallet 1',
				stakedAmount: 15,
				unlockedAmount: 15,
				percentage: 100,
				stakedOn: '1 Dec 2021',
				unstakedOn: '1 Dec 2021',
				unlockedOn: '1 Dec 2021',
				rewardOn: '1 Dec 2021',
				reclaimOn: '1 Dec 2021',
				timeOne: '19.12:53:27',
				timeTwo: '19.12:53:27',
				totalTimeUntilReward: '19.12:53:27',
			},
		],
	};
</script>

<GridLayout>
	<div slot="first" class="bg-gray-200 h-screen">First</div>
	<div slot="mid">
		<LandingPage {...wallet} />
	</div>
	<div slot="last" class="first">
		<ActionPanel>
			<StakeForm />
		</ActionPanel>
	</div>
</GridLayout>
