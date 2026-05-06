const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../icon/index.js');
const require_index$3 = require('../../divider/index.js');
const require_page_header = require('./page-header.js');
let vue = require("vue");

//#region ../../packages/components/page-header/src/page-header.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["aria-label"];
var page_header_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElPageHeader",
	__name: "page-header",
	props: require_page_header.pageHeaderProps,
	emits: require_page_header.pageHeaderEmits,
	setup(__props, { emit: __emit }) {
		const emit = __emit;
		const { t } = require_index.useLocale();
		const ns = require_index$1.useNamespace("page-header");
		function handleClick() {
			emit("back");
		}
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)([
				(0, vue.unref)(ns).b(),
				(0, vue.unref)(ns).is("contentful", !!_ctx.$slots.default),
				{
					[(0, vue.unref)(ns).m("has-breadcrumb")]: !!_ctx.$slots.breadcrumb,
					[(0, vue.unref)(ns).m("has-extra")]: !!_ctx.$slots.extra
				}
			]) }, [
				_ctx.$slots.breadcrumb ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("breadcrumb"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "breadcrumb")], 2)) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("header")) }, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("left")) }, [
					(0, vue.createElementVNode)("div", {
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("back")),
						role: "button",
						tabindex: "0",
						onClick: handleClick
					}, [__props.icon || _ctx.$slots.icon ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: 0,
						"aria-label": __props.title || (0, vue.unref)(t)("el.pageHeader.title"),
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("icon"))
					}, [(0, vue.renderSlot)(_ctx.$slots, "icon", {}, () => [__props.icon ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$2.ElIcon), { key: 0 }, {
						default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.icon)))]),
						_: 1
					})) : (0, vue.createCommentVNode)("v-if", true)])], 10, _hoisted_1)) : (0, vue.createCommentVNode)("v-if", true), (0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("title")) }, [(0, vue.renderSlot)(_ctx.$slots, "title", {}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(__props.title || (0, vue.unref)(t)("el.pageHeader.title")), 1)])], 2)], 2),
					(0, vue.createVNode)((0, vue.unref)(require_index$3.ElDivider), { direction: "vertical" }),
					(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("content")) }, [(0, vue.renderSlot)(_ctx.$slots, "content", {}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(__props.content), 1)])], 2)
				], 2), _ctx.$slots.extra ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("extra"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "extra")], 2)) : (0, vue.createCommentVNode)("v-if", true)], 2),
				_ctx.$slots.default ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 1,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("main"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 2)) : (0, vue.createCommentVNode)("v-if", true)
			], 2);
		};
	}
});

//#endregion
exports.default = page_header_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=page-header.vue_vue_type_script_setup_true_lang.js.map