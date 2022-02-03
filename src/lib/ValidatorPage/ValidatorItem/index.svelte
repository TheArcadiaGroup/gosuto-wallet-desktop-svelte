<!-- @component 
	Description:
	> Container for a single validator Object data in the validator page.
	
	Props:
	- `validatorName` = A string value. Name of validator.
	- `uptime` = A number value.
	- `validatorCommission` = A number value.
	- `votingPower` = A number value.
	- `selfDelegation` = A number value.
	- `delegationReturn` = A number value.
-->
<script lang="ts">
	import { decimalToPercentage } from '$utils';

	export let validatorName: string = 'Arcadia';
	export let uptime = 1;
	export let validatorCommission = 0.05;
	export let votingPower = 1;
	export let selfDelegation = 1;
	export let delegationReturn = 0.405;
</script>

<div class="{$$props.class} main">
	<div class="header">
		<h4>{validatorName}</h4>
		<p class="delegate">Delegate</p>
	</div>
	<div class="details-holder">
		<div class="detail left">
			<p class="detail-title">Uptime</p>
			<p class="detail-value">{decimalToPercentage(uptime)} %</p>
		</div>
		<div class="detail mid">
			<p class="detail-title">Validator Commission</p>
			<p class="detail-value">{decimalToPercentage(validatorCommission)} %</p>
		</div>
		<div class="detail right">
			<p class="detail-title">Voting power</p>
			<p class="detail-value">{decimalToPercentage(votingPower)} %</p>
		</div>
		<div class="detail left">
			<p class="detail-title">Self-delegation</p>
			<p class="detail-value">{decimalToPercentage(selfDelegation)} %</p>
		</div>
		<div class="detail mid">
			<p class="detail-title">Delegation Return</p>
			<p class="detail-value">{decimalToPercentage(delegationReturn)} %</p>
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.main) {
		@apply w-[90vw] md:w-full pt-7 pb-8 pl-5;
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
