import { isArray, isBoolean, isFunction } from "../../../utils/types.mjs";
import { getProp } from "../../../utils/objects.mjs";
import { addUnit } from "../../../utils/dom/style.mjs";
import { ensureArray } from "../../../utils/arrays.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useId } from "../../../hooks/use-id/index.mjs";
import { formContextKey, formItemContextKey } from "./constants.mjs";
import { useFormSize } from "./hooks/use-form-common-props.mjs";
import { formItemProps } from "./form-item.mjs";
import form_label_wrap_default from "./form-label-wrap.mjs";
import { refDebounced } from "@vueuse/core";
import { cloneDeep } from "lodash-unified";
import { TransitionGroup, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, inject, nextTick, normalizeClass, normalizeStyle, onBeforeUnmount, onMounted, openBlock, provide, reactive, ref, renderSlot, resolveDynamicComponent, toDisplayString, toRefs, unref, useSlots, watch, withCtx } from "vue";
import AsyncValidator from "async-validator";

//#region ../../packages/components/form/src/form-item.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["role", "aria-labelledby"];
var form_item_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElFormItem",
	__name: "form-item",
	props: formItemProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const slots = useSlots();
		const formContext = inject(formContextKey, void 0);
		const parentFormItemContext = inject(formItemContextKey, void 0);
		const _size = useFormSize(void 0, { formItem: false });
		const ns = useNamespace("form-item");
		const labelId = useId().value;
		const inputIds = ref([]);
		const validateState = ref("");
		const validateStateDebounced = refDebounced(validateState, 100);
		const validateMessage = ref("");
		const formItemRef = ref();
		let initialValue = void 0;
		let isResettingField = false;
		const labelPosition = computed(() => props.labelPosition || formContext?.labelPosition);
		const labelStyle = computed(() => {
			if (labelPosition.value === "top") return {};
			return { width: addUnit(props.labelWidth ?? formContext?.labelWidth) };
		});
		const contentStyle = computed(() => {
			if (labelPosition.value === "top" || formContext?.inline) return {};
			if (!props.label && !props.labelWidth && isNested) return {};
			const labelWidth = addUnit(props.labelWidth ?? formContext?.labelWidth);
			if (!props.label && !slots.label) return { marginLeft: labelWidth };
			return {};
		});
		const formItemClasses = computed(() => [
			ns.b(),
			ns.m(_size.value),
			ns.is("error", validateState.value === "error"),
			ns.is("validating", validateState.value === "validating"),
			ns.is("success", validateState.value === "success"),
			ns.is("required", isRequired.value || props.required),
			ns.is("no-asterisk", formContext?.hideRequiredAsterisk),
			formContext?.requireAsteriskPosition === "right" ? "asterisk-right" : "asterisk-left",
			{
				[ns.m("feedback")]: formContext?.statusIcon,
				[ns.m(`label-${labelPosition.value}`)]: labelPosition.value
			}
		]);
		const _inlineMessage = computed(() => isBoolean(props.inlineMessage) ? props.inlineMessage : formContext?.inlineMessage || false);
		const validateClasses = computed(() => [ns.e("error"), { [ns.em("error", "inline")]: _inlineMessage.value }]);
		const propString = computed(() => {
			if (!props.prop) return "";
			return isArray(props.prop) ? props.prop.join(".") : props.prop;
		});
		const hasLabel = computed(() => {
			return !!(props.label || slots.label);
		});
		const labelFor = computed(() => {
			return props.for ?? (inputIds.value.length === 1 ? inputIds.value[0] : void 0);
		});
		const isGroup = computed(() => {
			return !labelFor.value && hasLabel.value;
		});
		const isNested = !!parentFormItemContext;
		const fieldValue = computed(() => {
			const model = formContext?.model;
			if (!model || !props.prop) return;
			return getProp(model, props.prop).value;
		});
		const normalizedRules = computed(() => {
			const { required } = props;
			const rules = [];
			if (props.rules) rules.push(...ensureArray(props.rules));
			const formRules = formContext?.rules;
			if (formRules && props.prop) {
				const _rules = getProp(formRules, props.prop).value;
				if (_rules) rules.push(...ensureArray(_rules));
			}
			if (required !== void 0) {
				const requiredRules = rules.map((rule, i) => [rule, i]).filter(([rule]) => "required" in rule);
				if (requiredRules.length > 0) for (const [rule, i] of requiredRules) {
					if (rule.required === required) continue;
					rules[i] = {
						...rule,
						required
					};
				}
				else rules.push({ required });
			}
			return rules;
		});
		const validateEnabled = computed(() => normalizedRules.value.length > 0);
		const getFilteredRule = (trigger) => {
			return normalizedRules.value.filter((rule) => {
				if (!rule.trigger || !trigger) return true;
				if (isArray(rule.trigger)) return rule.trigger.includes(trigger);
				else return rule.trigger === trigger;
			}).map(({ trigger, ...rule }) => rule);
		};
		const isRequired = computed(() => normalizedRules.value.some((rule) => rule.required));
		const shouldShowError = computed(() => validateStateDebounced.value === "error" && props.showMessage && (formContext?.showMessage ?? true));
		const currentLabel = computed(() => `${props.label || ""}${formContext?.labelSuffix || ""}`);
		const setValidationState = (state) => {
			validateState.value = state;
		};
		const onValidationFailed = (error) => {
			const { errors, fields } = error;
			if (!errors || !fields) console.error(error);
			setValidationState("error");
			validateMessage.value = errors ? errors?.[0]?.message ?? `${props.prop} is required` : "";
			formContext?.emit("validate", props.prop, false, validateMessage.value);
		};
		const onValidationSucceeded = () => {
			setValidationState("success");
			formContext?.emit("validate", props.prop, true, "");
		};
		const doValidate = async (rules) => {
			const modelName = propString.value;
			return new AsyncValidator({ [modelName]: rules }).validate({ [modelName]: fieldValue.value }, { firstFields: true }).then(() => {
				onValidationSucceeded();
				return true;
			}).catch((err) => {
				onValidationFailed(err);
				return Promise.reject(err);
			});
		};
		const validate = async (trigger, callback) => {
			if (isResettingField || !props.prop) return false;
			const hasCallback = isFunction(callback);
			if (!validateEnabled.value) {
				callback?.(false);
				return false;
			}
			const rules = getFilteredRule(trigger);
			if (rules.length === 0) {
				callback?.(true);
				return true;
			}
			setValidationState("validating");
			return doValidate(rules).then(() => {
				callback?.(true);
				return true;
			}).catch((err) => {
				const { fields } = err;
				callback?.(false, fields);
				return hasCallback ? false : Promise.reject(fields);
			});
		};
		const clearValidate = () => {
			setValidationState("");
			validateMessage.value = "";
			isResettingField = false;
		};
		const resetField = async () => {
			const model = formContext?.model;
			if (!model || !props.prop) return;
			const computedValue = getProp(model, props.prop);
			isResettingField = true;
			computedValue.value = cloneDeep(initialValue);
			await nextTick();
			clearValidate();
			isResettingField = false;
		};
		const addInputId = (id) => {
			if (!inputIds.value.includes(id)) inputIds.value.push(id);
		};
		const removeInputId = (id) => {
			inputIds.value = inputIds.value.filter((listId) => listId !== id);
		};
		const setInitialValue = (value) => {
			initialValue = cloneDeep(value);
		};
		const getInitialValue = () => initialValue;
		watch(() => props.error, (val) => {
			validateMessage.value = val || "";
			setValidationState(val ? "error" : "");
		}, { immediate: true });
		watch(() => props.validateStatus, (val) => setValidationState(val || ""));
		const context = reactive({
			...toRefs(props),
			$el: formItemRef,
			size: _size,
			validateMessage,
			validateState,
			labelId,
			inputIds,
			isGroup,
			hasLabel,
			fieldValue,
			addInputId,
			removeInputId,
			resetField,
			clearValidate,
			validate,
			propString,
			setInitialValue,
			getInitialValue
		});
		provide(formItemContextKey, context);
		watch(propString, (newPropString, oldPropString) => {
			if (!formContext || !oldPropString) return;
			formContext.removeField(context, oldPropString);
			if (newPropString) {
				setInitialValue(fieldValue.value);
				formContext.addField(context);
			}
		});
		onMounted(() => {
			if (props.prop) {
				setInitialValue(fieldValue.value);
				formContext?.addField(context);
			}
		});
		onBeforeUnmount(() => {
			formContext?.removeField(context);
		});
		__expose({
			size: _size,
			validateMessage,
			validateState,
			validate,
			clearValidate,
			resetField,
			setInitialValue
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "formItemRef",
				ref: formItemRef,
				class: normalizeClass(formItemClasses.value),
				role: isGroup.value ? "group" : void 0,
				"aria-labelledby": isGroup.value ? unref(labelId) : void 0
			}, [createVNode(unref(form_label_wrap_default), {
				"is-auto-width": labelStyle.value.width === "auto",
				"update-all": unref(formContext)?.labelWidth === "auto"
			}, {
				default: withCtx(() => [!!(__props.label || _ctx.$slots.label) ? (openBlock(), createBlock(resolveDynamicComponent(labelFor.value ? "label" : "div"), {
					key: 0,
					id: unref(labelId),
					for: labelFor.value,
					class: normalizeClass(unref(ns).e("label")),
					style: normalizeStyle(labelStyle.value)
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "label", { label: currentLabel.value }, () => [createTextVNode(toDisplayString(currentLabel.value), 1)])]),
					_: 3
				}, 8, [
					"id",
					"for",
					"class",
					"style"
				])) : createCommentVNode("v-if", true)]),
				_: 3
			}, 8, ["is-auto-width", "update-all"]), createElementVNode("div", {
				class: normalizeClass(unref(ns).e("content")),
				style: normalizeStyle(contentStyle.value)
			}, [renderSlot(_ctx.$slots, "default"), createVNode(TransitionGroup, { name: `${unref(ns).namespace.value}-zoom-in-top` }, {
				default: withCtx(() => [shouldShowError.value ? renderSlot(_ctx.$slots, "error", {
					key: 0,
					error: validateMessage.value
				}, () => [createElementVNode("div", { class: normalizeClass(validateClasses.value) }, toDisplayString(validateMessage.value), 3)]) : createCommentVNode("v-if", true)]),
				_: 3
			}, 8, ["name"])], 6)], 10, _hoisted_1);
		};
	}
});

//#endregion
export { form_item_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=form-item.vue_vue_type_script_setup_true_lang.mjs.map