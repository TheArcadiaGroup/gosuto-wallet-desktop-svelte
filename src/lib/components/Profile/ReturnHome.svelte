<!--
@component
This is the ReturnHome component, which is used inside all /profile pages.
It's goal is to give user option to go back home and/or to let user copy their public key.
-->
<script lang="ts">
	import BackIcon from '$icons/BackIcon.svelte';
	import CopyIcon from '$icons/CopyIcon.svelte';

	/**
	 * A location shown in the title of this component (Wallet {profileLocation})
	 * @type string
	 */
	export let profileLocation = 'History';
	/**
	 * A number / name of this wallet
	 * @type string
	 */
	export let walletNumber = '1';

	/**
	 * The public key shown & copiable in this component
	 */
	export let publicKey = '0x9f98e01d3THISPARTWILLNOTBEVISIBLE4ed7';
</script>

<div class="return-home">
	<div class="return-back-button">
		<a href="/">
			<BackIcon />
		</a>
	</div>
	<p class="return-wallet-title">
		Wallet {walletNumber}
		<span class="return-swap-text">{profileLocation}</span>
	</p>
	<div class="return-wallet-pub-key">
		<p class="return-pub-key-text">
			{publicKey.slice(0, 12)}...{publicKey.slice(publicKey.length - 4)}
		</p>
		<div class="return-cursor-pointer">
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
