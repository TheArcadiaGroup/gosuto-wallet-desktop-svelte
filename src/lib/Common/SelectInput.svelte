<script lang="ts">
	export let label = ''
</script>


<div class="input-holder">
	<p>{ label }</p>
	<select>
		<slot></slot>
	</select>
</div>

<style lang="postcss">

	.input-holder {
		@apply relative mt-4;
	}

	select {
		@apply border border-light-gray h-[50px] px-2 w-full rounded-[12px] bg-white dark:bg-dark-background;
	}

	p {
		@apply absolute bg-white dark:bg-dark-background transform translate-y-[-7px] translate-x-4 leading-none text-[14px] px-1;
	}

</style>