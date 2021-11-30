<script>
	import RoundedButton from '$lib/RoundedButton.svelte';
</script>

<div class="grid place-items-center h-full w-full mt-24">
	<div>
		<div>
			<div class="text-2xl font-semibold text-regular-gray">Lorem ipsum dolor sit amet,</div>
			<div class="text-2xl font-semibold text-regular-gray">consectetuer adipiscing</div>
		</div>
		<div class="flex justify-center mt-3 mb-12">
			<div class="text-sm font-semibold text-light-gray text-center w-2/5">
				Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
				euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
			</div>
		</div>
		<RoundedButton><div class="px-32 py-2 text-xl">Next</div></RoundedButton>
		<div class="mt-12">
			<span class="text-base font-bold text-light-gray cursor-pointer">Skip</span>
		</div>
	</div>
</div>
