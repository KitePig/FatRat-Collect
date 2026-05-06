const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../../hooks/use-throttle-render/index.js');
const require_skeleton = require('./skeleton.js');
const require_skeleton_item = require('./skeleton-item2.js');
let vue = require("vue");

//#region ../../packages/components/skeleton/src/skeleton.vue?vue&type=script&setup=true&lang.ts
var skeleton_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElSkeleton",
	__name: "skeleton",
	props: require_skeleton.skeletonProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const ns = require_index.useNamespace("skeleton");
		const uiLoading = require_index$1.useThrottleRender((0, vue.toRef)(props, "loading"), props.throttle);
		__expose({ uiLoading });
		return (_ctx, _cache) => {
			return (0, vue.unref)(uiLoading) ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", (0, vue.mergeProps)({
				key: 0,
				class: [(0, vue.unref)(ns).b(), (0, vue.unref)(ns).is("animated", __props.animated)]
			}, _ctx.$attrs), [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(__props.count, (i) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: i }, [(0, vue.unref)(uiLoading) ? (0, vue.renderSlot)(_ctx.$slots, "template", { key: i }, () => [(0, vue.createVNode)(require_skeleton_item.default, {
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).is("first")),
					variant: "p"
				}, null, 8, ["class"]), ((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(__props.rows, (item) => {
					return (0, vue.openBlock)(), (0, vue.createBlock)(require_skeleton_item.default, {
						key: item,
						class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("paragraph"), (0, vue.unref)(ns).is("last", item === __props.rows && __props.rows > 1)]),
						variant: "p"
					}, null, 8, ["class"]);
				}), 128))]) : (0, vue.createCommentVNode)("v-if", true)], 64);
			}), 128))], 16)) : (0, vue.renderSlot)(_ctx.$slots, "default", (0, vue.normalizeProps)((0, vue.mergeProps)({ key: 1 }, _ctx.$attrs)));
		};
	}
});

//#endregion
exports.default = skeleton_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=skeleton.vue_vue_type_script_setup_true_lang.js.map