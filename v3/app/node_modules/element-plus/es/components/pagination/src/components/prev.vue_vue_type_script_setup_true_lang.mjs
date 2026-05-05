import { useLocale } from "../../../../hooks/use-locale/index.mjs";
import { ElIcon } from "../../../icon/index.mjs";
import { paginationPrevEmits, paginationPrevProps } from "./prev.mjs";
import { computed, createBlock, createElementBlock, defineComponent, openBlock, resolveDynamicComponent, toDisplayString, unref, withCtx } from "vue";

//#region ../../packages/components/pagination/src/components/prev.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"disabled",
	"aria-label",
	"aria-disabled"
];
const _hoisted_2 = { key: 0 };
var prev_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElPaginationPrev",
	__name: "prev",
	props: paginationPrevProps,
	emits: paginationPrevEmits,
	setup(__props) {
		const props = __props;
		const { t } = useLocale();
		const internalDisabled = computed(() => props.disabled || props.currentPage <= 1);
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("button", {
				type: "button",
				class: "btn-prev",
				disabled: internalDisabled.value,
				"aria-label": _ctx.prevText || unref(t)("el.pagination.prev"),
				"aria-disabled": internalDisabled.value,
				onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click", $event))
			}, [_ctx.prevText ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(_ctx.prevText), 1)) : (openBlock(), createBlock(unref(ElIcon), { key: 1 }, {
				default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(_ctx.prevIcon)))]),
				_: 1
			}))], 8, _hoisted_1);
		};
	}
});

//#endregion
export { prev_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=prev.vue_vue_type_script_setup_true_lang.mjs.map