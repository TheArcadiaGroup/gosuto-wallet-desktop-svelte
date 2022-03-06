<script lang="ts">
	import Popup from '$lib/components/Popup.svelte';
</script>

<Popup title="Are you sure want to swap?" on:confirm on:cancel hasCancel={true} />
