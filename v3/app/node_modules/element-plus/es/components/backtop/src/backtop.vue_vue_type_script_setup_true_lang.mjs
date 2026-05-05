import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { backtopEmits, backtopProps } from "./backtop.mjs";
import { useBackTop } from "./use-backtop.mjs";
import { CaretTop } from "@element-plus/icons-vue";
import { Transition, computed, createBlock, createCommentVNode, createElementBlock, createVNode, defineComponent, normalizeClass, normalizeStyle, openBlock, renderSlot, unref, withCtx, withModifiers } from "vue";

//#region ../../packages/components/backtop/src/backtop.vue?vue&type=script&setup=true&lang.ts
const COMPONENT_NAME = "ElBacktop";
var backtop_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: COMPONENT_NAME,
	__name: "backtop",
	props: backtopProps,
	emits: backtopEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = useNamespace("backtop");
		const { handleClick, visible } = useBackTop(props, emit, COMPONENT_NAME);
		const backTopStyle = computed(() => ({
			right: `${props.right}px`,
			bottom: `${props.bottom}px`
		}));
		return (_ctx, _cache) => {
			return openBlock(), createBlock(Transition, { name: `${unref(ns).namespace.value}-fade-in` }, {
				default: withCtx(() => [unref(visible) ? (openBlock(), createElementBlock("div", {
					key: 0,
					style: normalizeStyle(backTopStyle.value),
					class: normalizeClass(unref(ns).b()),
					onClick: _cache[0] || (_cache[0] = withModifiers((...args) => unref(handleClick) && unref(handleClick)(...args), ["stop"]))
				}, [renderSlot(_ctx.$slots, "default", {}, () => [createVNode(unref(ElIcon), { class: normalizeClass(unref(ns).e("icon")) }, {
					default: withCtx(() => [createVNode(unref(CaretTop))]),
					_: 1
				}, 8, ["class"])])], 6)) : createCommentVNode("v-if", true)]),
				_: 3
			}, 8, ["name"]);
		};
	}
});

//#endregion
export { backtop_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=backtop.vue_vue_type_script_setup_true_lang.mjs.map