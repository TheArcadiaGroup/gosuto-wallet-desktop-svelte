<script>
	import { page } from '$app/stores';
	import GridLayout from '$lib/Common/GridLayout.svelte';
	import StakesFromWallet from '$lib/components/StakesFromWallet/StakesFromWallet.svelte';

	// wallet bind on profile navigation component

	$: slug = $page.params.slug;
</script>

<GridLayout>
	<div slot="first">
		<!-- Profile Navigation Component with highlighted "stakes" menu option -->
	</div>
	<div slot="mid" class="w-full h-full">
		<!-- passing wallet to stakes component -->
		<StakesFromWallet />
	</div>
</GridLayout>

<style lang="postcss" global>
	:local(.last-column) {
		@apply w-full h-full grid place-content-center text-light-grey text-xs;
	}
</style>
