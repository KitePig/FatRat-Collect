const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_error = require('../../../utils/error.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_constants = require('./constants.js');
const require_tab_pane = require('./tab-pane.js');
let vue = require("vue");

//#region ../../packages/components/tabs/src/tab-pane.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"id",
	"aria-hidden",
	"aria-labelledby"
];
const COMPONENT_NAME = "ElTabPane";
var tab_pane_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: COMPONENT_NAME,
	__name: "tab-pane",
	props: require_tab_pane.tabPaneProps,
	setup(__props) {
		const props = __props;
		const instance = (0, vue.getCurrentInstance)();
		const slots = (0, vue.useSlots)();
		const tabsRoot = (0, vue.inject)(require_constants.tabsRootContextKey);
		if (!tabsRoot) require_error.throwError(COMPONENT_NAME, "usage: <el-tabs><el-tab-pane /></el-tabs/>");
		const ns = require_index.useNamespace("tab-pane");
		const paneRef = (0, vue.ref)();
		const index = (0, vue.ref)();
		const isClosable = (0, vue.computed)(() => props.closable ?? tabsRoot.props.closable);
		const active = (0, vue.computed)(() => tabsRoot.currentName.value === (props.name ?? index.value));
		const loaded = (0, vue.ref)(active.value);
		const paneName = (0, vue.computed)(() => props.name ?? index.value);
		const shouldBeRender = (0, vue.computed)(() => !props.lazy || loaded.value || active.value);
		const isFocusInsidePane = () => {
			return paneRef.value?.contains(document.activeElement);
		};
		(0, vue.watch)(active, (val) => {
			if (val) loaded.value = true;
		});
		const pane = (0, vue.reactive)({
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
		(0, vue.onBeforeUnmount)(() => {
			tabsRoot.unregisterPane(pane);
		});
		(0, vue.onBeforeUpdate)(() => {
			if (slots.label) tabsRoot.nav$.value?.scheduleRender();
		});
		return (_ctx, _cache) => {
			return shouldBeRender.value ? (0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				key: 0,
				id: `pane-${paneName.value}`,
				ref_key: "paneRef",
				ref: paneRef,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).b()),
				role: "tabpanel",
				"aria-hidden": !active.value,
				"aria-labelledby": `tab-${paneName.value}`
			}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 10, _hoisted_1)), [[vue.vShow, active.value]]) : (0, vue.createCommentVNode)("v-if", true);
		};
	}
});

//#endregion
exports.default = tab_pane_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=tab-pane.vue_vue_type_script_setup_true_lang.js.map