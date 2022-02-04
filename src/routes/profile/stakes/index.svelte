<script lang="ts">
	import GridLayout from '$lib/Common/GridLayout.svelte';
	import ProfileNavigation from '$lib/Profile/ProfileNavigation.svelte';
	import ArrowInCircle from '$lib/Common/ArrowInCircle.svelte';
	import StakesFromWallet from '$lib/Profile/stake/StakesFromWallet.svelte';

	import Confirm from '$lib/Profile/stake/detail/Confirm.svelte';
	import ClaimReward from '$lib/Profile/stake/detail/ClaimReward.svelte';
	import UnlockInitialStake from '$lib/Profile/stake/detail/UnlockInitialStake.svelte';
	import Unstake from '$lib/Profile/stake/detail/Unstake.svelte';

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

<GridLayout>
	<div slot="first" class="size-full">
		<!-- feed the user profile data to ProfileNavigation component -->
		<ProfileNavigation {user} />
	</div>
	<div slot="mid" class="size-full">
		<StakesFromWallet on:stakeSelect={stakeSelect} {wallet} {stakeArray} />
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
