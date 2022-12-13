<!-- @component 
	Description:
	> Container for a single validator Object data in the validator page.
	
	@author MikeBrandon
	@see validatorPage
-->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '$stores/user';
	import { selectedWallet } from '$stores/user/wallets';

	import { decimalToPercentage } from '$utils';

	export let validator: IValidator;

	const navigateAndSelectValidator = (validatorPublicKey: string) => {
		goto(`/profile/${$selectedWallet?.publicKey}/stake?validator=${validatorPublicKey}`);
	};

	$: block_base_url =
		$user?.network === 'testnet' ? `https://testnet.cspr.live` : 'https://casperstats.io';
</script>

<div class="validator-item {$$props.class}">
	<div class="header">
		<h4
			class="cursor-pointer"
			title="View Validator Profile"
			on:click={() =>
				window.api.send('openUrl', `${block_base_url}/validator/${validator.publicKey}`)}
		>
			{validator.profile?.name ??
				`${validator.publicKey.substring(0, 4)}...${validator.publicKey.substring(
					validator.publicKey.length - 5,
					validator.publicKey.length,
				)}`}
		</h4>
		<button class="delegate" on:click={() => navigateAndSelectValidator(validator.publicKey)}>
			Delegate
		</button>
	</div>
	<div class="details-holder">
		<div class="detail left">
			<p class="detail-title">Validator Performance</p>
			<p class="detail-value">{parseFloat(validator.performance.toFixed(2))} %</p>
		</div>
		<div class="detail mid">
			<p class="detail-title">Validator Commission</p>
			<p class="detail-value">{decimalToPercentage(validator.delegationRate)} %</p>
		</div>
		<div class="detail right">
			<p class="detail-title">Self Stake</p>
			<p class="detail-value">
				{parseFloat(((validator.selfStakeAmount / validator.totalStaked) * 100).toFixed(2))} %
			</p>
		</div>
		<div class="detail left">
			<p class="detail-title">Current Delegators</p>
			<p class="detail-value">{validator.currentDelegators}</p>
		</div>
		<div class="detail mid">
			<p class="detail-title">Current Staked</p>
			<p class="detail-value">{parseFloat(validator.totalStaked.toFixed(5))} CSPR</p>
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.validator-item) {
		@apply w-full pt-7 pb-8 pl-5;
	}

	:local(h4) {
		@apply text-sm md:text-lg font-extrabold mr-5 dark:text-white;
	}

	:local(.header) {
		@apply flex mb-5;
	}

	:local(.delegate) {
		@apply px-3 py-1 text-white bg-light-purple rounded-[46px] text-xs;
	}

	:local(.details-holder) {
		@apply flex flex-wrap;
	}

	:local(.detail) {
		@apply w-1/3 flex text-xs mb-1;
	}

	:local(.detail-title) {
		@apply text-light-gray md:min-w-max dark:text-white;
	}

	:local(.detail-value) {
		@apply w-full text-right min-w-max md:min-w-0 md:max-w-full mr-4 md:mr-8 dark:text-white dark:md:opacity-50;
	}

	:local(.top-border) {
		@apply border-t border-black dark:border-white border-opacity-10;
	}
</style>
