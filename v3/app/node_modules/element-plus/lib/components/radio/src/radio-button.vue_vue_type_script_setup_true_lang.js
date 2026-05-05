const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_use_radio = require('./use-radio.js');
const require_radio_button = require('./radio-button.js');
let vue = require("vue");

//#region ../../packages/components/radio/src/radio-button.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"value",
	"name",
	"disabled"
];
var radio_button_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElRadioButton",
	__name: "radio-button",
	props: require_radio_button.radioButtonProps,
	setup(__props) {
		const props = __props;
		const ns = require_index.useNamespace("radio");
		const { radioRef, focus, size, disabled, modelValue, radioGroup, actualValue } = require_use_radio.useRadio(props);
		const activeStyle = (0, vue.computed)(() => {
			return {
				backgroundColor: radioGroup?.fill || "",
				borderColor: radioGroup?.fill || "",
				boxShadow: radioGroup?.fill ? `-1px 0 0 0 ${radioGroup.fill}` : "",
				color: radioGroup?.textColor || ""
			};
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("label", { class: (0, vue.normalizeClass)([
				(0, vue.unref)(ns).b("button"),
				(0, vue.unref)(ns).is("active", (0, vue.unref)(modelValue) === (0, vue.unref)(actualValue)),
				(0, vue.unref)(ns).is("disabled", (0, vue.unref)(disabled)),
				(0, vue.unref)(ns).is("focus", (0, vue.unref)(focus)),
				(0, vue.unref)(ns).bm("button", (0, vue.unref)(size))
			]) }, [(0, vue.withDirectives)((0, vue.createElementVNode)("input", {
				ref_key: "radioRef",
				ref: radioRef,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => (0, vue.isRef)(modelValue) ? modelValue.value = $event : null),
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("button", "original-radio")),
				value: (0, vue.unref)(actualValue),
				type: "radio",
				name: __props.name || (0, vue.unref)(radioGroup)?.name,
				disabled: (0, vue.unref)(disabled),
				onFocus: _cache[1] || (_cache[1] = ($event) => focus.value = true),
				onBlur: _cache[2] || (_cache[2] = ($event) => focus.value = false),
				onClick: _cache[3] || (_cache[3] = (0, vue.withModifiers)(() => {}, ["stop"]))
			}, null, 42, _hoisted_1), [[vue.vModelRadio, (0, vue.unref)(modelValue)]]), (0, vue.createElementVNode)("span", {
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("button", "inner")),
				style: (0, vue.normalizeStyle)((0, vue.unref)(modelValue) === (0, vue.unref)(actualValue) ? activeStyle.value : {}),
				onKeydown: _cache[4] || (_cache[4] = (0, vue.withModifiers)(() => {}, ["stop"]))
			}, [(0, vue.renderSlot)(_ctx.$slots, "default", {}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(__props.label), 1)])], 38)], 2);
		};
	}
});

//#endregion
exports.default = radio_button_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=radio-button.vue_vue_type_script_setup_true_lang.js.map