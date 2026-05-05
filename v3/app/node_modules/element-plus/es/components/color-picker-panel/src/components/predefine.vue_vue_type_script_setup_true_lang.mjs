import { useLocale } from "../../../../hooks/use-locale/index.mjs";
import { predefineProps } from "../props/predefine.mjs";
import { usePredefine, usePredefineDOM } from "../composables/use-predefine.mjs";
import { Fragment, createElementBlock, createElementVNode, defineComponent, normalizeClass, normalizeStyle, openBlock, renderList, unref } from "vue";

//#region ../../packages/components/color-picker-panel/src/components/predefine.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"disabled",
	"aria-label",
	"onClick"
];
var predefine_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElColorPredefine",
	__name: "predefine",
	props: predefineProps,
	setup(__props) {
		const props = __props;
		const { rgbaColors, handleSelect } = usePredefine(props);
		const { rootKls, colorsKls, colorSelectorKls } = usePredefineDOM(props);
		const { t } = useLocale();
		const ariaLabel = (value) => {
			return t("el.colorpicker.predefineDescription", { value });
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(rootKls)) }, [createElementVNode("div", { class: normalizeClass(unref(colorsKls)) }, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(rgbaColors), (item, index) => {
				return openBlock(), createElementBlock("button", {
					key: __props.colors[index],
					type: "button",
					disabled: __props.disabled,
					"aria-label": ariaLabel(item.value),
					class: normalizeClass(unref(colorSelectorKls)(item)),
					onClick: ($event) => unref(handleSelect)(index)
				}, [createElementVNode("div", { style: normalizeStyle({ backgroundColor: item.value }) }, null, 4)], 10, _hoisted_1);
			}), 128))], 2)], 2);
		};
	}
});

//#endregion
export { predefine_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=predefine.vue_vue_type_script_setup_true_lang.mjs.map