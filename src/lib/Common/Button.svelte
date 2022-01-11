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

<style lang="postcss">
	.main {
		@apply flex h-full w-full items-center;
		@apply font-semibold text-lg;
	}

	.has-icon {
		@apply px-5 bg-white dark:bg-dark-grey rounded-xl;
		@apply text-light-buttonText dark:text-white;
		@apply hover:bg-opacity-70 hover:bg-light-purple hover:text-white transition duration-200;
	}

	.has-icon.selected {
		@apply bg-light-purple text-white;
	}

	.no-icon {
		@apply rounded-3xl;
		@apply justify-center p-0 bg-light-orange text-white border border-light-orange;
		@apply hover:bg-opacity-70 hover:border-opacity-0 transition duration-200;
	}

	.no-icon.ring-btn {
		@apply bg-transparent text-light-orange border border-light-orange;
		@apply hover:bg-opacity-30 hover:bg-light-orange transition duration-200;
	}

	.img {
		@apply w-4 h-4 mr-3;
	}

	.glow {
		box-shadow: 0px 2px 15px #ff8266;
	}
</style>
