<script type="ts">
	import { user } from '$stores/user';
	import { csprPrice } from '$stores/tokens';

	export let amount = 0;

	// TODO: Improve this when we get to tokens
	export let cryptoUnit = 'CSPR';
	export let type: 'positive' | 'negative' = 'positive';

	export let clicked: boolean = false;
	export let smaller: boolean = false;
</script>

<div>
	<span
		class="{smaller ? 'text-sm md:text-base' : 'text-sm md:text-lg'} {!clicked
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
		class="uppercase {smaller ? 'text-xs md:text-sm' : 'text-xs md:text-base'}  {!clicked
			? type == 'negative'
				? 'text-light-red'
				: 'text-light-green'
			: 'text-white'}"
	>
		{(amount * $csprPrice[$user?.currency ?? 'usd']).toFixed(2)}&nbsp;{$user?.currency}
	</span>
</div>

<style>
</style>
