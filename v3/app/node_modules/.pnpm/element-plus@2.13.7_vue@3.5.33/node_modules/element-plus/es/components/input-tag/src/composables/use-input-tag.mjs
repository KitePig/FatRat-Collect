import { EVENT_CODE } from "../../../../constants/aria.mjs";
import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from "../../../../constants/event.mjs";
import { isAndroid } from "../../../../utils/browser.mjs";
import { getEventCode } from "../../../../utils/dom/event.mjs";
import { isUndefined } from "../../../../utils/types.mjs";
import { debugWarn } from "../../../../utils/error.mjs";
import { ensureArray } from "../../../../utils/arrays.mjs";
import { useFocusController } from "../../../../hooks/use-focus-controller/index.mjs";
import { useComposition } from "../../../../hooks/use-composition/index.mjs";
import { useFormDisabled, useFormSize } from "../../../form/src/hooks/use-form-common-props.mjs";
import { computed, ref, shallowRef, watch } from "vue";

//#region ../../packages/components/input-tag/src/composables/use-input-tag.ts
function useInputTag({ props, emit, formItem }) {
	const disabled = useFormDisabled();
	const size = useFormSize();
	const inputRef = shallowRef();
	const inputValue = ref();
	const tagTooltipRef = ref();
	const tagSize = computed(() => {
		return ["small"].includes(size.value) ? "small" : "default";
	});
	const placeholder = computed(() => {
		return props.modelValue?.length ? void 0 : props.placeholder;
	});
	const closable = computed(() => !(props.readonly || disabled.value));
	const inputLimit = computed(() => {
		return isUndefined(props.max) ? false : (props.modelValue?.length ?? 0) >= props.max;
	});
	const showTagList = computed(() => {
		return props.collapseTags ? props.modelValue?.slice(0, props.maxCollapseTags) : props.modelValue;
	});
	const collapseTagList = computed(() => {
		return props.collapseTags ? props.modelValue?.slice(props.maxCollapseTags) : [];
	});
	const addTagsEmit = (value) => {
		const list = [...props.modelValue ?? [], ...ensureArray(value)];
		emit(UPDATE_MODEL_EVENT, list);
		emit(CHANGE_EVENT, list);
		emit("add-tag", value);
		inputValue.value = void 0;
	};
	const getDelimitedTags = (input) => {
		const parts = input.split(props.delimiter);
		const tags = parts.length > 1 ? parts.map((val) => val.trim()).filter(Boolean) : [];
		if (props.max) {
			const maxInsert = props.max - (props.modelValue?.length ?? 0);
			tags.splice(maxInsert);
		}
		return tags.length === 1 ? tags[0] : tags;
	};
	const handlePaste = (event) => {
		const pasted = event.clipboardData?.getData("text");
		if (props.readonly || inputLimit.value || !props.delimiter || !pasted) return;
		const { selectionStart = 0, selectionEnd = 0, value } = event.target;
		const nextValue = value.slice(0, selectionStart) + pasted + value.slice(selectionEnd);
		const tags = getDelimitedTags(nextValue);
		if (tags.length) {
			addTagsEmit(tags);
			emit(INPUT_EVENT, nextValue);
			event.preventDefault();
		}
	};
	const handleInput = (event) => {
		if (inputLimit.value) {
			inputValue.value = void 0;
			return;
		}
		if (isComposing.value) return;
		if (props.delimiter && inputValue.value) {
			const tags = getDelimitedTags(inputValue.value);
			if (tags.length) addTagsEmit(tags);
		}
		emit(INPUT_EVENT, event.target.value);
	};
	const handleKeydown = (event) => {
		if (isComposing.value) return;
		switch (getEventCode(event)) {
			case props.trigger:
				event.preventDefault();
				event.stopPropagation();
				handleAddTag();
				break;
			case EVENT_CODE.numpadEnter:
				if (props.trigger === EVENT_CODE.enter) {
					event.preventDefault();
					event.stopPropagation();
					handleAddTag();
				}
				break;
			case EVENT_CODE.backspace:
				if (!inputValue.value && props.modelValue?.length) {
					event.preventDefault();
					event.stopPropagation();
					handleRemoveTag(props.modelValue.length - 1);
				}
				break;
		}
	};
	const handleKeyup = (event) => {
		if (isComposing.value || !isAndroid()) return;
		switch (getEventCode(event)) {
			case EVENT_CODE.space:
				if (props.trigger === EVENT_CODE.space) {
					event.preventDefault();
					event.stopPropagation();
					handleAddTag();
				}
				break;
		}
	};
	const handleAddTag = () => {
		const value = inputValue.value?.trim();
		if (!value || inputLimit.value) return;
		addTagsEmit(value);
	};
	const handleRemoveTag = (index) => {
		const value = (props.modelValue ?? []).slice();
		const [item] = value.splice(index, 1);
		emit(UPDATE_MODEL_EVENT, value);
		emit(CHANGE_EVENT, value);
		emit("remove-tag", item, index);
	};
	const handleClear = () => {
		inputValue.value = void 0;
		emit(UPDATE_MODEL_EVENT, void 0);
		emit(CHANGE_EVENT, void 0);
		emit("clear");
	};
	const handleDragged = (draggingIndex, dropIndex, type) => {
		const value = (props.modelValue ?? []).slice();
		const [draggedItem] = value.splice(draggingIndex, 1);
		const step = dropIndex > draggingIndex && type === "before" ? -1 : dropIndex < draggingIndex && type === "after" ? 1 : 0;
		value.splice(dropIndex + step, 0, draggedItem);
		emit(UPDATE_MODEL_EVENT, value);
		emit(CHANGE_EVENT, value);
		emit("drag-tag", draggingIndex, dropIndex + step, draggedItem);
	};
	const focus = () => {
		inputRef.value?.focus();
	};
	const blur = () => {
		inputRef.value?.blur();
	};
	const { wrapperRef, isFocused } = useFocusController(inputRef, {
		disabled,
		beforeBlur(event) {
			return tagTooltipRef.value?.isFocusInsideContent(event);
		},
		afterBlur() {
			if (props.saveOnBlur) handleAddTag();
			else inputValue.value = void 0;
			if (props.validateEvent) formItem?.validate?.("blur").catch((err) => debugWarn(err));
		}
	});
	const { isComposing, handleCompositionStart, handleCompositionUpdate, handleCompositionEnd } = useComposition({ afterComposition: handleInput });
	watch(() => props.modelValue, () => {
		if (props.validateEvent) formItem?.validate?.(CHANGE_EVENT).catch((err) => debugWarn(err));
	});
	return {
		inputRef,
		wrapperRef,
		tagTooltipRef,
		isFocused,
		isComposing,
		inputValue,
		size,
		tagSize,
		placeholder,
		closable,
		disabled,
		inputLimit,
		showTagList,
		collapseTagList,
		handleDragged,
		handlePaste,
		handleInput,
		handleKeydown,
		handleKeyup,
		handleAddTag,
		handleRemoveTag,
		handleClear,
		handleCompositionStart,
		handleCompositionUpdate,
		handleCompositionEnd,
		focus,
		blur
	};
}

//#endregion
export { useInputTag };
//# sourceMappingURL=use-input-tag.mjs.map