import accBalance from './listeners/accBalance';
import delegations from './listeners/delegations';
import transfers from './listeners/transfers';

export default () => {
	accBalance();
	transfers();
	delegations();
};
