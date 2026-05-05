const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_style = require('../../../utils/dom/style.js');
const require_index = require('../../../hooks/use-namespace/index.js');
let vue = require("vue");

//#region ../../packages/components/menu/src/menu-collapse-transition.vue?vue&type=script&setup=true&lang.ts
var menu_collapse_transition_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElMenuCollapseTransition",
	__name: "menu-collapse-transition",
	setup(__props) {
		const ns = require_index.useNamespace("menu");
		const listeners = {
			onBeforeEnter: (el) => el.style.opacity = "0.2",
			onEnter(el, done) {
				require_style.addClass(el, `${ns.namespace.value}-opacity-transition`);
				el.style.opacity = "1";
				done();
			},
			onAfterEnter(el) {
				require_style.removeClass(el, `${ns.namespace.value}-opacity-transition`);
				el.style.opacity = "";
			},
			onBeforeLeave(el) {
				if (!el.dataset) el.dataset = {};
				if (require_style.hasClass(el, ns.m("collapse"))) {
					require_style.removeClass(el, ns.m("collapse"));
					el.dataset.oldOverflow = el.style.overflow;
					el.dataset.scrollWidth = el.clientWidth.toString();
					require_style.addClass(el, ns.m("collapse"));
				} else {
					require_style.addClass(el, ns.m("collapse"));
					el.dataset.oldOverflow = el.style.overflow;
					el.dataset.scrollWidth = el.clientWidth.toString();
					require_style.removeClass(el, ns.m("collapse"));
				}
				el.style.width = `${el.scrollWidth}px`;
				el.style.overflow = "hidden";
			},
			onLeave(el) {
				require_style.addClass(el, "horizontal-collapse-transition");
				el.style.width = `${el.dataset.scrollWidth}px`;
			}
		};
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)(vue.Transition, (0, vue.mergeProps)({ mode: "out-in" }, listeners), {
				default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 16);
		};
	}
});

//#endregion
exports.default = menu_collapse_transition_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=menu-collapse-transition.vue_vue_type_script_setup_true_lang.js.map