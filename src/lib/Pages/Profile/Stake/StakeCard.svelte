<!-- @component 
	Describtion:
	> A card component representing individual stakes in the StakesFromWallet component.
	
	Props:
	- `stake` = An object with data of the stake (name, staked amount, etc.)
	
	Events:
	- `click` = Dispatched when the card is clicked. Passes the stake data and the `closeStake()` function via the event details.
-->
<script lang="ts">
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import { user } from '$stores/user';
	import { validators } from '$stores/user/stake';
	import { shortenAddress } from '$utils';

	export let stake: IStake;
	export let selectedStake: IStake | null = null;

	$: validator = $validators.find((item) => item.publicKey === stake?.validatorPublicKey);
	$: block_base_url = `https://${$user?.network === 'testnet' ? 'testnet.' : ''}cspr.live`;
</script>

<div
	class="stake-card-item {selectedStake?.validatorPublicKey === stake.validatorPublicKey &&
	stake.publicKey === selectedStake?.publicKey
		? 'selected'
		: ''}"
	on:click
>
	<div class="name">
		<span
			class="cursor-pointer"
			title="Block Explorer Validator Profile"
			on:click={() =>
				window.api.send('openUrl', `${block_base_url}/validator/${stake?.validatorPublicKey}`)}
		>
			{stake?.validatorPublicKey
				? validator?.profile
					? validator.profile.name
					: stake?.validatorPublicKey.length === 66
					? shortenAddress(stake?.validatorPublicKey)
					: stake?.validatorPublicKey
				: 'Unknown Validator'}
		</span>
	</div>
	<div class="first-line">
		<div
			class="flex flex-col items-start justify-center {stake?.stakeAmount > 0
				? 'text-highlight'
				: 'text-normal'}"
		>
			<span>
				{parseFloat(stake?.stakeAmount.toFixed(4)) || 0} CSPR
			</span>
			<span>Staked</span>
		</div>
		<div
			class="flex flex-col items-end justify-center text-center {stake?.reward >= 50
				? 'text-light-green '
				: 'text-normal'}"
		>
			<span>
				{parseFloat(stake?.reward.toFixed(4)) || 0} CSPR
			</span>
			<span>Reward</span>
		</div>
	</div>
	<div class="progress-bar">
		<ProgressBar
			value={stake?.stakeAmount ?? 0}
			secondaryBar={true}
			secondaryBarClass={'bg-light-green'}
			secondaryBarValue={stake?.reward ?? 0}
		/>
	</div>
	<div class="third-line">
		<div class="flex flex-col items-start justify-center text-normal">
			<span>Staked on</span>
			<span>
				{window.moment(stake?.initialStakeDate).format('DD MMM YYYY')}
			</span>
		</div>
		<div class="flex flex-col items-end justify-center w-1/3 text-right text-normal">
			<span>Most Recent Reward on</span>
			<span>
				{stake?.latestRewardDate
					? window.moment(stake?.latestRewardDate).format('DD MMM YYYY')
					: 'No Reward Yet'}
			</span>
		</div>
	</div>
	<div class="time-container">
		<div class="elapsed">
			{window.moment(stake?.initialStakeDate).fromNow()}
		</div>
		<div class="full">
			{stake?.latestRewardDate ? window.moment(stake?.latestRewardDate).fromNow() : 'No Reward Yet'}
		</div>
	</div>
	<div class="footer">
		<div class="footer-label">Total Time Since Stake</div>
		<div class="footer-time">
			{window.moment(stake?.initialStakeDate).fromNow(true)}
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.stake-card-item) {
		@apply w-full rounded-2xl shadow-md flex flex-col px-8 py-6 gap-2 max-w-2xl dark:bg-dark-grey dark:text-light-gray cursor-pointer transition-all hover:shadow-lg border border-transparent;
	}

	:local(.selected) {
		@apply border-light-orange;
	}

	:local(.name) {
		@apply font-bold dark:font-semibold dark:text-white text-lg capitalize;
	}

	:local(.first-line) {
		@apply flex justify-between items-center w-full place-content-between text-sm mb-2;
	}

	:local(.progress-bar) {
		@apply w-full h-4;
	}

	:local(.third-line) {
		@apply flex items-center justify-between w-full text-xs;
	}
	:local(.text-highlight) {
		@apply text-light-orange font-semibold;
	}

	:local(.time-container) {
		@apply grid grid-cols-2 w-full place-items-center text-sm;
	}

	:local(.elapsed) {
		@apply border-r border-b w-full text-center border-dashed border-light-grey pb-2;
	}

	:local(.full) {
		@apply border-b w-full text-center border-dashed border-light-grey pb-2;
	}

	:local(.footer) {
		@apply w-full text-sm mt-2;
	}

	:local(.footer-label) {
		@apply w-full text-center;
	}

	:local(.footer-time) {
		@apply w-full text-center;
	}

	:local(.text-normal) {
		@apply text-light-gray;
	}
</style>
