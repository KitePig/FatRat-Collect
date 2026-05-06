const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_check_tag = require('./check-tag.js');
let vue = require("vue");

//#region ../../packages/components/check-tag/src/check-tag.vue?vue&type=script&setup=true&lang.ts
var check_tag_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElCheckTag",
	__name: "check-tag",
	props: require_check_tag.checkTagProps,
	emits: require_check_tag.checkTagEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = require_index.useNamespace("check-tag");
		const containerKls = (0, vue.computed)(() => [
			ns.b(),
			ns.is("checked", props.checked),
			ns.is("disabled", props.disabled),
			ns.m(props.type || "primary")
		]);
		const handleChange = () => {
			if (props.disabled) return;
			const checked = !props.checked;
			emit(require_event.CHANGE_EVENT, checked);
			emit("update:checked", checked);
		};
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
				class: (0, vue.normalizeClass)(containerKls.value),
				onClick: handleChange
			}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 2);
		};
	}
});

//#endregion
exports.default = check_tag_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=check-tag.vue_vue_type_script_setup_true_lang.js.map