<!-- 
	@component 
	Description:
	> Basic Popup Component with that makes the background slightly darker when it pops up. 

	Slots:
	- Pass the content inside the popup here.
	
	@author MikeBrandon
-->
<script lang="ts">
	import { scale, fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let title: String = 'Title Test';
	export let hasCancel: boolean = false;
	export let goBack: boolean = false;
	export let confirmText = 'Confirm';
</script>

<div transition:fade|local class="darker" />
<div class="popup-holder" transition:scale|local>
	<div class="popup bg-white dark:bg-dark-blue">
		<div class="pcontainer">
			<div class="popuptitle">{title}</div>
			<div class="popup-content">
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
					{!goBack ? confirmText : 'Go back'}
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

<style lang="postcss" global>
	:local(.popup) {
		@apply rounded-[34px] text-center px-4;
		@apply w-full md:w-auto md:max-w-sm;
		@apply text-dark-gray dark:text-white;
	}

	:local(.pcontainer) {
		@apply py-8;
	}

	:local(.popuptitle) {
		@apply font-bold mb-5 mx-12;
		@apply dark:text-white;
	}

	:local(.button-container) {
		@apply flex mt-5 justify-center;
	}

	:local(.button-container) > button {
		@apply rounded-[50px] py-3 px-8;
		@apply text-sm font-semibold;
	}

	:local(.confirm-button) {
		@apply text-white bg-light-orange border border-light-orange;
	}

	:local(.cancel-button) {
		@apply text-light-orange bg-transparent;
		@apply border border-light-orange;
	}

	:local(.popup-holder) {
		@apply fixed top-0 left-0 right-0 bottom-0 h-screen w-screen z-50 px-4;
		@apply justify-center items-center flex;
	}

	:local(.darker) {
		@apply fixed top-0 bottom-0 left-0 right-0 z-30 bg-[#00000077];
	}

	.popup-content p {
		@apply text-sm mb-1;
	}

	.popup-content .amount {
		@apply text-lg font-bold text-light-purple;
	}
</style>
