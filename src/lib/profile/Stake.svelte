<script>
	import GridLayout from '$lib/Common/GridLayout.svelte';
	import ProfileNavigation from '$lib/profile/ProfileNavigation.svelte';

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
</script>

<GridLayout>
	<div slot="first" class="size-full">
		<!-- feed the user profile data to ProfileNavigation component -->
		<ProfileNavigation />
	</div>
	<div slot="mid" class="w-full h-full">StakesFromWallet component</div>
	<div slot="last">
		<!-- TODO add a router via svelte:component here -->
		<!-- <div class="placeholder-text">Select a stake for more information</div> -->
		<!-- <Confirm /> -->
    <!-- <Confirm /> -->
		<!-- <Form /> -->
		<!-- <ClaimReward /> -->
		<UnlockInitialStake />
		<!-- <Unstake /> -->
	</div>
</GridLayout>

<style lang="postcss" global>
	:local(.placeholder-text) {
		@apply w-full h-full grid place-content-center text-light-grey text-xs;
	}

	:local(.size-full) {
		@apply w-full h-full;
	}
</style>
