import { loadingValidators, validators } from '$stores/user/stake';
import axios from 'axios';
import { saveData } from './dataStorage';

export default async () => {
	loadingValidators.set(true);
	const res = await axios.get('https://api.caspercommunity.io/validators');

	const validatorsArr: IValidator[] = [];

	Object.keys(res.data.validators).forEach((key) => {
		const validator = res.data.validators[key];
		validator.address = key;

		validatorsArr.push({
			validatorName:
				validator.name || `${key.substring(0, 4)}...${key.substring(key.length - 5, key.length)}`,
			validatorPosition: validator.currentPosition,
			validatorCommission: validator.currentDelegationRate / 100,
			currentDelegators: validator.currentDelegators,
			currentStaked: validator.currentCsprStaked,
			delegationReturn: validator.previousAPY / 100, // APY
			totalValidators: validator.currentTotalValidators,
			validatorHash: key,
		});
	});

	validators.set(validatorsArr);

	saveData('validators', JSON.stringify(validatorsArr));

	loadingValidators.set(false);
	return res.data;
};
