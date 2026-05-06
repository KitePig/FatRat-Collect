import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { defineComponent } from "vue";

//#region ../../packages/components/select-v2/src/group-item.vue?vue&type=script&lang.ts
var group_item_vue_vue_type_script_lang_default = defineComponent({
	props: {
		item: {
			type: Object,
			required: true
		},
		style: { type: Object },
		height: Number
	},
	setup() {
		return { ns: useNamespace("select") };
	}
});

//#endregion
export { group_item_vue_vue_type_script_lang_default as default };
//# sourceMappingURL=group-item.vue_vue_type_script_lang.mjs.map