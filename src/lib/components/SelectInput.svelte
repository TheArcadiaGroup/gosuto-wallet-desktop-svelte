<script lang="ts">
	export let label: string = 'Input Your Text';
	export let value: string | number = '';
	export let selectCustomClass = '';
	export let labelCustomClass = '';
</script>

<div class="input-holder">
	<p class={`${$$props.class} ${labelCustomClass}`}>{label}</p>
	<select class={`${$$props.class} ${selectCustomClass}`} bind:value>
		<slot />
	</select>
</div>

<style lang="postcss" global>
	:local(.input-holder) {
		@apply relative;
		@apply w-full;
		@apply mt-4;
	}

	:local(select) {
		@apply w-full;
		@apply h-[50px];
		@apply px-5;
		@apply border border-light-gray bg-white rounded-2xl;
		@apply 4xl:h-32 4xl:px-12 4xl:rounded-[2.5rem] 4xl:text-4xl;
		@apply dark:text-dark-lighterGray dark:bg-dark-background;
	}

	:local(p) {
		@apply absolute;
		@apply px-1;
		@apply bg-white transform translate-x-4 translate-y-[-6px];
		@apply leading-none text-xs font-display;
		@apply md:text-base 4xl:text-4xl  4xl:px-3;
		@apply md:-translate-y-3 4xl:-translate-y-5 4xl:translate-x-8;
		@apply dark:bg-dark-background dark:text-white;
	}
</style>
