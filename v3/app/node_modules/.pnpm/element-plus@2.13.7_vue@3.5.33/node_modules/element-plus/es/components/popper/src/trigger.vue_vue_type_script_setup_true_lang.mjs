import { isFocusable } from "../../../utils/dom/aria.mjs";
import { isElement } from "../../../utils/types.mjs";
import { useForwardRef } from "../../../hooks/use-forward-ref/index.mjs";
import { POPPER_INJECTION_KEY } from "./constants.mjs";
import { popperTriggerProps } from "./trigger.mjs";
import { OnlyChild } from "../../slot/src/only-child.mjs";
import { unrefElement } from "@vueuse/core";
import { isNil } from "lodash-unified";
import { computed, createBlock, createCommentVNode, defineComponent, inject, mergeProps, onBeforeUnmount, onMounted, openBlock, renderSlot, unref, watch, withCtx } from "vue";

//#region ../../packages/components/popper/src/trigger.vue?vue&type=script&setup=true&lang.ts
var trigger_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElPopperTrigger",
	inheritAttrs: false,
	__name: "trigger",
	props: popperTriggerProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const { role, triggerRef } = inject(POPPER_INJECTION_KEY, void 0);
		useForwardRef(triggerRef);
		const ariaControls = computed(() => {
			return ariaHaspopup.value ? props.id : void 0;
		});
		const ariaDescribedby = computed(() => {
			if (role && role.value === "tooltip") return props.open && props.id ? props.id : void 0;
		});
		const ariaHaspopup = computed(() => {
			if (role && role.value !== "tooltip") return role.value;
		});
		const ariaExpanded = computed(() => {
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
		onMounted(() => {
			watch(() => props.virtualRef, (virtualEl) => {
				if (virtualEl) triggerRef.value = unrefElement(virtualEl);
			}, { immediate: true });
			watch(triggerRef, (el, prevEl) => {
				virtualTriggerAriaStopWatch?.();
				virtualTriggerAriaStopWatch = void 0;
				if (isElement(prevEl)) TRIGGER_ELE_EVENTS.forEach((eventName) => {
					const handler = props[eventName];
					if (handler) prevEl.removeEventListener(eventName.slice(2).toLowerCase(), handler, ["onFocus", "onBlur"].includes(eventName));
				});
				if (isElement(el)) {
					TRIGGER_ELE_EVENTS.forEach((eventName) => {
						const handler = props[eventName];
						if (handler) el.addEventListener(eventName.slice(2).toLowerCase(), handler, ["onFocus", "onBlur"].includes(eventName));
					});
					if (isFocusable(el)) virtualTriggerAriaStopWatch = watch([
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
							isNil(watches[idx]) ? el.removeAttribute(key) : el.setAttribute(key, watches[idx]);
						});
					}, { immediate: true });
				}
				if (isElement(prevEl) && isFocusable(prevEl)) [
					"aria-controls",
					"aria-describedby",
					"aria-haspopup",
					"aria-expanded"
				].forEach((key) => prevEl.removeAttribute(key));
			}, { immediate: true });
		});
		onBeforeUnmount(() => {
			virtualTriggerAriaStopWatch?.();
			virtualTriggerAriaStopWatch = void 0;
			if (triggerRef.value && isElement(triggerRef.value)) {
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
			return !__props.virtualTriggering ? (openBlock(), createBlock(unref(OnlyChild), mergeProps({ key: 0 }, _ctx.$attrs, {
				"aria-controls": ariaControls.value,
				"aria-describedby": ariaDescribedby.value,
				"aria-expanded": ariaExpanded.value,
				"aria-haspopup": ariaHaspopup.value
			}), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, [
				"aria-controls",
				"aria-describedby",
				"aria-expanded",
				"aria-haspopup"
			])) : createCommentVNode("v-if", true);
		};
	}
});

//#endregion
export { trigger_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=trigger.vue_vue_type_script_setup_true_lang.mjs.map