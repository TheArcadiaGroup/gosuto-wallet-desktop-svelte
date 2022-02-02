<script lang="ts">
	import GridLayout from '$lib/Common/GridLayout.svelte';
	import ProfileNavigation from '$lib/profile/ProfileNavigation.svelte';
	import ArrowInCircle from '$lib/Common/ArrowInCircle.svelte';
	import StakesFromWallet from '$lib/profile/stake/StakesFromWallet.svelte';

	import Confirm from '$lib/profile/stake/detail/Confirm.svelte';
	import ClaimReward from '$lib/profile/stake/detail/ClaimReward.svelte';
	import UnlockInitialStake from '$lib/profile/stake/detail/UnlockInitialStake.svelte';
	import Unstake from '$lib/profile/stake/detail/Unstake.svelte';

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
</script>

<GridLayout>
	<div slot="first" class="size-full">
		<!-- feed the user profile data to ProfileNavigation component -->
		<ProfileNavigation />
	</div>
	<div slot="mid" class="size-full">
		<StakesFromWallet on:stakeSelect={stakeSelect} />
	</div>
	<div slot="last" class="size-full last-column">
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
			<div class="placeholder-text">Select a stake for more information</div>
		{/if}
	</div>
</GridLayout>

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
