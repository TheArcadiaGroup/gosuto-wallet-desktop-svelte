<script lang="ts">
	export let action: boolean;
	export let actionButtonText!: string;
</script>

<div class="buttons">
	<button type="button" on:click={() => (action = true)} class="action-button">
		{actionButtonText}
	</button>
	<button class="cancel-button">Cancel</button>
</div>

<style lang="postcss" global>
	:local(.buttons) {
		@apply flex flex-col items-center w-full;
	}
	:local(.action-button) {
		@apply px-12 py-2.5 2xl:py-[0.5vw] md:w-full bg-light-orange rounded-full leading-[26px] 2xl:leading-[1.75vw] text-sm md:text-[18px] 2xl:text-[1.25vw] text-white font-bold mt-[75px] md:mt-[30px] 2xl:mt-[2vw];
	}
	:local(.cancel-button) {
		@apply p-0 hidden md:block bg-transparent  leading-[25px] 2xl:leading-[1.75vw] text-[18px] 2xl:text-[1.25vw] text-light-grey dark:text-white font-bold mt-6 md:mt-10 2xl:mt-[2.5vw];
	}
</style>
