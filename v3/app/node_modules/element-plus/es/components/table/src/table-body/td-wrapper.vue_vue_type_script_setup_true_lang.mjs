import { createElementBlock, defineComponent, openBlock, renderSlot } from "vue";

//#region ../../packages/components/table/src/table-body/td-wrapper.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["colspan", "rowspan"];
var td_wrapper_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
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
			return openBlock(), createElementBlock("td", {
				colspan: __props.colspan,
				rowspan: __props.rowspan
			}, [renderSlot(_ctx.$slots, "default")], 8, _hoisted_1);
		};
	}
});

//#endregion
export { td_wrapper_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=td-wrapper.vue_vue_type_script_setup_true_lang.mjs.map