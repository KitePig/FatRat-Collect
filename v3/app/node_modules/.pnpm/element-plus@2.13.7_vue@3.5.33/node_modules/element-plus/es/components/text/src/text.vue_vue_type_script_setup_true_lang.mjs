import { isUndefined } from "../../../utils/types.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useFormSize } from "../../form/src/hooks/use-form-common-props.mjs";
import { textProps } from "./text.mjs";
import { computed, createBlock, defineComponent, normalizeClass, normalizeStyle, onMounted, onUpdated, openBlock, ref, renderSlot, resolveDynamicComponent, useAttrs, withCtx } from "vue";

//#region ../../packages/components/text/src/text.vue?vue&type=script&setup=true&lang.ts
var text_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElText",
	__name: "text",
	props: textProps,
	setup(__props) {
		const props = __props;
		const textRef = ref();
		const textSize = useFormSize();
		const ns = useNamespace("text");
		const textKls = computed(() => [
			ns.b(),
			ns.m(props.type),
			ns.m(textSize.value),
			ns.is("truncated", props.truncated),
			ns.is("line-clamp", !isUndefined(props.lineClamp))
		]);
		const bindTitle = () => {
			if (useAttrs().title) return;
			let shouldAddTitle = false;
			const text = textRef.value?.textContent || "";
			if (props.truncated) {
				const width = textRef.value?.offsetWidth;
				const scrollWidth = textRef.value?.scrollWidth;
				if (width && scrollWidth && scrollWidth > width) shouldAddTitle = true;
			} else if (!isUndefined(props.lineClamp)) {
				const height = textRef.value?.offsetHeight;
				const scrollHeight = textRef.value?.scrollHeight;
				if (height && scrollHeight && scrollHeight > height) shouldAddTitle = true;
			}
			if (shouldAddTitle) textRef.value?.setAttribute("title", text);
			else textRef.value?.removeAttribute("title");
		};
		onMounted(bindTitle);
		onUpdated(bindTitle);
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(__props.tag), {
				ref_key: "textRef",
				ref: textRef,
				class: normalizeClass(textKls.value),
				style: normalizeStyle({ "-webkit-line-clamp": __props.lineClamp })
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
				_: 3
			}, 8, ["class", "style"]);
		};
	}
});

//#endregion
export { text_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=text.vue_vue_type_script_setup_true_lang.mjs.map