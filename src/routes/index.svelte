<script lang="ts">
	import HistoryComponent from '$components/HistoryComponent.svelte';
</script>

<!-- <main>Gosuto Wallet</main> -->
<HistoryComponent
	background="purple"
	status="Swap"
	SwapData={{
		fromAmount: 10.0,
		toAmount: 10.0,
		fromPrice: 10.0,
		toPrice: 0.0,
		fromCryptoUnit: 'USDT',
		fromPriceUnit: 'USD',
		toCryptoUnit: 'BTC',
		toPriceUnit: 'USD',
	}}
/>
<HistoryComponent background="purple" status="Sent" />
<HistoryComponent background="purple" status="Received" />
<HistoryComponent background="purple" status="Stake" />
