const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../icon/index.js');
const require_backtop = require('./backtop.js');
const require_use_backtop = require('./use-backtop.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");

//#region ../../packages/components/backtop/src/backtop.vue?vue&type=script&setup=true&lang.ts
const COMPONENT_NAME = "ElBacktop";
var backtop_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: COMPONENT_NAME,
	__name: "backtop",
	props: require_backtop.backtopProps,
	emits: require_backtop.backtopEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = require_index.useNamespace("backtop");
		const { handleClick, visible } = require_use_backtop.useBackTop(props, emit, COMPONENT_NAME);
		const backTopStyle = (0, vue.computed)(() => ({
			right: `${props.right}px`,
			bottom: `${props.bottom}px`
		}));
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)(vue.Transition, { name: `${(0, vue.unref)(ns).namespace.value}-fade-in` }, {
				default: (0, vue.withCtx)(() => [(0, vue.unref)(visible) ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					style: (0, vue.normalizeStyle)(backTopStyle.value),
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).b()),
					onClick: _cache[0] || (_cache[0] = (0, vue.withModifiers)((...args) => (0, vue.unref)(handleClick) && (0, vue.unref)(handleClick)(...args), ["stop"]))
				}, [(0, vue.renderSlot)(_ctx.$slots, "default", {}, () => [(0, vue.createVNode)((0, vue.unref)(require_index$1.ElIcon), { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("icon")) }, {
					default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.CaretTop))]),
					_: 1
				}, 8, ["class"])])], 6)) : (0, vue.createCommentVNode)("v-if", true)]),
				_: 3
			}, 8, ["name"]);
		};
	}
});

//#endregion
exports.default = backtop_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=backtop.vue_vue_type_script_setup_true_lang.js.map