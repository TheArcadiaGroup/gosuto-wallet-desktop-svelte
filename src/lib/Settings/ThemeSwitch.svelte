<script lang="ts">
	import DarkThemeIcon from '$icons/DarkThemeIcon.svelte';
	import LightThemeIcon from '$icons/LightThemeIcon.svelte';
	import { toggleDarkMode } from '$utils/themeSettings';
	import { onMount } from 'svelte';

	let dark: boolean = false;

	onMount(() => {
		if (localStorage.theme == 'dark') {
			dark = true;
		} else {
			dark = false;
		}
	});
</script>

<div class="wrapper">
	<button
		class="theme-bt"
		on:click={toggleDarkMode}
		on:click={() => {
			dark = !dark;
		}}
	>
		<div class="switch" class:dark>
			{#if dark}
				<DarkThemeIcon class="themeIcon" />
			{:else}
				<LightThemeIcon class="themeIcon" />
			{/if}
		</div>
	</button>
</div>

<style lang="postcss" global>
	:local(.wrapper) {
		@apply absolute md:relative lg:absolute right-3 md:right-auto lg:right-3 4xl:right-4;
	}

	:local(.theme-bt) {
		@apply grid items-center;
		@apply bg-gray-100 dark:bg-dark-gosutoDark rounded-2xl 4xl:rounded-[2.5rem];
		@apply w-16 h-9 4xl:w-40 4xl:h-24;
	}

	:local(.switch) {
		@apply grid place-items-center;
		@apply rounded-full h-8 w-8 4xl:h-20 4xl:w-20;
		@apply transition-all;
	}

	.switch .themeIcon {
		@apply 4xl:w-12 4xl:h-12;
	}

	.switch:not(.dark) {
		@apply translate-x-0 ml-px my-0.5 bg-white;
	}

	.switch.dark {
		@apply mr-px my-0.5 bg-black;
		@apply translate-x-[31px] 4xl:translate-x-[80px];
	}
</style>
