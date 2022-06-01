<script lang="ts">
	import { onMount } from 'svelte';
	import ProfileNavigation from '$pages/Profile/ProfileNavigation.svelte';
	import ArrowInCircle from '$lib/components/ArrowInCircle.svelte';
	import StakesFromWallet from '$lib/pages/Profile/Stake/StakesFromWallet.svelte';

	import ClaimReward from '$lib/pages/Profile/Stake/detail/ClaimReward.svelte';
	import UnlockInitialStake from '$lib/pages/Profile/Stake/detail/UnlockInitialStake.svelte';
	import Unstake from '$lib/pages/Profile/Stake/detail/Unstake.svelte';
	import TextSidebar from '$lib/components/TextSidebar.svelte';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';

	/**Object of all possible components for the stake detail column (the last column)*/
	const lastColumnContent = {
		claimReward: typeof ClaimReward,
		unlockInitialStake: typeof UnlockInitialStake,
		unstake: typeof Unstake,
	};

	// stake bind StakesFromWallet
	let selectedLastColumnContent: 'unstake' | 'claimReward' | 'unlockInitialStake' | null = null;
	let selectedStake: IStake | null = null;

	/**Handler for clicking back arrown in the last Column and closing the stake detail*/
	function closeStake() {
		selectedLastColumnContent = null;
		selectedStake = null;
	}

	/**Event handler for clicking a stake in StakesFromWallet component that shows the detail of that stake in the third column*/
	function selectStake(e: CustomEvent) {
		// selectedStake && closeStake();
		// selectedStake = e.detail;

		// TODO: change selectedLastColumnContent based on the state of the stake
		// DEV
		// selectedLastColumnContent = 'confirm';
		console.log(e.detail);
		selectedStake && closeStake();
		selectedStake = e.detail;

		// TODO: add tests for the different sidebars
		let unstakeSidebar: boolean = false;
		let unstakeProgressSidebar: boolean = false;
		let claimRewardSidebar: boolean = false;
		let unlockInitialStakeSidebar: boolean = false;

		if (unstakeSidebar) {
			selectedLastColumnContent = 'unstake';
			// allowUnstake = true;
		} else if (unstakeProgressSidebar) {
			selectedLastColumnContent = 'unstake';
			// allowUnstake = false;
		} else if (claimRewardSidebar) {
			selectedLastColumnContent = 'claimReward';
		} else if (unlockInitialStakeSidebar) {
			selectedLastColumnContent = 'unlockInitialStake';
		}
	}

	let stakeArray: IStake[] = [];

	onMount(() => {
		getData();
	});

	const getData = async () => {
		fetch('/api/all-stakes/all-positions')
			.then((response) => response.json())
			.then((response) => (stakeArray = response))
			.catch((error) => {
				console.error('error:', error);
			});
	};
</script>

<div class="main flex">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-left">
		<div class="size-full">
			<!-- feed the user profile data to ProfileNavigation component -->
			<ProfileNavigation />
		</div>
	</div>
	<div class="global-grid-mid size-full">
		{#if stakeArray.length > 0}
			<StakesFromWallet {stakeArray} bind:selectedStake />
		{/if}
	</div>
	<div class="global-grid-right">
		{#if selectedLastColumnContent}
			<div class="last-column-header">
				<div class="w-6 h-6">
					<ArrowInCircle disabled={false} on:click={closeStake} />
				</div>
				<div class="pb-1">Stake</div>
			</div>
			<div class="flex-grow">
				<svelte:component this={lastColumnContent[selectedLastColumnContent]} />
			</div>
		{:else}
			<TextSidebar>Select a stake for more information</TextSidebar>
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
