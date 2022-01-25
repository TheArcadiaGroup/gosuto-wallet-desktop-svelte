<script lang="ts">
	export let label = '';
</script>

<div class="input-holder">
	<p>{label}</p>
	<select>
		<slot />
	</select>
</div>

<style lang="postcss" global>
	:local(.input-holder) {
		@apply relative mt-4;
	}

	:local(select) {
		@apply border border-light-gray h-[50px] px-2 w-full rounded-[12px] bg-white;
		@apply dark:bg-dark-background dark:text-white;
	}

	:local(p) {
		@apply absolute bg-white transform translate-y-[-7px] translate-x-4 leading-none text-[14px] px-1;
		@apply dark:bg-dark-background;
	}
</style>
