# How To Use PopUps

```js
<script>
	import ConfirmPopUp from '$lib/PopUps/Send/ConfirmPopUp.svelte';

	let showPopup = true;
</script>

<div class="main">
	<!-- Popup -->
	{#if showPopup}
		<ConfirmPopUp
			on:confirm={() => {
				showPopup = false;
			}}
		/>
	{/if}

	<!-- Popup Activator -->
	<button
		on:click={() => {
			showPopup = true;
		}}
	>
		Click ME TO POPUP
	</button>
</div>

<style lang="postcss">
	.main {
		@apply bg-light-orange h-screen;
	}

	button {
		@apply bg-white p-4 rounded-full;
	}
</style>
```
