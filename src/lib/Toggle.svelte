<script>
	export let DarkModeStatus = true;
</script>

<!-- <div class="flex items-center justify-center w-full mb-12"> -->

<label for="toogleA" class="flex items-center cursor-pointer mt-3">
	<!-- toggle -->
	<div class="relative">
		<!-- input -->
		<input id="toogleA" type="checkbox" class="sr-only" bind:checked={DarkModeStatus} />
		<!-- line -->
		<div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner" />
		<!-- dot -->
		<div class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition" />
	</div>
	<!-- label -->
	<div class="ml-3 text-gray-700 font-medium dark:text-white">Dark Mode</div>
</label>

<!-- </div> -->
<style>
	input:checked ~ .dot {
		transform: translateX(100%);
		background-color: #48bb78;
	}
</style>
