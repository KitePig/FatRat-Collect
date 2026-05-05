//#region ../../packages/utils/easings.ts
function easeInOutCubic(t, b, c, d) {
	const cc = c - b;
	t /= d / 2;
	if (t < 1) return cc / 2 * t * t * t + b;
	return cc / 2 * ((t -= 2) * t * t + 2) + b;
}

//#endregion
export { easeInOutCubic };
//# sourceMappingURL=easings.mjs.map