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
			<div class="copy-icon">
				<p>{displayedWalletAddress}</p>
				<button type="button" on:click={copyWalletAddress}>
					<CopyIcon />
				</button>
			</div>
		</div>
		<h2>Stakes from This Wallet</h2>
	</div>
</div>

<!-- Styles -->
<style lang="postcss" global>
	:local(.header-wrapper) {
		@apply flex flex-col items-start text-left;
	}
	.header-wrapper > div {
		@apply flex flex-col md:flex-row justify-center items-start md:items-center;
	}
	.header-wrapper > div > button {
		@apply w-7 h-7 rounded-full hidden md:flex  items-center justify-center border-2 border-light-neutrals1;
	}
	.header-wrapper > h2 {
		@apply mt-[19px] font-bold text-black text-base md:text-[22px] leading-[22px] md:leading-[30px] dark:text-white;
	}
	:local(.arrow-left) {
		@apply w-3 h-3 text-light-neutrals4;
	}
	.header-wrapper > div > h2 {
		@apply md:mr-[35px] md:pl-[9px] font-bold text-base md:text-2xl leading-[22px] md:leading-8 text-black dark:text-white;
	}
	:local(.copy-icon) {
		@apply flex flex-row items-center gap-[11px] text-light-gardenText dark:text-white text-sm md:text-[18px] font-medium;
	}
</style>
