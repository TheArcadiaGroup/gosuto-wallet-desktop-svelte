<script type="ts">
	export let amount = 10;
	export let price = 0.0;

	export let cryptoUnit = 'USDT';
	export let currencyUnit = 'USD';
	export let type: 'positive' | 'negative' = 'positive';

	export let clicked: boolean = false;
</script>

<div>
	<span
		class="text-lg {!clicked
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
		class="text-base {!clicked
			? type == 'negative'
				? 'text-light-red'
				: 'text-light-green'
			: 'text-white'}"
	>
		{price}&nbsp;{currencyUnit}
	</span>
</div>
