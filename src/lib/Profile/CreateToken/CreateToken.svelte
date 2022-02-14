<!--
@component
The wallet send/swap last column. This component is the sidebar, in which user can import / create a token
All logic of this component (whether it is shown or not) is handled by it's parents
@author marekvospel
-->
<script lang="ts">
	import CreateTokenForm from '$lib/Profile/CreateToken/Forms/CreateTokenForm.svelte';
	import ImportTokenForm from '$lib/Profile/CreateToken/Forms/ImportTokenForm.svelte';

	let variant: 'create' | 'import' = 'create';
</script>

<div class="create-token-sidebar">
	{#if variant === 'create'}
		<CreateTokenForm on:selectToken on:switchToImport={() => (variant = 'import')} />
	{:else}
		<ImportTokenForm on:selectToken on:switchToCreate={() => (variant = 'create')} />
	{/if}
</div>

<style lang="postcss" global>
	:local(.create-token-sidebar) {
		@apply relative;
		@apply h-full w-full;
		@apply flex justify-center;
		@apply dark:bg-dark-grey;
	}
</style>
