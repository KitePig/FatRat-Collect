Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

//#region ../../packages/hooks/use-focus/index.ts
const useFocus = (el) => {
	return { focus: () => {
		el.value?.focus?.();
	} };
};

//#endregion
exports.useFocus = useFocus;
//# sourceMappingURL=index.js.map