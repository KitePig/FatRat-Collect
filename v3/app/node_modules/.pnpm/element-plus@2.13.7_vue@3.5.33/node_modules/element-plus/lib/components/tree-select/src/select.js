Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../constants/event.js');
const require_event$1 = require('../../../utils/dom/event.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../select/index.js');
let _vueuse_core = require("@vueuse/core");
let lodash_unified = require("lodash-unified");
let vue = require("vue");

//#region ../../packages/components/tree-select/src/select.ts
const useSelect = (props, { attrs, emit }, { select, tree, key }) => {
	const ns = require_index.useNamespace("tree-select");
	(0, vue.watch)(() => props.data, () => {
		if (props.filterable) (0, vue.nextTick)(() => {
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
	(0, vue.onMounted)(() => {
		(0, _vueuse_core.useEventListener)(() => select.value?.$el, "keydown", async (evt) => {
			const code = require_event$1.getEventCode(evt);
			const { dropdownMenuVisible } = select.value;
			if ([require_aria.EVENT_CODE.down, require_aria.EVENT_CODE.up].includes(code) && dropdownMenuVisible) {
				await (0, vue.nextTick)();
				setTimeout(() => {
					if (require_aria.EVENT_CODE.up === code) {
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
		...(0, lodash_unified.pick)((0, vue.toRefs)(props), Object.keys(require_index$1.ElSelect.props)),
		...attrs,
		class: (0, vue.computed)(() => attrs.class),
		style: (0, vue.computed)(() => attrs.style),
		"onUpdate:modelValue": (value) => emit(require_event.UPDATE_MODEL_EVENT, value),
		valueKey: key,
		popperClass: (0, vue.computed)(() => {
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
exports.useSelect = useSelect;
//# sourceMappingURL=select.js.map