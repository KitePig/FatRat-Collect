import { MINIMUM_INPUT_WIDTH } from "../../../../constants/form.mjs";
import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { useResizeObserver } from "@vueuse/core";
import { computed, reactive, ref, useAttrs, useSlots } from "vue";

//#region ../../packages/components/input-tag/src/composables/use-input-tag-dom.ts
function useInputTagDom({ props, isFocused, hovering, disabled, inputValue, size, validateState, validateIcon, needStatusIcon }) {
	const attrs = useAttrs();
	const slots = useSlots();
	const ns = useNamespace("input-tag");
	const nsInput = useNamespace("input");
	const collapseItemRef = ref();
	const innerRef = ref();
	const containerKls = computed(() => [
		ns.b(),
		ns.is("focused", isFocused.value),
		ns.is("hovering", hovering.value),
		ns.is("disabled", disabled.value),
		ns.m(size.value),
		ns.e("wrapper"),
		attrs.class
	]);
	const containerStyle = computed(() => [attrs.style]);
	const innerKls = computed(() => [
		ns.e("inner"),
		ns.is("draggable", props.draggable),
		ns.is("left-space", !props.modelValue?.length && !slots.prefix),
		ns.is("right-space", !props.modelValue?.length && !showSuffix.value)
	]);
	const showClear = computed(() => {
		return props.clearable && !disabled.value && !props.readonly && (props.modelValue?.length || inputValue.value) && (isFocused.value || hovering.value);
	});
	const showSuffix = computed(() => {
		return slots.suffix || showClear.value || validateState.value && validateIcon.value && needStatusIcon.value;
	});
	const states = reactive({
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
	const tagStyle = computed(() => {
		if (!props.collapseTags) return {};
		const gapWidth = getGapWidth();
		const inputSlotWidth = gapWidth + MINIMUM_INPUT_WIDTH;
		const maxWidth = collapseItemRef.value && props.maxCollapseTags === 1 ? states.innerWidth - states.collapseItemWidth - gapWidth - inputSlotWidth : states.innerWidth - inputSlotWidth;
		return { maxWidth: `${Math.max(maxWidth, 0)}px` };
	});
	useResizeObserver(innerRef, resetInnerWidth);
	useResizeObserver(collapseItemRef, resetCollapseItemWidth);
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
export { useInputTagDom };
//# sourceMappingURL=use-input-tag-dom.mjs.map