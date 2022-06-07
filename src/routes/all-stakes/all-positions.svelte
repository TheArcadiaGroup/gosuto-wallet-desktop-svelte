<script lang="ts">
	import { onMount } from 'svelte';
	import { retrieveData } from '$utils/dataStorage';
	import { getUserDelegatedAmount } from '$utils/casper';
	import { user } from '$stores/user';
	import StakePage from '$lib/pages/Profile/Stake/StakePage.svelte';
	import { wallets } from '$stores/user/wallets';

	let stakeArray: IStake[] = [];
	$: stakeArray;
	$: $wallets.map((wallet) => {
		stakeArray = [
			...stakeArray,
			...wallet.walletStakes.filter(
				(item) =>
					!stakeArray.some(
						(stake) =>
							stake.validatorPublicKey === item.validatorPublicKey &&
							stake.walletName === item.walletName,
					),
			),
		];
		return wallet;
	});

	onMount(async () => {
		await getData();
	});

	const getData = async () => {
		const wallets: IWallet[] = retrieveData('wallets') || [];

		// No need to wait so we don't block anything from running while we are fetching this info
		wallets.map((wallet) => {
			getUserDelegatedAmount(wallet.publicKey, $user?.network || 'testnet');
		});
	};
</script>

<StakePage {stakeArray} />
