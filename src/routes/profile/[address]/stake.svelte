<script lang="ts">
	import StakePage from '$lib/pages/Profile/Stake/StakePage.svelte';
	import { validators } from '$stores/user/stake';
	import getValidators from '$utils/getValidators';
	import { onMount } from 'svelte';

	let data: IStake[] = [];

	onMount(async () => {
		if ($validators.length <= 0) {
			await getValidators();
		}
	});
</script>

<StakePage stakeArray={data} />
