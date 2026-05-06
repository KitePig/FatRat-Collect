import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { debugWarn } from "../../../utils/error.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useFormDisabled } from "../../form/src/hooks/use-form-common-props.mjs";
import { useFormItem, useFormItemInputId } from "../../form/src/hooks/use-form-item.mjs";
import { checkboxGroupContextKey } from "./constants.mjs";
import checkbox_default from "./checkbox2.mjs";
import checkbox_button_default from "./checkbox-button.mjs";
import { checkboxDefaultProps, checkboxGroupEmits, checkboxGroupProps } from "./checkbox-group.mjs";
import { isEqual, omit, pick } from "lodash-unified";
import { Fragment, computed, createBlock, createElementBlock, defineComponent, mergeProps, nextTick, normalizeClass, openBlock, provide, renderList, renderSlot, resolveDynamicComponent, toRefs, unref, watch, withCtx } from "vue";

//#region ../../packages/components/checkbox/src/checkbox-group.vue?vue&type=script&setup=true&lang.ts
var checkbox_group_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElCheckboxGroup",
	__name: "checkbox-group",
	props: checkboxGroupProps,
	emits: checkboxGroupEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = useNamespace("checkbox");
		const checkboxDisabled = useFormDisabled();
		const { formItem } = useFormItem();
		const { inputId: groupId, isLabeledByFormItem } = useFormItemInputId(props, { formItemContext: formItem });
		const changeEvent = async (value) => {
			emit(UPDATE_MODEL_EVENT, value);
			await nextTick();
			emit(CHANGE_EVENT, value);
		};
		const modelValue = computed({
			get() {
				return props.modelValue;
			},
			set(val) {
				changeEvent(val);
			}
		});
		const aliasProps = computed(() => ({
			...checkboxDefaultProps,
			...props.props
		}));
		const getOptionProps = (option) => {
			const { label, value, disabled } = aliasProps.value;
			const base = {
				label: option[label],
				value: option[value],
				disabled: option[disabled]
			};
			return {
				...omit(option, [
					label,
					value,
					disabled
				]),
				...base
			};
		};
		const optionComponent = computed(() => props.type === "button" ? checkbox_button_default : checkbox_default);
		provide(checkboxGroupContextKey, {
			...pick(toRefs(props), [
				"size",
				"min",
				"max",
				"validateEvent",
				"fill",
				"textColor"
			]),
			disabled: checkboxDisabled,
			modelValue,
			changeEvent
		});
		watch(() => props.modelValue, (newVal, oldValue) => {
			if (props.validateEvent && !isEqual(newVal, oldValue)) formItem?.validate("change").catch((err) => debugWarn(err));
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(__props.tag), {
				id: unref(groupId),
				class: normalizeClass(unref(ns).b("group")),
				role: "group",
				"aria-label": !unref(isLabeledByFormItem) ? __props.ariaLabel || "checkbox-group" : void 0,
				"aria-labelledby": unref(isLabeledByFormItem) ? unref(formItem)?.labelId : void 0
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {}, () => [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (item, index) => {
					return openBlock(), createBlock(resolveDynamicComponent(optionComponent.value), mergeProps({ key: index }, { ref_for: true }, getOptionProps(item)), null, 16);
				}), 128))])]),
				_: 3
			}, 8, [
				"id",
				"class",
				"aria-label",
				"aria-labelledby"
			]);
		};
	}
});

//#endregion
export { checkbox_group_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=checkbox-group.vue_vue_type_script_setup_true_lang.mjs.map