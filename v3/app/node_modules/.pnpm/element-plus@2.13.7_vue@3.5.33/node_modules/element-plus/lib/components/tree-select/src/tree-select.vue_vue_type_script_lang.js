const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_select = require('../../select/src/select.js');
const require_index = require('../../select/index.js');
const require_tree = require('../../tree/src/tree.js');
const require_index$1 = require('../../tree/index.js');
const require_select$1 = require('./select.js');
const require_tree$1 = require('./tree.js');
const require_cache_options = require('./cache-options.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");

//#region ../../packages/components/tree-select/src/tree-select.vue?vue&type=script&lang.ts
var tree_select_vue_vue_type_script_lang_default = (0, vue.defineComponent)({
	name: "ElTreeSelect",
	inheritAttrs: false,
	props: {
		...require_select.selectProps,
		...require_tree.treeProps,
		cacheData: {
			type: Array,
			default: () => []
		}
	},
	setup(props, context) {
		const { slots, expose, emit, attrs } = context;
		const childAttrs = {
			...attrs,
			onChange: void 0
		};
		const select = (0, vue.ref)();
		const tree = (0, vue.ref)();
		const key = (0, vue.computed)(() => props.nodeKey || props.valueKey || "value");
		const selectProps = require_select$1.useSelect(props, {
			attrs,
			emit
		}, {
			select,
			tree,
			key
		});
		const { cacheOptions, ...treeProps } = require_tree$1.useTree(props, {
			attrs: childAttrs,
			slots,
			emit
		}, {
			select,
			tree,
			key
		});
		const methods = (0, vue.reactive)({});
		expose(methods);
		(0, vue.onMounted)(() => {
			Object.assign(methods, {
				...(0, lodash_unified.pick)(tree.value, [
					"filter",
					"updateKeyChildren",
					"getCheckedNodes",
					"setCheckedNodes",
					"getCheckedKeys",
					"setCheckedKeys",
					"setChecked",
					"getHalfCheckedNodes",
					"getHalfCheckedKeys",
					"getCurrentKey",
					"getCurrentNode",
					"setCurrentKey",
					"setCurrentNode",
					"getNode",
					"remove",
					"append",
					"insertBefore",
					"insertAfter"
				]),
				...(0, lodash_unified.pick)(select.value, [
					"focus",
					"blur",
					"selectedLabel"
				]),
				treeRef: tree.value,
				selectRef: select.value
			});
		});
		return () => (0, vue.h)(
			require_index.ElSelect,
			/**
			* 1. The `props` is processed into `Refs`, but `v-bind` and
			* render function props cannot read `Refs`, so use `reactive`
			* unwrap the `Refs` and keep reactive.
			* 2. The keyword `ref` requires `Ref`, but `reactive` broke it,
			* so use function.
			*/
			(0, vue.reactive)({
				...selectProps,
				ref: (ref) => select.value = ref
			}),
			{
				...slots,
				default: () => [(0, vue.h)(require_cache_options.default, { data: cacheOptions.value }), (0, vue.h)(require_index$1.ElTree, (0, vue.reactive)({
					...treeProps,
					ref: (ref) => tree.value = ref
				}))]
			}
		);
	}
});

//#endregion
exports.default = tree_select_vue_vue_type_script_lang_default;
//# sourceMappingURL=tree-select.vue_vue_type_script_lang.js.map