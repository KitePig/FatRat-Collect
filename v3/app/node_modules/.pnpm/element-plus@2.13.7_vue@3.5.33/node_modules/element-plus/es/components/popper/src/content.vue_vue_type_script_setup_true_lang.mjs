import { isElement } from "../../../utils/types.mjs";
import { NOOP } from "../../../utils/functions.mjs";
import { POPPER_CONTENT_INJECTION_KEY } from "./constants.mjs";
import { popperContentEmits, popperContentProps } from "./content.mjs";
import focus_trap_default from "../../focus-trap/index.mjs";
import { formItemContextKey } from "../../form/src/constants.mjs";
import { usePopperContent } from "./composables/use-content.mjs";
import { usePopperContentDOM } from "./composables/use-content-dom.mjs";
import { usePopperContentFocusTrap } from "./composables/use-focus-trap.mjs";
import { isNil } from "lodash-unified";
import { createElementBlock, createVNode, defineComponent, inject, mergeProps, onBeforeUnmount, onMounted, openBlock, provide, renderSlot, unref, watch, withCtx } from "vue";

//#region ../../packages/components/popper/src/content.vue?vue&type=script&setup=true&lang.ts
var content_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElPopperContent",
	__name: "content",
	props: popperContentProps,
	emits: popperContentEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const emit = __emit;
		const props = __props;
		const { focusStartRef, trapped, onFocusAfterReleased, onFocusAfterTrapped, onFocusInTrap, onFocusoutPrevented, onReleaseRequested } = usePopperContentFocusTrap(props, emit);
		const { attributes, arrowRef, contentRef, styles, instanceRef, role, update } = usePopperContent(props);
		const { ariaModal, arrowStyle, contentAttrs, contentClass, contentStyle, updateZIndex } = usePopperContentDOM(props, {
			styles,
			attributes,
			role
		});
		const formItemContext = inject(formItemContextKey, void 0);
		provide(POPPER_CONTENT_INJECTION_KEY, {
			arrowStyle,
			arrowRef
		});
		if (formItemContext) provide(formItemContextKey, {
			...formItemContext,
			addInputId: NOOP,
			removeInputId: NOOP
		});
		let triggerTargetAriaStopWatch = void 0;
		const updatePopper = (shouldUpdateZIndex = true) => {
			update();
			shouldUpdateZIndex && updateZIndex();
		};
		const togglePopperAlive = () => {
			updatePopper(false);
			if (props.visible && props.focusOnShow) trapped.value = true;
			else if (props.visible === false) trapped.value = false;
		};
		onMounted(() => {
			watch(() => props.triggerTargetEl, (triggerTargetEl, prevTriggerTargetEl) => {
				triggerTargetAriaStopWatch?.();
				triggerTargetAriaStopWatch = void 0;
				const el = unref(triggerTargetEl || contentRef.value);
				const prevEl = unref(prevTriggerTargetEl || contentRef.value);
				if (isElement(el)) triggerTargetAriaStopWatch = watch([
					role,
					() => props.ariaLabel,
					ariaModal,
					() => props.id
				], (watches) => {
					[
						"role",
						"aria-label",
						"aria-modal",
						"id"
					].forEach((key, idx) => {
						isNil(watches[idx]) ? el.removeAttribute(key) : el.setAttribute(key, watches[idx]);
					});
				}, { immediate: true });
				if (prevEl !== el && isElement(prevEl)) [
					"role",
					"aria-label",
					"aria-modal",
					"id"
				].forEach((key) => {
					prevEl.removeAttribute(key);
				});
			}, { immediate: true });
			watch(() => props.visible, togglePopperAlive, { immediate: true });
		});
		onBeforeUnmount(() => {
			triggerTargetAriaStopWatch?.();
			triggerTargetAriaStopWatch = void 0;
			contentRef.value = void 0;
		});
		__expose({
			popperContentRef: contentRef,
			popperInstanceRef: instanceRef,
			updatePopper,
			contentStyle
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", mergeProps({
				ref_key: "contentRef",
				ref: contentRef
			}, unref(contentAttrs), {
				style: unref(contentStyle),
				class: unref(contentClass),
				tabindex: "-1",
				onMouseenter: _cache[0] || (_cache[0] = (e) => _ctx.$emit("mouseenter", e)),
				onMouseleave: _cache[1] || (_cache[1] = (e) => _ctx.$emit("mouseleave", e))
			}), [createVNode(unref(focus_trap_default), {
				loop: __props.loop,
				trapped: unref(trapped),
				"trap-on-focus-in": true,
				"focus-trap-el": unref(contentRef),
				"focus-start-el": unref(focusStartRef),
				onFocusAfterTrapped: unref(onFocusAfterTrapped),
				onFocusAfterReleased: unref(onFocusAfterReleased),
				onFocusin: unref(onFocusInTrap),
				onFocusoutPrevented: unref(onFocusoutPrevented),
				onReleaseRequested: unref(onReleaseRequested)
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, [
				"loop",
				"trapped",
				"focus-trap-el",
				"focus-start-el",
				"onFocusAfterTrapped",
				"onFocusAfterReleased",
				"onFocusin",
				"onFocusoutPrevented",
				"onReleaseRequested"
			])], 16);
		};
	}
});

//#endregion
export { content_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=content.vue_vue_type_script_setup_true_lang.mjs.map