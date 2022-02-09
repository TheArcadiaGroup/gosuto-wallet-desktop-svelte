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

	import { shortenAddress } from '$utils';

	let data;

	export let address: string;

	onMount(() => {
		getData(address);
	});

	const getData = async (address: string) => {
		fetch(`../../api/profile/[address]/stake/?address=${address}`)
			.then((response) => response.json())
			.then((response) => (data = response))
			.catch((error) => {
				console.error('error:', error);
			});
	};
</script>

<StakePage
	stakeArray={data}
	wallet={{
		name: 'Wallet 2',
		publicKey: address,
	}}
/>
