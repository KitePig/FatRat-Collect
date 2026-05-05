import { isUndefined } from "../../../utils/types.mjs";
import { capitalize } from "../../../utils/strings.mjs";
import { throwError } from "../../../utils/error.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { tabsRootContextKey } from "./constants.mjs";
import { tabBarProps } from "./tab-bar.mjs";
import { useResizeObserver } from "@vueuse/core";
import { computed, createCommentVNode, createElementBlock, defineComponent, inject, nextTick, normalizeClass, normalizeStyle, onBeforeUnmount, openBlock, ref, unref, watch } from "vue";

//#region ../../packages/components/tabs/src/tab-bar.vue?vue&type=script&setup=true&lang.ts
const COMPONENT_NAME = "ElTabBar";
var tab_bar_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: COMPONENT_NAME,
	__name: "tab-bar",
	props: tabBarProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const rootTabs = inject(tabsRootContextKey);
		if (!rootTabs) throwError(COMPONENT_NAME, "<el-tabs><el-tab-bar /></el-tabs>");
		const ns = useNamespace("tabs");
		const barRef = ref();
		const barStyle = ref();
		/**
		* when defaultValue is not set, the bar is always shown.
		*
		* when defaultValue is set, the bar will be hidden until style is calculated
		* to avoid the bar showing in the wrong position on initial render.
		*/
		const renderActiveBar = computed(() => isUndefined(rootTabs.props.defaultValue) || Boolean(barStyle.value?.transform));
		const getBarStyle = () => {
			let offset = 0;
			let tabSize = 0;
			const sizeName = ["top", "bottom"].includes(rootTabs.props.tabPosition) ? "width" : "height";
			const sizeDir = sizeName === "width" ? "x" : "y";
			const position = sizeDir === "x" ? "left" : "top";
			props.tabs.every((tab) => {
				if (isUndefined(tab.paneName)) return false;
				const $el = props.tabRefs[tab.paneName];
				if (!$el) return false;
				if (!tab.active) return true;
				offset = $el[`offset${capitalize(position)}`];
				tabSize = $el[`client${capitalize(sizeName)}`];
				const tabStyles = window.getComputedStyle($el);
				if (sizeName === "width") {
					tabSize -= Number.parseFloat(tabStyles.paddingLeft) + Number.parseFloat(tabStyles.paddingRight);
					offset += Number.parseFloat(tabStyles.paddingLeft);
				}
				return false;
			});
			return {
				[sizeName]: `${tabSize}px`,
				transform: `translate${capitalize(sizeDir)}(${offset}px)`
			};
		};
		const update = () => barStyle.value = getBarStyle();
		const tabObservers = [];
		const observerTabs = () => {
			tabObservers.forEach((observer) => observer.stop());
			tabObservers.length = 0;
			Object.values(props.tabRefs).forEach((tab) => {
				tabObservers.push(useResizeObserver(tab, update));
			});
		};
		watch(() => props.tabs, async () => {
			await nextTick();
			update();
			observerTabs();
		}, { immediate: true });
		const barObserver = useResizeObserver(barRef, () => update());
		onBeforeUnmount(() => {
			tabObservers.forEach((observer) => observer.stop());
			tabObservers.length = 0;
			barObserver.stop();
		});
		__expose({
			ref: barRef,
			update
		});
		return (_ctx, _cache) => {
			return renderActiveBar.value ? (openBlock(), createElementBlock("div", {
				key: 0,
				ref_key: "barRef",
				ref: barRef,
				class: normalizeClass([unref(ns).e("active-bar"), unref(ns).is(unref(rootTabs).props.tabPosition)]),
				style: normalizeStyle(barStyle.value)
			}, null, 6)) : createCommentVNode("v-if", true);
		};
	}
});

//#endregion
export { tab_bar_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=tab-bar.vue_vue_type_script_setup_true_lang.mjs.map