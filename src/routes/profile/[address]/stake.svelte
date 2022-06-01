<script lang="ts">
	import StakePage from '$lib/pages/Profile/Stake/StakePage.svelte';
	import { validators } from '$stores/user/stake';
	import { selectedWallet } from '$stores/user/wallets';
	import getValidators from '$utils/getValidators';
	import { onMount } from 'svelte';

	onMount(async () => {
		if ($validators.length <= 0) {
			await getValidators();
		}
	});
</script>

<StakePage stakeArray={$selectedWallet?.walletStakes ?? []} />
