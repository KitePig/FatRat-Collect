Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_objects = require('../../utils/objects.js');
const require_runtime$1 = require('../../utils/vue/props/runtime.js');
let _vueuse_core = require("@vueuse/core");
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _floating_ui_dom = require("@floating-ui/dom");

//#region ../../packages/hooks/use-floating/index.ts
const useFloatingProps = require_runtime$1.buildProps({});
const unrefReference = (elRef) => {
	if (!_vueuse_core.isClient) return;
	if (!elRef) return elRef;
	const unrefEl = (0, _vueuse_core.unrefElement)(elRef);
	if (unrefEl) return unrefEl;
	return (0, vue.isRef)(elRef) ? unrefEl : elRef;
};
const getPositionDataWithUnit = (record, key) => {
	const value = record?.[key];
	return (0, lodash_unified.isNil)(value) ? "" : `${value}px`;
};
const useFloating = ({ middleware, placement, strategy }) => {
	const referenceRef = (0, vue.ref)();
	const contentRef = (0, vue.ref)();
	const states = {
		x: (0, vue.ref)(),
		y: (0, vue.ref)(),
		placement,
		strategy,
		middlewareData: (0, vue.ref)({})
	};
	const update = async () => {
		if (!_vueuse_core.isClient) return;
		const referenceEl = unrefReference(referenceRef);
		const contentEl = (0, _vueuse_core.unrefElement)(contentRef);
		if (!referenceEl || !contentEl) return;
		const data = await (0, _floating_ui_dom.computePosition)(referenceEl, contentEl, {
			placement: (0, vue.unref)(placement),
			strategy: (0, vue.unref)(strategy),
			middleware: (0, vue.unref)(middleware)
		});
		require_objects.keysOf(states).forEach((key) => {
			states[key].value = data[key];
		});
	};
	(0, vue.onMounted)(() => {
		(0, vue.watchEffect)(() => {
			update();
		});
	});
	return {
		...states,
		update,
		referenceRef,
		contentRef
	};
};
const arrowMiddleware = ({ arrowRef, padding }) => {
	return {
		name: "arrow",
		options: {
			element: arrowRef,
			padding
		},
		fn(args) {
			const arrowEl = (0, vue.unref)(arrowRef);
			if (!arrowEl) return {};
			return (0, _floating_ui_dom.arrow)({
				element: arrowEl,
				padding
			}).fn(args);
		}
	};
};

//#endregion
exports.arrowMiddleware = arrowMiddleware;
exports.getPositionDataWithUnit = getPositionDataWithUnit;
exports.useFloating = useFloating;
exports.useFloatingProps = useFloatingProps;
//# sourceMappingURL=index.js.map