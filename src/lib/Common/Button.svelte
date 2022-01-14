<script lang="ts">
</script>

<button
	class={$$slots.icon ? 'main has-icon' : 'main no-icon'}
	class:selected={$$props.selected}
	class:ring-btn={$$props.ring}
	class:glow={$$props.glow}
	on:click
>
	{#if $$slots.icon}
		<div class="img">
			<slot name="icon" />
		</div>
	{/if}
	<div class="text-container">
		<slot name="text" />
	</div>
</button>

<style lang="postcss" global>
	:local(.main) {
		@apply flex flex-col md:flex-row h-full w-full items-center justify-center;
		@apply font-semibold text-xs md:text-lg;
	}

	:local(.has-icon) {
		@apply w-20 h-20 md:w-auto md:h-auto;
		@apply my-9 md:my-0;
		@apply px-5 bg-white dark:bg-dark-grey rounded-xl;
		@apply text-light-buttonText dark:text-white;
		@apply hover:bg-opacity-70 hover:bg-light-purple hover:text-white transition duration-200;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
	}

	:local(.has-icon.selected) {
		@apply bg-dark-selectedButton text-white;
	}

	:local(.no-icon) {
		@apply rounded-3xl;
		@apply justify-center p-0 bg-light-orange text-white border border-light-orange;
		@apply hover:bg-opacity-70 hover:border-opacity-0 transition duration-200;
		@apply text-sm;
	}

	:local(.no-icon.ring-btn) {
		@apply bg-transparent text-light-orange border border-light-orange;
		@apply hover:bg-opacity-30 hover:bg-light-orange transition duration-200;
	}

	:local(.img) {
		@apply w-4 h-4 mr-3;
		@apply mb-3 md:mb-0;
	}

	:local(.glow) {
		box-shadow: 0px 2px 15px #ff826688;
	}
</style>
