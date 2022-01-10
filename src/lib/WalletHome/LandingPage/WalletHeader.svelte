<script lang="ts">
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

<!-- TODO remove font family. To be applied globally -->
<div class="w-full">
	<!-- Wallet Details -->
	<div class="flex flex-col items-start text-left">
		<div class="flex flex-col md:flex-row gap-x-[35px]">
			<h2 class="font-bold text-base leading-[22px] text-black">{walletName}</h2>
			<!-- TODO  SF Pro Display source-->
			<div class="flex flex-row items-center gap-[11px] text-light-gardenText text-sm font-medium">
				<p>{displayedWalletAddress}</p>
				<button type="button" on:click={copyWalletAddress}>
					<CopyIcon />
				</button>
			</div>
		</div>
		<h2 class="mt-[19px] font-bold text-black text-base leading-[22px]">Stakes from This Wallet</h2>
	</div>
</div>
