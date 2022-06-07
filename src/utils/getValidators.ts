import { loadingValidators, validators } from '$stores/user/stake';
import { getNetworkValidators } from './casper';
import { retrieveData, saveData } from './dataStorage';

export default async (network: 'mainnet' | 'testnet') => {
	const cachedValidators = retrieveData('validators') ?? {
		mainnet: [],
		testnet: [],
	};

	//  return immediately if anything has been cached, otherwise show loader
	if (cachedValidators[network].length > 0) {
		validators.set(cachedValidators?.[network]);
	} else {
		loadingValidators.set(true);
	}

	getNetworkValidators(network)
		.then((validatorsArr) => {
			validators.set(validatorsArr.sort((a, b) => b.currentDelegators - a.currentDelegators));
			cachedValidators[network] = validatorsArr;
			saveData('validators', cachedValidators);
		})
		.finally(() => loadingValidators.set(false));
};
