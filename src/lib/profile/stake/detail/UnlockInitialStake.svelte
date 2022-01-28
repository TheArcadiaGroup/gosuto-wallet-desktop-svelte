<!-- 
    @component

    A column form with a title and a button for claiming intial stake.
 -->
<script lang="ts">
	import Button from '$lib/Common/Button.svelte';

	function claim() {
		// confirm stake
	}

	function cancel() {
		// cancel stake
	}
</script>

<div class="unlock-initial-stake">
	<div class="title">Unlock initial Stake</div>
	<div class="text">Initital stake: 20 CSPR</div>
	<div class="buttons">
		<Button on:click={claim}>
			<div slot="text" class="button-text">Claim</div>
		</Button>
		<Button on:click={cancel}>
			<div slot="text" class="button-text">Cancel</div>
		</Button>
	</div>
</div>

<style lang="postcss" global>
	:local(.unlock-initial-stake) {
		@apply w-full h-full flex flex-col items-stretch gap-2 py-6 px-2;
	}

	:local(.title) {
		@apply font-semibold dark:text-white text-center;
	}

	:local(.text) {
		@apply text-sm dark:text-white text-center;
	}

	:local(.buttons) {
		@apply my-3 w-full flex flex-col gap-3;
	}

	:local(.button-text) {
		@apply p-2;
	}
</style>
