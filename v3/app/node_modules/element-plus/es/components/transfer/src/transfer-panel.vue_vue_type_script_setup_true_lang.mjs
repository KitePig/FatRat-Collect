import { isEmpty } from "../../../utils/types.mjs";
import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElInput } from "../../input/index.mjs";
import { ElCheckbox, ElCheckboxGroup } from "../../checkbox/index.mjs";
import { transferPanelEmits, transferPanelProps } from "./transfer-panel.mjs";
import { usePropsAlias } from "./composables/use-props-alias.mjs";
import { useCheck } from "./composables/use-check.mjs";
import { Search } from "@element-plus/icons-vue";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, isRef, normalizeClass, openBlock, reactive, renderList, renderSlot, toDisplayString, toRefs, unref, useSlots, vShow, withCtx, withDirectives } from "vue";

//#region ../../packages/components/transfer/src/transfer-panel.vue?vue&type=script&setup=true&lang.ts
var transfer_panel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElTransferPanel",
	__name: "transfer-panel",
	props: transferPanelProps,
	emits: transferPanelEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const slots = useSlots();
		const OptionContent = ({ option }) => option;
		const { t } = useLocale();
		const ns = useNamespace("transfer");
		const panelState = reactive({
			checked: [],
			allChecked: false,
			query: "",
			checkChangeByUser: true
		});
		const propsAlias = usePropsAlias(props);
		const { filteredData, checkedSummary, isIndeterminate, handleAllCheckedChange } = useCheck(props, panelState, emit);
		const hasNoMatch = computed(() => !isEmpty(panelState.query) && isEmpty(filteredData.value));
		const hasFooter = computed(() => !isEmpty(slots.default()[0].children));
		const { checked, allChecked, query } = toRefs(panelState);
		__expose({ query });
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(ns).b("panel")) }, [
				createElementVNode("p", { class: normalizeClass(unref(ns).be("panel", "header")) }, [createVNode(unref(ElCheckbox), {
					modelValue: unref(allChecked),
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(allChecked) ? allChecked.value = $event : null),
					indeterminate: unref(isIndeterminate),
					"validate-event": false,
					onChange: unref(handleAllCheckedChange)
				}, {
					default: withCtx(() => [createElementVNode("span", { class: normalizeClass(unref(ns).be("panel", "header-title")) }, toDisplayString(__props.title), 3), createElementVNode("span", { class: normalizeClass(unref(ns).be("panel", "header-count")) }, toDisplayString(unref(checkedSummary)), 3)]),
					_: 1
				}, 8, [
					"modelValue",
					"indeterminate",
					"onChange"
				])], 2),
				createElementVNode("div", { class: normalizeClass([unref(ns).be("panel", "body"), unref(ns).is("with-footer", hasFooter.value)]) }, [
					__props.filterable ? (openBlock(), createBlock(unref(ElInput), {
						key: 0,
						modelValue: unref(query),
						"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(query) ? query.value = $event : null),
						class: normalizeClass(unref(ns).be("panel", "filter")),
						size: "default",
						placeholder: __props.placeholder,
						"prefix-icon": unref(Search),
						clearable: "",
						"validate-event": false
					}, null, 8, [
						"modelValue",
						"class",
						"placeholder",
						"prefix-icon"
					])) : createCommentVNode("v-if", true),
					withDirectives(createVNode(unref(ElCheckboxGroup), {
						modelValue: unref(checked),
						"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => isRef(checked) ? checked.value = $event : null),
						"validate-event": false,
						class: normalizeClass([unref(ns).is("filterable", __props.filterable), unref(ns).be("panel", "list")])
					}, {
						default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(filteredData), (item) => {
							return openBlock(), createBlock(unref(ElCheckbox), {
								key: item[unref(propsAlias).key],
								class: normalizeClass(unref(ns).be("panel", "item")),
								value: item[unref(propsAlias).key],
								disabled: item[unref(propsAlias).disabled],
								"validate-event": false
							}, {
								default: withCtx(() => [createVNode(OptionContent, { option: __props.optionRender?.(item) }, null, 8, ["option"])]),
								_: 2
							}, 1032, [
								"class",
								"value",
								"disabled"
							]);
						}), 128))]),
						_: 1
					}, 8, ["modelValue", "class"]), [[vShow, !hasNoMatch.value && !unref(isEmpty)(__props.data)]]),
					withDirectives(createElementVNode("div", { class: normalizeClass(unref(ns).be("panel", "empty")) }, [renderSlot(_ctx.$slots, "empty", {}, () => [createTextVNode(toDisplayString(hasNoMatch.value ? unref(t)("el.transfer.noMatch") : unref(t)("el.transfer.noData")), 1)])], 2), [[vShow, hasNoMatch.value || unref(isEmpty)(__props.data)]])
				], 2),
				hasFooter.value ? (openBlock(), createElementBlock("p", {
					key: 0,
					class: normalizeClass(unref(ns).be("panel", "footer"))
				}, [renderSlot(_ctx.$slots, "default")], 2)) : createCommentVNode("v-if", true)
			], 2);
		};
	}
});

//#endregion
export { transfer_panel_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=transfer-panel.vue_vue_type_script_setup_true_lang.mjs.map