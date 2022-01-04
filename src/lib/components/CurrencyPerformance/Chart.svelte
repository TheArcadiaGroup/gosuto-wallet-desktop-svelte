<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import 'chartjs-adapter-date-fns';
	export let prices = [
		{ x: '2022-01-03T08:00:00', y: 7 },
		{ x: '2022-01-03T08:10:00', y: 9 },
		{ x: '2022-01-03T08:18:00', y: 14 },
		{ x: '2022-01-03T08:21:00', y: 11 },
		{ x: '2022-01-03T08:27:00', y: 18 },
		{ x: '2022-01-03T08:35:00', y: 20 },
		{ x: '2022-01-03T08:43:00', y: 23 },
		{ x: '2022-01-03T09:00:00', y: 32 },
		// { x: '2022-01-03T10:00:00', y: 25 },
	];

	let isDarkTheme: boolean = false;
	$: window.matchMedia('(min-width: 640px)').matches
		? console.log('Mobile')
		: console.log('Desktop');
	let data = {
		datasets: [
			{
				borderColor: '#725DFF',
				borderWidth: window.matchMedia('(min-width: 640px)').matches ? 2 : 1,
				pointRadius: 0,
				data: prices,
				tension: 0.5,
			},
		],
	};
	onMount(async () => {
		setChartColors();
		renderChart();
	});
	let ctx: HTMLCanvasElement;
	function renderChart() {
		let chart = new Chart(ctx, {
			type: 'line',
			data: data,
			options: {
				responsive: true,
				plugins: {
					legend: {
						display: false,
					},
				},
				scales: {
					y: {
						// beginAtZero: true,
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
						},
						type: 'time',
						time: {
							unit: 'hour',
							displayFormats: {
								// hour: 'HH' + '.00' + 'AM' ? 'AM' : 'PM',
							},
						},
					},
				},
			},
		});
	}
	function setChartColors() {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) &&
				window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			isDarkTheme = true;
		} else {
			isDarkTheme = false;
		}
	}
</script>

<div class="relative shrink-0 w-full sm:h-full">
	<canvas class="bg-gray-100 dark:bg-gray-800 w-full h-full" bind:this={ctx} />
</div>
