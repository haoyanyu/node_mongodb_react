export const preloadImg = function(path) {
	return new Promise((resolve, reject) => {
		const image = new Image();
		image.onload = resolve;
		image.onerror = reject;
		image.src = path;
	})
}

