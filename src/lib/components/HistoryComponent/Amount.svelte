<script type="ts">
	export let amount = 10;
	export let price = 0.0;

	export let cryptoUnit = 'USDT';
	export let currencyUnit = 'USD';

	export let background: String;
	export let type: 'positive' | 'negative' = 'positive';
</script>

<div>
	<span
		class="text-lg {background == 'white'
			? type == 'negative'
				? 'text-light-red'
				: 'text-light-green'
			: 'text-white'}"
	>
		{type == 'negative' ? '-' : '+'}{amount}&nbsp;{cryptoUnit}
	</span>
</div>
<div>
	<span
		class="text-base {background == 'white'
			? type == 'negative'
				? 'text-light-red'
				: 'text-light-green'
			: 'text-white'}"
	>
		{price}&nbsp;{currencyUnit}
	</span>
</div>
