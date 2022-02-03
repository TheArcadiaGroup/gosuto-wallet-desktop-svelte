<!-- @component 
	Description:
	> Custom Switch component to allow user to toggle on and off/true and false.
	
	Props:
	- `checked` = A boolean value. This is the value of whether the toggle is in its on or off state. It can also be bound to parent component to keep track of whether the user has set it to on/off.
-->
<script lang="ts">
	export let checked: boolean = false;
</script>

<label class="switch">
	<input type="checkbox" bind:checked />
	<span class="slider round" />
</label>

<style lang="postcss">
	/* The switch - the box around the slider */
	.switch {
		@apply relative inline-block w-10 h-6;
	}

	/* Hide default HTML checkbox */
	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	/* The slider */
	.slider {
		@apply absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-light-gray;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	.slider:before {
		@apply absolute h-5 w-5 bg-white;
		content: '';
		left: 2px;
		bottom: 2px;
		-webkit-transition: 0.4s;
		transition: 0.4s;
	}

	input:checked + .slider {
		@apply bg-light-purple;
	}

	input:focus + .slider {
		box-shadow: 0 0 1px #725dff;
	}

	input:checked + .slider:before {
		-webkit-transform: translateX(16px);
		-ms-transform: translateX(16px);
		transform: translateX(16px);
	}

	/* Rounded sliders */
	.slider.round {
		border-radius: 34px;
	}

	.slider.round:before {
		border-radius: 50%;
	}
</style>
