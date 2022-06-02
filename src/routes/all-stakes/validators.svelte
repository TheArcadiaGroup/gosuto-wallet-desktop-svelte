<script lang="ts">
	import { onMount } from 'svelte';

	import ProfileNavigation from '$lib/pages/Profile/ProfileNavigation.svelte';
	import ValidatorPage from '$lib/pages/AllStakes/ValidatorPage/index.svelte';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import getValidators from '$utils/getValidators';
	import { validators } from '$stores/user/stake';
	import { user } from '$stores/user';

	onMount(() => {
		if ($validators.length <= 0) {
			getValidators($user?.network ?? 'testnet');
		}
	});
</script>

<div class="main">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-left">
		<div class="size-full">
			<ProfileNavigation />
		</div>
	</div>
	<div class="global-grid-mid size-full overflow-hidden">
		<div class="validator-holder">
			<ValidatorPage />
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.main) {
		@apply flex;
	}

	:local(.size-full) {
		@apply w-full h-full;
	}

	:local(.validator-holder) {
		@apply flex flex-col items-center w-full h-full;
	}
</style>
