<script context="module">
	export const load = async () => {
		//Connect to history API here
		const res = await fetch('../api/history.json');
		const data = await res.json();

		return {
			props: {
				data,
			},
		};
	};
</script>

<script lang="ts">
	import HistoryPage from '$lib/components/HistoryPage.svelte';

	export let data;
</script>

<HistoryPage historyArray={data.data} hideNavbar={false} />
