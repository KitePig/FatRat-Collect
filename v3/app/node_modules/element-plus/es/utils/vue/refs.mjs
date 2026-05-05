//#region ../../packages/utils/vue/refs.ts
const composeRefs = (...refs) => {
	return (el) => {
		refs.forEach((ref) => {
			ref.value = el;
		});
	};
};

//#endregion
export { composeRefs };
//# sourceMappingURL=refs.mjs.map