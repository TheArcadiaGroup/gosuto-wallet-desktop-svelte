<!-- 
	@component
	
	A bar for encasing the ThemeSwitch component in the UI
 -->
<script lang="ts">
	import ThemeSwitch from '$lib/Settings/ThemeSwitch.svelte';
</script>

<div class="theme-bar">
	<span>Change Theme</span>
	<ThemeSwitch />
</div>

<style type="postcss" global>
	.theme-bar {
		@apply flex md:flex-col lg:flex-row gap-4 lg:gap-0 items-center;
		@apply shadow rounded-2xl 4xl:rounded-[2rem] dark:bg-dark-grey;
		@apply relative py-7 md:py-4 lg:py-7 4xl:py-20;
	}

	.theme-bar span {
		@apply font-semibold font-display text-light-blue dark:text-dark-lightBlue text-sm 3xl:text-xl 4xl:text-5xl;
		@apply ml-3 4xl:ml-6;
	}
</style>
