<!-- @component 
	Describtion:
	> A stake detail component (fills the third column on /profile/stakes routes) that unstakes the stake.

	Props:
	- `disabled` = A boolean variable. When true, the buttons aren't showed and unstaking is diabled.
-->
<script lang="ts">
	import Button from '$lib/Components/Button.svelte';
	import { convertDate } from '$utils';

	export let disabled = false;

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

	/**Handler for clicking the "Unstake" button. Unstakes the stake.*/
	function unstake() {
		if (disabled) return;

		// confirm stake
	}

	/**Handler for clicking the "Cancel" button. Cancels the unstake and hides the component.*/
	function cancel() {
		// cancel stake
	}
</script>

<div class="unstake">
	<div class="title">Unstake CSPR</div>
	<div class="text">Unstake: {stake.stakeAmount} CSPR</div>
	<div class="text staking-length">
		Unstaking will take until:
		<div class="until-date">{convertDate(stake.unstakeDatetime)}</div>
	</div>
	{#if disabled}
		<div class="buttons">
			<Button on:click={unstake}>
				<div slot="text" class="button-text">Unstake</div>
			</Button>
			<Button on:click={cancel} isTransparent={true}>
				<div slot="text" class="button-text">Cancel</div>
			</Button>
		</div>
	{/if}
</div>

<style lang="postcss" global>
	:local(.unstake) {
		@apply w-full h-full flex flex-col items-stretch gap-2 py-6 px-2;
	}

	:local(.title) {
		@apply font-semibold dark:text-white text-center;
	}

	:local(.text) {
		@apply text-sm dark:text-white text-center;
	}

	:local(.staking-length) {
		@apply flex flex-row items-center justify-center;
	}

	:local(.until-date) {
		@apply text-light-orange gap-2;
	}

	:local(.buttons) {
		@apply my-3 w-full flex flex-col gap-3;
	}

	:local(.button-text) {
		@apply p-2;
	}
</style>
