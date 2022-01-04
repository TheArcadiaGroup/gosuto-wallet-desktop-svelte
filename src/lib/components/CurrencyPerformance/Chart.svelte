<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	export let prices: number[] = [0, 10, 12, 15, 17, 19, 27];
	onMount(async () => {
		renderChart();
	});
	function renderChart() {
		let ctx = <HTMLCanvasElement>document.getElementById('myChart');
		let chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [
					{
						backgroundColor: 'rgb(255, 99, 132)',
						borderColor: '#725DFF',
						borderWidth: 1,
						pointRadius: 0,
						data: prices,
						tension: 0.5,
						spanGaps: true,
					},
				],
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						display: false,
					},
				},
				scales: {
					y: {
						ticks: {
							callback: (value) => {
								return `$${value}k`;
							},
							color: '#4F4F4F',
							font: {
								size: 7,
								lineHeight: '28px',
								weight: 'bold',
							},
						},
						grid: {
							borderDash: [4],
							borderWidth: 0,
						},
					},
					x: {
						grid: {
							display: false,
							borderColor: 'rgba(0, 0, 0, 0.1)',
							borderWidth: 2,
						},
						// type: 'time',
						// time: {
						// 	unit: 'hour',
						// },
					},
				},
			},
		});
	}
</script>

<canvas id="myChart" />
