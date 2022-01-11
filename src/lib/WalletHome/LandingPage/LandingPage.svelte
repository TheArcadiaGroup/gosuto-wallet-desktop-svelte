<script lang="ts">
	import StakePositions from './StakePositions.svelte';
	import WalletHeader from './WalletHeader.svelte';

	export let walletName!: string;
	export let walletAddress!: string;
	export let stakePositions: StakePosition[];
</script>

<div class="w-full border-none">
	<div class="ml-[6%] pt-[15px]">
		<WalletHeader {walletName} {walletAddress} />
	</div>
	<div class="mt-[26px] md:mt-[35px] px-[37px]">
		<StakePositions {stakePositions} />
	</div>
	<div class=" flex justify-center">
		<button
			class="px-4 py-3 border border-light-neutrals-4 rounded-[24px] text-xs font-bold text-light-neutrals2 leading-4"
		>
			Show more
		</button>
	</div>
</div>
