<script lang="ts">
	export let tokenName: string;
</script>

<div class="token-name">
	<p>{tokenName} Price</p>
</div>

<style lang="postcss" global>
	.token-name {
		@apply font-extrabold text-[10px] sm:text-[13px] leading-7 text-light-grey dark:text-white;
	}
</style>
