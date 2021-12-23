<script type="ts">
	export let amount = 10;
	export let price = 0.0;

	export let cryptoUnit = 'USDT';
	export let currencyUnit = 'USD';

	export let background: String;
</script>

<div>
	<span class="text-lg {background == 'white' ? 'text-light-red' : 'text-white'}">
		-{amount}&nbsp;{cryptoUnit}
	</span>
</div>
<div>
	<span class="text-base {background == 'white' ? 'text-light-red' : 'text-white'}">
		{price}&nbsp;{currencyUnit}
	</span>
</div>
