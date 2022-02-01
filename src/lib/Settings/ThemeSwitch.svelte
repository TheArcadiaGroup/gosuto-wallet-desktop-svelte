<!-- 
	@component
	
	A toggle switch for the user to switch to dark or light theme
 -->
<script lang="ts">
	import DarkThemeIcon from '$icons/DarkThemeIcon.svelte';
	import LightThemeIcon from '$icons/LightThemeIcon.svelte';

	import { toggleDarkMode } from '$utils/themeSettings';

	import { onMount } from 'svelte';

	/** A local variable representing dark theme (if true then dark theme is on) */
	let dark: boolean = false;

	/** onMount callback to initialize local dark theme */
	onMount(() => {
		if (localStorage.theme == 'dark') {
			dark = true;
		} else {
			dark = false;
		}
	});
</script>

<div class="themeSwitch-wrapper">
	<button
		class="themeSwitch-themeBt"
		on:click={() => {
			toggleDarkMode();
			dark = !dark;
		}}
	>
		<div class="themeSwitch-switch" class:dark>
			{#if dark}
				<DarkThemeIcon class="themeIcon" />
			{:else}
				<LightThemeIcon class="themeIcon" />
			{/if}
		</div>
	</button>
</div>

<style lang="postcss" global>
	.themeSwitch-wrapper {
		@apply absolute md:relative lg:absolute right-3 md:right-auto lg:right-3 4xl:right-4;
	}

	.themeSwitch-themeBt {
		@apply grid items-center;
		@apply bg-gray-100 dark:bg-dark-gosutoDark rounded-2xl 4xl:rounded-[2.5rem];
		@apply w-16 h-9 4xl:w-40 4xl:h-24;
	}

	.themeSwitch-switch {
		@apply grid place-items-center;
		@apply rounded-full h-8 w-8 4xl:h-20 4xl:w-20;
		@apply transition-all;
	}

	.themeSwitch-switch .themeIcon {
		@apply 4xl:w-12 4xl:h-12;
	}

	.themeSwitch-switch:not(.dark) {
		@apply translate-x-0 ml-px my-0.5 bg-white;
	}

	.themeSwitch-switch.dark {
		@apply mr-px my-0.5 bg-black;
		@apply translate-x-[31px] 4xl:translate-x-[80px];
	}
</style>
