<script lang="ts">
	import type { stringify } from 'postcss';

	export let options: string[] = ['1 Day', '1 Week', '1 Month'];
</script>

<div>
	<select
		id="range"
		name="range"
		class="w-full h-[21px] bg-transparent px-4 font-medium text-[10px] text-[#4F4F4F] leading-6 border border-black border-opacity-10 rounded-[24px]"
	>
		{#each options as option}
			<option>{option}</option>
		{/each}
	</select>
</div>
