<script lang="ts">
	import StakePage from '$lib/pages/Profile/Stake/StakePage.svelte';
	import { user } from '$stores/user';
	import { validators } from '$stores/user/stake';
	import { selectedWallet } from '$stores/user/wallets';
	import getValidators from '$utils/getValidators';
	import { onMount } from 'svelte';

	onMount(() => {
		if ($validators.length <= 0) {
			// No need to await since it will be set to the store when the data is ready
			getValidators($user?.network ?? 'testnet');
		}
	});
</script>

<StakePage stakeArray={$selectedWallet?.walletStakes[$user?.network ?? 'testnet'] ?? []} />
