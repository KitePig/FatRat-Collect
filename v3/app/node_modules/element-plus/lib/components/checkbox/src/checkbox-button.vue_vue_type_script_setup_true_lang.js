const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_checkbox = require('./checkbox.js');
const require_constants = require('./constants.js');
const require_use_checkbox = require('./composables/use-checkbox.js');
let vue = require("vue");

//#region ../../packages/components/checkbox/src/checkbox-button.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"name",
	"tabindex",
	"disabled"
];
var checkbox_button_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElCheckboxButton",
	__name: "checkbox-button",
	props: require_checkbox.checkboxProps,
	emits: require_checkbox.checkboxEmits,
	setup(__props) {
		const props = __props;
		const { isFocused, isChecked, isDisabled, checkboxButtonSize, model, actualValue, handleChange } = require_use_checkbox.useCheckbox(props, (0, vue.useSlots)());
		const inputBindings = (0, vue.computed)(() => {
			if (props.trueValue || props.falseValue || props.trueLabel || props.falseLabel) return {
				"true-value": props.trueValue ?? props.trueLabel ?? true,
				"false-value": props.falseValue ?? props.falseLabel ?? false
			};
			return { value: actualValue.value };
		});
		const checkboxGroup = (0, vue.inject)(require_constants.checkboxGroupContextKey, void 0);
		const ns = require_index.useNamespace("checkbox");
		const activeStyle = (0, vue.computed)(() => {
			const fillValue = checkboxGroup?.fill?.value ?? "";
			return {
				backgroundColor: fillValue,
				borderColor: fillValue,
				color: checkboxGroup?.textColor?.value ?? "",
				boxShadow: fillValue ? `-1px 0 0 0 ${fillValue}` : void 0
			};
		});
		const labelKls = (0, vue.computed)(() => {
			return [
				ns.b("button"),
				ns.bm("button", checkboxButtonSize.value),
				ns.is("disabled", isDisabled.value),
				ns.is("checked", isChecked.value),
				ns.is("focus", isFocused.value)
			];
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("label", { class: (0, vue.normalizeClass)(labelKls.value) }, [(0, vue.withDirectives)((0, vue.createElementVNode)("input", (0, vue.mergeProps)({
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => (0, vue.isRef)(model) ? model.value = $event : null),
				class: (0, vue.unref)(ns).be("button", "original"),
				type: "checkbox",
				name: __props.name,
				tabindex: __props.tabindex,
				disabled: (0, vue.unref)(isDisabled)
			}, inputBindings.value, {
				onChange: _cache[1] || (_cache[1] = (...args) => (0, vue.unref)(handleChange) && (0, vue.unref)(handleChange)(...args)),
				onFocus: _cache[2] || (_cache[2] = ($event) => isFocused.value = true),
				onBlur: _cache[3] || (_cache[3] = ($event) => isFocused.value = false),
				onClick: _cache[4] || (_cache[4] = (0, vue.withModifiers)(() => {}, ["stop"]))
			}), null, 16, _hoisted_1), [[vue.vModelCheckbox, (0, vue.unref)(model)]]), _ctx.$slots.default || __props.label ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
				key: 0,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("button", "inner")),
				style: (0, vue.normalizeStyle)((0, vue.unref)(isChecked) ? activeStyle.value : void 0)
			}, [(0, vue.renderSlot)(_ctx.$slots, "default", {}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(__props.label), 1)])], 6)) : (0, vue.createCommentVNode)("v-if", true)], 2);
		};
	}
});

//#endregion
exports.default = checkbox_button_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=checkbox-button.vue_vue_type_script_setup_true_lang.js.map