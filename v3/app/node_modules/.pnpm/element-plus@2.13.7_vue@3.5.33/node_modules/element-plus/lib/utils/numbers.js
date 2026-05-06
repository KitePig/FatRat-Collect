Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

//#region ../../packages/utils/numbers.ts
/**
* Due to browser rendering and calculation precision loss issues,
* boundary checks cannot be based solely on value equality;
* a certain range of fluctuation is permissible.
*/
function isGreaterThan(a, b, epsilon = .03) {
	return a - b > epsilon;
}

//#endregion
exports.isGreaterThan = isGreaterThan;
//# sourceMappingURL=numbers.js.map