const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../input/index.js');
const require_index$3 = require('../../checkbox/index.js');
const require_transfer_panel = require('./transfer-panel.js');
const require_use_props_alias = require('./composables/use-props-alias.js');
const require_use_check = require('./composables/use-check.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");

//#region ../../packages/components/transfer/src/transfer-panel.vue?vue&type=script&setup=true&lang.ts
var transfer_panel_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElTransferPanel",
	__name: "transfer-panel",
	props: require_transfer_panel.transferPanelProps,
	emits: require_transfer_panel.transferPanelEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const slots = (0, vue.useSlots)();
		const OptionContent = ({ option }) => option;
		const { t } = require_index.useLocale();
		const ns = require_index$1.useNamespace("transfer");
		const panelState = (0, vue.reactive)({
			checked: [],
			allChecked: false,
			query: "",
			checkChangeByUser: true
		});
		const propsAlias = require_use_props_alias.usePropsAlias(props);
		const { filteredData, checkedSummary, isIndeterminate, handleAllCheckedChange } = require_use_check.useCheck(props, panelState, emit);
		const hasNoMatch = (0, vue.computed)(() => !require_types.isEmpty(panelState.query) && require_types.isEmpty(filteredData.value));
		const hasFooter = (0, vue.computed)(() => !require_types.isEmpty(slots.default()[0].children));
		const { checked, allChecked, query } = (0, vue.toRefs)(panelState);
		__expose({ query });
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).b("panel")) }, [
				(0, vue.createElementVNode)("p", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("panel", "header")) }, [(0, vue.createVNode)((0, vue.unref)(require_index$3.ElCheckbox), {
					modelValue: (0, vue.unref)(allChecked),
					"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => (0, vue.isRef)(allChecked) ? allChecked.value = $event : null),
					indeterminate: (0, vue.unref)(isIndeterminate),
					"validate-event": false,
					onChange: (0, vue.unref)(handleAllCheckedChange)
				}, {
					default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("panel", "header-title")) }, (0, vue.toDisplayString)(__props.title), 3), (0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("panel", "header-count")) }, (0, vue.toDisplayString)((0, vue.unref)(checkedSummary)), 3)]),
					_: 1
				}, 8, [
					"modelValue",
					"indeterminate",
					"onChange"
				])], 2),
				(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)([(0, vue.unref)(ns).be("panel", "body"), (0, vue.unref)(ns).is("with-footer", hasFooter.value)]) }, [
					__props.filterable ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$2.ElInput), {
						key: 0,
						modelValue: (0, vue.unref)(query),
						"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => (0, vue.isRef)(query) ? query.value = $event : null),
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("panel", "filter")),
						size: "default",
						placeholder: __props.placeholder,
						"prefix-icon": (0, vue.unref)(_element_plus_icons_vue.Search),
						clearable: "",
						"validate-event": false
					}, null, 8, [
						"modelValue",
						"class",
						"placeholder",
						"prefix-icon"
					])) : (0, vue.createCommentVNode)("v-if", true),
					(0, vue.withDirectives)((0, vue.createVNode)((0, vue.unref)(require_index$3.ElCheckboxGroup), {
						modelValue: (0, vue.unref)(checked),
						"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => (0, vue.isRef)(checked) ? checked.value = $event : null),
						"validate-event": false,
						class: (0, vue.normalizeClass)([(0, vue.unref)(ns).is("filterable", __props.filterable), (0, vue.unref)(ns).be("panel", "list")])
					}, {
						default: (0, vue.withCtx)(() => [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)((0, vue.unref)(filteredData), (item) => {
							return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$3.ElCheckbox), {
								key: item[(0, vue.unref)(propsAlias).key],
								class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("panel", "item")),
								value: item[(0, vue.unref)(propsAlias).key],
								disabled: item[(0, vue.unref)(propsAlias).disabled],
								"validate-event": false
							}, {
								default: (0, vue.withCtx)(() => [(0, vue.createVNode)(OptionContent, { option: __props.optionRender?.(item) }, null, 8, ["option"])]),
								_: 2
							}, 1032, [
								"class",
								"value",
								"disabled"
							]);
						}), 128))]),
						_: 1
					}, 8, ["modelValue", "class"]), [[vue.vShow, !hasNoMatch.value && !(0, vue.unref)(require_types.isEmpty)(__props.data)]]),
					(0, vue.withDirectives)((0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("panel", "empty")) }, [(0, vue.renderSlot)(_ctx.$slots, "empty", {}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(hasNoMatch.value ? (0, vue.unref)(t)("el.transfer.noMatch") : (0, vue.unref)(t)("el.transfer.noData")), 1)])], 2), [[vue.vShow, hasNoMatch.value || (0, vue.unref)(require_types.isEmpty)(__props.data)]])
				], 2),
				hasFooter.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("p", {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("panel", "footer"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "default")], 2)) : (0, vue.createCommentVNode)("v-if", true)
			], 2);
		};
	}
});

//#endregion
exports.default = transfer_panel_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=transfer-panel.vue_vue_type_script_setup_true_lang.js.map