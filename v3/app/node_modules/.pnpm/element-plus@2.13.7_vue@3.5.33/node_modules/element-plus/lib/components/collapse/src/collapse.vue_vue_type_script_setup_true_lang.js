const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_collapse = require('./collapse.js');
const require_use_collapse = require('./use-collapse.js');
let vue = require("vue");

//#region ../../packages/components/collapse/src/collapse.vue?vue&type=script&setup=true&lang.ts
var collapse_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElCollapse",
	__name: "collapse",
	props: require_collapse.collapseProps,
	emits: require_collapse.collapseEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const { activeNames, setActiveNames } = require_use_collapse.useCollapse(props, __emit);
		const { rootKls } = require_use_collapse.useCollapseDOM(props);
		__expose({
			activeNames,
			setActiveNames
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(rootKls)) }, [(0, vue.renderSlot)(_ctx.$slots, "default")], 2);
		};
	}
});

//#endregion
exports.default = collapse_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=collapse.vue_vue_type_script_setup_true_lang.js.map