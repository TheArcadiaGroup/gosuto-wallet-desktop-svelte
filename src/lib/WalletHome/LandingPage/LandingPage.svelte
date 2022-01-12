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
	<div class="mt-[26px] md:mt-[35px] xl:mt-[2vmax] w-[85%] mx-auto">
		<StakePositions {stakePositions} />
	</div>
	<div class=" flex justify-center">
		<button
			class="px-4 py-3 xl:py-[1.5vmax] xl:px-[2vmax] border border-light-neutrals-4 rounded-full text-xs xl:text-[1vmax] font-bold text-light-neutrals2 dark:text-white leading-4 my-8 md:mb-4 xl:my-[1.5vmax]"
		>
			Show more
		</button>
	</div>
</div>
