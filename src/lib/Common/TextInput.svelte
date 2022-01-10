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

<style lang="postcss">
	.input-holder {
		@apply relative mt-4;
	}

	input {
		@apply border border-light-gray h-[50px] px-2 w-full rounded-[12px] bg-white dark:bg-dark-background;
	}

	p {
		@apply absolute bg-white font-medium font-display dark:bg-dark-background transform translate-y-[-8px] translate-x-4 leading-none text-xs md:text-base px-1;
	}
</style>
