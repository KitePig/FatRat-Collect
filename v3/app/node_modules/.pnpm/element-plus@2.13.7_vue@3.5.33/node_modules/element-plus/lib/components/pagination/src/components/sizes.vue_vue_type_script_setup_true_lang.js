const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../../select/index.js');
const require_usePagination = require('../usePagination.js');
const require_sizes = require('./sizes.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/pagination/src/components/sizes.vue?vue&type=script&setup=true&lang.ts
var sizes_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElPaginationSizes",
	__name: "sizes",
	props: require_sizes.paginationSizesProps,
	emits: ["page-size-change"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { t } = require_index.useLocale();
		const ns = require_index$1.useNamespace("pagination");
		const pagination = require_usePagination.usePagination();
		const innerPageSize = (0, vue.ref)(props.pageSize);
		(0, vue.watch)(() => props.pageSizes, (newVal, oldVal) => {
			if ((0, lodash_unified.isEqual)(newVal, oldVal)) return;
			if ((0, _vue_shared.isArray)(newVal)) emit("page-size-change", newVal.includes(props.pageSize) ? props.pageSize : props.pageSizes[0]);
		});
		(0, vue.watch)(() => props.pageSize, (newVal) => {
			innerPageSize.value = newVal;
		});
		const innerPageSizes = (0, vue.computed)(() => props.pageSizes);
		function handleChange(val) {
			if (val !== innerPageSize.value) {
				innerPageSize.value = val;
				pagination.handleSizeChange?.(Number(val));
			}
		}
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("sizes")) }, [(0, vue.createVNode)((0, vue.unref)(require_index$2.ElSelect), {
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
				default: (0, vue.withCtx)(() => [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(innerPageSizes.value, (item) => {
					return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$2.ElOption), {
						key: item,
						value: item,
						label: item + (0, vue.unref)(t)("el.pagination.pagesize")
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
exports.default = sizes_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=sizes.vue_vue_type_script_setup_true_lang.js.map