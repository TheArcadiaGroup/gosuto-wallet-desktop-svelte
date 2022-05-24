<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import StakePage from '$lib/pages/Profile/Stake/StakePage.svelte';

	let data: IStake[] = [];
	let address = $page.params.address;

	onMount(() => {
		getData(address);
	});

	// TODO: LOAD STAKING HISTORY
	const getData = async (address: string) => {
		fetch(`/api/profile/[address]/stake`, { method: 'POST', body: address })
			.then((response) => response.json())
			.then((response) => (data = response))
			.catch((error) => {
				console.error('error:', error);
			});
	};
</script>

<StakePage stakeArray={data} />
