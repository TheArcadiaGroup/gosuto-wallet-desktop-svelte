const Store = require('electron-store');

const store = new Store({ accessPropertiesByDotNotation: false });

module.exports = {
	saveData: (key, data) => {
		store.set(key, data);
	},
	retrieveData: (key) => {
		return store.get(key);
	},
};
