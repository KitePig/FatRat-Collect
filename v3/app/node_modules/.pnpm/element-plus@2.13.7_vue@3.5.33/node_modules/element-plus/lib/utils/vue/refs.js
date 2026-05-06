Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

//#region ../../packages/utils/vue/refs.ts
const composeRefs = (...refs) => {
	return (el) => {
		refs.forEach((ref) => {
			ref.value = el;
		});
	};
};

//#endregion
exports.composeRefs = composeRefs;
//# sourceMappingURL=refs.js.map