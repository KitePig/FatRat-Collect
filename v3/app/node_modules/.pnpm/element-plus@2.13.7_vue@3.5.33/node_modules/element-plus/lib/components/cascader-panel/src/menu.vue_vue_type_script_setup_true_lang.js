const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../../hooks/use-id/index.js');
const require_index$3 = require('../../icon/index.js');
const require_index$4 = require('../../scrollbar/index.js');
const require_types = require('./types.js');
const require_node = require('./node2.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");

//#region ../../packages/components/cascader-panel/src/menu.vue?vue&type=script&setup=true&lang.ts
var menu_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElCascaderMenu",
	__name: "menu",
	props: {
		nodes: {
			type: Array,
			required: true
		},
		index: {
			type: Number,
			required: true
		}
	},
	setup(__props) {
		const props = __props;
		const instance = (0, vue.getCurrentInstance)();
		const ns = require_index$1.useNamespace("cascader-menu");
		const { t } = require_index.useLocale();
		const id = require_index$2.useId();
		let activeNode;
		let hoverTimer;
		const panel = (0, vue.inject)(require_types.CASCADER_PANEL_INJECTION_KEY);
		const hoverZone = (0, vue.ref)();
		const isEmpty = (0, vue.computed)(() => !props.nodes.length);
		const isLoading = (0, vue.computed)(() => !panel.initialLoaded);
		const menuId = (0, vue.computed)(() => `${id.value}-${props.index}`);
		const handleExpand = (e) => {
			activeNode = e.target;
		};
		const handleMouseMove = (e) => {
			if (!panel.isHoverMenu || !activeNode || !hoverZone.value) return;
			if (activeNode.contains(e.target)) {
				clearHoverTimer();
				const el = instance.vnode.el;
				const { left } = el.getBoundingClientRect();
				const { offsetWidth, offsetHeight } = el;
				const startX = e.clientX - left;
				const top = activeNode.offsetTop;
				const bottom = top + activeNode.offsetHeight;
				const scrollTop = el.querySelector(`.${ns.e("wrap")}`)?.scrollTop || 0;
				hoverZone.value.innerHTML = `
          <path style="pointer-events: auto;" fill="transparent" d="M${startX} ${top} L${offsetWidth} ${scrollTop} V${top} Z" />
          <path style="pointer-events: auto;" fill="transparent" d="M${startX} ${bottom} L${offsetWidth} ${offsetHeight + scrollTop} V${bottom} Z" />
        `;
			} else if (!hoverTimer) hoverTimer = window.setTimeout(clearHoverZone, panel.config.hoverThreshold);
		};
		const clearHoverTimer = () => {
			if (!hoverTimer) return;
			clearTimeout(hoverTimer);
			hoverTimer = void 0;
		};
		const clearHoverZone = () => {
			if (!hoverZone.value) return;
			hoverZone.value.innerHTML = "";
			clearHoverTimer();
		};
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$4.ElScrollbar), {
				key: menuId.value,
				tag: "ul",
				role: "menu",
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).b()),
				"wrap-class": (0, vue.unref)(ns).e("wrap"),
				"view-class": [(0, vue.unref)(ns).e("list"), (0, vue.unref)(ns).is("empty", isEmpty.value)],
				onMousemove: handleMouseMove,
				onMouseleave: clearHoverZone
			}, {
				default: (0, vue.withCtx)(() => [
					((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(__props.nodes, (node) => {
						return (0, vue.openBlock)(), (0, vue.createBlock)(require_node.default, {
							key: node.uid,
							node,
							"menu-id": menuId.value,
							onExpand: handleExpand
						}, null, 8, ["node", "menu-id"]);
					}), 128)),
					isLoading.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: 0,
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("empty-text"))
					}, [(0, vue.createVNode)((0, vue.unref)(require_index$3.ElIcon), {
						size: "14",
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).is("loading"))
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.Loading))]),
						_: 1
					}, 8, ["class"]), (0, vue.createTextVNode)(" " + (0, vue.toDisplayString)((0, vue.unref)(t)("el.cascader.loading")), 1)], 2)) : isEmpty.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: 1,
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("empty-text"))
					}, [(0, vue.renderSlot)(_ctx.$slots, "empty", {}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("el.cascader.noData")), 1)])], 2)) : (0, vue.unref)(panel)?.isHoverMenu ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 2 }, [(0, vue.createCommentVNode)(" eslint-disable vue/html-self-closing "), ((0, vue.openBlock)(), (0, vue.createElementBlock)("svg", {
						ref_key: "hoverZone",
						ref: hoverZone,
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("hover-zone"))
					}, null, 2))], 2112)) : (0, vue.createCommentVNode)("v-if", true),
					(0, vue.createCommentVNode)(" eslint-enable vue/html-self-closing ")
				]),
				_: 3
			}, 8, [
				"class",
				"wrap-class",
				"view-class"
			]);
		};
	}
});

//#endregion
exports.default = menu_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=menu.vue_vue_type_script_setup_true_lang.js.map