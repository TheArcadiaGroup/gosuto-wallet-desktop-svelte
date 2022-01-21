<script>
	export let position = 0;
</script>

<div
	class="w-full flex flex-row overflow-x-scroll md:overflow-x-visible snap-x px-6 md:px-1 md:gap-2 no-scrollbar py-2 transition-all carousel"
	style="--scroll: translateX({-position * 100}%);"
>
	<div class="w-full flex-shrink-0 flex items-center justify-center snap-center">
		<slot />
	</div>
	<div class="w-full flex-shrink-0 flex items-center justify-center snap-center">
		<slot />
	</div>
</div>

<style lang="postcss" global>
	:local(.no-scrollbar) {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}

	:local(.no-scrollbar)::-webkit-scrollbar {
		display: none;
	}

	:local(.carousel) {
		transform: var(--scroll);
	}
</style>
