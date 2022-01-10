<script lang="ts">
	import StakePositions from './StakePositions.svelte';
	import WalletHeader from './WalletHeader.svelte';

	export let walletName!: string;
	export let walletAddress!: string;
	export let stakePositions: StakePosition[];

	// console.log(stakePositions);
</script>

<!-- TODO remove Font familly. To be applied globally -->
<div class="w-full">
	<div class="ml-[6%] mt-[15px]">
		<WalletHeader {walletName} {walletAddress} />
	</div>
	<div class="flex flex-col justify-center px-[37px] gap-y-[25px]">
		<!-- <StakePositions {stakePositions} /> -->
		<StakePositions {stakePositions} />
	</div>
	<div class=" flex justify-center">
		<button class="px-4 py-3 border border-neutral-300 rounded-[24px]">Show more</button>
	</div>
</div>
