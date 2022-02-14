<!-- @component 
	Describtion:
	> A stake detail component (fills the third column on /profile/stakes routes) for confirming the stake

	Bindables:
	- `amount` = Amount from the amount input.
	- `recipient` = Value form the recipient selection.
-->
<script lang="ts">
	import Button from '$lib/Common/Button.svelte';
	import SelectInput from '$lib/Common/SelectInput.svelte';
	import TextInput from '$lib/Common/TextInput.svelte';

	export let amount: number;
	export let recipient: string;

	/**Handler for clicking the "Confirm" button. Confirms the stake.*/
	function confirmStake() {
		// confirm stake
	}

	/**Handler for clicking the "Cancel" button. Cancels the stake.*/
	function cancelStake() {
		// cancel stake
	}
</script>

<div class="confirm">
	<div class="title">Stake CSPR</div>
	<div class="input-container">
		<TextInput type="number" label={'Enter CSPR amount'} bind:value={amount} />
	</div>
	<div class="w-full text-sm dark:text-white">$127 USD</div>
	<div class="select-container">
		<SelectInput label={'Recipient Address'} bind:value={recipient}>
			<option value="Arcadia">Arcadia</option>
		</SelectInput>
	</div>
	<div class="buttons">
		<Button on:click={confirmStake}>
			<div slot="text" class="button-text">Stake</div>
		</Button>
		<Button isTransparent={true}>
			<div slot="text" class="button-text">Cancel</div>
		</Button>
	</div>
</div>

<style lang="postcss" global>
	:local(.confirm) {
		@apply w-full h-full flex flex-col items-center gap-2 py-6;
	}

	:local(.title) {
		@apply font-semibold dark:text-white;
	}

	:local(.input-container) {
		@apply w-full;
	}

	:local(.select-container) {
		@apply w-full;
	}

	:local(.button-text) {
		@apply p-2;
	}

	:local(.buttons) {
		@apply my-3 w-full flex flex-col gap-3;
	}
</style>
