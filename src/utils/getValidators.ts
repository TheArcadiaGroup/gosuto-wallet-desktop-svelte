import { loadingValidators, validators } from '$stores/user/stake';
import { getNetworkValidators } from './casper';
import { retrieveData, saveData } from './dataStorage';

export default async (network: 'mainnet' | 'testnet') => {
	const cachedValidators = retrieveData('validators')?.[network];

	//  return immediately if anything has been cached, otherwise show loader
	if (cachedValidators) {
		validators.set(cachedValidators);
	} else {
		loadingValidators.set(true);
	}
	getNetworkValidators(network)
		.then((validatorsArr) => {
			validators.set(validatorsArr.sort((a, b) => b.currentDelegators - a.currentDelegators));
			saveData('validators', JSON.stringify({ [network]: validatorsArr }));
		})
		.finally(() => loadingValidators.set(false));
};
