const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../icon/index.js');
const require_tokens = require('./tokens.js');
const require_timeline_item = require('./timeline-item.js');
let vue = require("vue");

//#region ../../packages/components/timeline/src/timeline-item.vue?vue&type=script&setup=true&lang.ts
var timeline_item_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElTimelineItem",
	__name: "timeline-item",
	props: require_timeline_item.timelineItemProps,
	setup(__props) {
		const props = __props;
		const { props: timelineProps } = (0, vue.inject)(require_tokens.TIMELINE_INJECTION_KEY);
		const ns = require_index.useNamespace("timeline-item");
		const defaultNodeKls = (0, vue.computed)(() => [
			ns.e("node"),
			ns.em("node", props.size || ""),
			ns.em("node", props.type || ""),
			ns.is("hollow", props.hollow)
		]);
		const timelineItemKls = (0, vue.computed)(() => [
			ns.b(),
			{ [ns.e("center")]: props.center },
			ns.is(timelineProps.mode)
		]);
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("li", { class: (0, vue.normalizeClass)(timelineItemKls.value) }, [
				(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("tail")) }, null, 2),
				!_ctx.$slots.dot ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					class: (0, vue.normalizeClass)(defaultNodeKls.value),
					style: (0, vue.normalizeStyle)({ backgroundColor: __props.color })
				}, [__props.icon ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$1.ElIcon), {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("icon"))
				}, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.icon)))]),
					_: 1
				}, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true)], 6)) : (0, vue.createCommentVNode)("v-if", true),
				_ctx.$slots.dot ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 1,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("dot"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "dot")], 2)) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("wrapper")) }, [
					!__props.hideTimestamp && __props.placement === "top" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: 0,
						class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("timestamp"), (0, vue.unref)(ns).is("top")])
					}, (0, vue.toDisplayString)(__props.timestamp), 3)) : (0, vue.createCommentVNode)("v-if", true),
					(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("content")) }, [(0, vue.renderSlot)(_ctx.$slots, "default")], 2),
					!__props.hideTimestamp && __props.placement === "bottom" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: 1,
						class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("timestamp"), (0, vue.unref)(ns).is("bottom")])
					}, (0, vue.toDisplayString)(__props.timestamp), 3)) : (0, vue.createCommentVNode)("v-if", true)
				], 2)
			], 2);
		};
	}
});

//#endregion
exports.default = timeline_item_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=timeline-item.vue_vue_type_script_setup_true_lang.js.map