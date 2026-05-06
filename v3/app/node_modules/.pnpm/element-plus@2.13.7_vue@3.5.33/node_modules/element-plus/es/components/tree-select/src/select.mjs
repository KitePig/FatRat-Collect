import { EVENT_CODE } from "../../../constants/aria.mjs";
import { UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { getEventCode } from "../../../utils/dom/event.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElSelect } from "../../select/index.mjs";
import { useEventListener } from "@vueuse/core";
import { pick } from "lodash-unified";
import { computed, nextTick, onMounted, toRefs, watch } from "vue";

//#region ../../packages/components/tree-select/src/select.ts
const useSelect = (props, { attrs, emit }, { select, tree, key }) => {
	const ns = useNamespace("tree-select");
	watch(() => props.data, () => {
		if (props.filterable) nextTick(() => {
			tree.value?.filter(select.value?.states.inputValue);
		});
	}, { flush: "post" });
	const focusLastNode = (listNode) => {
		const lastNode = listNode.at(-1);
		if (lastNode.expanded && lastNode.childNodes.at(-1)) focusLastNode([lastNode.childNodes.at(-1)]);
		else {
			(tree.value.el$?.querySelector(`[data-key="${listNode.at(-1).key}"]`))?.focus({ preventScroll: true });
			return;
		}
	};
	onMounted(() => {
		useEventListener(() => select.value?.$el, "keydown", async (evt) => {
			const code = getEventCode(evt);
			const { dropdownMenuVisible } = select.value;
			if ([EVENT_CODE.down, EVENT_CODE.up].includes(code) && dropdownMenuVisible) {
				await nextTick();
				setTimeout(() => {
					if (EVENT_CODE.up === code) {
						const listNode = tree.value.store.root.childNodes;
						focusLastNode(listNode);
						return;
					}
					select.value.optionsArray[select.value.states.hoveringIndex].$el?.parentNode?.parentNode?.focus({ preventScroll: true });
				});
			}
		}, { capture: true });
	});
	return {
		...pick(toRefs(props), Object.keys(ElSelect.props)),
		...attrs,
		class: computed(() => attrs.class),
		style: computed(() => attrs.style),
		"onUpdate:modelValue": (value) => emit(UPDATE_MODEL_EVENT, value),
		valueKey: key,
		popperClass: computed(() => {
			const classes = [ns.e("popper")];
			if (props.popperClass) classes.push(props.popperClass);
			return classes.join(" ");
		}),
		filterMethod: (keyword = "") => {
			if (props.filterMethod) props.filterMethod(keyword);
			else if (props.remoteMethod) props.remoteMethod(keyword);
			else tree.value?.filter(keyword);
		}
	};
};

//#endregion
export { useSelect };
//# sourceMappingURL=select.mjs.map