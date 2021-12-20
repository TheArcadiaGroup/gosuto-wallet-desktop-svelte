<script lang="ts">
	export let first: boolean = false;
	export let validatorName: string = 'Arcadia';
	export let uptime = 1;
	export let validatorCommission = 0.05;
	export let votingPower = 1;
	export let selfDelegation = 1;
	export let delegationReturn = 0.405;
</script>

<div class="main" class:top-border={!first}>
	<div class="header">
		<h4>{validatorName}</h4>
		<p class="delegate">Delegate</p>
	</div>
	<div class="details-holder">
		<div class="detail left">
			<p class="detail-title">Uptime</p>
			<p class="detail-value">{uptime * 100} %</p>
		</div>
		<div class="detail mid">
			<p class="detail-title">Validator Commission</p>
			<p class="detail-value">{validatorCommission * 100} %</p>
		</div>
		<div class="detail right">
			<p class="detail-title">Voting power</p>
			<p class="detail-value">{votingPower * 100} %</p>
		</div>
		<div class="detail left">
			<p class="detail-title">Self-delegation</p>
			<p class="detail-value">{selfDelegation * 100} %</p>
		</div>
		<div class="detail mid">
			<p class="detail-title">Delegation Return</p>
			<p class="detail-value">{delegationReturn * 100} %</p>
		</div>
	</div>
</div>

<style lang="postcss">
	.main {
		@apply w-full pt-7 pb-8 pl-5;
	}

	h4 {
		@apply text-[18px] font-extrabold mr-5;
	}

	.header {
		@apply flex mb-5;
	}

	.delegate {
		@apply px-3 py-1 text-white bg-light-appPurple rounded-[46px] text-xs;
	}

	.details-holder {
		@apply flex flex-wrap;
	}

	.detail {
		@apply w-1/3 flex text-xs mb-1;
	}

	.detail-title {
		@apply text-light-gray min-w-max;
	}

	.detail-value {
		@apply w-full text-right max-w-full mr-8;
	}

	.top-border {
		@apply border-t border-black border-opacity-10;
	}
</style>
