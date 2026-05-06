const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../focus-trap/index.js');
const require_content = require('./content.js');
const require_helper = require('./helper.js');
let vue = require("vue");

//#region ../../packages/components/tour/src/content.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["data-side"];
var content_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElTourContent",
	__name: "content",
	props: require_content.tourContentProps,
	emits: require_content.tourContentEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const placement = (0, vue.ref)(props.placement);
		const strategy = (0, vue.ref)(props.strategy);
		const contentRef = (0, vue.ref)(null);
		const arrowRef = (0, vue.ref)(null);
		(0, vue.watch)(() => props.placement, () => {
			placement.value = props.placement;
		});
		const { contentStyle, arrowStyle } = require_helper.useFloating((0, vue.toRef)(props, "reference"), contentRef, arrowRef, placement, strategy, (0, vue.toRef)(props, "offset"), (0, vue.toRef)(props, "zIndex"), (0, vue.toRef)(props, "showArrow"));
		const side = (0, vue.computed)(() => {
			return placement.value.split("-")[0];
		});
		const { ns } = (0, vue.inject)(require_helper.tourKey);
		const onCloseRequested = () => {
			emit("close");
		};
		const onFocusoutPrevented = (event) => {
			if (event.detail.focusReason === "pointer") event.preventDefault();
		};
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				ref_key: "contentRef",
				ref: contentRef,
				style: (0, vue.normalizeStyle)((0, vue.unref)(contentStyle)),
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("content")),
				"data-side": side.value,
				tabindex: "-1"
			}, [(0, vue.createVNode)((0, vue.unref)(require_index.default), {
				loop: "",
				trapped: "",
				"focus-start-el": "container",
				"focus-trap-el": contentRef.value || void 0,
				onReleaseRequested: onCloseRequested,
				onFocusoutPrevented
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["focus-trap-el"]), __props.showArrow ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
				key: 0,
				ref_key: "arrowRef",
				ref: arrowRef,
				style: (0, vue.normalizeStyle)((0, vue.unref)(arrowStyle)),
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("arrow"))
			}, null, 6)) : (0, vue.createCommentVNode)("v-if", true)], 14, _hoisted_1);
		};
	}
});

//#endregion
exports.default = content_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=content.vue_vue_type_script_setup_true_lang.js.map