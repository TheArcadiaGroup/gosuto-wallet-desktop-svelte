<script lang="ts">
	import { onMount } from 'svelte';
	import { selectedWallet } from '$stores/user/wallets';
	import HistoryPage from '$lib/components/HistoryPage.svelte';
	import ProfileNavigation from '$lib/Profile/ProfileNavigation.svelte';

	import { shortenAddress } from '$utils';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import { page } from '$app/stores';
	import { retrieveData } from '$utils/dataStorage';

	let data: HistoryObject[];
	let user: IUser;

	onMount(() => {
		getData($page.params.address);
	});

	const getData = async (address: string) => {
		fetch(`/api/profile/${address}/history`, { method: 'POST', body: address })
			.then((response) => response.json())
			.then((response) => (data = response))
			.catch((error) => {
				console.error('error:', error);
			});
	};

	onMount(() => {
		// Retrieve the selected profile off the user
		user = (retrieveData('user') as IUser) || {
			name: 'Unknown User',
			avatar: '',
			email: '',
			wallets: [],
		};
		console.log($selectedWallet);
		if ($selectedWallet) {
			user.wallets = [$selectedWallet];
		} else {
			user.wallets = [user.wallets[0]];
		}
	});
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
			<HistoryPage
				historyArray={data}
				isInProfileRoute={true}
				address={shortenAddress($page.params.address)}
			/>
		</div>
	</div>
{/if}

<style lang="postcss" global>
	:local(.size-full) {
		@apply w-full h-full;
	}
</style>
