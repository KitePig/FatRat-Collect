const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_objects = require('../../../utils/objects.js');
const require_style = require('../../../utils/dom/style.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../../hooks/use-id/index.js');
const require_constants = require('./constants.js');
const require_use_form_common_props = require('./hooks/use-form-common-props.js');
const require_form_item = require('./form-item.js');
const require_form_label_wrap = require('./form-label-wrap.js');
let _vueuse_core = require("@vueuse/core");
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let async_validator = require("async-validator");
async_validator = require_runtime.__toESM(async_validator);
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/form/src/form-item.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["role", "aria-labelledby"];
var form_item_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElFormItem",
	__name: "form-item",
	props: require_form_item.formItemProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const slots = (0, vue.useSlots)();
		const formContext = (0, vue.inject)(require_constants.formContextKey, void 0);
		const parentFormItemContext = (0, vue.inject)(require_constants.formItemContextKey, void 0);
		const _size = require_use_form_common_props.useFormSize(void 0, { formItem: false });
		const ns = require_index.useNamespace("form-item");
		const labelId = require_index$1.useId().value;
		const inputIds = (0, vue.ref)([]);
		const validateState = (0, vue.ref)("");
		const validateStateDebounced = (0, _vueuse_core.refDebounced)(validateState, 100);
		const validateMessage = (0, vue.ref)("");
		const formItemRef = (0, vue.ref)();
		let initialValue = void 0;
		let isResettingField = false;
		const labelPosition = (0, vue.computed)(() => props.labelPosition || formContext?.labelPosition);
		const labelStyle = (0, vue.computed)(() => {
			if (labelPosition.value === "top") return {};
			return { width: require_style.addUnit(props.labelWidth ?? formContext?.labelWidth) };
		});
		const contentStyle = (0, vue.computed)(() => {
			if (labelPosition.value === "top" || formContext?.inline) return {};
			if (!props.label && !props.labelWidth && isNested) return {};
			const labelWidth = require_style.addUnit(props.labelWidth ?? formContext?.labelWidth);
			if (!props.label && !slots.label) return { marginLeft: labelWidth };
			return {};
		});
		const formItemClasses = (0, vue.computed)(() => [
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
		const _inlineMessage = (0, vue.computed)(() => require_types.isBoolean(props.inlineMessage) ? props.inlineMessage : formContext?.inlineMessage || false);
		const validateClasses = (0, vue.computed)(() => [ns.e("error"), { [ns.em("error", "inline")]: _inlineMessage.value }]);
		const propString = (0, vue.computed)(() => {
			if (!props.prop) return "";
			return (0, _vue_shared.isArray)(props.prop) ? props.prop.join(".") : props.prop;
		});
		const hasLabel = (0, vue.computed)(() => {
			return !!(props.label || slots.label);
		});
		const labelFor = (0, vue.computed)(() => {
			return props.for ?? (inputIds.value.length === 1 ? inputIds.value[0] : void 0);
		});
		const isGroup = (0, vue.computed)(() => {
			return !labelFor.value && hasLabel.value;
		});
		const isNested = !!parentFormItemContext;
		const fieldValue = (0, vue.computed)(() => {
			const model = formContext?.model;
			if (!model || !props.prop) return;
			return require_objects.getProp(model, props.prop).value;
		});
		const normalizedRules = (0, vue.computed)(() => {
			const { required } = props;
			const rules = [];
			if (props.rules) rules.push(...(0, lodash_unified.castArray)(props.rules));
			const formRules = formContext?.rules;
			if (formRules && props.prop) {
				const _rules = require_objects.getProp(formRules, props.prop).value;
				if (_rules) rules.push(...(0, lodash_unified.castArray)(_rules));
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
		const validateEnabled = (0, vue.computed)(() => normalizedRules.value.length > 0);
		const getFilteredRule = (trigger) => {
			return normalizedRules.value.filter((rule) => {
				if (!rule.trigger || !trigger) return true;
				if ((0, _vue_shared.isArray)(rule.trigger)) return rule.trigger.includes(trigger);
				else return rule.trigger === trigger;
			}).map(({ trigger, ...rule }) => rule);
		};
		const isRequired = (0, vue.computed)(() => normalizedRules.value.some((rule) => rule.required));
		const shouldShowError = (0, vue.computed)(() => validateStateDebounced.value === "error" && props.showMessage && (formContext?.showMessage ?? true));
		const currentLabel = (0, vue.computed)(() => `${props.label || ""}${formContext?.labelSuffix || ""}`);
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
			return new async_validator.default({ [modelName]: rules }).validate({ [modelName]: fieldValue.value }, { firstFields: true }).then(() => {
				onValidationSucceeded();
				return true;
			}).catch((err) => {
				onValidationFailed(err);
				return Promise.reject(err);
			});
		};
		const validate = async (trigger, callback) => {
			if (isResettingField || !props.prop) return false;
			const hasCallback = (0, _vue_shared.isFunction)(callback);
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
			const computedValue = require_objects.getProp(model, props.prop);
			isResettingField = true;
			computedValue.value = (0, lodash_unified.cloneDeep)(initialValue);
			await (0, vue.nextTick)();
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
			initialValue = (0, lodash_unified.cloneDeep)(value);
		};
		const getInitialValue = () => initialValue;
		(0, vue.watch)(() => props.error, (val) => {
			validateMessage.value = val || "";
			setValidationState(val ? "error" : "");
		}, { immediate: true });
		(0, vue.watch)(() => props.validateStatus, (val) => setValidationState(val || ""));
		const context = (0, vue.reactive)({
			...(0, vue.toRefs)(props),
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
		(0, vue.provide)(require_constants.formItemContextKey, context);
		(0, vue.watch)(propString, (newPropString, oldPropString) => {
			if (!formContext || !oldPropString) return;
			formContext.removeField(context, oldPropString);
			if (newPropString) {
				setInitialValue(fieldValue.value);
				formContext.addField(context);
			}
		});
		(0, vue.onMounted)(() => {
			if (props.prop) {
				setInitialValue(fieldValue.value);
				formContext?.addField(context);
			}
		});
		(0, vue.onBeforeUnmount)(() => {
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
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				ref_key: "formItemRef",
				ref: formItemRef,
				class: (0, vue.normalizeClass)(formItemClasses.value),
				role: isGroup.value ? "group" : void 0,
				"aria-labelledby": isGroup.value ? (0, vue.unref)(labelId) : void 0
			}, [(0, vue.createVNode)((0, vue.unref)(require_form_label_wrap.default), {
				"is-auto-width": labelStyle.value.width === "auto",
				"update-all": (0, vue.unref)(formContext)?.labelWidth === "auto"
			}, {
				default: (0, vue.withCtx)(() => [!!(__props.label || _ctx.$slots.label) ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(labelFor.value ? "label" : "div"), {
					key: 0,
					id: (0, vue.unref)(labelId),
					for: labelFor.value,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("label")),
					style: (0, vue.normalizeStyle)(labelStyle.value)
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "label", { label: currentLabel.value }, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(currentLabel.value), 1)])]),
					_: 3
				}, 8, [
					"id",
					"for",
					"class",
					"style"
				])) : (0, vue.createCommentVNode)("v-if", true)]),
				_: 3
			}, 8, ["is-auto-width", "update-all"]), (0, vue.createElementVNode)("div", {
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("content")),
				style: (0, vue.normalizeStyle)(contentStyle.value)
			}, [(0, vue.renderSlot)(_ctx.$slots, "default"), (0, vue.createVNode)(vue.TransitionGroup, { name: `${(0, vue.unref)(ns).namespace.value}-zoom-in-top` }, {
				default: (0, vue.withCtx)(() => [shouldShowError.value ? (0, vue.renderSlot)(_ctx.$slots, "error", {
					key: 0,
					error: validateMessage.value
				}, () => [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)(validateClasses.value) }, (0, vue.toDisplayString)(validateMessage.value), 3)]) : (0, vue.createCommentVNode)("v-if", true)]),
				_: 3
			}, 8, ["name"])], 6)], 10, _hoisted_1);
		};
	}
});

//#endregion
exports.default = form_item_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=form-item.vue_vue_type_script_setup_true_lang.js.map