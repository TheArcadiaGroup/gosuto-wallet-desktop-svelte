<div class="action-panel">
	<div class="bar-wrapper">
		<div class="bar" />
	</div>
	<div class="content-slot">
		<div class="content-wrapper">
			<slot />
		</div>
	</div>
</div>

<!-- Styles -->
<style lang="postcss" global>
	:local(.action-panel) {
		@apply w-full min-h-[337px] md:min-h-0 rounded-t-[19px] md:rounded-t-none  dark:bg-dark-grey md:dark:bg-transparent border-none;
	}
	:local(.bar-wrapper) {
		@apply flex justify-center pt-2.5;
	}
	:local(.bar) {
		@apply h-[11px] w-[36%] bg-light-grayShadeThree bg-opacity-30 rounded-full block md:hidden;
	}
	:local(.content-slot) {
		@apply flex items-center justify-center;
	}
	:local(.content-wrapper) {
		@apply w-3/4 md:w-[85%] 2xl:w-3/4 mx-auto;
	}
</style>
