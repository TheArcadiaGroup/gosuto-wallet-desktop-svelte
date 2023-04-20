<script lang="js">
	import Popup from '$lib/components/Popup.svelte';
	import { onDestroy } from 'svelte';
	import QRCode from 'qrcode-generator';

	export let privateKey = '';
	export let okDisabled = false;

	let qr = QRCode(0, 'H');
	qr.addData(privateKey ?? '');
	qr.make();
	let qrCodeDataUrl = qr.createDataURL();

	onDestroy(() => {
		privateKey = '';
		okDisabled = false;
	});
</script>

<Popup
	title="Scan QRCode on Gosuto Mobile to import private key"
	on:confirm
	confirmText="Dismiss"
	{okDisabled}
>
	<img src={qrCodeDataUrl} alt="QR Code" class="w-full max-w-md mx-auto" />
</Popup>
