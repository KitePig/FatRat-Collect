import { TypeComponents, TypeComponentsMap } from "../../../utils/vue/icon.mjs";
import { flattedChildren, isComment } from "../../../utils/vue/vnode.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { alertEmits, alertProps } from "./alert.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { Fragment, Transition, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, normalizeClass, openBlock, ref, renderSlot, resolveDynamicComponent, toDisplayString, unref, useSlots, vShow, withCtx, withDirectives } from "vue";

//#region ../../packages/components/alert/src/alert.vue?vue&type=script&setup=true&lang.ts
var alert_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElAlert",
	__name: "alert",
	props: alertProps,
	emits: alertEmits,
	setup(__props, { emit: __emit }) {
		const { Close } = TypeComponents;
		const props = __props;
		const emit = __emit;
		const slots = useSlots();
		const ns = useNamespace("alert");
		const visible = ref(true);
		const iconComponent = computed(() => TypeComponentsMap[props.type]);
		const hasDesc = computed(() => {
			if (props.description) return true;
			const slotContent = slots.default?.();
			if (!slotContent) return false;
			return flattedChildren(slotContent).some((child) => !isComment(child));
		});
		const close = (evt) => {
			visible.value = false;
			emit("close", evt);
		};
		return (_ctx, _cache) => {
			return openBlock(), createBlock(Transition, {
				name: unref(ns).b("fade"),
				persisted: ""
			}, {
				default: withCtx(() => [withDirectives(createElementVNode("div", {
					class: normalizeClass([
						unref(ns).b(),
						unref(ns).m(__props.type),
						unref(ns).is("center", __props.center),
						unref(ns).is(__props.effect)
					]),
					role: "alert"
				}, [__props.showIcon && (_ctx.$slots.icon || iconComponent.value) ? (openBlock(), createBlock(unref(ElIcon), {
					key: 0,
					class: normalizeClass([unref(ns).e("icon"), unref(ns).is("big", hasDesc.value)])
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "icon", {}, () => [(openBlock(), createBlock(resolveDynamicComponent(iconComponent.value)))])]),
					_: 3
				}, 8, ["class"])) : createCommentVNode("v-if", true), createElementVNode("div", { class: normalizeClass(unref(ns).e("content")) }, [
					__props.title || _ctx.$slots.title ? (openBlock(), createElementBlock("span", {
						key: 0,
						class: normalizeClass([unref(ns).e("title"), { "with-description": hasDesc.value }])
					}, [renderSlot(_ctx.$slots, "title", {}, () => [createTextVNode(toDisplayString(__props.title), 1)])], 2)) : createCommentVNode("v-if", true),
					hasDesc.value ? (openBlock(), createElementBlock("p", {
						key: 1,
						class: normalizeClass(unref(ns).e("description"))
					}, [renderSlot(_ctx.$slots, "default", {}, () => [createTextVNode(toDisplayString(__props.description), 1)])], 2)) : createCommentVNode("v-if", true),
					__props.closable ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [__props.closeText ? (openBlock(), createElementBlock("div", {
						key: 0,
						class: normalizeClass([unref(ns).e("close-btn"), unref(ns).is("customed")]),
						onClick: close
					}, toDisplayString(__props.closeText), 3)) : (openBlock(), createBlock(unref(ElIcon), {
						key: 1,
						class: normalizeClass(unref(ns).e("close-btn")),
						onClick: close
					}, {
						default: withCtx(() => [createVNode(unref(Close))]),
						_: 1
					}, 8, ["class"]))], 64)) : createCommentVNode("v-if", true)
				], 2)], 2), [[vShow, visible.value]])]),
				_: 3
			}, 8, ["name"]);
		};
	}
});

//#endregion
export { alert_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=alert.vue_vue_type_script_setup_true_lang.mjs.map