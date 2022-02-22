<script>
	import StakePage from '$lib/Pages/Profile/Stake/StakePage.svelte';
	import { onMount } from 'svelte';

	let data;

	onMount(() => {
		getData();
	});

	const getData = async () => {
		fetch('../api/stake')
			.then((response) => response.json())
			.then((response) => (data = response))
			.catch((error) => {
				console.error('error:', error);
			});
	};
</script>

{#if data}
	<StakePage stakeArray={data} />
{/if}
