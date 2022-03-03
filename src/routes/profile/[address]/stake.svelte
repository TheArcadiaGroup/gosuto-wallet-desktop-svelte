<script context="module">
	export const load = async ({ _, page }) => {
		const address = page.params.address;
		return {
			props: {
				address,
			},
		};
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import StakePage from '$lib/Profile/stake/StakePage.svelte';
	import { page } from '$app/stores';

	let data: IStake[];
	let address: string;

	onMount(() => {
		address = $page.params.address;
		getData(address);
	});

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
