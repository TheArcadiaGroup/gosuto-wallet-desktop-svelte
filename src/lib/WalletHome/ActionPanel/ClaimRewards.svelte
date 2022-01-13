<script lang="ts">
	import ActionPanelButtons from './ActionPanelComponents/ActionPanelButtons.svelte';
	import ActionPanelDetails from './ActionPanelComponents/ActionPanelDetails.svelte';
	import ActionPanelHeader from './ActionPanelComponents/ActionPanelHeader.svelte';

	let initialStake: number = 20;
	let totalRewards: number = 20;
	let action: boolean = false;
</script>

{#if action}
	<!-- <ConfirmPopUp /> -->
{/if}
<ActionPanelHeader />
<ActionPanelDetails title="Claim Rewards">
	<p class="font-normal">
		Initial stake: {initialStake} CSPR
	</p>
	<p class="font-bold">
		Total Rewards: {totalRewards} CSPR
	</p>
</ActionPanelDetails>
<ActionPanelButtons bind:action>Claim</ActionPanelButtons>
