<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto/auto.esm';
	import 'chartjs-adapter-date-fns';
	import { user } from '$stores/user';

	let ctx: HTMLCanvasElement;
	export let chartPrices: ChartPrice[];

	let chart: Chart;
	let playAnimation = true;
	$: theme = $user?.theme ?? 'dark';

	onMount(async () => {
		chartRender();
	});

	$: if (chart && chartPrices) {
		reRenderChart();
		if (playAnimation) playAnimation = false;
	}

	const reRenderChart = () => {
		chart.destroy();
		chartRender();
	};

	const chartRender = () => {
		chart = new Chart(ctx, {
			type: 'line',
			data: {
				datasets: [
					{
						borderColor: '#725DFF',
						borderWidth: window.matchMedia('(max-width: 768)').matches
							? 1
							: window.matchMedia('(max-width: 1440px)').matches
							? 2
							: Math.round((window.innerWidth * 2) / 1440),
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
				animation: {
					duration: playAnimation ? 1000 : 0,
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
								// Font size at 1440px  screen is 11px. To scale, on bigger screens, scale the font size pixels.
								size: window.matchMedia('(max-width: 768)').matches
									? 7
									: window.matchMedia('(max-width: 1440px)').matches
									? 11
									: Math.round((window.innerWidth * 11) / 1440),
								lineHeight: '28px',
								weight: 'bold',
							},
							precision: 6,
						},
						grid: {
							borderDash: [4],
							borderWidth: 0,
							color: theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)',
						},
					},
					x: {
						adapters: {
							date: {},
						},
						grid: {
							display: false,
							borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)',
							borderWidth: 1,
						},
						ticks: {
							color: '#AAB5C5',
							font: {
								// Font size at 1440px  screen is 11px. To scale, on bigger screens, scale the font size pixels.
								size: window.matchMedia('(max-width: 768)').matches
									? 7
									: window.matchMedia('(max-width: 1440px)').matches
									? 11
									: Math.round((window.innerWidth * 11) / 1440),
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

	$: ((changed) => {
		if (changed && chart) {
			reRenderChart();
		}
	})(chartPrices);
</script>

<svelte:window on:resize={reRenderChart} />

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
