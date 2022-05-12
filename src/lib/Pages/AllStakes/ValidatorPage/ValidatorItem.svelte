<!-- @component 
	Description:
	> Container for a single validator Object data in the validator page.
	
	@author MikeBrandon
	@see validatorPage
-->
<script lang="ts">
	import { decimalToPercentage } from '$utils';

	export let validator: IValidator;
</script>

<div class="{$$props.class} main">
	<div class="header">
		<h4>{validator.validatorName}</h4>
		<p class="delegate">Delegate</p>
	</div>
	<div class="details-holder">
		<div class="detail left">
			<p class="detail-title">Validator Position</p>
			<p class="detail-value">{validator.validatorPosition}</p>
		</div>
		<div class="detail mid">
			<p class="detail-title">Validator Commission</p>
			<p class="detail-value">{decimalToPercentage(validator.validatorCommission)} %</p>
		</div>
		<div class="detail right">
			<p class="detail-title">Delegation Return</p>
			<p class="detail-value">{decimalToPercentage(validator.delegationReturn)} %</p>
		</div>
		<div class="detail left">
			<p class="detail-title">Current Delegators</p>
			<p class="detail-value">{validator.currentDelegators}</p>
		</div>
		<div class="detail mid">
			<p class="detail-title">Current Staked</p>
			<p class="detail-value">{validator.currentStaked} CSPR</p>
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
