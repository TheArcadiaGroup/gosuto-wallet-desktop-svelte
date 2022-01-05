<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import 'chartjs-adapter-date-fns';

	let ctx: HTMLCanvasElement;
	let isDarkTheme: boolean = false;
	export let prices = [
		{ x: '2022-01-03T09:00:00', y: 7 },
		{ x: '2022-01-03T10:10:00', y: 9 },
		{ x: '2022-01-03T11:18:00', y: 14 },
		{ x: '2022-01-03T12:21:00', y: 11 },
		{ x: '2022-01-03T12:27:00', y: 18 },
		{ x: '2022-01-03T12:35:00', y: 20 },
		{ x: '2022-01-03T13:00:00', y: 23 },
	];

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
						borderWidth: window.matchMedia('(min-width: 640px)').matches ? 2 : 1,
						pointRadius: 0,
						data: prices,
						tension: 0.5,
					},
				],
			},
			options: {
				responsive: true,
				aspectRatio: window.matchMedia('(min-width: 640px)').matches ? 2 : 1,
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
							callback: (value) => {
								return `$${value}k`;
							},
							color: '#AAB5C5',
							font: {
								size: 7,
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
							borderColor: isDarkTheme
								? 'rgba(255, 255, 255, 0.3)'
								: 'rgba(0, 0, 0, 0.1)',
							borderWidth: 1,
						},
						ticks: {
							color: '#AAB5C5',
							font: {
								size: 8,
								lineHeight: '28px',
								weight: 'bold',
							},
							callback: (tick: string) => {
								let formattedTick: string = <string>tick;
								if (
									formattedTick.indexOf('A') === 1 ||
									formattedTick.indexOf('P') === 1
								) {
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
	// Check if dark them is enabled.
	const chartColors = () => {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
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

<style>
	.chart-wrapper {
		@apply relative shrink-0 w-full h-full;
	}
	.chart {
		@apply w-full h-full;
	}
</style>
