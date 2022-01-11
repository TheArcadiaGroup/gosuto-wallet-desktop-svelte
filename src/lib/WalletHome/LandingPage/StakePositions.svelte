<script lang="ts">
	import StakingPositionCard from '$lib/components/StakingPositionCard/StakingPositionCard.svelte';

	export let stakePositions: StakePosition[];
</script>

<div class="w-full flex flex-col justify-center gap-y-[25px] ">
	{#each stakePositions as stakePosition}
		<StakingPositionCard {...stakePosition} />
	{/each}
</div>
