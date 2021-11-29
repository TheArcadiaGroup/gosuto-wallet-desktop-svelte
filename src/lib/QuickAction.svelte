<script>
	import Action from '$lib/Action.svelte';

	const quickActions = [
		{
			index: 0,
			text: 'Send',
			img: 'send',
			link: '/send',
			selected: true,
		},
		{
			index: 1,
			text: 'Withdraw',
			img: 'withdraw',
			link: '/withdraw',
			selected: false,
		},
		{
			index: 2,
			text: 'Tokens',
			img: 'tokens',
			link: '/tokens',
			selected: false,
		},
		{
			index: 3,
			text: 'Stake',
			img: 'stake',
			link: '/stake',
			selected: false,
		},
	];

	function actionclick(event) {
		quickActions.forEach((action) => {
			action.selected = false;
		});
		quickActions[event.detail.id].selected = true;
	}
</script>

<main class="quick-action-section">
	{#each quickActions as quickAction, i}
		<Action {quickAction} on:actionClicked={actionclick} />
	{/each}
</main>

<style>
	.quick-action-section {
		@apply box-border rounded-3xl flex justify-between items-center px-12 py-10 m-4;
		border: 0.5px solid rgba(243, 243, 243, 1);
		box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
	}
</style>
