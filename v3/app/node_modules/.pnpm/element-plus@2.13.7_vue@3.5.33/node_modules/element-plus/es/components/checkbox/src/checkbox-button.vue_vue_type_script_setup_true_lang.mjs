import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { checkboxEmits, checkboxProps } from "./checkbox.mjs";
import { checkboxGroupContextKey } from "./constants.mjs";
import { useCheckbox } from "./composables/use-checkbox.mjs";
import { computed, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, defineComponent, inject, isRef, mergeProps, normalizeClass, normalizeStyle, openBlock, renderSlot, toDisplayString, unref, useSlots, vModelCheckbox, withDirectives, withModifiers } from "vue";

//#region ../../packages/components/checkbox/src/checkbox-button.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"name",
	"tabindex",
	"disabled"
];
var checkbox_button_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElCheckboxButton",
	__name: "checkbox-button",
	props: checkboxProps,
	emits: checkboxEmits,
	setup(__props) {
		const props = __props;
		const { isFocused, isChecked, isDisabled, checkboxButtonSize, model, actualValue, handleChange } = useCheckbox(props, useSlots());
		const inputBindings = computed(() => {
			if (props.trueValue || props.falseValue || props.trueLabel || props.falseLabel) return {
				"true-value": props.trueValue ?? props.trueLabel ?? true,
				"false-value": props.falseValue ?? props.falseLabel ?? false
			};
			return { value: actualValue.value };
		});
		const checkboxGroup = inject(checkboxGroupContextKey, void 0);
		const ns = useNamespace("checkbox");
		const activeStyle = computed(() => {
			const fillValue = checkboxGroup?.fill?.value ?? "";
			return {
				backgroundColor: fillValue,
				borderColor: fillValue,
				color: checkboxGroup?.textColor?.value ?? "",
				boxShadow: fillValue ? `-1px 0 0 0 ${fillValue}` : void 0
			};
		});
		const labelKls = computed(() => {
			return [
				ns.b("button"),
				ns.bm("button", checkboxButtonSize.value),
				ns.is("disabled", isDisabled.value),
				ns.is("checked", isChecked.value),
				ns.is("focus", isFocused.value)
			];
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("label", { class: normalizeClass(labelKls.value) }, [withDirectives(createElementVNode("input", mergeProps({
				"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(model) ? model.value = $event : null),
				class: unref(ns).be("button", "original"),
				type: "checkbox",
				name: __props.name,
				tabindex: __props.tabindex,
				disabled: unref(isDisabled)
			}, inputBindings.value, {
				onChange: _cache[1] || (_cache[1] = (...args) => unref(handleChange) && unref(handleChange)(...args)),
				onFocus: _cache[2] || (_cache[2] = ($event) => isFocused.value = true),
				onBlur: _cache[3] || (_cache[3] = ($event) => isFocused.value = false),
				onClick: _cache[4] || (_cache[4] = withModifiers(() => {}, ["stop"]))
			}), null, 16, _hoisted_1), [[vModelCheckbox, unref(model)]]), _ctx.$slots.default || __props.label ? (openBlock(), createElementBlock("span", {
				key: 0,
				class: normalizeClass(unref(ns).be("button", "inner")),
				style: normalizeStyle(unref(isChecked) ? activeStyle.value : void 0)
			}, [renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode(toDisplayString(__props.label), 1)])], 6)) : createCommentVNode("v-if", true)], 2);
		};
	}
});

//#endregion
export { checkbox_button_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=checkbox-button.vue_vue_type_script_setup_true_lang.mjs.map