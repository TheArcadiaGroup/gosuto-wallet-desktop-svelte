<script lang="ts">
	export let label: string = 'Input Your Text';
	export let value: string | number = '';
</script>

{#if $$props.type === 'password'}
	<div class="input-holder">
		<p>{label}</p>
		<input bind:value type="password" />
	</div>
{:else if $$props.type === 'email'}
	<div class="input-holder">
		<p>{label}</p>
		<input bind:value type="email" />
	</div>
{:else if $$props.type === 'number'}
	<div class="input-holder">
		<p>{label}</p>
		<input bind:value type="number" />
	</div>
{:else}
	<div class="input-holder">
		<p>{label}</p>
		<input bind:value type="text" />
	</div>
{/if}

<style lang="postcss" global>
	:local(.input-holder) {
		@apply w-full;
		@apply relative mt-4;
	}

	:local(input) {
		@apply border border-light-gray h-[50px] 4xl:h-32 px-5 4xl:px-12 w-full rounded-2xl 4xl:rounded-[2.5rem] bg-white dark:bg-dark-background;
		@apply 4xl:text-4xl dark:text-dark-lighterGray;
	}

	:local(p) {
		@apply absolute bg-white transform translate-y-[-6px] md:-translate-y-3 4xl:-translate-y-5 translate-x-4 4xl:translate-x-8 leading-none text-xs md:text-base 4xl:text-4xl px-1 4xl:px-3 font-display;
		@apply dark:bg-dark-background dark:text-white;
	}
</style>
