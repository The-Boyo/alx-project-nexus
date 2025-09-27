export const generateUniqId = () => {
	const vowels = ["a", "e", "i", "o", "u", "b", "c", "d", "f"];

	return `${Math.floor(Math.random() * 10)}${
		vowels[Math.floor(Math.random() * 9)]
	}${Math.floor(Math.random() * 100)}`;
};
