<script lang="ts">
	export let tokenName: string;
</script>

<div class="token-name">
	<p>{tokenName} Price</p>
</div>

<style lang="postcss" global>
	.token-name {
		@apply font-extrabold text-[10px] md:text-[13px] 2xl:text-[1vw] leading-7 2xl:leading-[2vw] text-light-grey dark:text-white;
	}
</style>
