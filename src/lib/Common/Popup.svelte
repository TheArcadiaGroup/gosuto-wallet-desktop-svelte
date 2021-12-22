<script lang="ts">
	import { scale } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let title: String = 'Title Test';
	export let hasCancel: boolean = false;
	export let goBack: boolean = false;
</script>

<div class="popup-holder" transition:scale>
	<div class="popup bg-white dark:bg-dark-blue">
		<div class="pcontainer">
			<div class="popuptitle">{title}</div>
			<div class="content">
				<slot />
			</div>
			<div class="button-container">
				<button
					class="confirm-button"
					class:w-full={hasCancel}
					class:mr-3={hasCancel}
					on:click={() => {
						dispatch('confirm');
					}}
				>
					{!goBack ? 'Confirm' : 'Go back'}
				</button>
				{#if hasCancel}
					<button
						class="cancel-button bg-light-orange"
						class:w-full={hasCancel}
						on:click={() => {
							dispatch('cancel');
						}}
					>
						Cancel
					</button>
				{/if}
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.popup {
		@apply rounded-[34px] text-center max-w-xs w-1/2 px-4;
	}
	.pcontainer {
		@apply py-8;
	}
	.popuptitle {
		@apply font-bold mb-5;
	}

	.button-container {
		@apply flex mt-5 justify-center;
	}

	.button-container > button {
		@apply rounded-[50px] py-3 px-8;
		@apply text-sm font-semibold;
	}

	.confirm-button {
		@apply text-white bg-light-orange border border-light-orange;
	}

	.cancel-button {
		@apply text-light-orange bg-white;
		@apply border border-light-orange;
	}

	.popup-holder {
		@apply fixed top-0 left-0 right-0 bottom-0 h-screen w-screen z-50 px-4;
		@apply justify-center items-center flex;
	}
</style>
