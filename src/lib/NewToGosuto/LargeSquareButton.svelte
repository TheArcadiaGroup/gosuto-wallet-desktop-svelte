<script>
	export let buttonCaption1;
	export let buttonCaption2;
	export let color = 'white';
	export let textColor = 'black';
</script>

<div
	class="rounded-lg box bubble"
	style="border-radius: 10%;background-color: {color};color:{textColor}"
>
	<div class="grid place-items-center h-full w-full">
		<div>
			<div class="text-5xl text-center font-bold ">
				{buttonCaption1}
			</div>
			<div class="text-xl text-center font-bold ">
				{buttonCaption2}
			</div>
		</div>
	</div>
</div>

<style>
	.box {
		width: 20rem;
		height: 20rem;
	}
	.bubble {
		box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
	}
</style>
