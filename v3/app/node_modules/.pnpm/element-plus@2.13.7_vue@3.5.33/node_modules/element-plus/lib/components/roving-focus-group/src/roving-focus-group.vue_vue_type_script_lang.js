const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_roving_focus_group = require('./roving-focus-group.js');
const require_roving_focus_group_impl = require('./roving-focus-group-impl.js');
let vue = require("vue");

//#region ../../packages/components/roving-focus-group/src/roving-focus-group.vue?vue&type=script&lang.ts
var roving_focus_group_vue_vue_type_script_lang_default = (0, vue.defineComponent)({
	name: "ElRovingFocusGroup",
	components: {
		ElFocusGroupCollection: require_roving_focus_group.ElCollection,
		ElRovingFocusGroupImpl: require_roving_focus_group_impl.default
	}
});

//#endregion
exports.default = roving_focus_group_vue_vue_type_script_lang_default;
//# sourceMappingURL=roving-focus-group.vue_vue_type_script_lang.js.map