const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../icon/index.js');
const require_collapse_item = require('./collapse-item.js');
const require_index$1 = require('../../collapse-transition/index.js');
const require_use_collapse_item = require('./use-collapse-item.js');
let vue = require("vue");

//#region ../../packages/components/collapse/src/collapse-item.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"id",
	"aria-expanded",
	"aria-controls",
	"aria-describedby",
	"tabindex",
	"aria-disabled"
];
const _hoisted_2 = [
	"id",
	"aria-hidden",
	"aria-labelledby"
];
var collapse_item_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElCollapseItem",
	__name: "collapse-item",
	props: require_collapse_item.collapseItemProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const { focusing, id, isActive, handleFocus, handleHeaderClick, handleEnterClick } = require_use_collapse_item.useCollapseItem(props);
		const { arrowKls, headKls, rootKls, itemTitleKls, itemWrapperKls, itemContentKls, scopedContentId, scopedHeadId } = require_use_collapse_item.useCollapseItemDOM(props, {
			focusing,
			isActive,
			id
		});
		__expose({ isActive });
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(rootKls)) }, [(0, vue.createElementVNode)("div", {
				id: (0, vue.unref)(scopedHeadId),
				class: (0, vue.normalizeClass)((0, vue.unref)(headKls)),
				"aria-expanded": (0, vue.unref)(isActive),
				"aria-controls": (0, vue.unref)(scopedContentId),
				"aria-describedby": (0, vue.unref)(scopedContentId),
				tabindex: __props.disabled ? void 0 : 0,
				"aria-disabled": __props.disabled,
				role: "button",
				onClick: _cache[0] || (_cache[0] = (...args) => (0, vue.unref)(handleHeaderClick) && (0, vue.unref)(handleHeaderClick)(...args)),
				onKeydown: _cache[1] || (_cache[1] = (0, vue.withKeys)((0, vue.withModifiers)((...args) => (0, vue.unref)(handleEnterClick) && (0, vue.unref)(handleEnterClick)(...args), ["stop"]), ["space", "enter"])),
				onFocus: _cache[2] || (_cache[2] = (...args) => (0, vue.unref)(handleFocus) && (0, vue.unref)(handleFocus)(...args)),
				onBlur: _cache[3] || (_cache[3] = ($event) => focusing.value = false)
			}, [(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(itemTitleKls)) }, [(0, vue.renderSlot)(_ctx.$slots, "title", { isActive: (0, vue.unref)(isActive) }, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(__props.title), 1)])], 2), (0, vue.renderSlot)(_ctx.$slots, "icon", { isActive: (0, vue.unref)(isActive) }, () => [(0, vue.createVNode)((0, vue.unref)(require_index.ElIcon), { class: (0, vue.normalizeClass)((0, vue.unref)(arrowKls)) }, {
				default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.icon)))]),
				_: 1
			}, 8, ["class"])])], 42, _hoisted_1), (0, vue.createVNode)((0, vue.unref)(require_index$1.ElCollapseTransition), null, {
				default: (0, vue.withCtx)(() => [(0, vue.withDirectives)((0, vue.createElementVNode)("div", {
					id: (0, vue.unref)(scopedContentId),
					role: "region",
					class: (0, vue.normalizeClass)((0, vue.unref)(itemWrapperKls)),
					"aria-hidden": !(0, vue.unref)(isActive),
					"aria-labelledby": (0, vue.unref)(scopedHeadId)
				}, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(itemContentKls)) }, [(0, vue.renderSlot)(_ctx.$slots, "default")], 2)], 10, _hoisted_2), [[vue.vShow, (0, vue.unref)(isActive)]])]),
				_: 3
			})], 2);
		};
	}
});

//#endregion
exports.default = collapse_item_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=collapse-item.vue_vue_type_script_setup_true_lang.js.map