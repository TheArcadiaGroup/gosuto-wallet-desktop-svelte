<script lang="ts">
	import HistoryComponent from '$lib/components/HistoryComponent.svelte';
	import GridLayout from '$lib/Common/GridLayout.svelte';
	import HistoryComponent from '$lib/components/HistoryComponent.svelte';

	// import Sidebar from '$lib/History/sidebar.svelte';
	// let sidebarActive: boolean = false;

	export let validatorArray = Array(10);
	let historyFilter: string = 'All';

	let selectedTokenIndex = -1;

	function selectToken(e: { detail: { id: number } }): void {
		selectedTokenIndex = e.detail.id;
	}
</script>

<GridLayout>
	<div class="main" slot="mid">
		<div class="main">
			<h3>{historyFilter} History</h3>
			<div class="validator-holder">
				{#each validatorArray as validatorObject, i}
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
</GridLayout>

<style lang="postcss" global>
	:local(.main) {
		@apply h-screen flex flex-col p-4 md:p-0;
	}

	:local(h3) {
		@apply font-bold md:text-2xl ml-4 md:ml-0 mt-8 2xl:mt-16 dark:text-white;
	}

	:local(.validator-holder) {
		@apply w-full min-w-max overflow-y-auto h-[85%] pr-6;
	}

	:local(button) {
		@apply border-2 border-light-lineColor rounded-[90px];
		@apply text-sm font-bold dark:text-white;
		@apply my-6 py-2 px-4 self-center;
		@apply hover:bg-light-purple hover:text-white hover:border-light-purple transition duration-500;
	}
</style>
