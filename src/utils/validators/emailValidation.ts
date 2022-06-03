import validator from 'validator';

export default (email: string) => {
	return validator.isEmail(email);
};
