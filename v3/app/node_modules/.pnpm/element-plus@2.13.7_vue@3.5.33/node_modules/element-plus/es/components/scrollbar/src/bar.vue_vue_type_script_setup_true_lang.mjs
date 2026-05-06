import { barProps } from "./bar.mjs";
import { GAP } from "./util.mjs";
import { scrollbarContextKey } from "./constants.mjs";
import thumb_default from "./thumb2.mjs";
import { Fragment, createElementBlock, createVNode, defineComponent, inject, openBlock, ref } from "vue";

//#region ../../packages/components/scrollbar/src/bar.vue?vue&type=script&setup=true&lang.ts
var bar_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "bar",
	props: barProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const scrollbar = inject(scrollbarContextKey);
		const moveX = ref(0);
		const moveY = ref(0);
		const sizeWidth = ref("");
		const sizeHeight = ref("");
		const ratioY = ref(1);
		const ratioX = ref(1);
		const handleScroll = (wrap) => {
			if (wrap) {
				const offsetHeight = wrap.offsetHeight - GAP;
				const offsetWidth = wrap.offsetWidth - GAP;
				moveY.value = wrap.scrollTop * 100 / offsetHeight * ratioY.value;
				moveX.value = wrap.scrollLeft * 100 / offsetWidth * ratioX.value;
			}
		};
		const update = () => {
			const wrap = scrollbar?.wrapElement;
			if (!wrap) return;
			const offsetHeight = wrap.offsetHeight - GAP;
			const offsetWidth = wrap.offsetWidth - GAP;
			const originalHeight = offsetHeight ** 2 / wrap.scrollHeight;
			const originalWidth = offsetWidth ** 2 / wrap.scrollWidth;
			const height = Math.max(originalHeight, props.minSize);
			const width = Math.max(originalWidth, props.minSize);
			ratioY.value = originalHeight / (offsetHeight - originalHeight) / (height / (offsetHeight - height));
			ratioX.value = originalWidth / (offsetWidth - originalWidth) / (width / (offsetWidth - width));
			sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : "";
			sizeWidth.value = width + GAP < offsetWidth ? `${width}px` : "";
		};
		__expose({
			handleScroll,
			update
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock(Fragment, null, [createVNode(thumb_default, {
				move: moveX.value,
				ratio: ratioX.value,
				size: sizeWidth.value,
				always: __props.always
			}, null, 8, [
				"move",
				"ratio",
				"size",
				"always"
			]), createVNode(thumb_default, {
				move: moveY.value,
				ratio: ratioY.value,
				size: sizeHeight.value,
				vertical: "",
				always: __props.always
			}, null, 8, [
				"move",
				"ratio",
				"size",
				"always"
			])], 64);
		};
	}
});

//#endregion
export { bar_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=bar.vue_vue_type_script_setup_true_lang.mjs.map