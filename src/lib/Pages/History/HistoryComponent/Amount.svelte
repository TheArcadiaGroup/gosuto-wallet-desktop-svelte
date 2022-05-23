<script type="ts">
	import { user } from '$stores/user';

	export let amount = 0;
	export let price = 0.0;

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
		{price}&nbsp;{$user?.currency}
	</span>
</div>

<style>
</style>
