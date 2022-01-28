<script lang="ts">
	export let name: string = '';
	export let placeholder: string = '';

	let textInput: string = '';
	let saveChange: HTMLElement;

	$: if (textInput != '') {
		saveChange.textContent = 'Save Change';
	} else if (saveChange != undefined) {
		saveChange.textContent = 'Change ' + name;
	}
</script>

<div>
	<label for={name}>
		{name}
	</label>
	<input {name} {placeholder} bind:value={textInput} />
	<button bind:this={saveChange}>
		Change {name}
	</button>
</div>

<style type="postcss" global>
	:local(div) {
		@apply relative;
		@apply w-2/3 md:w-full;
	}

	:local(label) {
		@apply bg-white dark:bg-dark-gosutoDark;
		@apply text-light-grey dark:text-white text-sm 3xl:text-xl 4xl:text-5xl font-display;
		@apply absolute px-2 4xl:px-4 left-4 4xl:left-10 -top-2 3xl:-top-4 4xl:-top-5;
	}

	:local(input) {
		@apply dark:bg-dark-gosutoDark rounded-3xl 4xl:rounded-[3.5rem];
		@apply placeholder:absolute placeholder:left-6 placeholder:4xl:left-14 placeholder:3xl:text-xl placeholder:4xl:text-5xl placeholder:4xl:overflow-visible;
		@apply dark:text-white 3xl:text-xl 4xl:text-5xl;
		@apply border dark:border-white dark:border-opacity-30;
		@apply w-full py-4 px-6 4xl:py-12 4xl:px-14;
	}

	:local(button) {
		@apply float-right mr-4 mt-1 4xl:mt-4;
		@apply font-semibold font-display text-light-orange text-sm 3xl:text-xl 4xl:text-5xl;
	}
</style>
