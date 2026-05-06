Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_form = require('../../../../constants/form.js');
const require_index = require('../../../../hooks/use-namespace/index.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/components/input-tag/src/composables/use-input-tag-dom.ts
function useInputTagDom({ props, isFocused, hovering, disabled, inputValue, size, validateState, validateIcon, needStatusIcon }) {
	const attrs = (0, vue.useAttrs)();
	const slots = (0, vue.useSlots)();
	const ns = require_index.useNamespace("input-tag");
	const nsInput = require_index.useNamespace("input");
	const collapseItemRef = (0, vue.ref)();
	const innerRef = (0, vue.ref)();
	const containerKls = (0, vue.computed)(() => [
		ns.b(),
		ns.is("focused", isFocused.value),
		ns.is("hovering", hovering.value),
		ns.is("disabled", disabled.value),
		ns.m(size.value),
		ns.e("wrapper"),
		attrs.class
	]);
	const containerStyle = (0, vue.computed)(() => [attrs.style]);
	const innerKls = (0, vue.computed)(() => [
		ns.e("inner"),
		ns.is("draggable", props.draggable),
		ns.is("left-space", !props.modelValue?.length && !slots.prefix),
		ns.is("right-space", !props.modelValue?.length && !showSuffix.value)
	]);
	const showClear = (0, vue.computed)(() => {
		return props.clearable && !disabled.value && !props.readonly && (props.modelValue?.length || inputValue.value) && (isFocused.value || hovering.value);
	});
	const showSuffix = (0, vue.computed)(() => {
		return slots.suffix || showClear.value || validateState.value && validateIcon.value && needStatusIcon.value;
	});
	const states = (0, vue.reactive)({
		innerWidth: 0,
		collapseItemWidth: 0
	});
	const getGapWidth = () => {
		if (!innerRef.value) return 0;
		const style = window.getComputedStyle(innerRef.value);
		return Number.parseFloat(style.gap || "6px");
	};
	const resetInnerWidth = () => {
		states.innerWidth = Number.parseFloat(window.getComputedStyle(innerRef.value).width);
	};
	const resetCollapseItemWidth = () => {
		states.collapseItemWidth = collapseItemRef.value.getBoundingClientRect().width;
	};
	const tagStyle = (0, vue.computed)(() => {
		if (!props.collapseTags) return {};
		const gapWidth = getGapWidth();
		const inputSlotWidth = gapWidth + require_form.MINIMUM_INPUT_WIDTH;
		const maxWidth = collapseItemRef.value && props.maxCollapseTags === 1 ? states.innerWidth - states.collapseItemWidth - gapWidth - inputSlotWidth : states.innerWidth - inputSlotWidth;
		return { maxWidth: `${Math.max(maxWidth, 0)}px` };
	});
	(0, _vueuse_core.useResizeObserver)(innerRef, resetInnerWidth);
	(0, _vueuse_core.useResizeObserver)(collapseItemRef, resetCollapseItemWidth);
	return {
		ns,
		nsInput,
		containerKls,
		containerStyle,
		innerKls,
		showClear,
		showSuffix,
		tagStyle,
		collapseItemRef,
		innerRef
	};
}

//#endregion
exports.useInputTagDom = useInputTagDom;
//# sourceMappingURL=use-input-tag-dom.js.map