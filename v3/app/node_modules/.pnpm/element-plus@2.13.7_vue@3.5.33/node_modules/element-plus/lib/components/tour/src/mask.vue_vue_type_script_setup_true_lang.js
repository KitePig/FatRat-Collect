const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-lockscreen/index.js');
const require_mask = require('./mask.js');
const require_helper = require('./helper.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/components/tour/src/mask.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = { style: {
	width: "100%",
	height: "100%"
} };
const _hoisted_2 = ["d"];
var mask_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElTourMask",
	inheritAttrs: false,
	__name: "mask",
	props: require_mask.maskProps,
	setup(__props) {
		const props = __props;
		const { ns } = (0, vue.inject)(require_helper.tourKey);
		const radius = (0, vue.computed)(() => props.pos?.radius ?? 2);
		const roundInfo = (0, vue.computed)(() => {
			const v = radius.value;
			const baseInfo = `a${v},${v} 0 0 1`;
			return {
				topRight: `${baseInfo} ${v},${v}`,
				bottomRight: `${baseInfo} ${-v},${v}`,
				bottomLeft: `${baseInfo} ${-v},${-v}`,
				topLeft: `${baseInfo} ${v},${-v}`
			};
		});
		const { width: windowWidth, height: windowHeight } = (0, _vueuse_core.useWindowSize)();
		const path = (0, vue.computed)(() => {
			const width = windowWidth.value;
			const height = windowHeight.value;
			const info = roundInfo.value;
			const _path = `M${width},0 L0,0 L0,${height} L${width},${height} L${width},0 Z`;
			const _radius = radius.value;
			return props.pos ? `${_path} M${props.pos.left + _radius},${props.pos.top} h${props.pos.width - _radius * 2} ${info.topRight} v${props.pos.height - _radius * 2} ${info.bottomRight} h${-props.pos.width + _radius * 2} ${info.bottomLeft} v${-props.pos.height + _radius * 2} ${info.topLeft} z` : _path;
		});
		const maskStyle = (0, vue.computed)(() => ({
			position: "fixed",
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			zIndex: props.zIndex,
			pointerEvents: props.pos && props.targetAreaClickable ? "none" : "auto"
		}));
		const pathStyle = (0, vue.computed)(() => ({
			fill: props.fill,
			pointerEvents: "auto",
			cursor: "auto"
		}));
		require_index.useLockscreen((0, vue.toRef)(props, "visible"), { ns });
		return (_ctx, _cache) => {
			return __props.visible ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", (0, vue.mergeProps)({
				key: 0,
				class: (0, vue.unref)(ns).e("mask"),
				style: maskStyle.value
			}, _ctx.$attrs), [((0, vue.openBlock)(), (0, vue.createElementBlock)("svg", _hoisted_1, [(0, vue.createElementVNode)("path", {
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("hollow")),
				style: (0, vue.normalizeStyle)(pathStyle.value),
				d: path.value
			}, null, 14, _hoisted_2)]))], 16)) : (0, vue.createCommentVNode)("v-if", true);
		};
	}
});

//#endregion
exports.default = mask_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=mask.vue_vue_type_script_setup_true_lang.js.map