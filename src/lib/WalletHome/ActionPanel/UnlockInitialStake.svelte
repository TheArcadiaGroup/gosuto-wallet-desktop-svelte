<script lang="ts">
	import ActionPanelHeader from './ActionPanelComponents/ActionPanelHeader.svelte';
	import ActionPanelDetails from './ActionPanelComponents/ActionPanelDetails.svelte';
	import ActionPanelButtons from './ActionPanelComponents/ActionPanelButtons.svelte';

	let initialStake: number = 20;
	let action: boolean = false;
</script>

{#if action}
	<!-- <ConfirmPopUp /> -->
{/if}
<ActionPanelHeader />
<ActionPanelDetails title="Unlock initial stake">
	<p class="font-normal">
		Initial stake: {initialStake} CSPR
	</p>
</ActionPanelDetails>
<div class="mt-10">
	<ActionPanelButtons {action} actionButtonText="Claim" />
</div>
