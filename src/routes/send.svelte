<script lang="ts">
	import GridLayout from '$lib/Common/GridLayout.svelte';
	import Swap from '$lib/Home/Send/index.svelte';
	import Sidebar from '$lib/Home/Send/sidebar.svelte';

	let sidebarActive: boolean = false;
</script>

<GridLayout>
	<Swap
		slot="mid"
		on:click={() => {
			sidebarActive = true;
		}}
	/>
	<Sidebar
		slot="last"
		active={sidebarActive}
		on:closeSidebar={() => {
			sidebarActive = false;
		}}
	/>
</GridLayout>
