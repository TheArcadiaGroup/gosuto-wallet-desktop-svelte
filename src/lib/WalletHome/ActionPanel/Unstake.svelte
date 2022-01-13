<script lang="ts">
	import ConfirmPopUp from '$lib/PopUps/Unstake/ConfirmPopUp.svelte';
	import { convertDate } from '$utils';
	import ActionPanelButtons from './ActionPanelComponents/ActionPanelButtons.svelte';
	import ActionPanelDetails from './ActionPanelComponents/ActionPanelDetails.svelte';
	import ActionPanelHeader from './ActionPanelComponents/ActionPanelHeader.svelte';

	let unstakeAmount: number = 15;
	// Set this Date
	let unstakingWaitDate: Date = new Date(Date.now());
	let action: boolean;
	export let unstaking: boolean = false;
</script>

{#if action}
	<ConfirmPopUp />
{/if}
<ActionPanelHeader />
<ActionPanelDetails title={unstaking ? 'Unstaking CSPR' : 'Unstake CSPR'}>
	<p class="font-bold">
		Unstake: {unstakeAmount} CSPR
	</p>
	<p class="unstake-wait">
		Unstaking will take until: <span class="text-light-orange">
			{convertDate(unstakingWaitDate)}
		</span>
	</p>
</ActionPanelDetails>
{#if !unstaking}
	<ActionPanelButtons bind:action>Unstake</ActionPanelButtons>
{/if}

<style lang="postcss" global>
	:local(.unstake-wait) {
		@apply font-normal md:tracking-tighter 2xl:tracking-normal;
	}
</style>
