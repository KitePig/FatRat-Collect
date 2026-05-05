import { isEmpty, isUndefined } from "../../../utils/types.mjs";
import { debugWarn } from "../../../utils/error.mjs";
import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { useFormItem } from "../../form/src/hooks/use-form-item.mjs";
import { ElButton } from "../../button/index.mjs";
import { transferEmits, transferProps } from "./transfer.mjs";
import { usePropsAlias } from "./composables/use-props-alias.mjs";
import { useCheckedChange } from "./composables/use-checked-change.mjs";
import { useComputedData } from "./composables/use-computed-data.mjs";
import { useMove } from "./composables/use-move.mjs";
import transfer_panel_default from "./transfer-panel2.mjs";
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import { Comment, computed, createCommentVNode, createElementBlock, createElementVNode, createVNode, defineComponent, h, normalizeClass, openBlock, reactive, ref, renderSlot, toDisplayString, unref, useSlots, watch, withCtx } from "vue";

//#region ../../packages/components/transfer/src/transfer.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 0 };
var transfer_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElTransfer",
	__name: "transfer",
	props: transferProps,
	emits: transferEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const slots = useSlots();
		const { t } = useLocale();
		const ns = useNamespace("transfer");
		const { formItem } = useFormItem();
		const checkedState = reactive({
			leftChecked: [],
			rightChecked: []
		});
		const propsAlias = usePropsAlias(props);
		const { sourceData, targetData } = useComputedData(props);
		const { onSourceCheckedChange, onTargetCheckedChange } = useCheckedChange(checkedState, emit);
		const { addToLeft, addToRight } = useMove(props, checkedState, emit);
		const leftPanel = ref();
		const rightPanel = ref();
		const clearQuery = (which) => {
			switch (which) {
				case "left":
					leftPanel.value.query = "";
					break;
				case "right":
					rightPanel.value.query = "";
					break;
			}
		};
		const hasButtonTexts = computed(() => props.buttonTexts.length === 2);
		const leftPanelTitle = computed(() => props.titles[0] || t("el.transfer.titles.0"));
		const rightPanelTitle = computed(() => props.titles[1] || t("el.transfer.titles.1"));
		const panelFilterPlaceholder = computed(() => props.filterPlaceholder || t("el.transfer.filterPlaceholder"));
		watch(() => props.modelValue, () => {
			if (props.validateEvent) formItem?.validate?.("change").catch((err) => debugWarn(err));
		});
		const optionRender = computed(() => (option) => {
			if (props.renderContent) return props.renderContent(h, option);
			const defaultSlotVNodes = (slots.default?.({ option }) || []).filter((node) => node.type !== Comment);
			if (defaultSlotVNodes.length) return defaultSlotVNodes;
			return h("span", option[propsAlias.value.label] || option[propsAlias.value.key]);
		});
		__expose({
			clearQuery,
			leftPanel,
			rightPanel
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", { class: normalizeClass(unref(ns).b()) }, [
				createVNode(transfer_panel_default, {
					ref_key: "leftPanel",
					ref: leftPanel,
					data: unref(sourceData),
					"option-render": optionRender.value,
					placeholder: panelFilterPlaceholder.value,
					title: leftPanelTitle.value,
					filterable: __props.filterable,
					format: __props.format,
					"filter-method": __props.filterMethod,
					"default-checked": __props.leftDefaultChecked,
					props: props.props,
					onCheckedChange: unref(onSourceCheckedChange)
				}, {
					empty: withCtx(() => [renderSlot(_ctx.$slots, "left-empty")]),
					default: withCtx(() => [renderSlot(_ctx.$slots, "left-footer")]),
					_: 3
				}, 8, [
					"data",
					"option-render",
					"placeholder",
					"title",
					"filterable",
					"format",
					"filter-method",
					"default-checked",
					"props",
					"onCheckedChange"
				]),
				createElementVNode("div", { class: normalizeClass(unref(ns).e("buttons")) }, [createVNode(unref(ElButton), {
					type: "primary",
					class: normalizeClass([unref(ns).e("button"), unref(ns).is("with-texts", hasButtonTexts.value)]),
					disabled: unref(isEmpty)(checkedState.rightChecked),
					onClick: unref(addToLeft)
				}, {
					default: withCtx(() => [createVNode(unref(ElIcon), null, {
						default: withCtx(() => [createVNode(unref(ArrowLeft))]),
						_: 1
					}), !unref(isUndefined)(__props.buttonTexts[0]) ? (openBlock(), createElementBlock("span", _hoisted_1, toDisplayString(__props.buttonTexts[0]), 1)) : createCommentVNode("v-if", true)]),
					_: 1
				}, 8, [
					"class",
					"disabled",
					"onClick"
				]), createVNode(unref(ElButton), {
					type: "primary",
					class: normalizeClass([unref(ns).e("button"), unref(ns).is("with-texts", hasButtonTexts.value)]),
					disabled: unref(isEmpty)(checkedState.leftChecked),
					onClick: unref(addToRight)
				}, {
					default: withCtx(() => [!unref(isUndefined)(__props.buttonTexts[1]) ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(__props.buttonTexts[1]), 1)) : createCommentVNode("v-if", true), createVNode(unref(ElIcon), null, {
						default: withCtx(() => [createVNode(unref(ArrowRight))]),
						_: 1
					})]),
					_: 1
				}, 8, [
					"class",
					"disabled",
					"onClick"
				])], 2),
				createVNode(transfer_panel_default, {
					ref_key: "rightPanel",
					ref: rightPanel,
					data: unref(targetData),
					"option-render": optionRender.value,
					placeholder: panelFilterPlaceholder.value,
					filterable: __props.filterable,
					format: __props.format,
					"filter-method": __props.filterMethod,
					title: rightPanelTitle.value,
					"default-checked": __props.rightDefaultChecked,
					props: props.props,
					onCheckedChange: unref(onTargetCheckedChange)
				}, {
					empty: withCtx(() => [renderSlot(_ctx.$slots, "right-empty")]),
					default: withCtx(() => [renderSlot(_ctx.$slots, "right-footer")]),
					_: 3
				}, 8, [
					"data",
					"option-render",
					"placeholder",
					"filterable",
					"format",
					"filter-method",
					"title",
					"default-checked",
					"props",
					"onCheckedChange"
				])
			], 2);
		};
	}
});

//#endregion
export { transfer_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=transfer.vue_vue_type_script_setup_true_lang.mjs.map