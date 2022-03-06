const monthNames = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

export const convertDate = (date: Date | string): string => {
	let dateToConvert: Date;
	if (typeof date == 'string') {
		dateToConvert = new Date(date);
	} else {
		dateToConvert = date;
	}
	return `${dateToConvert.getDate()} ${
		monthNames[dateToConvert.getMonth()]
	} ${dateToConvert.getFullYear()}`;
};

export const dateDifference = (larger: Date, smaller: Date): string => {
	// Discard the time and time-zone information.
	const utc1 = Date.UTC(
		smaller.getFullYear(),
		smaller.getMonth(),
		smaller.getDate(),
		smaller.getHours(),
		smaller.getMinutes(),
		smaller.getSeconds(),
	);
	const utc2 = Date.UTC(
		larger.getFullYear(),
		larger.getMonth(),
		larger.getDate(),
		larger.getHours(),
		larger.getMinutes(),
		larger.getSeconds(),
	);

	return convertMiliseconds(Math.floor(utc2 - utc1), 'default');
};

function convertMiliseconds(miliseconds: number, format: string): string {
	const total_seconds = Math.floor(miliseconds / 1000);
	const total_minutes = Math.floor(total_seconds / 60);
	const total_hours = Math.floor(total_minutes / 60);
	const days = Math.floor(total_hours / 24);

	const seconds = total_seconds % 60;
	const minutes = total_minutes % 60;
	const hours = total_hours % 24;

	const pad = function (n: Number) {
		return n < 10 ? '0' + n : n;
	};

	switch (format) {
		case 's':
			return `${total_seconds}`;
		case 'm':
			return `${total_minutes}`;
		case 'h':
			return `${total_hours}`;
		case 'd':
			return `${days}`;
		case 'default':
			return `${days}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
		default:
			return `${days}:${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
	}
}

export const decimalToPercentage = (decimal: number): number => {
	return decimal * 100;
};

export const shortenAddress = (address: string): string => {
	if (address) {
		return `${address.slice(0, 11)}...${address.slice(-4)}`;
	} else {
		return address;
	}
};
