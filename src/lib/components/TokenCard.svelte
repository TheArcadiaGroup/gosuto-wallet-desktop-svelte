<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';

	import { getTokenValue } from '$utils/token.util';

	import ProfitUpIcon from '$icons/ProfitUpIcon.svelte';
	import ProfitDownIcon from '$icons/ProfitDownIcon.svelte';
	import { previousSelectedWallet, selectedWallet } from '$stores/user/wallets';
	import { tokenLoaders } from '$stores/dataLoaders';
	import { user } from '$stores/user';
	import { loadTokenBalance } from '$utils/tokens';
	import DeleteIcon from '$icons/DeleteIcon.svelte';
	import { tokens } from '$stores/user/tokens';
	import { saveData } from '$utils/dataStorage';
	import { ethers, utils } from 'ethers';

	/**
	 * The index of this card. Used when dispatching selectToken event to parent
	 */

	export let selected = false;

	export let token: IToken;
	export let tokenName = 'Casper'; // defaults
	export let tokenTicker = 'CSPR'; // defaults
	export let tokenAmountHeld = 0;
	export let contractHash = 'CSPR';
	let tokenPriceInUsd = 0;
	let percentageChange = 0;
	let positive = percentageChange > 0;

	/**
	 * Code of the real currency shown inside this component
	 */
	export let currencyUnit = $user?.currency.toUpperCase() || 'USD';

	onMount(async () => {
		// @ts-ignore
		const tokenInfo = await getTokenValue(contractHash.trim());
		tokenPriceInUsd = tokenInfo.price[$user?.currency || 'usd'];
		percentageChange = tokenInfo.price_change[$user?.currency || 'usd'];

		if (token) {
			loadTokenBalance(token, $selectedWallet!.publicKey);
		}
	});

	const dispatch = createEventDispatcher();

	function select(): void {
		if (token) {
			token.tokenPriceUSD = tokenPriceInUsd;
		}
		dispatch('selectToken', token);
	}

	function deleteToken() {
		const tokensFromThisNetwork = $tokens[$selectedWallet!.publicKey][
			$user?.network ?? 'testnet'
		].filter((item) => item.contractHash !== token?.contractHash);
		$tokens[$selectedWallet!.publicKey][$user?.network ?? 'testnet'] = tokensFromThisNetwork;

		saveData('tokens', $tokens);

		selected = false;
		dispatch('selectToken', null);
	}

	selectedWallet.subscribe((wallet) => {
		if (wallet && wallet?.publicKey !== $previousSelectedWallet?.publicKey) {
			if (token) {
				loadTokenBalance(token, wallet.publicKey);
			}
		}
	});
</script>

<div on:click={select} class="token-card {selected ? 'selected' : ''}">
	<div class="token-card-left-col">
		<p class="token-card-title">{tokenName} ({tokenTicker})</p>
		<p
			class="token-card-text-sm {token?.contractHash === 'CSPR'
				? positive
					? 'text-light-green'
					: 'text-light-red'
				: 'text-gray-600 dark:text-gray-400'}"
		>
			<span class="max-w-full text-ellipsis">
				{#if !$tokenLoaders[contractHash]}
					{tokenTicker.toLowerCase() === 'cspr'
						? (
								$selectedWallet?.availableBalance[$user?.network ?? 'testnet'] ?? tokenAmountHeld
						  ).toFixed(token.decimals)
						: ethers.utils.formatUnits(
								ethers.utils.parseUnits(tokenAmountHeld.toFixed(token.decimals), token.decimals),
								token.decimals,
						  )}
				{:else}
					<span class="skeleton-loader" />
				{/if}
			</span>
			<span>
				{tokenTicker}
			</span>
		</p>

		{#if tokenTicker.toLowerCase() === 'cspr'}
			<p class="token-card-text-xs {positive ? 'text-light-green' : 'text-light-red'}">
				{#if !$tokenLoaders[tokenTicker]}
					{parseFloat(
						(
							(tokenTicker.toLowerCase() === 'cspr'
								? $selectedWallet?.availableBalance[$user?.network ?? 'testnet'] ?? tokenAmountHeld
								: tokenAmountHeld) * tokenPriceInUsd
						).toFixed(2),
					)}
				{:else}
					<span class="skeleton-loader" />
				{/if}
				{currencyUnit}
			</p>
		{/if}
	</div>
	{#if tokenTicker.toLowerCase() === 'cspr'}
		<div class="token-card-right-col">
			<p
				class="token-card-text-sm token-card-text-flex {positive
					? 'text-light-green'
					: 'text-light-red'}"
			>
				{#if positive}
					<ProfitUpIcon />
				{:else}
					<ProfitDownIcon />
				{/if}
				{parseFloat(percentageChange.toFixed(2))}%
			</p>
			<p class="token-card-text-xs {positive ? 'text-light-green' : 'text-light-red'}">
				{parseFloat(tokenPriceInUsd.toFixed(3))}
				{currencyUnit}
			</p>
			<p class="token-card-text-xs text-light-gray">(24h)</p>
		</div>
	{:else if selected}
		<div class="delete-icon" title="Delete" on:click={deleteToken}>
			<DeleteIcon />
		</div>
	{/if}
</div>

<style lang="postcss" global>
	.token-card {
		@apply flex flex-row relative;
		@apply px-3 py-2;
		@apply rounded-2xl border border-light-transparentGrey10 cursor-pointer select-none;
		@apply lg:p-5 lg:rounded-[1.375rem];
		@apply dark:bg-dark-blue h-[140px] overflow-hidden;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	.token-card.selected {
		@apply border border-light-purple;
		box-shadow: 0 4px 12px rgba(114, 93, 255, 0.3);
	}

	.token-card-left-col {
		@apply flex flex-col;
		@apply gap-0.5;
		@apply lg:gap-1;
	}

	.token-card-right-col {
		@apply ml-auto text-right;
	}

	.token-card-title {
		@apply text-xs font-bold;
		@apply text-light-grey;
		@apply mb-0.5;
		@apply lg:text-base uppercase;
		@apply dark:text-white;
	}

	.token-card-text-xs {
		@apply text-xs font-bold;
		@apply 2xl:text-base;
	}

	.token-card-text-sm {
		@apply text-sm font-bold;
		@apply 2xl:text-2xl;
	}

	.token-card-text-flex {
		@apply inline-flex flex-row items-center justify-end;
		@apply gap-1;
		@apply lg:gap-2;
	}

	:local(.delete-icon) {
		@apply absolute bottom-4 right-4;
		@apply h-6 w-4 flex;
	}
</style>
