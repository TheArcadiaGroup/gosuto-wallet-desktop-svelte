<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import { onMount } from 'svelte';

	onMount(() => {
		goto(`${$page.url.pathname}/all-positions`);
	});
</script>
