const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../utils/dom/aria.js');
const require_types = require('../../../utils/types.js');
const require_index = require('../../../hooks/use-forward-ref/index.js');
const require_constants = require('./constants.js');
const require_trigger = require('./trigger.js');
const require_only_child = require('../../slot/src/only-child.js');
let _vueuse_core = require("@vueuse/core");
let lodash_unified = require("lodash-unified");
let vue = require("vue");

//#region ../../packages/components/popper/src/trigger.vue?vue&type=script&setup=true&lang.ts
var trigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElPopperTrigger",
	inheritAttrs: false,
	__name: "trigger",
	props: require_trigger.popperTriggerProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const { role, triggerRef } = (0, vue.inject)(require_constants.POPPER_INJECTION_KEY, void 0);
		require_index.useForwardRef(triggerRef);
		const ariaControls = (0, vue.computed)(() => {
			return ariaHaspopup.value ? props.id : void 0;
		});
		const ariaDescribedby = (0, vue.computed)(() => {
			if (role && role.value === "tooltip") return props.open && props.id ? props.id : void 0;
		});
		const ariaHaspopup = (0, vue.computed)(() => {
			if (role && role.value !== "tooltip") return role.value;
		});
		const ariaExpanded = (0, vue.computed)(() => {
			return ariaHaspopup.value ? `${props.open}` : void 0;
		});
		let virtualTriggerAriaStopWatch = void 0;
		const TRIGGER_ELE_EVENTS = [
			"onMouseenter",
			"onMouseleave",
			"onClick",
			"onKeydown",
			"onFocus",
			"onBlur",
			"onContextmenu"
		];
		(0, vue.onMounted)(() => {
			(0, vue.watch)(() => props.virtualRef, (virtualEl) => {
				if (virtualEl) triggerRef.value = (0, _vueuse_core.unrefElement)(virtualEl);
			}, { immediate: true });
			(0, vue.watch)(triggerRef, (el, prevEl) => {
				virtualTriggerAriaStopWatch?.();
				virtualTriggerAriaStopWatch = void 0;
				if (require_types.isElement(prevEl)) TRIGGER_ELE_EVENTS.forEach((eventName) => {
					const handler = props[eventName];
					if (handler) prevEl.removeEventListener(eventName.slice(2).toLowerCase(), handler, ["onFocus", "onBlur"].includes(eventName));
				});
				if (require_types.isElement(el)) {
					TRIGGER_ELE_EVENTS.forEach((eventName) => {
						const handler = props[eventName];
						if (handler) el.addEventListener(eventName.slice(2).toLowerCase(), handler, ["onFocus", "onBlur"].includes(eventName));
					});
					if (require_aria.isFocusable(el)) virtualTriggerAriaStopWatch = (0, vue.watch)([
						ariaControls,
						ariaDescribedby,
						ariaHaspopup,
						ariaExpanded
					], (watches) => {
						[
							"aria-controls",
							"aria-describedby",
							"aria-haspopup",
							"aria-expanded"
						].forEach((key, idx) => {
							(0, lodash_unified.isNil)(watches[idx]) ? el.removeAttribute(key) : el.setAttribute(key, watches[idx]);
						});
					}, { immediate: true });
				}
				if (require_types.isElement(prevEl) && require_aria.isFocusable(prevEl)) [
					"aria-controls",
					"aria-describedby",
					"aria-haspopup",
					"aria-expanded"
				].forEach((key) => prevEl.removeAttribute(key));
			}, { immediate: true });
		});
		(0, vue.onBeforeUnmount)(() => {
			virtualTriggerAriaStopWatch?.();
			virtualTriggerAriaStopWatch = void 0;
			if (triggerRef.value && require_types.isElement(triggerRef.value)) {
				const el = triggerRef.value;
				TRIGGER_ELE_EVENTS.forEach((eventName) => {
					const handler = props[eventName];
					if (handler) el.removeEventListener(eventName.slice(2).toLowerCase(), handler, ["onFocus", "onBlur"].includes(eventName));
				});
				triggerRef.value = void 0;
			}
		});
		__expose({ triggerRef });
		return (_ctx, _cache) => {
			return !__props.virtualTriggering ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_only_child.OnlyChild), (0, vue.mergeProps)({ key: 0 }, _ctx.$attrs, {
				"aria-controls": ariaControls.value,
				"aria-describedby": ariaDescribedby.value,
				"aria-expanded": ariaExpanded.value,
				"aria-haspopup": ariaHaspopup.value
			}), {
				default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"aria-controls",
				"aria-describedby",
				"aria-expanded",
				"aria-haspopup"
			])) : (0, vue.createCommentVNode)("v-if", true);
		};
	}
});

//#endregion
exports.default = trigger_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=trigger.vue_vue_type_script_setup_true_lang.js.map