import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { Transition, createBlock, defineComponent, mergeProps, openBlock, renderSlot, toHandlers, unref, withCtx } from "vue";

//#region ../../packages/components/collapse-transition/src/collapse-transition.vue?vue&type=script&setup=true&lang.ts
var collapse_transition_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElCollapseTransition",
	__name: "collapse-transition",
	setup(__props) {
		const ns = useNamespace("collapse-transition");
		const reset = (el) => {
			el.style.maxHeight = "";
			el.style.overflow = el.dataset.oldOverflow;
			el.style.paddingTop = el.dataset.oldPaddingTop;
			el.style.paddingBottom = el.dataset.oldPaddingBottom;
		};
		const on = {
			beforeEnter(el) {
				if (!el.dataset) el.dataset = {};
				el.dataset.oldPaddingTop = el.style.paddingTop;
				el.dataset.oldPaddingBottom = el.style.paddingBottom;
				if (el.style.height) el.dataset.elExistsHeight = el.style.height;
				el.style.maxHeight = 0;
				el.style.paddingTop = 0;
				el.style.paddingBottom = 0;
			},
			enter(el) {
				requestAnimationFrame(() => {
					el.dataset.oldOverflow = el.style.overflow;
					if (el.dataset.elExistsHeight) el.style.maxHeight = el.dataset.elExistsHeight;
					else if (el.scrollHeight !== 0) el.style.maxHeight = `${el.scrollHeight}px`;
					else el.style.maxHeight = 0;
					el.style.paddingTop = el.dataset.oldPaddingTop;
					el.style.paddingBottom = el.dataset.oldPaddingBottom;
					el.style.overflow = "hidden";
				});
			},
			afterEnter(el) {
				el.style.maxHeight = "";
				el.style.overflow = el.dataset.oldOverflow;
			},
			enterCancelled(el) {
				reset(el);
			},
			beforeLeave(el) {
				if (!el.dataset) el.dataset = {};
				el.dataset.oldPaddingTop = el.style.paddingTop;
				el.dataset.oldPaddingBottom = el.style.paddingBottom;
				el.dataset.oldOverflow = el.style.overflow;
				el.style.maxHeight = `${el.scrollHeight}px`;
				el.style.overflow = "hidden";
			},
			leave(el) {
				if (el.scrollHeight !== 0) {
					el.style.maxHeight = 0;
					el.style.paddingTop = 0;
					el.style.paddingBottom = 0;
				}
			},
			afterLeave(el) {
				reset(el);
			},
			leaveCancelled(el) {
				reset(el);
			}
		};
		return (_ctx, _cache) => {
			return openBlock(), createBlock(Transition, mergeProps({ name: unref(ns).b() }, toHandlers(on)), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16, ["name"]);
		};
	}
});

//#endregion
export { collapse_transition_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=collapse-transition.vue_vue_type_script_setup_true_lang.mjs.map