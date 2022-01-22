<script lang="ts">
	import ArrowInCircle from '$lib/Common/ArrowInCircle.svelte';
	import Button from '$lib/Common/Button.svelte';
	import Duplicate from '$icons/Duplicate.svelte';
	import StakeCard from './StakeCard.svelte';

	let stakeArray: {
		name: string;
		elapsedSeconds: number;
		fullSeconds: number;
		staked: number;
		unlocked: number;
	}[];
	let wallet: any;

	function backHandler() {
		// TODO go back somehow
	}

	function copyPK() {
		// TODO copy public key to clipboard (I assume that this is what this is supposed to do)
	}

	// DEV
	wallet = {
		name: 'Wallet 1',
		publicKey: '0x9f98e01d2...4ed7',
	};

	stakeArray = Array(10).fill({
		name: wallet?.name,
		// progress: 30,
		elapsedSeconds: 40,
		fullSeconds: 69,
		staked: 420,
		unlocked: 69,
	});
</script>

<div class="h-full w-full flex flex-col items-center py-10 gap-4 dark:text-white">
	<div class="flex flex-row item gap-3 items-center px-4">
		<div class="h-6">
			<ArrowInCircle disabled={false} alwaysShowBorder={true} on:click={backHandler} />
		</div>
		<div class="text-2xl font-semibold mb-1">{wallet?.name || 'unknown wallet name'}</div>
		<div class="text-light-lighterGray ml-4 dark:text-white">{wallet?.publicKey || '...'}</div>
		<div class="w-4 text-light-lighterGray dark:text-white" on:click={copyPK}>
			<Duplicate />
		</div>
	</div>

	<div class="flex flex-row justify-between item px-8">
		<div class="text-lg font-semibold">Stakes from this wallet</div>
		<div class="">
			<Button>
				<div slot="text" class="my-2 mx-4">+ Stake</div>
			</Button>
		</div>
	</div>
	<div class="item flex-grow h-0 px-8 overflow-y-scroll flex flex-col items-center gap-8 py-4">
		{#each stakeArray as stake}
			<StakeCard {stake} />
		{/each}
	</div>
	<div class="w-full grid place-content-center">
		<!-- TODO show this only, when there are too many cards -->
		<div
			class="rounded-full py-1 px-3 font-semibold cursor-pointer text-xs border-2 border-l-light-scrollBar hover:bg-light-scrollBar transition-all"
		>
			Show more
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.item) {
		@apply w-full;
	}
</style>
