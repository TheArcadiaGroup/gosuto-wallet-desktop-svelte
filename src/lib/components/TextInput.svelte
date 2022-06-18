<!-- 
	@component 
	Description:
	> Custom textInput component to allow user to input a string/text e.g. a password or number.
	
	@author MikeBrandon
-->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let label: string = 'Input Your Text';
	export let value: string | number = '';
	export let type: 'text' | 'password' | 'number' | 'email' = 'text';
	export let isDisabled = false;
	export let step = 1;
	export let addTextBg = false;

	const dispatch = createEventDispatcher();
</script>

{#if type === 'password'}
	<div class="input-holder">
		<p class={`${$$props.class} ${addTextBg ? 'dark-bg' : 'normal-bg'}`}>{label}</p>
		<input
			disabled={isDisabled}
			class={$$props.class}
			bind:value
			type="password"
			on:input={() => dispatch('input')}
		/>
	</div>
{:else if type === 'email'}
	<div class="input-holder">
		<p class={`${$$props.class} ${addTextBg ? 'dark-bg' : 'normal-bg'}`}>{label}</p>
		<input
			disabled={isDisabled}
			class={$$props.class}
			bind:value
			type="email"
			on:input={() => dispatch('input')}
		/>
	</div>
{:else if type === 'number'}
	<div class="input-holder">
		<p class={`${$$props.class} ${addTextBg ? 'dark-bg' : 'normal-bg'}`}>{label}</p>
		<input
			disabled={isDisabled}
			class={$$props.class}
			bind:value
			type="number"
			{step}
			on:input={() => dispatch('input')}
		/>
	</div>
{:else}
	<div class="input-holder">
		<p class={`${$$props.class} ${addTextBg ? 'dark-bg' : 'normal-bg'}`}>{label}</p>
		<input
			disabled={isDisabled}
			class={$$props.class}
			bind:value
			type="text"
			on:input={() => dispatch('input')}
		/>
	</div>
{/if}

<style lang="postcss" global>
	:local(.input-holder) {
		@apply w-full;
		@apply relative mt-4;
	}

	:local(input) {
		@apply border border-light-gray h-[50px] 4xl:h-32 px-5 4xl:px-12 w-full rounded-2xl 4xl:rounded-[2.5rem] bg-white dark:bg-dark-grey;
		@apply 4xl:text-4xl dark:text-dark-lighterGray;
	}

	:local(p) {
		@apply absolute bg-white transform translate-y-[-6px] md:-translate-y-3 4xl:-translate-y-5 translate-x-4 4xl:translate-x-8 leading-none text-xs md:text-base 4xl:text-4xl px-1 4xl:px-3 font-display;
		@apply dark:text-white;
	}

	:local(p.dark-bg) {
		@apply dark:bg-dark-grey;
	}

	:local(p.dark-bg.gosuto-dark) {
		@apply dark:bg-dark-gosutoDark;
	}

	:local(input.gosuto-dark) {
		@apply dark:bg-dark-gosutoDark;
	}

	:local(p.normal-bg) {
		@apply dark:bg-transparent;
	}
</style>
