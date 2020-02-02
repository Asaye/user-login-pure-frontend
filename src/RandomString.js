const RandomString = (len) => {
	const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const _length = str.length;
	var result = "";
	for (let i = 0; i < len; i++) {
		result += str.charAt(Math.floor(Math.random()*_length));
		if ((i + 1) % 4 === 0 && (i + 1) < len) {
			result += "-";
		}
	}
	return result;
}
export default RandomString;