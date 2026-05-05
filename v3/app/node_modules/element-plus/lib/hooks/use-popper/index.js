Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _popperjs_core = require("@popperjs/core");

//#region ../../packages/hooks/use-popper/index.ts
const usePopper = (referenceElementRef, popperElementRef, opts = {}) => {
	const stateUpdater = {
		name: "updateState",
		enabled: true,
		phase: "write",
		fn: ({ state }) => {
			const derivedState = deriveState(state);
			Object.assign(states.value, derivedState);
		},
		requires: ["computeStyles"]
	};
	const options = (0, vue.computed)(() => {
		const { onFirstUpdate, placement, strategy, modifiers } = (0, vue.unref)(opts);
		return {
			onFirstUpdate,
			placement: placement || "bottom",
			strategy: strategy || "absolute",
			modifiers: [
				...modifiers || [],
				stateUpdater,
				{
					name: "applyStyles",
					enabled: false
				}
			]
		};
	});
	const instanceRef = (0, vue.shallowRef)();
	const states = (0, vue.ref)({
		styles: {
			popper: {
				position: (0, vue.unref)(options).strategy,
				left: "0",
				top: "0"
			},
			arrow: { position: "absolute" }
		},
		attributes: {}
	});
	const destroy = () => {
		if (!instanceRef.value) return;
		instanceRef.value.destroy();
		instanceRef.value = void 0;
	};
	(0, vue.watch)(options, (newOptions) => {
		const instance = (0, vue.unref)(instanceRef);
		if (instance) instance.setOptions(newOptions);
	}, { deep: true });
	(0, vue.watch)([referenceElementRef, popperElementRef], ([referenceElement, popperElement]) => {
		destroy();
		if (!referenceElement || !popperElement) return;
		instanceRef.value = (0, _popperjs_core.createPopper)(referenceElement, popperElement, (0, vue.unref)(options));
	});
	(0, vue.onBeforeUnmount)(() => {
		destroy();
	});
	return {
		state: (0, vue.computed)(() => ({ ...(0, vue.unref)(instanceRef)?.state || {} })),
		styles: (0, vue.computed)(() => (0, vue.unref)(states).styles),
		attributes: (0, vue.computed)(() => (0, vue.unref)(states).attributes),
		update: () => (0, vue.unref)(instanceRef)?.update(),
		forceUpdate: () => (0, vue.unref)(instanceRef)?.forceUpdate(),
		instanceRef: (0, vue.computed)(() => (0, vue.unref)(instanceRef))
	};
};
function deriveState(state) {
	const elements = Object.keys(state.elements);
	return {
		styles: (0, lodash_unified.fromPairs)(elements.map((element) => [element, state.styles[element] || {}])),
		attributes: (0, lodash_unified.fromPairs)(elements.map((element) => [element, state.attributes[element]]))
	};
}

//#endregion
exports.usePopper = usePopper;
//# sourceMappingURL=index.js.map