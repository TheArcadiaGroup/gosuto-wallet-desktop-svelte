<script lang="ts">
	export let title!: string;
</script>

<div class="action-details">
	<h2>{title}</h2>
	<slot />
</div>

<style lang="postcss" global>
	:local(.action-details) {
		@apply mt-16 md:mt-6 2xl:mt-[3vw] w-full flex flex-col gap-y-4 2xl:gap-[2.5vw] text-center;
	}
	.action-details > h2 {
		@apply font-bold text-2xl 2xl:text-[1.5vw] leading-8 text-black dark:text-white;
	}
	.action-details > p {
		@apply text-base 2xl:text-[1vw]  leading-6 text-light-grey dark:text-dark-gosutoIconGrey;
	}
</style>
