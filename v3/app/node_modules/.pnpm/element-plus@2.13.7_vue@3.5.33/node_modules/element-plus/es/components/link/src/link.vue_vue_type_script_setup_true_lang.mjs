import { isBoolean } from "../../../utils/types.mjs";
import { useDeprecated } from "../../../hooks/use-deprecated/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { useGlobalConfig } from "../../config-provider/src/hooks/use-global-config.mjs";
import { linkEmits, linkProps } from "./link.mjs";
import { computed, createBlock, createCommentVNode, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot, resolveDynamicComponent, unref, withCtx } from "vue";

//#region ../../packages/components/link/src/link.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["href", "target"];
var link_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElLink",
	__name: "link",
	props: linkProps,
	emits: linkEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const globalConfig = useGlobalConfig("link");
		useDeprecated({
			scope: "el-link",
			from: "The underline option (boolean)",
			replacement: "'always' | 'hover' | 'never'",
			version: "3.0.0",
			ref: "https://element-plus.org/en-US/component/link.html#underline"
		}, computed(() => isBoolean(props.underline)));
		const ns = useNamespace("link");
		const linkKls = computed(() => [
			ns.b(),
			ns.m(props.type ?? globalConfig.value?.type ?? "default"),
			ns.is("disabled", props.disabled),
			ns.is("underline", underline.value === "always"),
			ns.is("hover-underline", underline.value === "hover" && !props.disabled)
		]);
		const underline = computed(() => {
			if (isBoolean(props.underline)) return props.underline ? "hover" : "never";
			else return props.underline ?? globalConfig.value?.underline ?? "hover";
		});
		function handleClick(event) {
			if (!props.disabled) emit("click", event);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("a", {
				class: normalizeClass(linkKls.value),
				href: __props.disabled || !__props.href ? void 0 : __props.href,
				target: __props.disabled || !__props.href ? void 0 : __props.target,
				onClick: handleClick
			}, [
				__props.icon ? (openBlock(), createBlock(unref(ElIcon), { key: 0 }, {
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.icon)))]),
					_: 1
				})) : createCommentVNode("v-if", true),
				_ctx.$slots.default ? (openBlock(), createElementBlock("span", {
					key: 1,
					class: normalizeClass(unref(ns).e("inner"))
				}, [renderSlot(_ctx.$slots, "default")], 2)) : createCommentVNode("v-if", true),
				_ctx.$slots.icon ? renderSlot(_ctx.$slots, "icon", { key: 2 }) : createCommentVNode("v-if", true)
			], 10, _hoisted_1);
		};
	}
});

//#endregion
export { link_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=link.vue_vue_type_script_setup_true_lang.mjs.map