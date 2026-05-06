const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_constants = require('./constants.js');
const require_anchor_link = require('./anchor-link.js');
let vue = require("vue");

//#region ../../packages/components/anchor/src/anchor-link.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["href"];
var anchor_link_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElAnchorLink",
	__name: "anchor-link",
	props: require_anchor_link.anchorLinkProps,
	setup(__props) {
		const props = __props;
		const linkRef = (0, vue.ref)(null);
		const { ns, direction, currentAnchor, addLink, removeLink, handleClick: contextHandleClick } = (0, vue.inject)(require_constants.anchorKey);
		const cls = (0, vue.computed)(() => [ns.e("link"), ns.is("active", currentAnchor.value === props.href)]);
		const handleClick = (e) => {
			contextHandleClick(e, props.href);
		};
		(0, vue.watch)(() => props.href, (val, oldVal) => {
			(0, vue.nextTick)(() => {
				if (oldVal) removeLink(oldVal);
				if (val) addLink({
					href: val,
					el: linkRef.value
				});
			});
		});
		(0, vue.onMounted)(() => {
			const { href } = props;
			if (href) addLink({
				href,
				el: linkRef.value
			});
		});
		(0, vue.onBeforeUnmount)(() => {
			const { href } = props;
			if (href) removeLink(href);
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("item")) }, [(0, vue.createElementVNode)("a", {
				ref_key: "linkRef",
				ref: linkRef,
				class: (0, vue.normalizeClass)(cls.value),
				href: __props.href,
				onClick: handleClick
			}, [(0, vue.renderSlot)(_ctx.$slots, "default", {}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(__props.title), 1)])], 10, _hoisted_1), _ctx.$slots["sub-link"] && (0, vue.unref)(direction) === "vertical" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				key: 0,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("list"))
			}, [(0, vue.renderSlot)(_ctx.$slots, "sub-link")], 2)) : (0, vue.createCommentVNode)("v-if", true)], 2);
		};
	}
});

//#endregion
exports.default = anchor_link_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=anchor-link.vue_vue_type_script_setup_true_lang.js.map