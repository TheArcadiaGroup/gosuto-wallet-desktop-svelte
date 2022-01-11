<script lang="ts">
	export let label: string = 'Input Your Text';
</script>

<div class="input-holder">
	<p>{label}</p>
	<input type={$$props.type} />
</div>

<style lang="postcss">
	.input-holder {
		@apply relative mt-4;
	}

	input {
		@apply border border-light-gray dark:border-white dark:border-opacity-30 h-[50px] px-2 w-full rounded-[12px] bg-white dark:bg-dark-background;
	}

	p {
		@apply absolute bg-white dark:bg-dark-background transform translate-y-[-7px] translate-x-4 leading-none text-[14px] px-1 text-light-grey dark:text-white;
	}
</style>
