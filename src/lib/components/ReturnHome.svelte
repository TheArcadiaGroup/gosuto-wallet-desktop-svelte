<script lang="ts">
	import { goto } from '$app/navigation';

	import Popup from '$components/Popup.svelte';
	import BackIcon from '$icons/BackIcon.svelte';
	import CopyIcon from '$icons/CopyIcon.svelte';

	/**
	 * A location shown in the title of this component (Wallet {profileLocation})
	 */
	export let profileLocation: string = '';
	export let publicKey: string = '';
	export let walletName = 'Unknown';

	$: hasCopied = false;
	$: popupContent = '';

	function closePopup(): void {
		popupContent = '';
		hasCopied = false;
	}

	function copyPublicKey() {
		navigator.clipboard.writeText(publicKey);
		hasCopied = true;
		popupContent = `${publicKey}`;
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
			{walletName.length > 8 ? `${walletName.substring(0, 8)}...` : walletName}{walletName.endsWith(
				's',
			)
				? "'"
				: walletName.endsWith("'")
				? 's'
				: "'s"}
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
		<div class="return-cursor-pointer" on:click={copyPublicKey}>
			<CopyIcon />
		</div>
	</div>
</div>

{#if hasCopied}
	<Popup
		title={'Text Copied'}
		hasCancel={false}
		on:confirm={closePopup}
		on:cancel={closePopup}
		confirmText={'OK'}
	>
		<p class="dark:text-white break-words">{popupContent}</p>
	</Popup>
{/if}

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

	.return-cursor-pointer {
		@apply cursor-pointer;
	}
</style>
