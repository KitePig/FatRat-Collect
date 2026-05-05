import { addClass, hasClass, removeClass } from "../../../utils/dom/style.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { Transition, createBlock, defineComponent, mergeProps, openBlock, renderSlot, withCtx } from "vue";

//#region ../../packages/components/menu/src/menu-collapse-transition.vue?vue&type=script&setup=true&lang.ts
var menu_collapse_transition_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElMenuCollapseTransition",
	__name: "menu-collapse-transition",
	setup(__props) {
		const ns = useNamespace("menu");
		const listeners = {
			onBeforeEnter: (el) => el.style.opacity = "0.2",
			onEnter(el, done) {
				addClass(el, `${ns.namespace.value}-opacity-transition`);
				el.style.opacity = "1";
				done();
			},
			onAfterEnter(el) {
				removeClass(el, `${ns.namespace.value}-opacity-transition`);
				el.style.opacity = "";
			},
			onBeforeLeave(el) {
				if (!el.dataset) el.dataset = {};
				if (hasClass(el, ns.m("collapse"))) {
					removeClass(el, ns.m("collapse"));
					el.dataset.oldOverflow = el.style.overflow;
					el.dataset.scrollWidth = el.clientWidth.toString();
					addClass(el, ns.m("collapse"));
				} else {
					addClass(el, ns.m("collapse"));
					el.dataset.oldOverflow = el.style.overflow;
					el.dataset.scrollWidth = el.clientWidth.toString();
					removeClass(el, ns.m("collapse"));
				}
				el.style.width = `${el.scrollWidth}px`;
				el.style.overflow = "hidden";
			},
			onLeave(el) {
				addClass(el, "horizontal-collapse-transition");
				el.style.width = `${el.dataset.scrollWidth}px`;
			}
		};
		return (_ctx, _cache) => {
			return openBlock(), createBlock(Transition, mergeProps({ mode: "out-in" }, listeners), {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
export { menu_collapse_transition_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=menu-collapse-transition.vue_vue_type_script_setup_true_lang.mjs.map