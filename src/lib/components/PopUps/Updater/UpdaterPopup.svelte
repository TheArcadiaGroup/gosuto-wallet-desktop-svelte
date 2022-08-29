<script lang="ts">
	import Popup from '$lib/components/Popup.svelte';
	import { updaterMessage } from '$stores';

	export let appUpdateComms: AppUpdateComms | null = null;
</script>

{#if appUpdateComms}
	<Popup
		title="Updater"
		on:confirm={() => {
			updaterMessage.set(null);
			if (appUpdateComms?.action) {
				window.api.send(
					'appUpdates',
					JSON.stringify({
						action: appUpdateComms?.action,
					}),
				);
			}
		}}
		on:cancel={() => {
			updaterMessage.set(null);
		}}
		goBack={false}
		hasCancel={appUpdateComms?.hasCancel}
	>
		{appUpdateComms.message}
	</Popup>
{/if}
