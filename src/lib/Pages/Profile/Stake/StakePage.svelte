<script lang="ts">
	import GridLayout from '$lib/Components/GridLayout.svelte';
	import ProfileNavigation from '$lib/Pages/Profile/ProfileNavigation.svelte';
	import ArrowInCircle from '$lib/Components/ArrowInCircle.svelte';
	import StakesFromWallet from '$lib/Pages/Profile/Stake/StakesFromWallet.svelte';

	import Confirm from '$lib/Pages/Profile/Stake/detail/Confirm.svelte';
	import ClaimReward from '$lib/Pages/Profile/Stake/detail/ClaimReward.svelte';
	import UnlockInitialStake from '$lib/Pages/Profile/Stake/detail/UnlockInitialStake.svelte';
	import Unstake from '$lib/Pages/Profile/Stake/detail/Unstake.svelte';

	import Navbar from '$lib/Components/Navbar/Navbar.svelte';

	import { page } from '$app/stores';

	$: slug = $page.params.slug;
	// Show a specific profile page based on slug

	// wallet bind on profile navigation component

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

	// DEV
	const user = {
		name: 'Jake Waterson',
		ppurl: 'https://miro.medium.com/fit/c/262/262/2*-cdwKPXyVI0ejgxpWkKBeA.jpeg',
		wallets: [
			{
				name: 'Wallet 1',
				avalible: 5000,
				staked: 2500,
				unclaimed: 375,
			},
			{
				name: 'Wallet 1',
				avalible: 5000,
				staked: 2500,
				unclaimed: 375,
			},
		],
	};

	export let wallet = {
		name: 'Wallet 1',
		publicKey: '0x9f98e01d2...4ed7',
	};

	export let stakeArray = Array(10).fill({
		name: wallet?.name,
		elapsedSeconds: 20,
		fullSeconds: 69,
		unstaked: false,
		staked: 420,
		unlocked: 0,
		rewards: 0,
	});
</script>

<div class="main flex">
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
		<StakesFromWallet on:stakeSelect={stakeSelect} on:addStake={addStake} {wallet} {stakeArray} />
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
				<div class="placeholder-text">Select a stake for more information</div>
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
