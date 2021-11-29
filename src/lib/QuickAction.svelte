<script>
	const quickActions = [
		{
			text: 'Send',
			img: 'send',
			link: '/send',
		},
		{
			text: 'Withdraw',
			img: 'withdraw',
			link: '/withdraw',
		},
		{
			text: 'Tokens',
			img: 'tokens',
			link: '/tokens',
		},
		{
			text: 'Stake',
			img: 'stake',
			link: '/stake',
		},
	];
</script>

<main class="quick-action-section">
	{#each quickActions as quickAction}
		<div class="action">
			<img src="/images/png/{quickAction.img}.png" alt={quickAction.text} />
			<p>{quickAction.text}</p>
		</div>
	{/each}
</main>

<style>
	.quick-action-section {
		@apply box-border rounded-3xl flex justify-between items-center w-full px-12 py-10;
		border: 0.5px solid rgba(243, 243, 243, 1);
		box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
	}

	.action {
		@apply flex flex-col justify-center items-center;
	}

	p {
		@apply font-bold;
		color: #4f4f4f;
	}
</style>
