<script lang="ts">
	import StakingPositionCard from '$lib/components/StakingPositionCard/StakingPositionCard.svelte';

	export let stakePositions: StakePosition[];
</script>

<div class="w-full">
	{#each stakePositions as stakePosition}
		<StakingPositionCard {...stakePosition} />
	{/each}
</div>
