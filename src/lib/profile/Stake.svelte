<!-- 
	@component
	
	A component with the whole grid for /profile/?{profile_id}?/stake	
-->
<script>
	import GridLayout from '$lib/Common/GridLayout.svelte';
	import ProfileNavigation from '$lib/profile/ProfileNavigation.svelte';
	import ArrowInCircle from '$lib/Common/ArrowInCircle.svelte';

	import Confirm from '$lib/profile/stake/detail/Confirm.svelte';
	import Form from './stake/detail/Form.svelte';
	import ClaimReward from './stake/detail/ClaimReward.svelte';
	import UnlockInitialStake from './stake/detail/UnlockInitialStake.svelte';
	import Unstake from './stake/detail/Unstake.svelte';

	import { page } from '$app/stores';

	$: slug = $page.params.slug;
	// Show a specific profile page based on slug

	// wallet bind on profile navigation component

	// stake bind StakesFromWallet

	const lastCollumnContent = {
		confirm: Confirm,
		form: Form,
		claimReward: ClaimReward,
		unlockInitialStake: UnlockInitialStake,
		unstake: Unstake,
	};

	let selectedLastCollumnContent = 'confirm';

	function closeStake() {
		selectedLastCollumnContent = null;
	}
</script>

<GridLayout>
	<div slot="first" class="size-full">
		<!-- feed the user profile data to ProfileNavigation component -->
		<ProfileNavigation />
	</div>
	<div slot="mid" class="size-full">
		<!-- Listener for clicked component and save that to selectedLastCollumnContent -->
		StakesFromWallet component
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
		@apply py-8 px-4;
	}

	:local(.last-column-header) {
		@apply flex flex-row items-center gap-2 dark:text-white text-sm;
	}
</style>
