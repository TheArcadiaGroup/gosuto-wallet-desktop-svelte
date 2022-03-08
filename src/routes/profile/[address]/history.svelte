<script lang="ts">
	import { onMount } from 'svelte';

	import HistoryPage from '$lib/pages/History/HistoryPage.svelte';
	import ProfileNavigation from '$lib/pages/Profile/ProfileNavigation.svelte';

	import { shortenAddress } from '$utils';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import { page } from '$app/stores';
	import { retrieveData } from '$utils/dataStorage';

	let data: HistoryObject[];
	let user: IUser;
	$: walletAddress = $page.params.address;

	let currentPage = 1;
	let itemsPerPage = 10;

	const fetchHistory = (page = 1, limit = 10) => {
		const wallet = user.wallets.filter((wallet) => wallet.walletAddress === walletAddress)[0];

		if (wallet) {
			const fetchObj = {
				accountHash: wallet.accountHash,
				page,
				limit,
			};

			// Send request to electron
			window.api.send('getHistory', JSON.stringify(fetchObj));
		} else {
			// Better UI Based Error Needed
			throw Error('Wallet Not Loaded');
		}
	};

	onMount(() => {
		getData($page.params.address);

		// Retrieve the selected profile off the user
		user = (retrieveData('user') as IUser) || {
			name: 'Unknown User',
			avatar: '',
			email: '',
			wallets: (retrieveData('wallets') as IWallet[]) || [],
		};

		// Fetch History
		fetchHistory();

		// Receives data from electron once parsed.
		window.api.receive('getHistoryResponse', (data: GetHistoryResponse) => {
			// loading function can wait for this data to be fetched
			console.log(data);
		});
	});

	const getData = async (address: string) => {
		fetch(`/api/profile/${address}/history?page=${currentPage}&limit=${itemsPerPage}`)
			.then((response) => response.json())
			.then((response) => (data = response))
			.catch((error) => {
				console.error('error:', error);
			});
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
