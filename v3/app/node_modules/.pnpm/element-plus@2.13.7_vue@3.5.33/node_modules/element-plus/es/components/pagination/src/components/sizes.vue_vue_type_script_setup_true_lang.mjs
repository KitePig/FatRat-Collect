import { isArray } from "../../../../utils/types.mjs";
import { useLocale } from "../../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { ElOption, ElSelect } from "../../../select/index.mjs";
import { usePagination } from "../usePagination.mjs";
import { paginationSizesProps } from "./sizes.mjs";
import { isEqual } from "lodash-unified";
import { Fragment, computed, createBlock, createElementBlock, createVNode, defineComponent, normalizeClass, openBlock, ref, renderList, unref, watch, withCtx } from "vue";

//#region ../../packages/components/pagination/src/components/sizes.vue?vue&type=script&setup=true&lang.ts
var sizes_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElPaginationSizes",
	__name: "sizes",
	props: paginationSizesProps,
	emits: ["page-size-change"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { t } = useLocale();
		const ns = useNamespace("pagination");
		const pagination = usePagination();
		const innerPageSize = ref(props.pageSize);
		watch(() => props.pageSizes, (newVal, oldVal) => {
			if (isEqual(newVal, oldVal)) return;
			if (isArray(newVal)) emit("page-size-change", newVal.includes(props.pageSize) ? props.pageSize : props.pageSizes[0]);
		});
		watch(() => props.pageSize, (newVal) => {
			innerPageSize.value = newVal;
		});
		const innerPageSizes = computed(() => props.pageSizes);
		function handleChange(val) {
			if (val !== innerPageSize.value) {
				innerPageSize.value = val;
				pagination.handleSizeChange?.(Number(val));
			}
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", { class: normalizeClass(unref(ns).e("sizes")) }, [createVNode(unref(ElSelect), {
				"model-value": innerPageSize.value,
				disabled: _ctx.disabled,
				"popper-class": _ctx.popperClass,
				"popper-style": _ctx.popperStyle,
				size: _ctx.size,
				teleported: _ctx.teleported,
				"validate-event": false,
				"append-to": _ctx.appendSizeTo,
				onChange: handleChange
			}, {
				default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(innerPageSizes.value, (item) => {
					return openBlock(), createBlock(unref(ElOption), {
						key: item,
						value: item,
						label: item + unref(t)("el.pagination.pagesize")
					}, null, 8, ["value", "label"]);
				}), 128))]),
				_: 1
			}, 8, [
				"model-value",
				"disabled",
				"popper-class",
				"popper-style",
				"size",
				"teleported",
				"append-to"
			])], 2);
		};
	}
});

//#endregion
export { sizes_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=sizes.vue_vue_type_script_setup_true_lang.mjs.map