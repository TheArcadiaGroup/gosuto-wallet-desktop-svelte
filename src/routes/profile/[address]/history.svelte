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

	import GridLayout from '$lib/Components/GridLayout.svelte';
	import HistoryPage from '$lib/Pages/History/HistoryPage.svelte';
	import ProfileNavigation from '$lib/Pages/Profile/ProfileNavigation.svelte';

	import { shortenAddress } from '$utils';
	import Navbar from '$lib/Components/Navbar/Navbar.svelte';

	let data: HistoryObject[];
	export let address: string;

	onMount(() => {
		getData(address);
	});

	const getData = async (address: string) => {
		fetch(`/api/profile/[address]/history`, { method: 'POST', body: address })
			.then((response) => response.json())
			.then((response) => (data = response))
			.catch((error) => {
				console.error('error:', error);
			});
	};

	// DEV
	const user = {
		name: 'Jake Waterson',
		ppurl: 'https://miro.medium.com/fit/c/262/262/2*-cdwKPXyVI0ejgxpWkKBeA.jpeg',
		wallets: [
			{
				name: 'Wallet 1',
				avalible: 5000,
				staked: 2500,
				unclaimed: 375,
				address: '0xhoiqhgovbnovlwggwrg',
			},
			{
				name: 'Wallet 2',
				avalible: 5000,
				staked: 2500,
				unclaimed: 375,
				address: '0x567hfgdhjestth53y35y',
			},
		],
	};
</script>

{#if data}
	<div class="flex">
		<div class="global-grid-nav">
			<Navbar />
		</div>
		<div class="global-grid-left">
			<div class="size-full">
				<ProfileNavigation {user} />
			</div>
		</div>
		<div class="global-grid-mid">
			<HistoryPage historyArray={data} isInProfileRoute={true} address={shortenAddress(address)} />
		</div>
	</div>
{/if}

<style lang="postcss" global>
	:local(.size-full) {
		@apply w-full h-full;
	}
</style>
