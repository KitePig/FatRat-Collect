import { ElIcon } from "../../icon/index.mjs";
import { collapseItemProps } from "./collapse-item.mjs";
import { ElCollapseTransition } from "../../collapse-transition/index.mjs";
import { useCollapseItem, useCollapseItemDOM } from "./use-collapse-item.mjs";
import { createBlock, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, normalizeClass, openBlock, renderSlot, resolveDynamicComponent, toDisplayString, unref, vShow, withCtx, withDirectives, withKeys, withModifiers } from "vue";

//#region ../../packages/components/collapse/src/collapse-item.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"id",
	"aria-expanded",
	"aria-controls",
	"aria-describedby",
	"tabindex",
	"aria-disabled"
];
const _hoisted_2 = [
	"id",
	"aria-hidden",
	"aria-labelledby"
];
var collapse_item_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElCollapseItem",
	__name: "collapse-item",
	props: collapseItemProps,
	setup(__props, { expose: __expose }) {
		const props = __props;
		const { focusing, id, isActive, handleFocus, handleHeaderClick, handleEnterClick } = useCollapseItem(props);
		const { arrowKls, headKls, rootKls, itemTitleKls, itemWrapperKls, itemContentKls, scopedContentId, scopedHeadId } = useCollapseItemDOM(props, {
			focusing,
			isActive,
			id
		});
		__expose({ isActive });
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(rootKls)) }, [createElementVNode("div", {
				id: unref(scopedHeadId),
				class: normalizeClass(unref(headKls)),
				"aria-expanded": unref(isActive),
				"aria-controls": unref(scopedContentId),
				"aria-describedby": unref(scopedContentId),
				tabindex: __props.disabled ? void 0 : 0,
				"aria-disabled": __props.disabled,
				role: "button",
				onClick: _cache[0] || (_cache[0] = (...args) => unref(handleHeaderClick) && unref(handleHeaderClick)(...args)),
				onKeydown: _cache[1] || (_cache[1] = withKeys(withModifiers((...args) => unref(handleEnterClick) && unref(handleEnterClick)(...args), ["stop"]), ["space", "enter"])),
				onFocus: _cache[2] || (_cache[2] = (...args) => unref(handleFocus) && unref(handleFocus)(...args)),
				onBlur: _cache[3] || (_cache[3] = ($event) => focusing.value = false)
			}, [createElementVNode("span", { class: normalizeClass(unref(itemTitleKls)) }, [renderSlot(_ctx.$slots, "title", { isActive: unref(isActive) }, () => [createTextVNode(toDisplayString(__props.title), 1)])], 2), renderSlot(_ctx.$slots, "icon", { isActive: unref(isActive) }, () => [createVNode(unref(ElIcon), { class: normalizeClass(unref(arrowKls)) }, {
				default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.icon)))]),
				_: 1
			}, 8, ["class"])])], 42, _hoisted_1), createVNode(unref(ElCollapseTransition), null, {
				default: withCtx(() => [withDirectives(createElementVNode("div", {
					id: unref(scopedContentId),
					role: "region",
					class: normalizeClass(unref(itemWrapperKls)),
					"aria-hidden": !unref(isActive),
					"aria-labelledby": unref(scopedHeadId)
				}, [createElementVNode("div", { class: normalizeClass(unref(itemContentKls)) }, [renderSlot(_ctx.$slots, "default")], 2)], 10, _hoisted_2), [[vShow, unref(isActive)]])]),
				_: 3
			})], 2);
		};
	}
});

//#endregion
export { collapse_item_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=collapse-item.vue_vue_type_script_setup_true_lang.mjs.map