<script lang="ts">
	import GridLayout from '$lib/components/GridLayout.svelte';
	import ProfileNavigation from '$pages/Profile/ProfileNavigation.svelte';
	import ArrowInCircle from '$lib/components/ArrowInCircle.svelte';
	import StakesFromWallet from '$lib/pages/Profile/Stake/StakesFromWallet.svelte';

	import Confirm from '$lib/pages/Profile/Stake/detail/Confirm.svelte';
	import ClaimReward from '$lib/pages/Profile/Stake/detail/ClaimReward.svelte';
	import UnlockInitialStake from '$lib/pages/Profile/Stake/detail/UnlockInitialStake.svelte';
	import Unstake from '$lib/pages/Profile/Stake/detail/Unstake.svelte';
	import TextSidebar from '$lib/components/TextSidebar.svelte';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
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

		// TODO: change selectedLastCollumnContent based on the state of the stake
		// DEV
		selectedLastCollumnContent = 'confirm';
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

	const wallet = {
		name: 'Wallet 1',
		publicKey: '0x9f98e01d2...4ed7',
	};

	const stakeArray = Array(10).fill({
		name: wallet?.name,
		elapsedSeconds: 20,
		fullSeconds: 69,
		staked: 420,
		unlocked: 69,
	});
</script>

<div class="main flex">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-left">
		<div class="size-full">
			<!-- feed the user profile data to ProfileNavigation component -->
			<ProfileNavigation forRoute={'all-stakes'} {user} />
		</div>
	</div>
	<div class="global-grid-mid size-full">
		<StakesFromWallet forRoute={'all-stakes'} on:stakeSelect={stakeSelect} {wallet} {stakeArray} />
	</div>
	<div class="global-grid-right">
		{#if selectedLastCollumnContent}
			<div class="last-column-header">
				<div class="w-6 h-6">
					<ArrowInCircle disabled={false} on:click={closeStake} />
				</div>
				<div class="pb-1">Stake</div>
			</div>
			<div class="flex-grow">
				<svelte:component this={lastCollumnContent[selectedLastCollumnContent]} />
			</div>
		{:else}
			<TextSidebar>Select currency you want to swap</TextSidebar>
		{/if}
	</div>
</div>

<style lang="postcss" global>
	:local(.placeholder-text) {
		@apply w-full h-full;
		@apply grid place-content-center;
		@apply text-light-grey text-xs;
	}

	:local(.size-full) {
		@apply w-full h-full;
	}

	:local(.last-column) {
		@apply flex flex-col items-stretch;
		@apply py-8 px-6;
	}

	:local(.last-column-header) {
		@apply flex flex-row items-center gap-2 dark:text-white text-sm;
	}
</style>
