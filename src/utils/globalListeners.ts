import accBalance from './responseParsers/accBalance';
import delegations from './responseParsers/delegations';
import transfers from './responseParsers/transfers';

export default () => {
	accBalance();
	transfers();
	delegations();
};
