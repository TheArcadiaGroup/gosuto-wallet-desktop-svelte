<!-- @component 
	Describtion:
	> A stake detail component (fills the third column on /profile/stakes routes) that claims the reward from a specified stake.
-->
<script lang="ts">
	import Button from '$lib/Components/Button.svelte';

	export let stake = {
		name: wallet?.name,
		elapsedSeconds: 20,
		fullSeconds: 69,
		unstaked: false,
		staked: 420,
		unlocked: 0,
		rewards: 0,
	};

	/**Handler for clicking the "Claim" button. Claims the reward*/
	function claim() {
		// confirm claim
	}

	/**Handler for clicking the "Cancel" button. Cancels the claim and hides the component*/
	function cancel() {
		// cancel stake
	}
</script>

<div class="claim-reward">
	<div class="title">Claim Rewards</div>
	<div class="text">Initital stake: {stake.staked} CSPR</div>
	<div class="text">Total rewards: {stake.rewards} CSPR</div>
	<div class="buttons">
		<Button on:click={claim}>
			<div slot="text" class="button-text">Claim</div>
		</Button>
		<Button on:click={cancel} isTransparent={true}>
			<div slot="text" class="button-text">Cancel</div>
		</Button>
	</div>
</div>

<style lang="postcss" global>
	:local(.claim-reward) {
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
