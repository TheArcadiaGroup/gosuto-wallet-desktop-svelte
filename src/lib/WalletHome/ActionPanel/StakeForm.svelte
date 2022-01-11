<script lang="ts">
	export let stakeAmount!: number;
</script>

<div class="flex flex-col items-center justify-center px-12 md:px-6 mt-6 md:mt-[90px]">
	<h2>Stake CSPR</h2>
	<div class="mt-8 md:mt-11">
		<div class="input-wrapper">
			<label for="name">Enter CSPR Amount</label>
			<input name="name" id="name" type="text" bind:value={stakeAmount} />
		</div>
	</div>
</div>

<style lang="postcss" global>
	:local(.input-wrapper) {
		@apply relative items-center w-full h-[49px] md:h-[53px] border border-black border-opacity-10 dark:border-white dark:border-opacity-40 rounded-3xl;
	}
	:local(label) {
		@apply absolute -top-2 left-5 -mt-px inline-block px-1 text-xs font-medium text-light-grey dark:text-white dark:bg-dark-background;
	}
	:local(input) {
		@apply w-full h-full bg-transparent px-7 py-3 border-0 resize-none focus:ring-0 sm:text-sm text-opacity-40 text-black dark:text-white;
	}
</style>
