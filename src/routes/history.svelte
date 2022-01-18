<script lang="ts">
	import HistoryComponent from '$lib/components/HistoryComponent.svelte';
	import GridLayout from '$lib/Common/GridLayout.svelte';
	import RoundedSelect from '$lib/Common/RoundedSelect.svelte';

	// import Sidebar from '$lib/History/sidebar.svelte';
	// let sidebarActive: boolean = false;

	export let historyArray = Array(10);
	let optionsArray: string[] = ['All', 'Received', 'Sent', 'Swap', 'Stake'];
	let filterId: number = 0;
	$: historyFilter = optionsArray[filterId];

	let selectedTokenIndex = -1;

	function selectToken(e: { detail: { id: number } }): void {
		selectedTokenIndex = e.detail.id;
	}
</script>

<GridLayout>
	<div class="mid-holder" slot="mid">
		<div class="main">
			<h3>{historyFilter} History</h3>
			<RoundedSelect {optionsArray} bind:value={filterId} />
			<div class="history-holder">
				{#each historyArray as historyObject, i}
					<HistoryComponent
						class={i > 0 ? 'top-border' : ''}
						on:select={selectToken}
						index={i}
						clicked={selectedTokenIndex === i}
					/>
				{/each}
			</div>
			<button>Show more</button>
		</div>
	</div>
	<div class="sidebar" slot="last">Test</div>
</GridLayout>

<style lang="postcss" global>
	:local(.mid-holder) {
		@apply flex justify-end mr-[5vw];
	}

	:local(.main) {
		@apply h-screen flex flex-col p-4 md:p-0 w-full max-w-[50vw];
	}

	:local(h3) {
		@apply font-bold md:text-2xl ml-4 md:ml-0 my-8 2xl:mt-16 dark:text-white;
	}

	:local(.history-holder) {
		@apply w-full min-w-max overflow-y-auto h-[85%] pr-6;
	}

	:local(button) {
		@apply border-2 border-light-lineColor rounded-[90px];
		@apply text-sm font-bold dark:text-white;
		@apply my-6 py-2 px-4 self-center;
		@apply hover:bg-light-purple hover:text-white hover:border-light-purple transition duration-500;
	}
</style>
