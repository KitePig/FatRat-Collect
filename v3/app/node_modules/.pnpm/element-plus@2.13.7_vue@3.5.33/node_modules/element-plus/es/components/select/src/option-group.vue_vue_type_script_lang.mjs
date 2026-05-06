import { isArray } from "../../../utils/types.mjs";
import { ensureArray } from "../../../utils/arrays.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { selectGroupKey } from "./token.mjs";
import { useMutationObserver } from "@vueuse/core";
import { computed, defineComponent, getCurrentInstance, isVNode, onMounted, provide, reactive, ref, toRefs } from "vue";

//#region ../../packages/components/select/src/option-group.vue?vue&type=script&lang.ts
var option_group_vue_vue_type_script_lang_default = defineComponent({
	name: "ElOptionGroup",
	componentName: "ElOptionGroup",
	props: {
		label: String,
		disabled: Boolean
	},
	setup(props) {
		const ns = useNamespace("select");
		const groupRef = ref();
		const instance = getCurrentInstance();
		const children = ref([]);
		provide(selectGroupKey, reactive({ ...toRefs(props) }));
		const visible = computed(() => children.value.some((option) => option.visible === true));
		const isOption = (node) => node.type.name === "ElOption" && !!node.component?.proxy;
		const flattedChildren = (node) => {
			const nodes = ensureArray(node);
			const children = [];
			nodes.forEach((child) => {
				if (!isVNode(child)) return;
				if (isOption(child)) children.push(child.component.proxy);
				else if (isArray(child.children) && child.children.length) children.push(...flattedChildren(child.children));
				else if (child.component?.subTree) children.push(...flattedChildren(child.component.subTree));
			});
			return children;
		};
		const updateChildren = () => {
			children.value = flattedChildren(instance.subTree);
		};
		onMounted(() => {
			updateChildren();
		});
		useMutationObserver(groupRef, updateChildren, {
			attributes: true,
			subtree: true,
			childList: true
		});
		return {
			groupRef,
			visible,
			ns
		};
	}
});

//#endregion
export { option_group_vue_vue_type_script_lang_default as default };
//# sourceMappingURL=option-group.vue_vue_type_script_lang.mjs.map