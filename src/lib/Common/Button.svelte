<script lang="ts">
	export let glow = false
	export let color: 'orange' | 'none' = 'orange'
</script>

<button class:glow={glow} class:orange={color === 'orange'}>
	<slot>

	</slot>
</button>

<style lang="postcss">

	button {
		@apply flex justify-center gap-1 items-center py-1 px-3.5 rounded-[2.25rem] text-xs leading-7
            transition-colors duration-300 md:gap-2.5 md:py-2 md:px-5 md:text-base;
	}

	button.orange {
		@apply bg-light-orange hover:bg-light-lighterOrange text-white;
	}

	button.glow {
        filter: drop-shadow(0px 4px 14px rgba(255, 130, 102, 0.3));
	}

</style>