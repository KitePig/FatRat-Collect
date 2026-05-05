import focus_trap_default from "../../focus-trap/index.mjs";
import { tourContentEmits, tourContentProps } from "./content.mjs";
import { tourKey, useFloating } from "./helper.mjs";
import { computed, createCommentVNode, createElementBlock, createVNode, defineComponent, inject, normalizeClass, normalizeStyle, openBlock, ref, renderSlot, toRef, unref, watch, withCtx } from "vue";

//#region ../../packages/components/tour/src/content.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["data-side"];
var content_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElTourContent",
	__name: "content",
	props: tourContentProps,
	emits: tourContentEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const placement = ref(props.placement);
		const strategy = ref(props.strategy);
		const contentRef = ref(null);
		const arrowRef = ref(null);
		watch(() => props.placement, () => {
			placement.value = props.placement;
		});
		const { contentStyle, arrowStyle } = useFloating(toRef(props, "reference"), contentRef, arrowRef, placement, strategy, toRef(props, "offset"), toRef(props, "zIndex"), toRef(props, "showArrow"));
		const side = computed(() => {
			return placement.value.split("-")[0];
		});
		const { ns } = inject(tourKey);
		const onCloseRequested = () => {
			emit("close");
		};
		const onFocusoutPrevented = (event) => {
			if (event.detail.focusReason === "pointer") event.preventDefault();
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "contentRef",
				ref: contentRef,
				style: normalizeStyle(unref(contentStyle)),
				class: normalizeClass(unref(ns).e("content")),
				"data-side": side.value,
				tabindex: "-1"
			}, [createVNode(unref(focus_trap_default), {
				loop: "",
				trapped: "",
				"focus-start-el": "container",
				"focus-trap-el": contentRef.value || void 0,
				onReleaseRequested: onCloseRequested,
				onFocusoutPrevented
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["focus-trap-el"]), __props.showArrow ? (openBlock(), createElementBlock("span", {
				key: 0,
				ref_key: "arrowRef",
				ref: arrowRef,
				style: normalizeStyle(unref(arrowStyle)),
				class: normalizeClass(unref(ns).e("arrow"))
			}, null, 6)) : createCommentVNode("v-if", true)], 14, _hoisted_1);
		};
	}
});

//#endregion
export { content_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=content.vue_vue_type_script_setup_true_lang.mjs.map