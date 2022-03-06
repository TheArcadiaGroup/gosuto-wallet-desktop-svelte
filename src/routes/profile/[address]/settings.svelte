<script lang="ts">
	import Navbar from '$lib/components/Navbar/Navbar.svelte';

	import ProfileNavigation from '$lib/pages/Profile/ProfileNavigation.svelte';
	import Settings from '$lib/pages/Profile/WalletSettings/index.svelte';
	import { selectedWallet, selectedWallet } from '$stores/user/wallets';
	import { retrieveData } from '$utils/dataStorage';
	import { onMount } from 'svelte';

	let user: IUser;

	let settingsData: ProfileSettings;

	updateSettings();

	onMount(() => {
		// Retrieve the selected profile off the user
		user = (retrieveData('user') as IUser) || {
			name: 'Unknown User',
			avatar: '',
			email: '',
			wallets: (retrieveData('wallets') as IWallet[]) || [],
		};
		// if ($selectedWallet) {
		// 	user.wallets = [$selectedWallet];
		// } else {
		// 	user.wallets = [user.wallets[0]];
		// }
	});

	function updateSettings() {
		if ($selectedWallet) {
			settingsData = {
				walletName: $selectedWallet.walletName,
				walletAddress: $selectedWallet.walletAddress,
				publicKey: $selectedWallet.walletAddress,
				privateKey: $selectedWallet.privateKey,
				currentPassword: $selectedWallet.walletPassword,
			};
		}
	}
</script>

<div class="flex">
	<div class="global-grid-nav">
		<Navbar />
	</div>
	<div class="global-grid-left">
		<div class="size-full">
			<ProfileNavigation {user} on:cardClicked={updateSettings} />
		</div>
	</div>
	<div class="global-grid-mid">
		{#if settingsData}
			<Settings {settingsData} />
		{/if}
	</div>
</div>

<style lang="postcss" global>
	:local(.size-full) {
		@apply w-full h-full;
	}

	:local(.global-grid-mid) {
		@apply dark:bg-dark-background;
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	.global-grid-mid::-webkit-scrollbar {
		@apply w-0 h-0;
	}
</style>
