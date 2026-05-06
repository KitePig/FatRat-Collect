import { addUnit } from "../../../utils/dom/style.mjs";
import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { emptyProps } from "./empty.mjs";
import img_empty_default from "./img-empty.mjs";
import { computed, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, normalizeClass, normalizeStyle, openBlock, renderSlot, toDisplayString, unref } from "vue";

//#region ../../packages/components/empty/src/empty.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["src"];
const _hoisted_2 = { key: 1 };
var empty_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElEmpty",
	__name: "empty",
	props: emptyProps,
	setup(__props) {
		const props = __props;
		const { t } = useLocale();
		const ns = useNamespace("empty");
		const emptyDescription = computed(() => props.description || t("el.table.emptyText"));
		const imageStyle = computed(() => ({ width: addUnit(props.imageSize) }));
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(ns).b()) }, [
				createElementVNode("div", {
					class: normalizeClass(unref(ns).e("image")),
					style: normalizeStyle(imageStyle.value)
				}, [__props.image ? (openBlock(), createElementBlock("img", {
					key: 0,
					src: __props.image,
					ondragstart: "return false"
				}, null, 8, _hoisted_1)) : renderSlot(_ctx.$slots, "image", { key: 1 }, () => [createVNode(img_empty_default)])], 6),
				createElementVNode("div", { class: normalizeClass(unref(ns).e("description")) }, [_ctx.$slots.description ? renderSlot(_ctx.$slots, "description", { key: 0 }) : (openBlock(), createElementBlock("p", _hoisted_2, toDisplayString(emptyDescription.value), 1))], 2),
				_ctx.$slots.default ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: normalizeClass(unref(ns).e("bottom"))
				}, [renderSlot(_ctx.$slots, "default")], 2)) : createCommentVNode("v-if", true)
			], 2);
		};
	}
});

//#endregion
export { empty_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=empty.vue_vue_type_script_setup_true_lang.mjs.map