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
			},
		});
	}
</script>

<canvas id="myChart" />
