const Store = require('electron-store');

// The encryption key in this case is used to ensure data will be obfuscated and users can't directly edit the config file. This helps in preventing them from directly editing it and resulting in errors in the app
const store = new Store({
	accessPropertiesByDotNotation: false,
	fileExtension: 'gosuto',
	name: 'gosuto_data',
	encryptionKey: '', // @o4EB%Fb&MGFyk^LXj$9Xt5uk94RaR
});

// TODO: ADD MIGRATIONS FOR THE DATA ONCE A NEW VERSION HAS BEEN DEPLOYED

module.exports = {
	saveData: (key, data) => {
		store.set(key, data);
	},
	retrieveData: (key) => {
		return store.get(key);
	},
};
