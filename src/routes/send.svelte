<script lang="ts">
	import GridLayout from '$lib/Common/GridLayout.svelte';
	import Send from '$lib/Home/Send/index.svelte';
	import Sidebar from '$lib/Home/Send/sidebar.svelte';

	let sidebarActive: boolean = false;
</script>

<GridLayout>
	<Send
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
