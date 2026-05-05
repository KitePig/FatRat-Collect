const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_radio = require('./radio.js');
const require_use_radio = require('./use-radio.js');
let vue = require("vue");

//#region ../../packages/components/radio/src/radio.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"value",
	"name",
	"disabled",
	"checked"
];
var radio_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElRadio",
	__name: "radio",
	props: require_radio.radioProps,
	emits: require_radio.radioEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = require_index.useNamespace("radio");
		const { radioRef, radioGroup, focus, size, disabled, modelValue, actualValue } = require_use_radio.useRadio(props, emit);
		function handleChange() {
			(0, vue.nextTick)(() => emit(require_event.CHANGE_EVENT, modelValue.value));
		}
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("label", { class: (0, vue.normalizeClass)([
				(0, vue.unref)(ns).b(),
				(0, vue.unref)(ns).is("disabled", (0, vue.unref)(disabled)),
				(0, vue.unref)(ns).is("focus", (0, vue.unref)(focus)),
				(0, vue.unref)(ns).is("bordered", __props.border),
				(0, vue.unref)(ns).is("checked", (0, vue.unref)(modelValue) === (0, vue.unref)(actualValue)),
				(0, vue.unref)(ns).m((0, vue.unref)(size))
			]) }, [(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)([
				(0, vue.unref)(ns).e("input"),
				(0, vue.unref)(ns).is("disabled", (0, vue.unref)(disabled)),
				(0, vue.unref)(ns).is("checked", (0, vue.unref)(modelValue) === (0, vue.unref)(actualValue))
			]) }, [(0, vue.withDirectives)((0, vue.createElementVNode)("input", {
				ref_key: "radioRef",
				ref: radioRef,
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => (0, vue.isRef)(modelValue) ? modelValue.value = $event : null),
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("original")),
				value: (0, vue.unref)(actualValue),
				name: __props.name || (0, vue.unref)(radioGroup)?.name,
				disabled: (0, vue.unref)(disabled),
				checked: (0, vue.unref)(modelValue) === (0, vue.unref)(actualValue),
				type: "radio",
				onFocus: _cache[1] || (_cache[1] = ($event) => focus.value = true),
				onBlur: _cache[2] || (_cache[2] = ($event) => focus.value = false),
				onChange: handleChange,
				onClick: _cache[3] || (_cache[3] = (0, vue.withModifiers)(() => {}, ["stop"]))
			}, null, 42, _hoisted_1), [[vue.vModelRadio, (0, vue.unref)(modelValue)]]), (0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("inner")) }, null, 2)], 2), (0, vue.createElementVNode)("span", {
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("label")),
				onKeydown: _cache[4] || (_cache[4] = (0, vue.withModifiers)(() => {}, ["stop"]))
			}, [(0, vue.renderSlot)(_ctx.$slots, "default", {}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(__props.label), 1)])], 34)], 2);
		};
	}
});

//#endregion
exports.default = radio_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=radio.vue_vue_type_script_setup_true_lang.js.map