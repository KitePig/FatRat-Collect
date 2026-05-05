const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_form = require('../../../constants/form.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_token = require('./token.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/components/select/src/select-dropdown.vue?vue&type=script&lang.ts
var select_dropdown_vue_vue_type_script_lang_default = (0, vue.defineComponent)({
	name: "ElSelectDropdown",
	componentName: "ElSelectDropdown",
	setup() {
		const select = (0, vue.inject)(require_token.selectKey);
		const ns = require_index.useNamespace("select");
		const popperClass = (0, vue.computed)(() => select.props.popperClass);
		const isMultiple = (0, vue.computed)(() => select.props.multiple);
		const isFitInputWidth = (0, vue.computed)(() => select.props.fitInputWidth);
		const minWidth = (0, vue.ref)("");
		function updateMinWidth() {
			const offsetWidth = select.selectRef?.offsetWidth;
			if (offsetWidth) minWidth.value = `${offsetWidth - require_form.BORDER_HORIZONTAL_WIDTH}px`;
			else minWidth.value = "";
		}
		(0, vue.onMounted)(() => {
			updateMinWidth();
			(0, _vueuse_core.useResizeObserver)(select.selectRef, updateMinWidth);
		});
		return {
			ns,
			minWidth,
			popperClass,
			isMultiple,
			isFitInputWidth
		};
	}
});

//#endregion
exports.default = select_dropdown_vue_vue_type_script_lang_default;
//# sourceMappingURL=select-dropdown.vue_vue_type_script_lang.js.map