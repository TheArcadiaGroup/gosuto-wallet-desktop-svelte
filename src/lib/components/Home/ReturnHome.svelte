<script lang="ts">
	import BackIcon from '$icons/BackIcon.svelte';
	import CopyIcon from '$icons/CopyIcon.svelte';
</script>

<div class="return-home">
	<div class="return-back-button">
		<a href="/">
			<BackIcon />
		</a>
	</div>
	<p class="return-wallet-title">
		Wallet 1
		<span class="return-swap-text">Swap</span>
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
		@apply md:flex-row md:items-center;
	}

	.return-back-button {
		@apply absolute right-full;
		@apply hidden;
		@apply cursor-pointer;
		@apply md:block;
	}

	.return-wallet-title {
		@apply font-bold;
		@apply dark:text-white;
		@apply md:text-2xl;
	}

	.return-swap-text {
		@apply hidden;
		@apply md:inline;
	}

	.return-wallet-pub-key {
		@apply flex items-center;
		@apply gap-[0.75rem];
	}

	.return-pub-key-text {
		@apply text-sm text-light-gardenText;
		@apply md:text-base;
		@apply dark:text-white;
	}
</style>
