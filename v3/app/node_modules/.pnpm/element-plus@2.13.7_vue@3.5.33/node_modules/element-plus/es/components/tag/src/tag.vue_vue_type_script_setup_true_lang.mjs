import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { useFormSize } from "../../form/src/hooks/use-form-common-props.mjs";
import { tagEmits, tagProps } from "./tag.mjs";
import { Close } from "@element-plus/icons-vue";
import { Transition, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, normalizeClass, normalizeStyle, openBlock, renderSlot, unref, withCtx, withModifiers } from "vue";

//#region ../../packages/components/tag/src/tag.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["aria-label"];
const _hoisted_2 = ["aria-label"];
var tag_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElTag",
	__name: "tag",
	props: tagProps,
	emits: tagEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const tagSize = useFormSize();
		const { t } = useLocale();
		const ns = useNamespace("tag");
		const containerKls = computed(() => {
			const { type, hit, effect, closable, round } = props;
			return [
				ns.b(),
				ns.is("closable", closable),
				ns.m(type || "primary"),
				ns.m(tagSize.value),
				ns.m(effect),
				ns.is("hit", hit),
				ns.is("round", round)
			];
		});
		const handleClose = (event) => {
			emit("close", event);
		};
		const handleClick = (event) => {
			emit("click", event);
		};
		const handleVNodeMounted = (vnode) => {
			if (vnode?.component?.subTree?.component?.bum) vnode.component.subTree.component.bum = null;
		};
		return (_ctx, _cache) => {
			return __props.disableTransitions ? (openBlock(), createElementBlock("span", {
				key: 0,
				class: normalizeClass(containerKls.value),
				style: normalizeStyle({ backgroundColor: __props.color }),
				onClick: handleClick
			}, [createElementVNode("span", { class: normalizeClass(unref(ns).e("content")) }, [renderSlot(_ctx.$slots, "default")], 2), __props.closable ? (openBlock(), createElementBlock("button", {
				key: 0,
				"aria-label": unref(t)("el.tag.close"),
				class: normalizeClass(unref(ns).e("close")),
				type: "button",
				onClick: withModifiers(handleClose, ["stop"])
			}, [createVNode(unref(ElIcon), null, {
				default: withCtx(() => [createVNode(unref(Close))]),
				_: 1
			})], 10, _hoisted_1)) : createCommentVNode("v-if", true)], 6)) : (openBlock(), createBlock(Transition, {
				key: 1,
				name: `${unref(ns).namespace.value}-zoom-in-center`,
				appear: "",
				onVnodeMounted: handleVNodeMounted
			}, {
				default: withCtx(() => [createElementVNode("span", {
					class: normalizeClass(containerKls.value),
					style: normalizeStyle({ backgroundColor: __props.color }),
					onClick: handleClick
				}, [createElementVNode("span", { class: normalizeClass(unref(ns).e("content")) }, [renderSlot(_ctx.$slots, "default")], 2), __props.closable ? (openBlock(), createElementBlock("button", {
					key: 0,
					"aria-label": unref(t)("el.tag.close"),
					class: normalizeClass(unref(ns).e("close")),
					type: "button",
					onClick: withModifiers(handleClose, ["stop"])
				}, [createVNode(unref(ElIcon), null, {
					default: withCtx(() => [createVNode(unref(Close))]),
					_: 1
				})], 10, _hoisted_2)) : createCommentVNode("v-if", true)], 6)]),
				_: 3
			}, 8, ["name"]));
		};
	}
});

//#endregion
export { tag_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=tag.vue_vue_type_script_setup_true_lang.mjs.map