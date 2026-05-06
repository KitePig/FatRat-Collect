const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_error = require('../../../utils/error.js');
const require_style = require('../../../utils/dom/style.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../icon/index.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_use_form_item = require('../../form/src/hooks/use-form-item.js');
const require_switch = require('./switch.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

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
var switch_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: COMPONENT_NAME,
	__name: "switch",
	props: require_switch.switchProps,
	emits: require_switch.switchEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { formItem } = require_use_form_item.useFormItem();
		const switchSize = require_use_form_common_props.useFormSize();
		const ns = require_index.useNamespace("switch");
		const { inputId } = require_use_form_item.useFormItemInputId(props, { formItemContext: formItem });
		const switchDisabled = require_use_form_common_props.useFormDisabled((0, vue.computed)(() => {
			if (props.loading) return true;
		}));
		const isControlled = (0, vue.ref)(props.modelValue !== false);
		const input = (0, vue.shallowRef)();
		const switchKls = (0, vue.computed)(() => [
			ns.b(),
			ns.m(switchSize.value),
			ns.is("disabled", switchDisabled.value),
			ns.is("checked", checked.value)
		]);
		const labelLeftKls = (0, vue.computed)(() => [
			ns.e("label"),
			ns.em("label", "left"),
			ns.is("active", !checked.value)
		]);
		const labelRightKls = (0, vue.computed)(() => [
			ns.e("label"),
			ns.em("label", "right"),
			ns.is("active", checked.value)
		]);
		const coreStyle = (0, vue.computed)(() => ({ width: require_style.addUnit(props.width) }));
		(0, vue.watch)(() => props.modelValue, () => {
			isControlled.value = true;
		});
		const actualValue = (0, vue.computed)(() => {
			return isControlled.value ? props.modelValue : false;
		});
		const checked = (0, vue.computed)(() => actualValue.value === props.activeValue);
		if (![props.activeValue, props.inactiveValue].includes(actualValue.value)) {
			emit(require_event.UPDATE_MODEL_EVENT, props.inactiveValue);
			emit(require_event.CHANGE_EVENT, props.inactiveValue);
			emit(require_event.INPUT_EVENT, props.inactiveValue);
		}
		(0, vue.watch)(checked, (val) => {
			input.value.checked = val;
			if (props.validateEvent) formItem?.validate?.("change").catch((err) => require_error.debugWarn(err));
		});
		const handleChange = () => {
			const val = checked.value ? props.inactiveValue : props.activeValue;
			emit(require_event.UPDATE_MODEL_EVENT, val);
			emit(require_event.CHANGE_EVENT, val);
			emit(require_event.INPUT_EVENT, val);
			(0, vue.nextTick)(() => {
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
			if (![(0, _vue_shared.isPromise)(shouldChange), require_types.isBoolean(shouldChange)].includes(true)) require_error.throwError(COMPONENT_NAME, "beforeChange must return type `Promise<boolean>` or `boolean`");
			if ((0, _vue_shared.isPromise)(shouldChange)) shouldChange.then((result) => {
				if (result) handleChange();
			}).catch((e) => {
				require_error.debugWarn(COMPONENT_NAME, `some error occurred: ${e}`);
			});
			else if (shouldChange) handleChange();
		};
		const focus = () => {
			input.value?.focus?.();
		};
		(0, vue.onMounted)(() => {
			input.value.checked = checked.value;
		});
		__expose({
			focus,
			checked
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				class: (0, vue.normalizeClass)(switchKls.value),
				onClick: (0, vue.withModifiers)(switchValue, ["prevent"])
			}, [
				(0, vue.createElementVNode)("input", {
					id: (0, vue.unref)(inputId),
					ref_key: "input",
					ref: input,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("input")),
					type: "checkbox",
					role: "switch",
					"aria-checked": checked.value,
					"aria-disabled": (0, vue.unref)(switchDisabled),
					"aria-label": __props.ariaLabel,
					name: __props.name,
					"true-value": __props.activeValue,
					"false-value": __props.inactiveValue,
					disabled: (0, vue.unref)(switchDisabled),
					tabindex: __props.tabindex,
					onChange: handleChange,
					onKeydown: (0, vue.withKeys)(switchValue, ["enter"])
				}, null, 42, _hoisted_1),
				!__props.inlinePrompt && (__props.inactiveIcon || __props.inactiveText || _ctx.$slots.inactive) ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
					key: 0,
					class: (0, vue.normalizeClass)(labelLeftKls.value)
				}, [(0, vue.renderSlot)(_ctx.$slots, "inactive", {}, () => [__props.inactiveIcon ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), { key: 0 }, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.inactiveIcon)))]),
					_: 1
				})) : (0, vue.createCommentVNode)("v-if", true), !__props.inactiveIcon && __props.inactiveText ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
					key: 1,
					"aria-hidden": checked.value
				}, (0, vue.toDisplayString)(__props.inactiveText), 9, _hoisted_2)) : (0, vue.createCommentVNode)("v-if", true)])], 2)) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.createElementVNode)("span", {
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("core")),
					style: (0, vue.normalizeStyle)(coreStyle.value)
				}, [__props.inlinePrompt ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("inner"))
				}, [!checked.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("inner-wrapper"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "inactive", {}, () => [__props.inactiveIcon ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), { key: 0 }, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.inactiveIcon)))]),
					_: 1
				})) : (0, vue.createCommentVNode)("v-if", true), !__props.inactiveIcon && __props.inactiveText ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", _hoisted_3, (0, vue.toDisplayString)(__props.inactiveText), 1)) : (0, vue.createCommentVNode)("v-if", true)])], 2)) : ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 1,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("inner-wrapper"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "active", {}, () => [__props.activeIcon ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), { key: 0 }, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.activeIcon)))]),
					_: 1
				})) : (0, vue.createCommentVNode)("v-if", true), !__props.activeIcon && __props.activeText ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", _hoisted_4, (0, vue.toDisplayString)(__props.activeText), 1)) : (0, vue.createCommentVNode)("v-if", true)])], 2))], 2)) : (0, vue.createCommentVNode)("v-if", true), (0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("action")) }, [__props.loading ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).is("loading"))
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.Loading))]),
					_: 1
				}, 8, ["class"])) : checked.value ? (0, vue.renderSlot)(_ctx.$slots, "active-action", { key: 1 }, () => [__props.activeActionIcon ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), { key: 0 }, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.activeActionIcon)))]),
					_: 1
				})) : (0, vue.createCommentVNode)("v-if", true)]) : !checked.value ? (0, vue.renderSlot)(_ctx.$slots, "inactive-action", { key: 2 }, () => [__props.inactiveActionIcon ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), { key: 0 }, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.inactiveActionIcon)))]),
					_: 1
				})) : (0, vue.createCommentVNode)("v-if", true)]) : (0, vue.createCommentVNode)("v-if", true)], 2)], 6),
				!__props.inlinePrompt && (__props.activeIcon || __props.activeText || _ctx.$slots.active) ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
					key: 1,
					class: (0, vue.normalizeClass)(labelRightKls.value)
				}, [(0, vue.renderSlot)(_ctx.$slots, "active", {}, () => [__props.activeIcon ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), { key: 0 }, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.activeIcon)))]),
					_: 1
				})) : (0, vue.createCommentVNode)("v-if", true), !__props.activeIcon && __props.activeText ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
					key: 1,
					"aria-hidden": !checked.value
				}, (0, vue.toDisplayString)(__props.activeText), 9, _hoisted_5)) : (0, vue.createCommentVNode)("v-if", true)])], 2)) : (0, vue.createCommentVNode)("v-if", true)
			], 2);
		};
	}
});

//#endregion
exports.default = switch_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=switch.vue_vue_type_script_setup_true_lang.js.map