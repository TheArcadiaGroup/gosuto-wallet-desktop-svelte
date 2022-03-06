<div class="text-sidebar">
	<p class="sidebar-text"><slot /></p>
</div>

<style lang="postcss" global>
	:local(.text-sidebar) {
		@apply relative;
		@apply h-full w-full;
		@apply flex items-center justify-center;
		@apply dark:bg-dark-blue;
		@apply dark:border-0;
	}

	:local(.sidebar-text) {
		@apply w-1/2;
		@apply text-center font-semibold text-sm text-light-grey193;
		@apply lg:opacity-100 lg:text-dark-lightGray;
		@apply dark:opacity-50;
	}
</style>
