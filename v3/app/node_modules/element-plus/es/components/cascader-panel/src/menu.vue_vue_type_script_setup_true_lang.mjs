import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useId } from "../../../hooks/use-id/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { ElScrollbar } from "../../scrollbar/index.mjs";
import { CASCADER_PANEL_INJECTION_KEY } from "./types.mjs";
import node_default from "./node2.mjs";
import { Loading } from "@element-plus/icons-vue";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createTextVNode, createVNode, defineComponent, getCurrentInstance, inject, normalizeClass, openBlock, ref, renderList, renderSlot, toDisplayString, unref, withCtx } from "vue";

//#region ../../packages/components/cascader-panel/src/menu.vue?vue&type=script&setup=true&lang.ts
var menu_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
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
		const instance = getCurrentInstance();
		const ns = useNamespace("cascader-menu");
		const { t } = useLocale();
		const id = useId();
		let activeNode;
		let hoverTimer;
		const panel = inject(CASCADER_PANEL_INJECTION_KEY);
		const hoverZone = ref();
		const isEmpty = computed(() => !props.nodes.length);
		const isLoading = computed(() => !panel.initialLoaded);
		const menuId = computed(() => `${id.value}-${props.index}`);
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
			return openBlock(), createBlock(unref(ElScrollbar), {
				key: menuId.value,
				tag: "ul",
				role: "menu",
				class: normalizeClass(unref(ns).b()),
				"wrap-class": unref(ns).e("wrap"),
				"view-class": [unref(ns).e("list"), unref(ns).is("empty", isEmpty.value)],
				onMousemove: handleMouseMove,
				onMouseleave: clearHoverZone
			}, {
				default: withCtx(() => [
					(openBlock(true), createElementBlock(Fragment, null, renderList(__props.nodes, (node) => {
						return openBlock(), createBlock(node_default, {
							key: node.uid,
							node,
							"menu-id": menuId.value,
							onExpand: handleExpand
						}, null, 8, ["node", "menu-id"]);
					}), 128)),
					isLoading.value ? (openBlock(), createElementBlock("div", {
						key: 0,
						class: normalizeClass(unref(ns).e("empty-text"))
					}, [createVNode(unref(ElIcon), {
						size: "14",
						class: normalizeClass(unref(ns).is("loading"))
					}, {
						default: withCtx(() => [createVNode(unref(Loading))]),
						_: 1
					}, 8, ["class"]), createTextVNode(" " + toDisplayString(unref(t)("el.cascader.loading")), 1)], 2)) : isEmpty.value ? (openBlock(), createElementBlock("div", {
						key: 1,
						class: normalizeClass(unref(ns).e("empty-text"))
					}, [renderSlot(_ctx.$slots, "empty", {}, () => [createTextVNode(toDisplayString(unref(t)("el.cascader.noData")), 1)])], 2)) : unref(panel)?.isHoverMenu ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [createCommentVNode(" eslint-disable vue/html-self-closing "), (openBlock(), createElementBlock("svg", {
						ref_key: "hoverZone",
						ref: hoverZone,
						class: normalizeClass(unref(ns).e("hover-zone"))
					}, null, 2))], 2112)) : createCommentVNode("v-if", true),
					createCommentVNode(" eslint-enable vue/html-self-closing ")
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
export { menu_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=menu.vue_vue_type_script_setup_true_lang.mjs.map