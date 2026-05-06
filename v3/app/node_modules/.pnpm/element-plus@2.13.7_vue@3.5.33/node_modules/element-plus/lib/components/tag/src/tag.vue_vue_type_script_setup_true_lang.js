const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../icon/index.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_tag = require('./tag.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");

//#region ../../packages/components/tag/src/tag.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["aria-label"];
var tag_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElTag",
	__name: "tag",
	props: require_tag.tagProps,
	emits: require_tag.tagEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const tagSize = require_use_form_common_props.useFormSize();
		const { t } = require_index.useLocale();
		const ns = require_index$1.useNamespace("tag");
		const containerKls = (0, vue.computed)(() => {
			const { type, hit, effect, closable, round } = props;
			return [
				ns.b(),
				ns.is("closable", closable),
				ns.m(type || "primary"),
				ns.m(tagSize.value),
				ns.m(effect),
				ns.is("hit", hit),
				ns.is("round", round)
			];
		});
		const handleClose = (event) => {
			emit("close", event);
		};
		const handleClick = (event) => {
			emit("click", event);
		};
		const handleVNodeMounted = (vnode) => {
			if (vnode?.component?.subTree?.component?.bum) vnode.component.subTree.component.bum = null;
		};
		return (_ctx, _cache) => {
			return __props.disableTransitions ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
				key: 0,
				class: (0, vue.normalizeClass)(containerKls.value),
				style: (0, vue.normalizeStyle)({ backgroundColor: __props.color }),
				onClick: handleClick
			}, [(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("content")) }, [(0, vue.renderSlot)(_ctx.$slots, "default")], 2), __props.closable ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
				key: 0,
				"aria-label": (0, vue.unref)(t)("el.tag.close"),
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("close")),
				type: "button",
				onClick: (0, vue.withModifiers)(handleClose, ["stop"])
			}, [(0, vue.createVNode)((0, vue.unref)(require_index$2.ElIcon), null, {
				default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.Close))]),
				_: 1
			})], 10, _hoisted_1)) : (0, vue.createCommentVNode)("v-if", true)], 6)) : ((0, vue.openBlock)(), (0, vue.createBlock)(vue.Transition, {
				key: 1,
				name: `${(0, vue.unref)(ns).namespace.value}-zoom-in-center`,
				appear: "",
				onVnodeMounted: handleVNodeMounted
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("span", {
					class: (0, vue.normalizeClass)(containerKls.value),
					style: (0, vue.normalizeStyle)({ backgroundColor: __props.color }),
					onClick: handleClick
				}, [(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("content")) }, [(0, vue.renderSlot)(_ctx.$slots, "default")], 2), __props.closable ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("button", {
					key: 0,
					"aria-label": (0, vue.unref)(t)("el.tag.close"),
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("close")),
					type: "button",
					onClick: (0, vue.withModifiers)(handleClose, ["stop"])
				}, [(0, vue.createVNode)((0, vue.unref)(require_index$2.ElIcon), null, {
					default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.Close))]),
					_: 1
				})], 10, _hoisted_2)) : (0, vue.createCommentVNode)("v-if", true)], 6)]),
				_: 3
			}, 8, ["name"]));
		};
	}
});

//#endregion
exports.default = tag_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=tag.vue_vue_type_script_setup_true_lang.js.map