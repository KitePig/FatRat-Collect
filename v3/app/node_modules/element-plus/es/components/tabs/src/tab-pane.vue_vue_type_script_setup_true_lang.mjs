import { throwError } from "../../../utils/error.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { tabsRootContextKey } from "./constants.mjs";
import { tabPaneProps } from "./tab-pane.mjs";
import { computed, createCommentVNode, createElementBlock, defineComponent, getCurrentInstance, inject, normalizeClass, onBeforeUnmount, onBeforeUpdate, openBlock, reactive, ref, renderSlot, unref, useSlots, vShow, watch, withDirectives } from "vue";

//#region ../../packages/components/tabs/src/tab-pane.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"id",
	"aria-hidden",
	"aria-labelledby"
];
const COMPONENT_NAME = "ElTabPane";
var tab_pane_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: COMPONENT_NAME,
	__name: "tab-pane",
	props: tabPaneProps,
	setup(__props) {
		const props = __props;
		const instance = getCurrentInstance();
		const slots = useSlots();
		const tabsRoot = inject(tabsRootContextKey);
		if (!tabsRoot) throwError(COMPONENT_NAME, "usage: <el-tabs><el-tab-pane /></el-tabs/>");
		const ns = useNamespace("tab-pane");
		const paneRef = ref();
		const index = ref();
		const isClosable = computed(() => props.closable ?? tabsRoot.props.closable);
		const active = computed(() => tabsRoot.currentName.value === (props.name ?? index.value));
		const loaded = ref(active.value);
		const paneName = computed(() => props.name ?? index.value);
		const shouldBeRender = computed(() => !props.lazy || loaded.value || active.value);
		const isFocusInsidePane = () => {
			return paneRef.value?.contains(document.activeElement);
		};
		watch(active, (val) => {
			if (val) loaded.value = true;
		});
		const pane = reactive({
			uid: instance.uid,
			getVnode: () => instance.vnode,
			slots,
			props,
			paneName,
			active,
			index,
			isClosable,
			isFocusInsidePane
		});
		tabsRoot.registerPane(pane);
		onBeforeUnmount(() => {
			tabsRoot.unregisterPane(pane);
		});
		onBeforeUpdate(() => {
			if (slots.label) tabsRoot.nav$.value?.scheduleRender();
		});
		return (_ctx, _cache) => {
			return shouldBeRender.value ? withDirectives((openBlock(), createElementBlock("div", {
				key: 0,
				id: `pane-${paneName.value}`,
				ref_key: "paneRef",
				ref: paneRef,
				class: normalizeClass(unref(ns).b()),
				role: "tabpanel",
				"aria-hidden": !active.value,
				"aria-labelledby": `tab-${paneName.value}`
			}, [renderSlot(_ctx.$slots, "default")], 10, _hoisted_1)), [[vShow, active.value]]) : createCommentVNode("v-if", true);
		};
	}
});

//#endregion
export { tab_pane_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=tab-pane.vue_vue_type_script_setup_true_lang.mjs.map