<script lang="ts">
	import ArrowLeftIcon from '$icons/ArrowLeftIcon.svelte';
</script>

<div class="header">
	<button class="back-button">
		<span>
			<ArrowLeftIcon />
		</span>
	</button>
	<h2>Stake</h2>
</div>

<style lang="postcss" global>
	:local(.header) {
		@apply mt-[59px] 2xl:mt-[4vw] hidden md:flex flex-row items-center justify-start gap-x-2.5 2xl:gap-x-[0.5vw];
	}
	.header > button {
		@apply w-7 h-7 2xl:w-[2vw] 2xl:h-[2vw] rounded-full hidden md:flex items-center justify-center border-2 border-light-neutrals1;
	}
	.header > button > span {
		@apply w-3 h-3 2xl:w-[1vw] 2xl:h-[1vw] text-light-neutrals4;
	}
	.header > h2 {
		@apply font-bold text-[18px] 2xl:text-[1.25vw] leading-[25px] 2xl:leading-[1.75vw] text-center text-black dark:text-white;
	}
</style>
