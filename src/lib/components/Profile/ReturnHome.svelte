<script lang="ts">
	import BackIcon from '$icons/BackIcon.svelte';
	import CopyIcon from '$icons/CopyIcon.svelte';

	export let profileLocation = 'History'

	export let walletNumber = '1'
</script>

<div class="return-home">
	<div class="return-back-button">
		<a href="/">
			<BackIcon />
		</a>
	</div>
	<p class="return-wallet-title">
		Wallet { walletNumber }
		<span class="return-swap-text">{ profileLocation }</span>
	</p>
	<div class="return-wallet-pub-key">
		<p class="return-pub-key-text">0x9f98e01d3...4ed7</p>
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
