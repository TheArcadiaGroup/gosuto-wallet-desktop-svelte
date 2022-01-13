<script lang="ts">
	import StakePositions from './StakePositions.svelte';
	import WalletHeader from './WalletHeader.svelte';

	export let walletName!: string;
	export let walletAddress!: string;
	export let stakePositions: StakePosition[];
</script>

<div class="wrapper">
	<div class="header">
		<WalletHeader {walletName} {walletAddress} />
	</div>
	<div class="stake-positions">
		<StakePositions {stakePositions} />
	</div>
	<div class="show-more">
		<button>Show more</button>
	</div>
</div>

<!-- Styles -->
<style lang="postcss" global>
	:local(.wrapper) {
		@apply w-full border-none;
	}
	:local(.header) {
		@apply ml-[6%] pt-[15px];
	}
	:local(.stake-positions) {
		@apply mt-[26px] md:mt-[35px] 2xl:mt-[2.5vw] w-[85%] mx-auto;
	}
	:local(.show-more) {
		@apply flex justify-center;
	}
	.show-more > button {
		@apply px-4 py-3 2xl:py-[1vw] 2xl:px-[1vw] border border-light-neutrals4 rounded-full text-xs 2xl:text-[1vw] font-bold text-light-neutrals2 dark:text-white leading-4 my-8 md:mb-4 2xl:my-[1.5vw];
	}
</style>
