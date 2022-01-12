<script lang="ts">
	import ArrowLeftIcon from '$icons/ArrowLeftIcon.svelte';
	import CopyIcon from '$icons/CopyIcon.svelte';
	import { onMount } from 'svelte';

	export let walletName!: string;
	export let walletAddress!: string;
	let displayedWalletAddress!: string;
	onMount(() => {
		truncateWalletAddress();
	});
	const truncateWalletAddress = () => {
		displayedWalletAddress =
			walletAddress.substr(0, 11) +
			'...' +
			walletAddress.substr(walletAddress.length - 3, walletAddress.length);
	};
	const copyWalletAddress = () => {
		if (navigator.clipboard) {
			navigator.clipboard.writeText(walletAddress);
		}
	};
</script>

<div class="w-full">
	<!-- Wallet Details -->
	<div class="header-wrapper">
		<div>
			<button type="button">
				<span class="arrow-left">
					<ArrowLeftIcon />
				</span>
			</button>
			<h2>
				{walletName}
			</h2>
			<!-- TODO  SF Pro Display source-->
			<div class="address">
				<p>{displayedWalletAddress}</p>
				<button type="button" on:click={copyWalletAddress}>
					<!-- <span class=""> -->
					<CopyIcon />
					<!-- </span> -->
				</button>
			</div>
		</div>
		<h2>Stakes from This Wallet</h2>
	</div>
</div>

<!-- Styles -->
<style lang="postcss" global>
	:local(.header-wrapper) {
		@apply flex flex-col items-start text-left mt-[90px];
	}
	.header-wrapper > div {
		@apply flex flex-col md:flex-row justify-center items-start md:items-center;
	}
	.header-wrapper > div > button {
		@apply w-7 h-7 2xl:w-[2vmax] 2xl:h-[2vmax] rounded-full hidden md:flex items-center justify-center border-2 border-light-neutrals1;
	}
	:local(.arrow-left) {
		@apply w-3 h-3 2xl:w-[1vmax] 2xl:h-[1vmax] text-light-neutrals4;
	}
	.header-wrapper > div > h2 {
		@apply md:mr-[35px] md:pl-[9px] 2xl:mr-[2vmax] 2xl:pl-[0.5vmax] font-bold text-base md:text-2xl 2xl:text-[1.5vmax] leading-[22px] md:leading-8 text-black dark:text-white;
	}
	.header-wrapper > h2 {
		@apply mt-[19px] 2xl:mt-[4vmax] font-bold text-black text-base md:text-[22px] 2xl:text-[1.5vmax] leading-[22px] md:leading-[30px] dark:text-white;
	}
	:local(.address) {
		@apply flex flex-row items-center gap-x-[11px] 2xl:gap-x-[1vmax] text-light-gardenText dark:text-white text-sm md:text-[18px] 2xl:text-[1.25vmax] font-medium;
	}
	.address > button {
		@apply h-full 2xl:h-[1.25vmax] w-auto flex items-center justify-center;
	}
</style>
