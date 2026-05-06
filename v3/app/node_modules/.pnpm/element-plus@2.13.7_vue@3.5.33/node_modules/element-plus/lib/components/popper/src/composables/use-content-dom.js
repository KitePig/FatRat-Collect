Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../../utils/types.js');
const require_index = require('../../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../../../hooks/use-z-index/index.js');
let vue = require("vue");

//#region ../../packages/components/popper/src/composables/use-content-dom.ts
const usePopperContentDOM = (props, { attributes, styles, role }) => {
	const { nextZIndex } = require_index$1.useZIndex();
	const ns = require_index.useNamespace("popper");
	const contentAttrs = (0, vue.computed)(() => (0, vue.unref)(attributes).popper);
	const contentZIndex = (0, vue.ref)(require_types.isNumber(props.zIndex) ? props.zIndex : nextZIndex());
	const contentClass = (0, vue.computed)(() => [
		ns.b(),
		ns.is("pure", props.pure),
		ns.is(props.effect),
		props.popperClass
	]);
	const contentStyle = (0, vue.computed)(() => {
		return [
			{ zIndex: (0, vue.unref)(contentZIndex) },
			(0, vue.unref)(styles).popper,
			props.popperStyle || {}
		];
	});
	const ariaModal = (0, vue.computed)(() => role.value === "dialog" ? "false" : void 0);
	const arrowStyle = (0, vue.computed)(() => (0, vue.unref)(styles).arrow || {});
	const updateZIndex = () => {
		contentZIndex.value = require_types.isNumber(props.zIndex) ? props.zIndex : nextZIndex();
	};
	return {
		ariaModal,
		arrowStyle,
		contentAttrs,
		contentClass,
		contentStyle,
		contentZIndex,
		updateZIndex
	};
};

//#endregion
exports.usePopperContentDOM = usePopperContentDOM;
//# sourceMappingURL=use-content-dom.js.map