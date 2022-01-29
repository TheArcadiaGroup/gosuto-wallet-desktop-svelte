<script lang="ts">
	import Button from '$lib/Common/Button.svelte';

	export let disabled = false;

	function unstake() {
		if (disabled) return;

		// confirm stake
	}

	function cancel() {
		// cancel stake
	}
</script>

<div class="unstake">
	<div class="title">Unstake CSPR</div>
	<div class="text">Unstake: 15 CSPR</div>
	<div class="text staking-length">
		Unstaking will take until:
		<div class="until-date">1 Dec 2021</div>
	</div>
	{#if disabled}
		<div class="buttons">
			<Button on:click={unstake}>
				<div slot="text" class="button-text">Unstake</div>
			</Button>
			<Button on:click={cancel} transparent={true}>
				<div slot="text" class="button-text">Cancel</div>
			</Button>
		</div>
	{/if}
</div>

<style lang="postcss" global>
	:local(.unstake) {
		@apply w-full h-full flex flex-col items-stretch gap-2 py-6 px-2;
	}

	:local(.title) {
		@apply font-semibold dark:text-white text-center;
	}

	:local(.text) {
		@apply text-sm dark:text-white text-center;
	}

	:local(.staking-length) {
		@apply flex flex-row items-center justify-center;
	}

	:local(.until-date) {
		@apply text-light-orange gap-2;
	}

	:local(.buttons) {
		@apply my-3 w-full flex flex-col gap-3;
	}

	:local(.button-text) {
		@apply p-2;
	}
</style>
