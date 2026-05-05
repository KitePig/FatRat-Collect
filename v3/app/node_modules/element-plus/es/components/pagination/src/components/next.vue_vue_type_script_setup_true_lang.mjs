import { useLocale } from "../../../../hooks/use-locale/index.mjs";
import { ElIcon } from "../../../icon/index.mjs";
import { paginationNextProps } from "./next.mjs";
import { computed, createBlock, createElementBlock, defineComponent, openBlock, resolveDynamicComponent, toDisplayString, unref, withCtx } from "vue";

//#region ../../packages/components/pagination/src/components/next.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"disabled",
	"aria-label",
	"aria-disabled"
];
const _hoisted_2 = { key: 0 };
var next_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElPaginationNext",
	__name: "next",
	props: paginationNextProps,
	emits: ["click"],
	setup(__props) {
		const props = __props;
		const { t } = useLocale();
		const internalDisabled = computed(() => props.disabled || props.currentPage === props.pageCount || props.pageCount === 0);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("button", {
				type: "button",
				class: "btn-next",
				disabled: internalDisabled.value,
				"aria-label": _ctx.nextText || unref(t)("el.pagination.next"),
				"aria-disabled": internalDisabled.value,
				onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
			}, [_ctx.nextText ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(_ctx.nextText), 1)) : (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
				default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(_ctx.nextIcon)))]),
				_: 1
			}))], 8, _hoisted_1);
		};
	}
});

//#endregion
export { next_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=next.vue_vue_type_script_setup_true_lang.mjs.map