<script>
	import { createEventDispatcher } from 'svelte';

	export let quickAction;

	const dispatch = createEventDispatcher();

	function actionClicked() {
		dispatch('actionClicked', {
			id: quickAction.index,
		});
	}
</script>

<div
	class="action"
	class:selected={quickAction.selected}
	class:not-selected={!quickAction.selected}
	on:click={actionClicked}
>
	<img src="/images/png/{quickAction.img}.png" alt={quickAction.text} />
	<p>{quickAction.text}</p>
</div>

<style>
	.action {
		@apply flex flex-col justify-center items-center p-6 rounded-3xl cursor-pointer;
	}

	.not-selected {
		@apply hover:bg-purple-100 transition duration-200 ease-in-out;
	}

	p {
		@apply font-bold;
		color: #4f4f4f;
	}

	.selected {
		background: #725dff;
		box-shadow: 0px 4px 7px rgba(114, 93, 255, 0.3);
	}

	.selected > p {
		@apply text-white;
	}
</style>
