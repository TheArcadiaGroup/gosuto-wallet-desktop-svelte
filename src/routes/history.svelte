<script lang="ts">
	import { onMount } from 'svelte';

	import HistoryPage from '$lib/components/HistoryPage.svelte';

	let data: HistoryObject[];

	onMount(() => {
		getData();
	});

	const getData = async () => {
		fetch('../api/history')
			.then((response) => response.json())
			.then((response) => (data = response))
			.catch((error) => {
				console.error('error:', error);
			});
	};
</script>

{#if data}
	<HistoryPage historyArray={data} hideNavbar={false} />
{/if}
