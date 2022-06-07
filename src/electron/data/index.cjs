const Store = require('electron-store');

const store = new Store({
	accessPropertiesByDotNotation: false,
	fileExtension: 'gosuto',
	name: 'gosuto_data',
	encryptionKey: '@o4EB%Fb&MGFyk^LXj$9Xt5uk94RaR',
});

module.exports = {
	saveData: (key, data) => {
		store.set(key, data);
	},
	retrieveData: (key) => {
		return store.get(key);
	},
};
