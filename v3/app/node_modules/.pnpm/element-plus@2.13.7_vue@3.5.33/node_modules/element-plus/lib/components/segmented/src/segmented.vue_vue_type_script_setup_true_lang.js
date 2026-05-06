const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_error = require('../../../utils/error.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../../hooks/use-id/index.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_use_form_item = require('../../form/src/hooks/use-form-item.js');
const require_segmented = require('./segmented.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/segmented/src/segmented.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"id",
	"aria-label",
	"aria-labelledby"
];
const _hoisted_2 = [
	"name",
	"disabled",
	"checked",
	"onChange"
];
var segmented_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElSegmented",
	__name: "segmented",
	props: require_segmented.segmentedProps,
	emits: require_segmented.segmentedEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = require_index.useNamespace("segmented");
		const segmentedId = require_index$1.useId();
		const segmentedSize = require_use_form_common_props.useFormSize();
		const _disabled = require_use_form_common_props.useFormDisabled();
		const { formItem } = require_use_form_item.useFormItem();
		const { inputId, isLabeledByFormItem } = require_use_form_item.useFormItemInputId(props, { formItemContext: formItem });
		const segmentedRef = (0, vue.ref)(null);
		const activeElement = (0, _vueuse_core.useActiveElement)();
		const state = (0, vue.reactive)({
			isInit: false,
			width: 0,
			height: 0,
			translateX: 0,
			translateY: 0,
			focusVisible: false
		});
		const handleChange = (evt, item) => {
			const value = getValue(item);
			emit(require_event.UPDATE_MODEL_EVENT, value);
			emit(require_event.CHANGE_EVENT, value);
			evt.target.checked = value === props.modelValue;
		};
		const aliasProps = (0, vue.computed)(() => ({
			...require_segmented.defaultProps,
			...props.props
		}));
		const getValue = (item) => {
			return (0, _vue_shared.isObject)(item) ? item[aliasProps.value.value] : item;
		};
		const getLabel = (item) => {
			return (0, _vue_shared.isObject)(item) ? item[aliasProps.value.label] : item;
		};
		const getDisabled = (item) => {
			return !!(_disabled.value || ((0, _vue_shared.isObject)(item) ? item[aliasProps.value.disabled] : false));
		};
		const getSelected = (item) => {
			return props.modelValue === getValue(item);
		};
		const getOption = (value) => {
			return props.options.find((item) => getValue(item) === value);
		};
		const getItemCls = (item) => {
			return [
				ns.e("item"),
				ns.is("selected", getSelected(item)),
				ns.is("disabled", getDisabled(item))
			];
		};
		const updateSelect = () => {
			if (!segmentedRef.value) return;
			const selectedItem = segmentedRef.value.querySelector(".is-selected");
			const selectedItemInput = segmentedRef.value.querySelector(".is-selected input");
			if (!selectedItem || !selectedItemInput) {
				state.width = 0;
				state.height = 0;
				state.translateX = 0;
				state.translateY = 0;
				state.focusVisible = false;
				return;
			}
			state.isInit = true;
			if (props.direction === "vertical") {
				state.height = selectedItem.offsetHeight;
				state.translateY = selectedItem.offsetTop;
			} else {
				state.width = selectedItem.offsetWidth;
				state.translateX = selectedItem.offsetLeft;
			}
			try {
				state.focusVisible = selectedItemInput.matches(":focus-visible");
			} catch {}
		};
		const segmentedCls = (0, vue.computed)(() => [
			ns.b(),
			ns.m(segmentedSize.value),
			ns.is("block", props.block)
		]);
		const selectedStyle = (0, vue.computed)(() => ({
			width: props.direction === "vertical" ? "100%" : `${state.width}px`,
			height: props.direction === "vertical" ? `${state.height}px` : "100%",
			transform: props.direction === "vertical" ? `translateY(${state.translateY}px)` : `translateX(${state.translateX}px)`,
			display: state.isInit ? "block" : "none"
		}));
		const selectedCls = (0, vue.computed)(() => [
			ns.e("item-selected"),
			ns.is("disabled", getDisabled(getOption(props.modelValue))),
			ns.is("focus-visible", state.focusVisible)
		]);
		const name = (0, vue.computed)(() => {
			return props.name || segmentedId.value;
		});
		(0, _vueuse_core.useResizeObserver)(segmentedRef, updateSelect);
		(0, vue.watch)(activeElement, updateSelect);
		(0, vue.watch)(() => props.modelValue, () => {
			updateSelect();
			if (props.validateEvent) formItem?.validate?.("change").catch((err) => require_error.debugWarn(err));
		}, { flush: "post" });
		return (_ctx, _cache) => {
			return __props.options.length ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				key: 0,
				id: (0, vue.unref)(inputId),
				ref_key: "segmentedRef",
				ref: segmentedRef,
				class: (0, vue.normalizeClass)(segmentedCls.value),
				role: "radiogroup",
				"aria-label": !(0, vue.unref)(isLabeledByFormItem) ? __props.ariaLabel || "segmented" : void 0,
				"aria-labelledby": (0, vue.unref)(isLabeledByFormItem) ? (0, vue.unref)(formItem).labelId : void 0
			}, [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)([(0, vue.unref)(ns).e("group"), (0, vue.unref)(ns).m(__props.direction)]) }, [(0, vue.createElementVNode)("div", {
				style: (0, vue.normalizeStyle)(selectedStyle.value),
				class: (0, vue.normalizeClass)(selectedCls.value)
			}, null, 6), ((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(__props.options, (item, index) => {
				return (0, vue.openBlock)(), (0, vue.createElementBlock)("label", {
					key: index,
					class: (0, vue.normalizeClass)(getItemCls(item))
				}, [(0, vue.createElementVNode)("input", {
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("item-input")),
					type: "radio",
					name: name.value,
					disabled: getDisabled(item),
					checked: getSelected(item),
					onChange: ($event) => handleChange($event, item)
				}, null, 42, _hoisted_2), (0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("item-label")) }, [(0, vue.renderSlot)(_ctx.$slots, "default", { item }, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(getLabel(item)), 1)])], 2)], 2);
			}), 128))], 2)], 10, _hoisted_1)) : (0, vue.createCommentVNode)("v-if", true);
		};
	}
});

//#endregion
exports.default = segmented_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=segmented.vue_vue_type_script_setup_true_lang.js.map