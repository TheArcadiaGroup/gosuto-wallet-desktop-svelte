<!-- 
	@component 
	Description:
	> Card Componenent in the right sidebar of history page to show details of history transactions.
	
	@author MikeBrandon
	@see historyComponent
-->
<script lang="ts">
	import { user } from '$stores/user';
	import { shortenAddress } from '$utils/index';

	import Amount from './Amount.svelte';
	import Swap from './Swap.svelte';

	export let walletName = '';
	export let sidebarData: IHistory;

	export let status:
		| 'Received'
		| 'Sent'
		| 'Stake'
		| 'Swap'
		| 'Initial Stake Unlocked'
		| 'Unstake'
		| 'Claimed Reward'
		| 'Contract Call' = 'Sent';

	let blockExplorerURLBase = `https://${$user?.network === 'testnet' ? 'testnet.' : ''}cspr.live`;
</script>

<div class="sidebar-card">
	<div class="header">
		<h4>
			{sidebarData.contract_call ?? status}
		</h4>
		<h5>
			{walletName}
		</h5>
	</div>
	<div class="top-details">
		{#if status == 'Received' || status == 'Sent'}
			<div class="address-holder">
				<p class="to-from">To</p>
				<p
					class="address clickable-address"
					on:click={() =>
						window.api.send(
							'openUrl',
							sidebarData.transactionType === 'contract_call'
								? `${blockExplorerURLBase}/contract/${sidebarData?.recipient}`
								: `${blockExplorerURLBase}/account/${sidebarData?.recipient}`,
						)}
				>
					{shortenAddress(sidebarData?.recipient)}
				</p>
			</div>
		{/if}
		{#if status == 'Initial Stake Unlocked' || status == 'Unstake' || (status == 'Claimed Reward' && sidebarData?.stake)}
			<div class="address-holder">
				<p class="to-from">Staked On</p>
				<p class="address">
					{window.moment(sidebarData?.stake?.initialStakeDate).format('DD MMMM YYYY')}
				</p>
			</div>
		{/if}
		<div class="address-holder">
			<p class="to-from">From</p>
			<p
				class="address clickable-address"
				on:click={() =>
					window.api.send('openUrl', `${blockExplorerURLBase}/account/${sidebarData?.sender}`)}
			>
				{shortenAddress(sidebarData?.sender)}
			</p>
		</div>
		<div class="address-holder date">
			<p class="to-from">Transaction Date</p>
			<p class="address">
				{window.moment(sidebarData?.transactionDate).format('MMMM DD, YYYY h:mm:ss a')}
			</p>
		</div>
	</div>
	{#if sidebarData.transactionType !== 'contract_call'}
		<div class="amount-holder">
			<p class="to-from">Amount</p>
			{#if status == 'Swap' && sidebarData.swap}
				<Swap swapData={sidebarData.swap} smaller={true} />
			{:else}
				<div class="amount">
					<Amount
						type={status == 'Sent' || status == 'Stake' ? 'negative' : 'positive'}
						amount={parseFloat(sidebarData?.amount.toFixed(3))}
						clicked={false}
						smaller={true}
					/>
				</div>
			{/if}
		</div>
	{/if}
	<div class="bottom-holder">
		<div class="address-holder">
			<p class="to-from">Transaction Fee</p>
			<div class="amount text-light-red">
				{sidebarData?.transactionFee}
				CSPR
			</div>
		</div>
		<div class="address-holder">
			<p class="to-from">Transaction Hash</p>
			<p
				class="address overflow-clip clickable-address"
				on:click={() =>
					window.api.send('openUrl', `${blockExplorerURLBase}/deploy/${sidebarData?.deployHash}`)}
			>
				{shortenAddress(sidebarData?.deployHash)}
			</p>
		</div>
		{#if status === 'Stake' && sidebarData?.validator}
			<div class="address-holder">
				<p class="to-from">Validator</p>
				<p
					class="address overflow-clip clickable-address"
					on:click={() =>
						window.api.send(
							'openUrl',
							`${blockExplorerURLBase}/validator/${sidebarData?.validator}`,
						)}
				>
					{shortenAddress(sidebarData?.validator)}
				</p>
			</div>
		{/if}
		<div class="address-holder {sidebarData?.error ? 'flex-col' : ''}">
			<p class="to-from">Transaction Status</p>
			<p
				class="address text-2xs break-words {sidebarData?.error ? '' : 'flex items-center'}"
				style="color: {sidebarData?.error ? '#e6332a' : 'rgb(49, 222, 145)'}"
			>
				{sidebarData?.error || 'Success'}
			</p>
		</div>
	</div>

	<div
		class="block-explorer-link"
		on:click={() =>
			window.api.send('openUrl', `${blockExplorerURLBase}/deploy/${sidebarData?.deployHash}`)}
	>
		View on block explorer
	</div>
</div>

<style lang="postcss" global>
	:local(.sidebar-card) {
		@apply pt-6 pb-4 px-8 mb-4 md:mb-0 w-full;
		@apply border border-black dark:border-white dark:md:border-0 border-opacity-10 dark:border-opacity-40 rounded-3xl;
		@apply bg-white dark:bg-dark-background flex flex-col dark:md:bg-dark-grey;
		box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.05);
	}

	:local(h4) {
		@apply font-bold text-xl dark:text-white;
	}

	:local(h5) {
		@apply font-bold text-sm text-light-purple;
	}

	:local(.header) {
		@apply mb-5 md:mb-4 2xl:mb-8 text-center;
	}

	:local(.top-details) {
		@apply w-[70%];
	}

	:local(.address-holder) {
		@apply text-sm flex w-full justify-between mb-4;
	}

	:local(.to-from) {
		@apply font-semibold text-sm dark:text-white dark:opacity-60 mr-4;
	}

	:local(.address) {
		@apply text-light-gray dark:text-white;
	}

	:local(.date) {
		@apply flex-col;
	}

	:local(.amount-holder) {
		@apply flex justify-between items-center py-4 mb-5;
		@apply border-t border-b border-opacity-20 dark:border-opacity-30 border-black dark:border-white;
	}

	:local(.amount) {
		@apply text-right;
	}

	:local(.clickable-address) {
		@apply text-light-urlColor dark:text-light-urlColor cursor-pointer;
	}

	:local(.block-explorer-link) {
		@apply self-center mb-2 text-sm cursor-pointer text-light-orange md:text-light-urlColor;
	}
</style>
