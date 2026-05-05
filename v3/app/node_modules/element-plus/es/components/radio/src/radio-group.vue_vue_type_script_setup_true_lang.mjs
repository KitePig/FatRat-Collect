import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { debugWarn } from "../../../utils/error.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useId } from "../../../hooks/use-id/index.mjs";
import { useFormItem, useFormItemInputId } from "../../form/src/hooks/use-form-item.mjs";
import { radioGroupKey } from "./constants.mjs";
import radio_default from "./radio2.mjs";
import radio_button_default from "./radio-button2.mjs";
import { radioDefaultProps, radioGroupEmits, radioGroupProps } from "./radio-group.mjs";
import { isEqual, omit } from "lodash-unified";
import { Fragment, computed, createBlock, createElementBlock, defineComponent, mergeProps, nextTick, normalizeClass, onMounted, openBlock, provide, reactive, ref, renderList, renderSlot, resolveDynamicComponent, toRefs, unref, watch } from "vue";

//#region ../../packages/components/radio/src/radio-group.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"id",
	"aria-label",
	"aria-labelledby"
];
var radio_group_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElRadioGroup",
	__name: "radio-group",
	props: radioGroupProps,
	emits: radioGroupEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = useNamespace("radio");
		const radioId = useId();
		const radioGroupRef = ref();
		const { formItem } = useFormItem();
		const { inputId: groupId, isLabeledByFormItem } = useFormItemInputId(props, { formItemContext: formItem });
		const changeEvent = (value) => {
			emit(UPDATE_MODEL_EVENT, value);
			nextTick(() => emit(CHANGE_EVENT, value));
		};
		onMounted(() => {
			const radios = radioGroupRef.value.querySelectorAll("[type=radio]");
			const firstLabel = radios[0];
			if (!Array.from(radios).some((radio) => radio.checked) && firstLabel) firstLabel.tabIndex = 0;
		});
		const name = computed(() => {
			return props.name || radioId.value;
		});
		const aliasProps = computed(() => ({
			...radioDefaultProps,
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
		const optionComponent = computed(() => props.type === "button" ? radio_button_default : radio_default);
		provide(radioGroupKey, reactive({
			...toRefs(props),
			changeEvent,
			name
		}));
		watch(() => props.modelValue, (newVal, oldValue) => {
			if (props.validateEvent && !isEqual(newVal, oldValue)) formItem?.validate("change").catch((err) => debugWarn(err));
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				id: unref(groupId),
				ref_key: "radioGroupRef",
				ref: radioGroupRef,
				class: normalizeClass(unref(ns).b("group")),
				role: "radiogroup",
				"aria-label": !unref(isLabeledByFormItem) ? __props.ariaLabel || "radio-group" : void 0,
				"aria-labelledby": unref(isLabeledByFormItem) ? unref(formItem).labelId : void 0
			}, [renderSlot(_ctx.$slots, "default", {}, () => [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (item, index) => {
				return openBlock(), createBlock(resolveDynamicComponent(optionComponent.value), mergeProps({ key: index }, { ref_for: true }, getOptionProps(item)), null, 16);
			}), 128))])], 10, _hoisted_1);
		};
	}
});

//#endregion
export { radio_group_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=radio-group.vue_vue_type_script_setup_true_lang.mjs.map