<script lang="ts">
	import CreditCard from '$lib/Profile/CreditCard.svelte';
	import Navbar from '$components/Navbar/Navbar.svelte';
	import Button from '$lib/Common/Button.svelte';

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { retrieveData, saveData } from '$utils/dataStorage';

	let existingProfiles: IWallet[] = retrieveData('profiles') || [];
	let defaultWalletIndex: number = Number(retrieveData('defaultWalletIndex')) || 0;

	onMount(() => {
		if (existingProfiles.length <= 0) {
			saveData('defaultWalletIndex', '0');
			goto('/add-wallet');
		} else {
			if (defaultWalletIndex > existingProfiles.length - 1) {
				postData(existingProfiles[defaultWalletIndex]);
			} else {
				postData(existingProfiles[0]);
			}
		}
	});

	/** post selected profile data to that profile's api route */
	const postData = async (object: IWallet) => {
		fetch('/api/profile/' + object.walletAddress, {
			method: 'POST',
			body: JSON.stringify(object),
		})
			.then(() => goto(`/profile/${object.walletAddress}/history`))
			.catch((error) => {
				console.error('error:', error);
			});
	};
</script>

<div class="flex">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-mid">
		<div class="mid-content">
			<div class="content-header">
				<h1>Select Wallet</h1>
				<div class="button-wrapper" on:click={() => goto('/add-wallet')}>
					<Button>
						<div slot="text" class="button">+ Add wallet</div>
					</Button>
				</div>
			</div>
			<div class="credit-card-wrapper">
				{#each existingProfiles as p, i}
					<div
						class="single-card-wrap"
						on:click={() => {
							saveData('defaultWalletIndex', (i + 1).toString());
							postData(p);
						}}
					>
						<CreditCard
							name={p.walletName}
							wallet={{
								available: p.availableBalanceUSD,
								staked: p.stakedBalance,
								unclaimed: p.unclaimedRewards,
								address: p.walletAddress,
							}}
						/>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.global-grid-mid) {
		@apply dark:bg-dark-background;
		@apply flex justify-center;
		@apply overflow-y-hidden;
	}

	:local(.mid-content) {
		@apply h-full w-1/2 overflow-y-scroll;
		@apply flex flex-col align-middle items-center gap-10;
		@apply mt-20;
	}

	:local(.content-header) {
		@apply flex justify-around gap-4;
		@apply w-1/2;
	}

	:local(h1) {
		@apply font-display font-bold text-2xl text-center dark:text-white;
	}

	:local(.button-wrapper) {
		@apply w-1/3 h-full;
		@apply font-display font-bold text-sm;
	}

	:local(.credit-card-wrapper) {
		@apply flex flex-col place-items-center gap-8 w-1/2;
	}

	:local(.single-card-wrap) {
		@apply w-full;
		@apply flex justify-center;
	}
</style>
