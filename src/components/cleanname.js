const cleanName = function(value) {
	return String(value)
		.toLowerCase()
		.replace(/[^\w]/g, '');
};

export default cleanName;
