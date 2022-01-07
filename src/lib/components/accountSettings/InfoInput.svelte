<script lang="ts">
	export let name: string = '';
	export let placeholder: string = '';

	let textInput: string = '';
	let saveChange: HTMLElement;

	$: {
		if (textInput != '') {
			saveChange.textContent = 'Save Change';
		} else if (saveChange != undefined) {
			saveChange.textContent = 'Change ' + name;
		}
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
	}

	:local(label) {
		@apply bg-white dark:bg-dark-gosutoDark;
		@apply text-light-grey dark:text-white text-sm font-display;
		@apply absolute px-2 left-4 -top-2;
	}

	:local(input) {
		@apply dark:bg-dark-gosutoDark rounded-3xl;
		@apply placeholder:absolute placeholder:left-6;
		@apply dark:text-white;
		@apply border dark:border-white dark:border-opacity-30;
		@apply w-full py-4 p-6;
	}

	:local(button) {
		@apply float-right mr-4 mt-1;
		@apply font-semibold font-display text-light-orange text-sm;
	}
</style>
