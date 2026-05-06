const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_row = require('./row.js');
const require_constants = require('./constants.js');
let vue = require("vue");

//#region ../../packages/components/row/src/row.vue?vue&type=script&setup=true&lang.ts
var row_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElRow",
	__name: "row",
	props: require_row.rowProps,
	setup(__props) {
		const props = __props;
		const ns = require_index.useNamespace("row");
		(0, vue.provide)(require_constants.rowContextKey, { gutter: (0, vue.computed)(() => props.gutter) });
		const style = (0, vue.computed)(() => {
			const styles = {};
			if (!props.gutter) return styles;
			styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`;
			return styles;
		});
		const rowKls = (0, vue.computed)(() => [
			ns.b(),
			ns.is(`justify-${props.justify}`, props.justify !== "start"),
			ns.is(`align-${props.align}`, !!props.align)
		]);
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.tag), {
				class: (0, vue.normalizeClass)(rowKls.value),
				style: (0, vue.normalizeStyle)(style.value)
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["class", "style"]);
		};
	}
});

//#endregion
exports.default = row_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=row.vue_vue_type_script_setup_true_lang.js.map