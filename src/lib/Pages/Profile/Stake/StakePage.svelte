<script lang="ts">
	import ProfileNavigation from '$lib/pages/Profile/ProfileNavigation.svelte';
	import ArrowInCircle from '$lib/components/ArrowInCircle.svelte';
	import StakesFromWallet from '$lib/pages/Profile/Stake/StakesFromWallet.svelte';
	import StakeToken from '$lib/Pages/Profile/Stake/detail/StakeToken.svelte';
	import ClaimReward from '$lib/pages/Profile/Stake/detail/ClaimReward.svelte';
	import UnlockInitialStake from '$lib/pages/Profile/Stake/detail/UnlockInitialStake.svelte';
	import Unstake from '$lib/pages/Profile/Stake/detail/Unstake.svelte';
	import TextSidebar from '../../../components/TextSidebar.svelte';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';

	/**Object of all possible components for the stake detail column (the last column)*/
	const lastColumnContent: {
		confirm: typeof StakeToken;
		claimReward: typeof ClaimReward;
		unlockInitialStake: typeof UnlockInitialStake;
		unstake: typeof Unstake;
	} = {
		confirm: StakeToken,
		claimReward: ClaimReward,
		unlockInitialStake: UnlockInitialStake,
		unstake: Unstake,
	};

	// stake bind StakesFromWallet
	let selectedLastColumnContent:
		| 'unstake'
		| 'claimReward'
		| 'unlockInitialStake'
		| 'confirm'
		| null = null;
	let selectedStake: any = null;

	let allowUnstake = false;

	/**Handler for clicking back arrown in the last collumn and closing the stake detail*/
	function closeStake() {
		selectedLastColumnContent = null;
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
			selectedLastColumnContent = 'unstake';
			allowUnstake = true;
		} else if (unstakeProgressSidebar) {
			selectedLastColumnContent = 'unstake';
			allowUnstake = false;
		} else if (claimRewardSidebar) {
			selectedLastColumnContent = 'claimReward';
		} else if (unlockInitialStakeSidebar) {
			selectedLastColumnContent = 'unlockInitialStake';
		}
	}

	function addStake(e: CustomEvent) {
		selectedLastColumnContent = 'confirm';
	}

	export let stakeArray: IStake[];
</script>

<div class="flex main">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-left">
		<ProfileNavigation />
	</div>
	<div class="global-grid-mid">
		{#if stakeArray}
			<StakesFromWallet on:stakeSelect={stakeSelect} on:addStake={addStake} {stakeArray} />
		{/if}
	</div>
	<div class="global-grid-right">
		<div class="size-full last-column">
			{#if selectedLastColumnContent}
				{#if selectedLastColumnContent !== 'confirm'}
					<div class="last-column-header">
						<div class="w-6 h-6">
							<ArrowInCircle disabled={false} on:click={closeStake} />
						</div>
					</div>
				{/if}
				<div class="flex-grow">
					<svelte:component
						this={lastColumnContent[selectedLastColumnContent]}
						disabled={allowUnstake}
						on:cancelStake={() => (selectedLastColumnContent = null)}
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
