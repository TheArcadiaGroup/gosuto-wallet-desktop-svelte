<script lang="ts">
	import ProfileNavigation from '$lib/pages/Profile/ProfileNavigation.svelte';
	import ArrowInCircle from '$lib/components/ArrowInCircle.svelte';
	import StakesFromWallet from '$lib/pages/Profile/Stake/StakesFromWallet.svelte';
	import StakeToken from '$lib/pages/Profile/Stake/detail/StakeToken.svelte';
	import Unstake from '$lib/pages/Profile/Stake/detail/Unstake.svelte';
	import TextSidebar from '../../../components/TextSidebar.svelte';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import ConfirmStake from '$components/PopUps/StakePopups/ConfirmStake.svelte';

	import { selectedWallet, wallets } from '$stores/user/wallets';
	import { delegate, undelegate } from '$utils/staking';
	import { user } from '$stores/user';
	import Popup from '$lib/components/Popup.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { stakeCsprTracker, unStakeCsprTracker } from '$stores/activityLoaders';
	import FailedStake from '$lib/components/PopUps/StakePopups/FailedStake.svelte';
	import SuccessStake from '$lib/components/PopUps/StakePopups/SuccessStake.svelte';
	import { page } from '$app/stores';
	import ConfirmUnStake from '$lib/components/PopUps/StakePopups/ConfirmUnStake.svelte';
	import { checkLockStatus } from '$utils/profiles';
	import { goto } from '$app/navigation';

	// Popup
	let popup:
		| 'confirmStake'
		| 'failedStake'
		| 'successStake'
		| 'loadingStake'
		| 'confirmUnStake'
		| null = null;

	let selectedValidatorPublicKey = '';
	let stakeAmount = 0;
	let isUnstaking = false;
	let error = '';

	/**Handler for clicking the "Confirm" button. Confirms the stake.*/
	function confirmStake() {
		if (!$selectedWallet) {
			goto('/profile');
			return;
		}
		// confirm stake
		popup = 'loadingStake';
		isUnstaking = false;

		const result = delegate(
			$selectedWallet!.publicKey,
			$selectedWallet!.accountHash,
			$selectedWallet!.privateKey,
			selectedValidatorPublicKey,
			stakeAmount,
			$user!.network,
			$selectedWallet!.algorithm,
		);

		if (result) {
			if (result.error) {
				isUnstaking = false;
				popup = 'failedStake';
				error = result.error;
			} else {
				popup = 'loadingStake';
				isUnstaking = false;
				popupAmount = stakeAmount;
			}
		}
	}

	/**Handler for clicking the "Confirm" button. Confirms the unstake.*/
	function confirmUnStake() {
		// confirm stake
		let wallet =
			selectedStake?.publicKey.toLowerCase() === $selectedWallet?.publicKey?.toLowerCase()
				? $selectedWallet
				: $wallets.find((_wallet) => _wallet.publicKey === selectedStake?.publicKey.toLowerCase());
		if (!wallet) {
			wallet = $selectedWallet;
		}

		if (!wallet) {
			goto('/profile');
			return;
		}

		popup = 'loadingStake';
		isUnstaking = true;

		const result = undelegate(
			wallet!.publicKey,
			wallet!.accountHash,
			wallet!.privateKey,
			selectedValidatorPublicKey,
			stakeAmount,
			$user!.network,
			wallet!.algorithm,
		);

		if (result) {
			if (result.error) {
				isUnstaking = true;
				popup = 'failedStake';
				error = result.error;
			} else {
				isUnstaking = true;
				popup = 'loadingStake';
				popupAmount = stakeAmount;
			}
		}
	}

	/**Object of all possible components for the stake detail column (the last column)*/
	const lastColumnContent: {
		addStake: typeof StakeToken;
		unstake: typeof Unstake;
	} = {
		addStake: StakeToken,
		unstake: Unstake,
	};

	// stake bind StakesFromWallet
	let selectedLastColumnContent: 'unstake' | 'addStake' | null = $page.url.searchParams.get(
		'validator',
	)
		? 'addStake'
		: null;
	let selectedStake: IStake | null = null;
	let popupAmount = 0;

	/**Handler for clicking back arrown in the last collumn and closing the stake detail*/
	function closeStake() {
		selectedLastColumnContent = null;
		selectedStake = null;
		$page.url.searchParams.delete('validator');
	}

	function showConfirmStakePopup(stakeDetails: { validatorPublicKey: string; amount: number }) {
		const canProceed = checkLockStatus($selectedWallet, $page.url.pathname);

		if (canProceed) {
			popup = 'confirmStake';
			isUnstaking = false;
			selectedValidatorPublicKey = stakeDetails.validatorPublicKey;
			stakeAmount = stakeDetails.amount;
		}
	}

	function showConfirmUnStakePopup(stakeDetails: { validatorPublicKey: string; amount: number }) {
		const wallet =
			selectedStake?.publicKey.toLowerCase() === $selectedWallet?.publicKey?.toLowerCase()
				? $selectedWallet
				: $wallets.find((_wallet) => _wallet.publicKey === selectedStake?.publicKey.toLowerCase());
		const canProceed = checkLockStatus(wallet ?? $selectedWallet, $page.url.pathname);

		if (canProceed) {
			popup = 'confirmUnStake';
			isUnstaking = true;
			selectedValidatorPublicKey = stakeDetails.validatorPublicKey;
			stakeAmount = stakeDetails.amount;
		}
	}

	function closePopup() {
		popup = null;
		selectedValidatorPublicKey = '';
		stakeAmount = 0;
	}

	// Third column selector
	function stakeSelect() {
		selectedLastColumnContent = 'unstake';
		$page.url.searchParams.delete('validator');
	}

	function addStake(_e: CustomEvent) {
		selectedLastColumnContent = 'addStake';
	}

	$: ((stakeCsprTxs) => {
		if (stakeCsprTxs) {
			// Called everytime there's an update so we have time to only get rid of one popup or show a success popup
			// First check if new transactions came in
			Object.keys(stakeCsprTxs).map((item) => {
				if (stakeCsprTxs[item]?.error) {
					// Show error
					isUnstaking = false;
					popup = 'failedStake';
					popupAmount = stakeCsprTxs[item]?.amount!;
					error = stakeCsprTxs[item]?.error ?? '';
				} else if (stakeCsprTxs[item]?.fulfilled) {
					// Clear loader and show respective popup with tx details
					isUnstaking = false;
					popup = 'successStake';
					popupAmount = stakeCsprTxs[item]?.amount!;
					selectedLastColumnContent = null;
					$page.url.searchParams.delete('validator');
				}

				if (stakeCsprTxs[item]?.fulfilled) {
					// remove the item from the sendTokenTrackers list
					isUnstaking = false;
					delete stakeCsprTxs[item];
					stakeCsprTracker.set(stakeCsprTxs);
				}
			});
		}
	})($stakeCsprTracker);

	$: ((unStakeCsprTxs) => {
		if (unStakeCsprTxs) {
			// Called everytime there's an update so we have time to only get rid of one popup or show a success popup
			// First check if new transactions came in
			Object.keys(unStakeCsprTxs).map((item) => {
				if (unStakeCsprTxs[item]?.error) {
					// Show error
					isUnstaking = true;
					popup = 'failedStake';
					popupAmount = unStakeCsprTxs[item]?.amount!;
					error = unStakeCsprTxs[item]?.error ?? '';
				} else if (unStakeCsprTxs[item]?.fulfilled) {
					// Clear loader and show respective popup with tx details
					isUnstaking = true;
					popup = 'successStake';
					popupAmount = unStakeCsprTxs[item]?.amount!;
					selectedLastColumnContent = null;
					$page.url.searchParams.delete('validator');
				}

				if (unStakeCsprTxs[item]?.fulfilled) {
					// remove the item from the sendTokenTrackers list
					isUnstaking = true;
					delete unStakeCsprTxs[item];
					unStakeCsprTracker.set(unStakeCsprTxs);
				}
			});
		}
	})($unStakeCsprTracker);

	$: ((prevStake) => prevStake && stakeSelect())(selectedStake);

	export let stakeArray: IStake[];
	export let loading = false;
</script>

<div class="flex stake-page">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-left">
		<ProfileNavigation />
	</div>
	<div class="global-grid-mid">
		{#if stakeArray}
			<StakesFromWallet on:addStake={addStake} {stakeArray} bind:selectedStake />
		{/if}

		{#if loading}
			<Loading />
		{/if}
	</div>
	<div class="global-grid-right">
		<div class="size-full last-column">
			{#if selectedLastColumnContent}
				{#if selectedLastColumnContent !== 'addStake' && selectedStake}
					<div
						class="last-column-header {$page.url.pathname.includes('all-positions')
							? 'higher-arrow'
							: 'lower-arrow'}"
					>
						<div class="w-6 h-6">
							<ArrowInCircle disabled={false} on:click={closeStake} />
						</div>
					</div>
				{/if}
				<div class="flex-grow">
					<svelte:component
						this={lastColumnContent[selectedLastColumnContent]}
						bind:stake={selectedStake}
						on:cancelStake={() => (selectedLastColumnContent = null)}
						on:showStakePopup={(e) => showConfirmStakePopup(e.detail)}
						on:unstake={(e) => showConfirmUnStakePopup(e.detail)}
					/>
				</div>
			{:else}
				<TextSidebar>Select a stake for more information</TextSidebar>
			{/if}
		</div>
	</div>
</div>

{#if popup === 'confirmStake'}
	<ConfirmStake amount={stakeAmount} on:confirm={() => confirmStake()} on:cancel={closePopup} />
{:else if popup === 'confirmUnStake'}
	<ConfirmUnStake amount={stakeAmount} on:confirm={() => confirmUnStake()} on:cancel={closePopup} />
{:else if popup === 'loadingStake'}
	<Popup
		title="Currently Staking Your {stakeAmount} CSPR"
		hasCancel={false}
		on:confirm={() => (popup = null)}
	>
		<Loading useFirework={false} size={60} />
	</Popup>
{:else if popup === 'failedStake'}
	<FailedStake {error} {isUnstaking} amount={popupAmount} on:confirm={() => (popup = null)} />
{:else if popup === 'successStake'}
	<SuccessStake {isUnstaking} amount={popupAmount} on:confirm={() => (popup = null)} />
{/if}

<style lang="postcss" global>
	:local(.placeholder-text) {
		@apply w-full h-full;
		@apply grid place-content-center;
		@apply text-light-grey text-xs;
	}

	:local(.stake-page) {
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

	:local(.higher-arrow) {
		@apply mt-2;
	}

	:local(.lower-arrow) {
		@apply mt-12;
	}
</style>
