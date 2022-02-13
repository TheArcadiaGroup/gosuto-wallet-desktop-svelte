<script lang="ts">
	import GridLayout from '$lib/Common/GridLayout.svelte';
	import ProfileNavigation from '$lib/Profile/ProfileNavigation.svelte';
	import { onMount } from 'svelte';

	let profile: IWallet = {
		walletName: '',
		walletPassword: '',
		walletImage: '',
		seedPhrase: [],
		availableBalanceUSD: 0.0,
		stakedBalance: 0.0,
		unclaimedRewards: 0.0,
		walletTokens: [[]],
		walletStakes: [[]],
		walletHistory: [[]],
		walletAddress: '',
	};

	// Show a specific profile page based global
	onMount(() => {
		getData();
	});

	/** post selected profile data to that profile's api route */
	const getData = async () => {
		fetch('/api/profile/[walletAddress')
			.then((response) => response.json())
			.then((response) => (profile = response))
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
				name: profile.walletName,
				available: profile.availableBalanceUSD,
				staked: profile.stakedBalance,
				unclaimed: profile.unclaimedRewards,
			},
		],
	};
</script>

<GridLayout>
	<div slot="first" class="size-full">
		<!-- feed the user profile data to ProfileNavigation component -->
		<ProfileNavigation {user} />
	</div>
</GridLayout>

<style lang="postcss" global>
	:local(.size-full) {
		@apply w-full h-full;
	}
</style>
