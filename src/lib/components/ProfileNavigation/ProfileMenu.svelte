<script lang="ts">
	import Bookmark from '$icons/Bookmark.svelte';
	import PaperAirplane from '$icons/PaperAirplane.svelte';
	import Stake from '$icons/Stake.svelte';
	import Swap from '$icons/Swap.svelte';
	import Wallet from '$icons/Wallet.svelte';
</script>

<div class="w-full flex flex-col items-stretch gap-2">
	<div class="menu-item">
		<div class="w-3">
			<Bookmark />
		</div>
		History
	</div>
	<div class="menu-item">
		<div class="w-3">
			<PaperAirplane />
		</div>
		Send
	</div>
	<div class="menu-item">
		<div class="w-3">
			<Stake />
		</div>
		Stake
	</div>
	<div class="menu-item">
		<div class="w-3">
			<Wallet />
		</div>
		Wallet Settings
	</div>
	<div class="menu-item">
		<div class="w-3">
			<Swap />
		</div>
		Swap
	</div>
</div>

<style lang="postcss" global>
	:local(.menu-item) {
		@apply rounded-lg hover:bg-light-purple hover:shadow transition-all px-4 py-3 text-xs text-light-grey hover:text-white dark:text-white cursor-pointer flex flex-row items-center gap-2;
	}
</style>
