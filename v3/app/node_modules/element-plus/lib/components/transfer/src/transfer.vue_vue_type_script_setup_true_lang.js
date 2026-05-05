const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_error = require('../../../utils/error.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../icon/index.js');
const require_use_form_item = require('../../form/src/hooks/use-form-item.js');
const require_index$3 = require('../../button/index.js');
const require_transfer = require('./transfer.js');
const require_use_props_alias = require('./composables/use-props-alias.js');
const require_use_checked_change = require('./composables/use-checked-change.js');
const require_use_computed_data = require('./composables/use-computed-data.js');
const require_use_move = require('./composables/use-move.js');
const require_transfer_panel = require('./transfer-panel2.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");

//#region ../../packages/components/transfer/src/transfer.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 0 };
var transfer_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElTransfer",
	__name: "transfer",
	props: require_transfer.transferProps,
	emits: require_transfer.transferEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const slots = (0, vue.useSlots)();
		const { t } = require_index.useLocale();
		const ns = require_index$1.useNamespace("transfer");
		const { formItem } = require_use_form_item.useFormItem();
		const checkedState = (0, vue.reactive)({
			leftChecked: [],
			rightChecked: []
		});
		const propsAlias = require_use_props_alias.usePropsAlias(props);
		const { sourceData, targetData } = require_use_computed_data.useComputedData(props);
		const { onSourceCheckedChange, onTargetCheckedChange } = require_use_checked_change.useCheckedChange(checkedState, emit);
		const { addToLeft, addToRight } = require_use_move.useMove(props, checkedState, emit);
		const leftPanel = (0, vue.ref)();
		const rightPanel = (0, vue.ref)();
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
		const hasButtonTexts = (0, vue.computed)(() => props.buttonTexts.length === 2);
		const leftPanelTitle = (0, vue.computed)(() => props.titles[0] || t("el.transfer.titles.0"));
		const rightPanelTitle = (0, vue.computed)(() => props.titles[1] || t("el.transfer.titles.1"));
		const panelFilterPlaceholder = (0, vue.computed)(() => props.filterPlaceholder || t("el.transfer.filterPlaceholder"));
		(0, vue.watch)(() => props.modelValue, () => {
			if (props.validateEvent) formItem?.validate?.("change").catch((err) => require_error.debugWarn(err));
		});
		const optionRender = (0, vue.computed)(() => (option) => {
			if (props.renderContent) return props.renderContent(vue.h, option);
			const defaultSlotVNodes = (slots.default?.({ option }) || []).filter((node) => node.type !== vue.Comment);
			if (defaultSlotVNodes.length) return defaultSlotVNodes;
			return (0, vue.h)("span", option[propsAlias.value.label] || option[propsAlias.value.key]);
		});
		__expose({
			clearQuery,
			leftPanel,
			rightPanel
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).b()) }, [
				(0, vue.createVNode)(require_transfer_panel.default, {
					ref_key: "leftPanel",
					ref: leftPanel,
					data: (0, vue.unref)(sourceData),
					"option-render": optionRender.value,
					placeholder: panelFilterPlaceholder.value,
					title: leftPanelTitle.value,
					filterable: __props.filterable,
					format: __props.format,
					"filter-method": __props.filterMethod,
					"default-checked": __props.leftDefaultChecked,
					props: props.props,
					onCheckedChange: (0, vue.unref)(onSourceCheckedChange)
				}, {
					empty: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "left-empty")]),
					default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "left-footer")]),
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
				(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("buttons")) }, [(0, vue.createVNode)((0, vue.unref)(require_index$3.ElButton), {
					type: "primary",
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("button"), (0, vue.unref)(ns).is("with-texts", hasButtonTexts.value)]),
					disabled: (0, vue.unref)(require_types.isEmpty)(checkedState.rightChecked),
					onClick: (0, vue.unref)(addToLeft)
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(require_index$2.ElIcon), null, {
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.ArrowLeft))]),
						_: 1
					}), !(0, vue.unref)(require_types.isUndefined)(__props.buttonTexts[0]) ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", _hoisted_1, (0, vue.toDisplayString)(__props.buttonTexts[0]), 1)) : (0, vue.createCommentVNode)("v-if", true)]),
					_: 1
				}, 8, [
					"class",
					"disabled",
					"onClick"
				]), (0, vue.createVNode)((0, vue.unref)(require_index$3.ElButton), {
					type: "primary",
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("button"), (0, vue.unref)(ns).is("with-texts", hasButtonTexts.value)]),
					disabled: (0, vue.unref)(require_types.isEmpty)(checkedState.leftChecked),
					onClick: (0, vue.unref)(addToRight)
				}, {
					default: (0, vue.withCtx)(() => [!(0, vue.unref)(require_types.isUndefined)(__props.buttonTexts[1]) ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", _hoisted_2, (0, vue.toDisplayString)(__props.buttonTexts[1]), 1)) : (0, vue.createCommentVNode)("v-if", true), (0, vue.createVNode)((0, vue.unref)(require_index$2.ElIcon), null, {
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.ArrowRight))]),
						_: 1
					})]),
					_: 1
				}, 8, [
					"class",
					"disabled",
					"onClick"
				])], 2),
				(0, vue.createVNode)(require_transfer_panel.default, {
					ref_key: "rightPanel",
					ref: rightPanel,
					data: (0, vue.unref)(targetData),
					"option-render": optionRender.value,
					placeholder: panelFilterPlaceholder.value,
					filterable: __props.filterable,
					format: __props.format,
					"filter-method": __props.filterMethod,
					title: rightPanelTitle.value,
					"default-checked": __props.rightDefaultChecked,
					props: props.props,
					onCheckedChange: (0, vue.unref)(onTargetCheckedChange)
				}, {
					empty: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "right-empty")]),
					default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "right-footer")]),
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
exports.default = transfer_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=transfer.vue_vue_type_script_setup_true_lang.js.map