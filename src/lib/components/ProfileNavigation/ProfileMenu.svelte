<div class="w-full flex flex-col items-stretch gap-2">
	<!-- TODO add icons -->
	<div class="menu-item">History</div>
	<div class="menu-item">Send</div>
	<div class="menu-item">Stake</div>
	<div class="menu-item">Wallet Settings</div>
	<div class="menu-item">Swap</div>
</div>

<style lang="postcss" global>
	:local(.menu-item) {
		@apply rounded-lg hover:bg-light-purple hover:shadow transition-all px-4 py-3 text-xs text-light-grey hover:text-white dark:text-white cursor-pointer;
	}
</style>
