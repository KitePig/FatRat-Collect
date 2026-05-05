import { selectProps } from "../../select/src/select.mjs";
import { ElSelect } from "../../select/index.mjs";
import { treeProps } from "../../tree/src/tree.mjs";
import { ElTree } from "../../tree/index.mjs";
import { useSelect } from "./select.mjs";
import { useTree } from "./tree.mjs";
import cache_options_default from "./cache-options.mjs";
import { pick } from "lodash-unified";
import { computed, defineComponent, h, onMounted, reactive, ref } from "vue";

//#region ../../packages/components/tree-select/src/tree-select.vue?vue&type=script&lang.ts
var tree_select_vue_vue_type_script_lang_default = defineComponent({
	name: "ElTreeSelect",
	inheritAttrs: false,
	props: {
		...selectProps,
		...treeProps,
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
		const select = ref();
		const tree = ref();
		const key = computed(() => props.nodeKey || props.valueKey || "value");
		const selectProps = useSelect(props, {
			attrs,
			emit
		}, {
			select,
			tree,
			key
		});
		const { cacheOptions, ...treeProps } = useTree(props, {
			attrs: childAttrs,
			slots,
			emit
		}, {
			select,
			tree,
			key
		});
		const methods = reactive({});
		expose(methods);
		onMounted(() => {
			Object.assign(methods, {
				...pick(tree.value, [
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
				...pick(select.value, [
					"focus",
					"blur",
					"selectedLabel"
				]),
				treeRef: tree.value,
				selectRef: select.value
			});
		});
		return () => h(
			ElSelect,
			/**
			* 1. The `props` is processed into `Refs`, but `v-bind` and
			* render function props cannot read `Refs`, so use `reactive`
			* unwrap the `Refs` and keep reactive.
			* 2. The keyword `ref` requires `Ref`, but `reactive` broke it,
			* so use function.
			*/
			reactive({
				...selectProps,
				ref: (ref) => select.value = ref
			}),
			{
				...slots,
				default: () => [h(cache_options_default, { data: cacheOptions.value }), h(ElTree, reactive({
					...treeProps,
					ref: (ref) => tree.value = ref
				}))]
			}
		);
	}
});

//#endregion
export { tree_select_vue_vue_type_script_lang_default as default };
//# sourceMappingURL=tree-select.vue_vue_type_script_lang.mjs.map