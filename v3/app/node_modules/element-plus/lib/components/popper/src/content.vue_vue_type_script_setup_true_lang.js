const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_constants = require('./constants.js');
const require_content = require('./content.js');
const require_index = require('../../focus-trap/index.js');
const require_constants$1 = require('../../form/src/constants.js');
const require_use_content = require('./composables/use-content.js');
const require_use_content_dom = require('./composables/use-content-dom.js');
const require_use_focus_trap = require('./composables/use-focus-trap.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/popper/src/content.vue?vue&type=script&setup=true&lang.ts
var content_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElPopperContent",
	__name: "content",
	props: require_content.popperContentProps,
	emits: require_content.popperContentEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const emit = __emit;
		const props = __props;
		const { focusStartRef, trapped, onFocusAfterReleased, onFocusAfterTrapped, onFocusInTrap, onFocusoutPrevented, onReleaseRequested } = require_use_focus_trap.usePopperContentFocusTrap(props, emit);
		const { attributes, arrowRef, contentRef, styles, instanceRef, role, update } = require_use_content.usePopperContent(props);
		const { ariaModal, arrowStyle, contentAttrs, contentClass, contentStyle, updateZIndex } = require_use_content_dom.usePopperContentDOM(props, {
			styles,
			attributes,
			role
		});
		const formItemContext = (0, vue.inject)(require_constants$1.formItemContextKey, void 0);
		(0, vue.provide)(require_constants.POPPER_CONTENT_INJECTION_KEY, {
			arrowStyle,
			arrowRef
		});
		if (formItemContext) (0, vue.provide)(require_constants$1.formItemContextKey, {
			...formItemContext,
			addInputId: _vue_shared.NOOP,
			removeInputId: _vue_shared.NOOP
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
		(0, vue.onMounted)(() => {
			(0, vue.watch)(() => props.triggerTargetEl, (triggerTargetEl, prevTriggerTargetEl) => {
				triggerTargetAriaStopWatch?.();
				triggerTargetAriaStopWatch = void 0;
				const el = (0, vue.unref)(triggerTargetEl || contentRef.value);
				const prevEl = (0, vue.unref)(prevTriggerTargetEl || contentRef.value);
				if (require_types.isElement(el)) triggerTargetAriaStopWatch = (0, vue.watch)([
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
						(0, lodash_unified.isNil)(watches[idx]) ? el.removeAttribute(key) : el.setAttribute(key, watches[idx]);
					});
				}, { immediate: true });
				if (prevEl !== el && require_types.isElement(prevEl)) [
					"role",
					"aria-label",
					"aria-modal",
					"id"
				].forEach((key) => {
					prevEl.removeAttribute(key);
				});
			}, { immediate: true });
			(0, vue.watch)(() => props.visible, togglePopperAlive, { immediate: true });
		});
		(0, vue.onBeforeUnmount)(() => {
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
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", (0, vue.mergeProps)({
				ref_key: "contentRef",
				ref: contentRef
			}, (0, vue.unref)(contentAttrs), {
				style: (0, vue.unref)(contentStyle),
				class: (0, vue.unref)(contentClass),
				tabindex: "-1",
				onMouseenter: _cache[0] || (_cache[0] = (e) => _ctx.$emit("mouseenter", e)),
				onMouseleave: _cache[1] || (_cache[1] = (e) => _ctx.$emit("mouseleave", e))
			}), [(0, vue.createVNode)((0, vue.unref)(require_index.default), {
				loop: __props.loop,
				trapped: (0, vue.unref)(trapped),
				"trap-on-focus-in": true,
				"focus-trap-el": (0, vue.unref)(contentRef),
				"focus-start-el": (0, vue.unref)(focusStartRef),
				onFocusAfterTrapped: (0, vue.unref)(onFocusAfterTrapped),
				onFocusAfterReleased: (0, vue.unref)(onFocusAfterReleased),
				onFocusin: (0, vue.unref)(onFocusInTrap),
				onFocusoutPrevented: (0, vue.unref)(onFocusoutPrevented),
				onReleaseRequested: (0, vue.unref)(onReleaseRequested)
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "default")]),
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
exports.default = content_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=content.vue_vue_type_script_setup_true_lang.js.map