'use strict';

module.exports = predicate => new Promise(resolve => {
	const loop = setInterval(() => {
		if (predicate()) {
			clearInterval(loop);
			resolve();
		}
	});
});
