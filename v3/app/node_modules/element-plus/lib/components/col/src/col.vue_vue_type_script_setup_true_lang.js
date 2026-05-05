const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_col = require('./col.js');
const require_constants = require('../../row/src/constants.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/col/src/col.vue?vue&type=script&setup=true&lang.ts
var col_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElCol",
	__name: "col",
	props: require_col.colProps,
	setup(__props) {
		const props = __props;
		const { gutter } = (0, vue.inject)(require_constants.rowContextKey, { gutter: (0, vue.computed)(() => 0) });
		const ns = require_index.useNamespace("col");
		const style = (0, vue.computed)(() => {
			const styles = {};
			if (gutter.value) styles.paddingLeft = styles.paddingRight = `${gutter.value / 2}px`;
			return styles;
		});
		const colKls = (0, vue.computed)(() => {
			const classes = [];
			[
				"span",
				"offset",
				"pull",
				"push"
			].forEach((prop) => {
				const size = props[prop];
				if (require_types.isNumber(size)) {
					if (prop === "span") classes.push(ns.b(`${props[prop]}`));
					else if (size > 0) classes.push(ns.b(`${prop}-${props[prop]}`));
				}
			});
			[
				"xs",
				"sm",
				"md",
				"lg",
				"xl"
			].forEach((size) => {
				if (require_types.isNumber(props[size])) classes.push(ns.b(`${size}-${props[size]}`));
				else if ((0, _vue_shared.isObject)(props[size])) Object.entries(props[size]).forEach(([prop, sizeProp]) => {
					classes.push(prop !== "span" ? ns.b(`${size}-${prop}-${sizeProp}`) : ns.b(`${size}-${sizeProp}`));
				});
			});
			if (gutter.value) classes.push(ns.is("guttered"));
			return [ns.b(), classes];
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.tag), {
				class: (0, vue.normalizeClass)(colKls.value),
				style: (0, vue.normalizeStyle)(style.value)
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["class", "style"]);
		};
	}
});

//#endregion
exports.default = col_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=col.vue_vue_type_script_setup_true_lang.js.map