import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { buttonEmits, buttonProps } from "./button.mjs";
import { useButton } from "./use-button.mjs";
import { useButtonCustomStyle } from "./button-custom.mjs";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, defineComponent, mergeProps, normalizeClass, openBlock, renderSlot, resolveDynamicComponent, unref, withCtx } from "vue";

//#region ../../packages/components/button/src/button.vue?vue&type=script&setup=true&lang.ts
var button_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElButton",
	__name: "button",
	props: buttonProps,
	emits: buttonEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const buttonStyle = useButtonCustomStyle(props);
		const ns = useNamespace("button");
		const { _ref, _size, _type, _disabled, _props, _plain, _round, _text, _dashed, shouldAddSpace, handleClick } = useButton(props, emit);
		const buttonKls = computed(() => [
			ns.b(),
			ns.m(_type.value),
			ns.m(_size.value),
			ns.is("disabled", _disabled.value),
			ns.is("loading", props.loading),
			ns.is("plain", _plain.value),
			ns.is("round", _round.value),
			ns.is("circle", props.circle),
			ns.is("text", _text.value),
			ns.is("dashed", _dashed.value),
			ns.is("link", props.link),
			ns.is("has-bg", props.bg)
		]);
		__expose({
			ref: _ref,
			size: _size,
			type: _type,
			disabled: _disabled,
			shouldAddSpace
		});
		return (_ctx, _cache) => {
			return openBlock(), createBlock(resolveDynamicComponent(__props.tag), mergeProps({
				ref_key: "_ref",
				ref: _ref
			}, unref(_props), {
				class: buttonKls.value,
				style: unref(buttonStyle),
				onClick: unref(handleClick)
			}), {
				default: withCtx(() => [__props.loading ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [_ctx.$slots.loading ? renderSlot(_ctx.$slots, "loading", { key: 0 }) : (openBlock(), createBlock(unref(ElIcon), {
					key: 1,
					class: normalizeClass(unref(ns).is("loading"))
				}, {
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.loadingIcon)))]),
					_: 1
				}, 8, ["class"]))], 64)) : __props.icon || _ctx.$slots.icon ? (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
					default: withCtx(() => [__props.icon ? (openBlock(), createBlock(resolveDynamicComponent(__props.icon), { key: 0 })) : renderSlot(_ctx.$slots, "icon", { key: 1 })]),
					_: 3
				})) : createCommentVNode("v-if", true), _ctx.$slots.default ? (openBlock(), createElementBlock("span", {
					key: 2,
					class: normalizeClass({ [unref(ns).em("text", "expand")]: unref(shouldAddSpace) })
				}, [renderSlot(_ctx.$slots, "default")], 2)) : createCommentVNode("v-if", true)]),
				_: 3
			}, 16, [
				"class",
				"style",
				"onClick"
			]);
		};
	}
});

//#endregion
export { button_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=button.vue_vue_type_script_setup_true_lang.mjs.map