const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
let vue = require("vue");

//#region ../../packages/components/select-v2/src/group-item.vue?vue&type=script&lang.ts
var group_item_vue_vue_type_script_lang_default = (0, vue.defineComponent)({
	props: {
		item: {
			type: Object,
			required: true
		},
		style: { type: Object },
		height: Number
	},
	setup() {
		return { ns: require_index.useNamespace("select") };
	}
});

//#endregion
exports.default = group_item_vue_vue_type_script_lang_default;
//# sourceMappingURL=group-item.vue_vue_type_script_lang.js.map