import accBalance from './listeners/accBalance';
import transfers from './listeners/transfers';

export default () => {
	accBalance();
	transfers();
};
