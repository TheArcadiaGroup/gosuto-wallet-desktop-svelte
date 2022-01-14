<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import 'chartjs-adapter-date-fns';

	let ctx: HTMLCanvasElement;
	let isDarkTheme: boolean = false;
	export let chartPrices = [{}];

	onMount(async () => {
		chartColors();
		chartRender();
	});

	const chartRender = () => {
		const chart = new Chart(ctx, {
			type: 'line',
			data: {
				datasets: [
					{
						borderColor: '#725DFF',
						borderWidth: window.matchMedia('(min-width: 1536px)').matches
							? 4
							: window.matchMedia('(min-width: 768px)').matches
							? 2
							: 1,
						pointRadius: 0,
						data: chartPrices,
						tension: 0.5,
					},
				],
			},
			options: {
				responsive: true,
				aspectRatio: window.matchMedia('(min-width: 768px)').matches ? 2 : 1,
				maintainAspectRatio: false,
				plugins: {
					legend: {
						display: false,
					},
				},
				scales: {
					y: {
						offset: true,
						ticks: {
							callback: (value: string) => {
								return `$${value}k`;
							},
							color: '#AAB5C5',
							font: {
								size: window.matchMedia('(min-width: 1366)').matches
									? 35
									: window.matchMedia('(min-width: 1518)').matches
									? 31
									: window.matchMedia('(min-width: 1821)').matches
									? 27
									: window.matchMedia('(min-width: 2049)').matches
									? 23
									: window.matchMedia('(min-width: 2732)').matches
									? 19
									: window.matchMedia('(min-width: 4098)').matches
									? 15
									: window.matchMedia('(min-width: 5464)').matches
									? 11
									: 7,
								lineHeight: '28px',
								weight: 'bold',
							},
						},
						grid: {
							borderDash: [4],
							borderWidth: 0,
							color: isDarkTheme ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)',
						},
					},
					x: {
						adapters: {
							date: {},
						},
						grid: {
							display: false,
							borderColor: isDarkTheme ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)',
							borderWidth: 1,
						},
						ticks: {
							color: '#AAB5C5',
							font: {
								size: window.matchMedia('(min-width: 5464)').matches
									? 35
									: window.matchMedia('(min-width: 4098)').matches
									? 31
									: window.matchMedia('(min-width: 2732)').matches
									? 27
									: window.matchMedia('(min-width: 2049)').matches
									? 23
									: window.matchMedia('(min-width: 1821)').matches
									? 19
									: window.matchMedia('(min-width: 1518)').matches
									? 15
									: window.matchMedia('(min-width: 1366)').matches
									? 11
									: 7,
								lineHeight: '28px',
								weight: 'bold',
							},
							callback: (tick: string) => {
								let formattedTick: string = <string>tick;
								if (formattedTick.indexOf('A') === 1 || formattedTick.indexOf('P') === 1) {
									formattedTick = '0' + formattedTick;
								}
								if (formattedTick.includes('AM')) {
									formattedTick = formattedTick.replace('AM', '.00 AM');
								} else {
									formattedTick = formattedTick.replace('PM', '.00 PM');
								}

								return formattedTick;
							},
						},
						type: 'time',
						time: {
							unit: 'hour',
						},
					},
				},
			},
		});
	};
	// Check if dark theme is enabled.
	const chartColors = () => {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			isDarkTheme = true;
		} else {
			isDarkTheme = false;
		}
	};
</script>

<div class="chart-wrapper">
	<canvas class="chart" bind:this={ctx} />
</div>

<style lang="postcss" global>
	:local(.chart-wrapper) {
		@apply relative shrink-0 w-[90%] mx-auto h-full;
	}
	:local(.chart) {
		@apply w-full h-full;
	}
</style>
