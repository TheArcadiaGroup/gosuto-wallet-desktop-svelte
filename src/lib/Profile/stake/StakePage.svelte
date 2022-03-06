<script lang="ts">
	import ProfileNavigation from '$lib/Profile/ProfileNavigation.svelte';
	import ArrowInCircle from '$lib/Common/ArrowInCircle.svelte';
	import StakesFromWallet from '$lib/Profile/stake/StakesFromWallet.svelte';

	import Confirm from '$lib/Profile/stake/detail/Confirm.svelte';
	import ClaimReward from '$lib/Profile/stake/detail/ClaimReward.svelte';
	import UnlockInitialStake from '$lib/Profile/stake/detail/UnlockInitialStake.svelte';
	import TextSidebar from '$components/Profile/TextSidebar.svelte';
	import Unstake from '$lib/Profile/stake/detail/Unstake.svelte';
	import Navbar from '$components/Navbar/Navbar.svelte';

	import { onMount } from 'svelte';
	import { retrieveData } from '$utils/dataStorage';
	import { selectedWallet } from '$stores/user/wallets';

	let user: IUser;

	/**Object of all possible components for the stake detail column (the last column)*/
	const lastCollumnContent = {
		confirm: Confirm,
		claimReward: ClaimReward,
		unlockInitialStake: UnlockInitialStake,
		unstake: Unstake,
	};

	// stake bind StakesFromWallet
	let selectedLastCollumnContent: any = null;
	let selectedStake: any = null;

	let allowUnstake = false;

	/**Handler for clicking back arrown in the last collumn and closing the stake detail*/
	function closeStake() {
		selectedLastCollumnContent = null;
		selectedStake.closeStake();
		selectedStake = null;
	}

	/**Event handler for clicking a stake in StakesFromWallet component that shows the detail of that stake in the third column*/
	function stakeSelect(e: CustomEvent) {
		selectedStake && closeStake();
		selectedStake = e.detail;

		// TODO: add tests for the different sidebars
		let unstakeSidebar: boolean = false;
		let unstakeProgressSidebar: boolean = false;
		let claimRewardSidebar: boolean = false;
		let unlockInitialStakeSidebar: boolean = false;

		if (unstakeSidebar) {
			selectedLastCollumnContent = 'unstake';
			allowUnstake = true;
		} else if (unstakeProgressSidebar) {
			selectedLastCollumnContent = 'unstake';
			allowUnstake = false;
		} else if (claimRewardSidebar) {
			selectedLastCollumnContent = 'claimReward';
		} else if (unlockInitialStakeSidebar) {
			selectedLastCollumnContent = 'unlockInitialStake';
		}
	}

	function addStake(e: CustomEvent) {
		selectedLastCollumnContent = 'confirm';
		console.log('selectedLastCollumnContent:', selectedLastCollumnContent);
	}

	export let stakeArray: IStake[] = Array(10).fill({
		parentWallet: $selectedWallet?.walletName,
		stakeAmount: 420,
		unstakeDatetime: new Date(2021, 11, 17),
		unstakeCountdown: Math.abs(new Date(2020, 12, 17) - new Date(2019, 11, 17)),
		reclamationDate: new Date(2020, 12, 17),
		initialStakeDate: new Date(2019, 11, 17),
		rewardDate: new Date(2022, 11, 17),
		rewardCountdown: Math.abs(new Date(2022, 11, 17) - new Date(2019, 11, 17)),
		reward: 420,
		unlocked: 84,
		stakePercent: 0.8,
		parentWalletAddress: $selectedWallet?.walletAddress,
	});

	onMount(() => {
		// Retrieve the selected profile off the user
		user = (retrieveData('user') as IUser) || {
			name: 'Unknown User',
			avatar: '',
			email: '',
			wallets: (retrieveData('wallets') as IWallet[]) || [],
		};
	});
</script>

<div class="flex main">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-left">
		<div class="size-full">
			<!-- feed the user profile data to ProfileNavigation component -->
			<ProfileNavigation {user} />
		</div>
	</div>
	<div class="global-grid-mid size-full">
		<StakesFromWallet
			on:stakeSelect={stakeSelect}
			on:addStake={addStake}
			wallet={$selectedWallet}
			{stakeArray}
		/>
	</div>
	<div class="global-grid-right">
		<div class="size-full last-column">
			{#if selectedLastCollumnContent}
				<div class="last-column-header">
					<div class="w-6 h-6">
						<ArrowInCircle disabled={false} on:click={closeStake} />
					</div>
					<div class="pb-1">Stake</div>
				</div>
				<div class="pb-1">Stake</div>
				<div class="flex-grow">
					<svelte:component
						this={lastCollumnContent[selectedLastCollumnContent]}
						disabled={allowUnstake}
					/>
				</div>
			{:else}
				<TextSidebar>Select a stake for more information</TextSidebar>
			{/if}
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.placeholder-text) {
		@apply w-full h-full;
		@apply grid place-content-center;
		@apply text-light-grey text-xs;
	}

	:local(.main) {
		@apply dark:bg-dark-grey;
	}

	:local(.size-full) {
		@apply w-full h-full md:overflow-y-hidden;
	}

	:local(.last-column) {
		@apply flex flex-col items-stretch;
		@apply py-8 px-6;
	}

	:local(.last-column-header) {
		@apply flex flex-row items-center gap-2 dark:text-white text-sm;
	}
</style>
