//#region ../../packages/components/select-v2/src/useOption.ts
function useOption(props, { emit }) {
	return {
		hoverItem: () => {
			if (!props.disabled) emit("hover", props.index);
		},
		selectOptionClick: () => {
			if (!props.disabled) emit("select", props.item, props.index);
		}
	};
}

//#endregion
export { useOption };
//# sourceMappingURL=useOption.mjs.map