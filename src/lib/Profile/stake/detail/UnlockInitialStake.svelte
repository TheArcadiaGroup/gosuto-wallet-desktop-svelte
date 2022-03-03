<!-- @component 
	Describtion:
	> A stake detail component (fills the third column on /profile/stakes routes) that unlocks the inital stake.
-->
<script lang="ts">
	import Button from '$lib/Common/Button.svelte';

	export let stake: IStake = {
		parentWallet: 'wallet-1',
		stakeAmount: 420,
		unstakeDatetime: new Date(2021, 11, 17),
		unstakeCountdown: Math.abs(new Date(2020, 12, 17) - new Date(2019, 11, 17)),
		reclamationDate: new Date(2020, 12, 17),
		initialStakeDate: new Date(2019, 11, 17),
		rewardDate: new Date(2022, 11, 17),
		rewardCountdown: Math.abs(new Date(2022, 11, 17) - new Date(2019, 11, 17)),
		reward: 420,
		unlocked: 84,
		stakePercent: 0.8,
		parentWalletAddress: '0x8dgvc09vcg290gvg4v2f2vrvb23',
	};

	/**Handler for clicking the "Claim" button. Claims the initial stake*/
	function claim() {
		// confirm claim
	}

	/**Handler for clicking the "Cancel" button. Cancels the claim and hides the component*/
	function cancel() {
		// cancel stake
	}
</script>

<div class="unlock-initial-stake">
	<div class="title">Unlock initial Stake</div>
	<div class="text">Initital stake: {stake.stakeAmount} CSPR</div>
	<div class="buttons">
		<Button on:click={claim}>
			<div slot="text" class="button-text">Claim</div>
		</Button>
		<Button on:click={cancel} isTransparent={true}>
			<div slot="text" class="button-text">Cancel</div>
		</Button>
	</div>
</div>

<style lang="postcss" global>
	:local(.unlock-initial-stake) {
		@apply w-full h-full flex flex-col items-stretch gap-2 py-6 px-2;
	}

	:local(.title) {
		@apply font-semibold dark:text-white text-center;
	}

	:local(.text) {
		@apply text-sm dark:text-white text-center;
	}

	:local(.buttons) {
		@apply my-3 w-full flex flex-col gap-3;
	}

	:local(.button-text) {
		@apply p-2;
	}
</style>
