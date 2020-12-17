const capitalize = (str) => {
	try {
		return str.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
	} catch (error) {
		return str;
	}
};

export default capitalize;
