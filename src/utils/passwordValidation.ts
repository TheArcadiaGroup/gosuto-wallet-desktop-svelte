import passwordValidator from 'password-validator';

const passwordSchema = new passwordValidator();

// Add properties to it
passwordSchema
	.is()
	.min(8) // Minimum length 8
	.is()
	.max(100) // Maximum length 100
	.has()
	.uppercase() // Must have uppercase letters
	.has()
	.lowercase() // Must have lowercase letters
	.has()
	.digits(2) // Must have at least 2 digits
	.has()
	.symbols(2) // Must have at least 2 symbols
	.has()
	.not()
	.spaces(); // Should not have spaces
// .is()
// .not()
// .oneOf(['Passw0rd', 'Password123']); // Blacklist these values

/* @Returns array of errors (strings) if the password does not meet the set criteria */
export const validatePassword = (password: string) => {
	return (passwordSchema.validate(password, { details: true }) as any[])?.map((item) =>
		item.message.replace('The string', 'Your password'),
	);
};

/* @Returns true when two strings passed in are similar */
export const passwordsAreSimilar = (prevPassword: string, newPassword: string) => {
	return prevPassword === newPassword;
};
