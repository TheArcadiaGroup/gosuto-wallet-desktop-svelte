<script lang="ts">
	import StakingPositionCard from '$lib/components/StakingPositionCard/StakingPositionCard.svelte';

	export let stakePositions: StakePosition[];
</script>

<div>
	{#each stakePositions as stakePosition}
		<StakingPositionCard {...stakePosition} />
	{/each}
</div>

<!-- Styles -->
<style lang="postcss" global>
	:local(div) {
		@apply w-full flex flex-col justify-center gap-y-[25px] xl:gap-y-[1.5vmax];
	}
</style>
