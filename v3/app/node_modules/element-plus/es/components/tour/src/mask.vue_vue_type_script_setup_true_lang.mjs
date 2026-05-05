import { useLockscreen } from "../../../hooks/use-lockscreen/index.mjs";
import { maskProps } from "./mask.mjs";
import { tourKey } from "./helper.mjs";
import { useWindowSize } from "@vueuse/core";
import { computed, createCommentVNode, createElementBlock, createElementVNode, defineComponent, inject, mergeProps, normalizeClass, normalizeStyle, openBlock, toRef, unref } from "vue";

//#region ../../packages/components/tour/src/mask.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = { style: {
	width: "100%",
	height: "100%"
} };
const _hoisted_2 = ["d"];
var mask_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElTourMask",
	inheritAttrs: false,
	__name: "mask",
	props: maskProps,
	setup(__props) {
		const props = __props;
		const { ns } = inject(tourKey);
		const radius = computed(() => props.pos?.radius ?? 2);
		const roundInfo = computed(() => {
			const v = radius.value;
			const baseInfo = `a${v},${v} 0 0 1`;
			return {
				topRight: `${baseInfo} ${v},${v}`,
				bottomRight: `${baseInfo} ${-v},${v}`,
				bottomLeft: `${baseInfo} ${-v},${-v}`,
				topLeft: `${baseInfo} ${v},${-v}`
			};
		});
		const { width: windowWidth, height: windowHeight } = useWindowSize();
		const path = computed(() => {
			const width = windowWidth.value;
			const height = windowHeight.value;
			const info = roundInfo.value;
			const _path = `M${width},0 L0,0 L0,${height} L${width},${height} L${width},0 Z`;
			const _radius = radius.value;
			return props.pos ? `${_path} M${props.pos.left + _radius},${props.pos.top} h${props.pos.width - _radius * 2} ${info.topRight} v${props.pos.height - _radius * 2} ${info.bottomRight} h${-props.pos.width + _radius * 2} ${info.bottomLeft} v${-props.pos.height + _radius * 2} ${info.topLeft} z` : _path;
		});
		const maskStyle = computed(() => ({
			position: "fixed",
			left: 0,
			right: 0,
			top: 0,
			bottom: 0,
			zIndex: props.zIndex,
			pointerEvents: props.pos && props.targetAreaClickable ? "none" : "auto"
		}));
		const pathStyle = computed(() => ({
			fill: props.fill,
			pointerEvents: "auto",
			cursor: "auto"
		}));
		useLockscreen(toRef(props, "visible"), { ns });
		return (_ctx, _cache) => {
			return __props.visible ? (openBlock(), createElementBlock("div", mergeProps({
				key: 0,
				class: unref(ns).e("mask"),
				style: maskStyle.value
			}, _ctx.$attrs), [(openBlock(), createElementBlock("svg", _hoisted_1, [createElementVNode("path", {
				class: normalizeClass(unref(ns).e("hollow")),
				style: normalizeStyle(pathStyle.value),
				d: path.value
			}, null, 14, _hoisted_2)]))], 16)) : createCommentVNode("v-if", true);
		};
	}
});

//#endregion
export { mask_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=mask.vue_vue_type_script_setup_true_lang.mjs.map