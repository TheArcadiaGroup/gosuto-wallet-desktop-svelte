import accBalance from './responseParsers/accBalance';
import appUpdates from './responseParsers/appUpdates';
import delegations from './responseParsers/delegations';
import tokenCreation from './responseParsers/tokenCreation';
import transfers from './responseParsers/transfers';
import ledger from './responseParsers/ledger';

export default () => {
	accBalance();
	transfers();
	delegations();
	tokenCreation();
	appUpdates();
	ledger();
};
