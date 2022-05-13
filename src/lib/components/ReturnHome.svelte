<script lang="ts">
	import { goto } from '$app/navigation';

	import BackIcon from '$icons/BackIcon.svelte';
	import CopyIcon from '$icons/CopyIcon.svelte';

	/**
	 * A location shown in the title of this component (Wallet {profileLocation})
	 */
	export let profileLocation: string = '';
	export let publicKey: string = '';
	export let walletName = 'Unknown';

	function copyWalletAddress() {
		navigator.clipboard.writeText(publicKey);
	}
</script>

<div class="return-home">
	<div class="return-back-button">
		<div on:click={() => goto('/profile')}>
			<BackIcon />
		</div>
	</div>
	<p class="return-wallet-title">
		{#if walletName.trim().length > 0}
			{walletName}{walletName.endsWith('s') ? "'" : walletName.endsWith("'") ? 's' : "'s"}
			<span class="return-swap-text">{profileLocation}</span>
		{:else}
			<span class="return-swap-text">{profileLocation}</span>
		{/if}
	</p>
	<div class="return-wallet-pub-key">
		<p class="return-pub-key-text">
			{`${publicKey.substring(0, 6)}...${publicKey.substring(
				publicKey.length - 7,
				publicKey.length,
			)}`}
		</p>
		<div class="return-cursor-pointer" on:click={copyWalletAddress}>
			<CopyIcon />
		</div>
	</div>
</div>

<style lang="postcss" global>
	.return-home {
		@apply relative;
		@apply flex flex-col;
		@apply gap-x-8 px-2;
		@apply lg:flex-row lg:items-center;
	}

	.return-back-button {
		@apply absolute right-full;
		@apply hidden;
		@apply cursor-pointer;
		@apply lg:block;
	}

	.return-wallet-title {
		@apply font-bold;
		@apply dark:text-white;
		@apply lg:text-2xl;
	}

	.return-swap-text {
		@apply hidden;
		@apply lg:inline;
	}

	.return-wallet-pub-key {
		@apply flex items-center;
		@apply gap-[0.75rem];
	}

	.return-pub-key-text {
		@apply text-sm text-light-gardenText;
		@apply lg:text-base;
		@apply dark:text-white;
	}
</style>
