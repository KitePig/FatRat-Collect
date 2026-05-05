const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
let vue = require("vue");

//#region ../../packages/components/table/src/table-body/td-wrapper.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["colspan", "rowspan"];
var td_wrapper_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "TableTdWrapper",
	__name: "td-wrapper",
	props: {
		colspan: {
			type: Number,
			default: 1
		},
		rowspan: {
			type: Number,
			default: 1
		}
	},
	setup(__props) {
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("td", {
				colspan: __props.colspan,
				rowspan: __props.rowspan
			}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 8, _hoisted_1);
		};
	}
});

//#endregion
exports.default = td_wrapper_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=td-wrapper.vue_vue_type_script_setup_true_lang.js.map