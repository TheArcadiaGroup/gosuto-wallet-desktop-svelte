<script context="module">
	import { generateTransactions } from '$utils/historyDataSample';
	export const load = async () => {
		//Connect to history API here
		let data = generateTransactions();

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

<HistoryPage historyArray={data} />
