import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isBoolean, isPromise } from "../../../utils/types.mjs";
import { debugWarn, throwError } from "../../../utils/error.mjs";
import { addUnit } from "../../../utils/dom/style.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { useFormDisabled, useFormSize } from "../../form/src/hooks/use-form-common-props.mjs";
import { useFormItem, useFormItemInputId } from "../../form/src/hooks/use-form-item.mjs";
import { switchEmits, switchProps } from "./switch.mjs";
import { Loading } from "@element-plus/icons-vue";
import { computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, nextTick, normalizeClass, normalizeStyle, onMounted, openBlock, ref, renderSlot, resolveDynamicComponent, shallowRef, toDisplayString, unref, watch, withCtx, withKeys, withModifiers } from "vue";

//#region ../../packages/components/switch/src/switch.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"id",
	"aria-checked",
	"aria-disabled",
	"aria-label",
	"name",
	"true-value",
	"false-value",
	"disabled",
	"tabindex"
];
const _hoisted_2 = ["aria-hidden"];
const _hoisted_3 = { key: 1 };
const _hoisted_4 = { key: 1 };
const _hoisted_5 = ["aria-hidden"];
const COMPONENT_NAME = "ElSwitch";
var switch_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: COMPONENT_NAME,
	__name: "switch",
	props: switchProps,
	emits: switchEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { formItem } = useFormItem();
		const switchSize = useFormSize();
		const ns = useNamespace("switch");
		const { inputId } = useFormItemInputId(props, { formItemContext: formItem });
		const switchDisabled = useFormDisabled(computed(() => {
			if (props.loading) return true;
		}));
		const isControlled = ref(props.modelValue !== false);
		const input = shallowRef();
		const switchKls = computed(() => [
			ns.b(),
			ns.m(switchSize.value),
			ns.is("disabled", switchDisabled.value),
			ns.is("checked", checked.value)
		]);
		const labelLeftKls = computed(() => [
			ns.e("label"),
			ns.em("label", "left"),
			ns.is("active", !checked.value)
		]);
		const labelRightKls = computed(() => [
			ns.e("label"),
			ns.em("label", "right"),
			ns.is("active", checked.value)
		]);
		const coreStyle = computed(() => ({ width: addUnit(props.width) }));
		watch(() => props.modelValue, () => {
			isControlled.value = true;
		});
		const actualValue = computed(() => {
			return isControlled.value ? props.modelValue : false;
		});
		const checked = computed(() => actualValue.value === props.activeValue);
		if (![props.activeValue, props.inactiveValue].includes(actualValue.value)) {
			emit(UPDATE_MODEL_EVENT, props.inactiveValue);
			emit(CHANGE_EVENT, props.inactiveValue);
			emit(INPUT_EVENT, props.inactiveValue);
		}
		watch(checked, (val) => {
			input.value.checked = val;
			if (props.validateEvent) formItem?.validate?.("change").catch((err) => debugWarn(err));
		});
		const handleChange = () => {
			const val = checked.value ? props.inactiveValue : props.activeValue;
			emit(UPDATE_MODEL_EVENT, val);
			emit(CHANGE_EVENT, val);
			emit(INPUT_EVENT, val);
			nextTick(() => {
				input.value.checked = checked.value;
			});
		};
		const switchValue = () => {
			if (switchDisabled.value) return;
			const { beforeChange } = props;
			if (!beforeChange) {
				handleChange();
				return;
			}
			const shouldChange = beforeChange();
			if (![isPromise(shouldChange), isBoolean(shouldChange)].includes(true)) throwError(COMPONENT_NAME, "beforeChange must return type `Promise<boolean>` or `boolean`");
			if (isPromise(shouldChange)) shouldChange.then((result) => {
				if (result) handleChange();
			}).catch((e) => {
				debugWarn(COMPONENT_NAME, `some error occurred: ${e}`);
			});
			else if (shouldChange) handleChange();
		};
		const focus = () => {
			input.value?.focus?.();
		};
		onMounted(() => {
			input.value.checked = checked.value;
		});
		__expose({
			focus,
			checked
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass(switchKls.value),
				onClick: withModifiers(switchValue, ["prevent"])
			}, [
				createElementVNode("input", {
					id: unref(inputId),
					ref_key: "input",
					ref: input,
					class: normalizeClass(unref(ns).e("input")),
					type: "checkbox",
					role: "switch",
					"aria-checked": checked.value,
					"aria-disabled": unref(switchDisabled),
					"aria-label": __props.ariaLabel,
					name: __props.name,
					"true-value": __props.activeValue,
					"false-value": __props.inactiveValue,
					disabled: unref(switchDisabled),
					tabindex: __props.tabindex,
					onChange: handleChange,
					onKeydown: withKeys(switchValue, ["enter"])
				}, null, 42, _hoisted_1),
				!__props.inlinePrompt && (__props.inactiveIcon || __props.inactiveText || _ctx.$slots.inactive) ? (openBlock(), createElementBlock("span", {
					key: 0,
					class: normalizeClass(labelLeftKls.value)
				}, [renderSlot(_ctx.$slots, "inactive", {}, () => [__props.inactiveIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.inactiveIcon)))]),
					_: 1
				})) : createCommentVNode("v-if", true), !__props.inactiveIcon && __props.inactiveText ? (openBlock(), createElementBlock("span", {
					key: 1,
					"aria-hidden": checked.value
				}, toDisplayString(__props.inactiveText), 9, _hoisted_2)) : createCommentVNode("v-if", true)])], 2)) : createCommentVNode("v-if", true),
				createElementVNode("span", {
					class: normalizeClass(unref(ns).e("core")),
					style: normalizeStyle(coreStyle.value)
				}, [__props.inlinePrompt ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: normalizeClass(unref(ns).e("inner"))
				}, [!checked.value ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: normalizeClass(unref(ns).e("inner-wrapper"))
				}, [renderSlot(_ctx.$slots, "inactive", {}, () => [__props.inactiveIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.inactiveIcon)))]),
					_: 1
				})) : createCommentVNode("v-if", true), !__props.inactiveIcon && __props.inactiveText ? (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(__props.inactiveText), 1)) : createCommentVNode("v-if", true)])], 2)) : (openBlock(), createElementBlock("div", {
					key: 1,
					class: normalizeClass(unref(ns).e("inner-wrapper"))
				}, [renderSlot(_ctx.$slots, "active", {}, () => [__props.activeIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.activeIcon)))]),
					_: 1
				})) : createCommentVNode("v-if", true), !__props.activeIcon && __props.activeText ? (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(__props.activeText), 1)) : createCommentVNode("v-if", true)])], 2))], 2)) : createCommentVNode("v-if", true), createElementVNode("div", { class: normalizeClass(unref(ns).e("action")) }, [__props.loading ? (openBlock(), createBlock(unref(ElIcon), {
					key: 0,
					class: normalizeClass(unref(ns).is("loading"))
				}, {
					default: withCtx(() => [createVNode(unref(Loading))]),
					_: 1
				}, 8, ["class"])) : checked.value ? renderSlot(_ctx.$slots, "active-action", { key: 1 }, () => [__props.activeActionIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.activeActionIcon)))]),
					_: 1
				})) : createCommentVNode("v-if", true)]) : !checked.value ? renderSlot(_ctx.$slots, "inactive-action", { key: 2 }, () => [__props.inactiveActionIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.inactiveActionIcon)))]),
					_: 1
				})) : createCommentVNode("v-if", true)]) : createCommentVNode("v-if", true)], 2)], 6),
				!__props.inlinePrompt && (__props.activeIcon || __props.activeText || _ctx.$slots.active) ? (openBlock(), createElementBlock("span", {
					key: 1,
					class: normalizeClass(labelRightKls.value)
				}, [renderSlot(_ctx.$slots, "active", {}, () => [__props.activeIcon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.activeIcon)))]),
					_: 1
				})) : createCommentVNode("v-if", true), !__props.activeIcon && __props.activeText ? (openBlock(), createElementBlock("span", {
					key: 1,
					"aria-hidden": !checked.value
				}, toDisplayString(__props.activeText), 9, _hoisted_5)) : createCommentVNode("v-if", true)])], 2)) : createCommentVNode("v-if", true)
			], 2);
		};
	}
});

//#endregion
export { switch_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=switch.vue_vue_type_script_setup_true_lang.mjs.map