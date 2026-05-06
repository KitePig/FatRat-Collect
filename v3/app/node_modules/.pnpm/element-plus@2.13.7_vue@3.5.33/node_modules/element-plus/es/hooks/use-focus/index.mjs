//#region ../../packages/hooks/use-focus/index.ts
const useFocus = (el) => {
	return { focus: () => {
		el.value?.focus?.();
	} };
};

//#endregion
export { useFocus };
//# sourceMappingURL=index.mjs.map