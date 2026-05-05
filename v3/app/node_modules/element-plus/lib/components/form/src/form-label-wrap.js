const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_error = require('../../../utils/error.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_constants = require('./constants.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/components/form/src/form-label-wrap.tsx
const COMPONENT_NAME = "ElLabelWrap";
var form_label_wrap_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: COMPONENT_NAME,
	props: {
		isAutoWidth: Boolean,
		updateAll: Boolean
	},
	setup(props, { slots }) {
		const formContext = (0, vue.inject)(require_constants.formContextKey, void 0);
		const formItemContext = (0, vue.inject)(require_constants.formItemContextKey);
		if (!formItemContext) require_error.throwError(COMPONENT_NAME, "usage: <el-form-item><label-wrap /></el-form-item>");
		const ns = require_index.useNamespace("form");
		const el = (0, vue.ref)();
		const computedWidth = (0, vue.ref)(0);
		const getLabelWidth = () => {
			if (el.value?.firstElementChild) {
				const width = window.getComputedStyle(el.value.firstElementChild).width;
				return Math.ceil(Number.parseFloat(width));
			} else return 0;
		};
		const updateLabelWidth = (action = "update") => {
			(0, vue.nextTick)(() => {
				if (slots.default && props.isAutoWidth) {
					if (action === "update") computedWidth.value = getLabelWidth();
					else if (action === "remove") formContext?.deregisterLabelWidth(computedWidth.value);
				}
			});
		};
		const updateLabelWidthFn = () => updateLabelWidth("update");
		(0, vue.onMounted)(() => {
			updateLabelWidthFn();
		});
		(0, vue.onBeforeUnmount)(() => {
			updateLabelWidth("remove");
		});
		(0, vue.onUpdated)(() => updateLabelWidthFn());
		(0, vue.watch)(computedWidth, (val, oldVal) => {
			if (props.updateAll) formContext?.registerLabelWidth(val, oldVal);
		});
		(0, _vueuse_core.useResizeObserver)((0, vue.computed)(() => el.value?.firstElementChild ?? null), updateLabelWidthFn);
		return () => {
			if (!slots) return null;
			const { isAutoWidth } = props;
			if (isAutoWidth) {
				const autoLabelWidth = formContext?.autoLabelWidth;
				const hasLabel = formItemContext?.hasLabel;
				const style = {};
				if (hasLabel && autoLabelWidth && autoLabelWidth !== "auto") {
					const marginWidth = Math.max(0, Number.parseInt(autoLabelWidth, 10) - computedWidth.value);
					const marginPosition = (formItemContext.labelPosition || formContext.labelPosition) === "left" ? "marginRight" : "marginLeft";
					if (marginWidth) style[marginPosition] = `${marginWidth}px`;
				}
				return (0, vue.createVNode)("div", {
					"ref": el,
					"class": [ns.be("item", "label-wrap")],
					"style": style
				}, [slots.default?.()]);
			} else return (0, vue.createVNode)(vue.Fragment, { "ref": el }, [slots.default?.()]);
		};
	}
});

//#endregion
exports.default = form_label_wrap_default;
//# sourceMappingURL=form-label-wrap.js.map