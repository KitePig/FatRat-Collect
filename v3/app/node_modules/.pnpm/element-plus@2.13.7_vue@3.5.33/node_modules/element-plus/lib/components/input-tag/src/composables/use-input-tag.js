Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../../constants/aria.js');
const require_event = require('../../../../constants/event.js');
const require_browser = require('../../../../utils/browser.js');
const require_event$1 = require('../../../../utils/dom/event.js');
const require_types = require('../../../../utils/types.js');
const require_error = require('../../../../utils/error.js');
const require_index = require('../../../../hooks/use-focus-controller/index.js');
const require_index$1 = require('../../../../hooks/use-composition/index.js');
const require_use_form_common_props = require('../../../form/src/hooks/use-form-common-props.js');
let vue = require("vue");
let lodash_unified = require("lodash-unified");

//#region ../../packages/components/input-tag/src/composables/use-input-tag.ts
function useInputTag({ props, emit, formItem }) {
	const disabled = require_use_form_common_props.useFormDisabled();
	const size = require_use_form_common_props.useFormSize();
	const inputRef = (0, vue.shallowRef)();
	const inputValue = (0, vue.ref)();
	const tagTooltipRef = (0, vue.ref)();
	const tagSize = (0, vue.computed)(() => {
		return ["small"].includes(size.value) ? "small" : "default";
	});
	const placeholder = (0, vue.computed)(() => {
		return props.modelValue?.length ? void 0 : props.placeholder;
	});
	const closable = (0, vue.computed)(() => !(props.readonly || disabled.value));
	const inputLimit = (0, vue.computed)(() => {
		return require_types.isUndefined(props.max) ? false : (props.modelValue?.length ?? 0) >= props.max;
	});
	const showTagList = (0, vue.computed)(() => {
		return props.collapseTags ? props.modelValue?.slice(0, props.maxCollapseTags) : props.modelValue;
	});
	const collapseTagList = (0, vue.computed)(() => {
		return props.collapseTags ? props.modelValue?.slice(props.maxCollapseTags) : [];
	});
	const addTagsEmit = (value) => {
		const list = [...props.modelValue ?? [], ...(0, lodash_unified.castArray)(value)];
		emit(require_event.UPDATE_MODEL_EVENT, list);
		emit(require_event.CHANGE_EVENT, list);
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
			emit(require_event.INPUT_EVENT, nextValue);
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
		emit(require_event.INPUT_EVENT, event.target.value);
	};
	const handleKeydown = (event) => {
		if (isComposing.value) return;
		switch (require_event$1.getEventCode(event)) {
			case props.trigger:
				event.preventDefault();
				event.stopPropagation();
				handleAddTag();
				break;
			case require_aria.EVENT_CODE.numpadEnter:
				if (props.trigger === require_aria.EVENT_CODE.enter) {
					event.preventDefault();
					event.stopPropagation();
					handleAddTag();
				}
				break;
			case require_aria.EVENT_CODE.backspace:
				if (!inputValue.value && props.modelValue?.length) {
					event.preventDefault();
					event.stopPropagation();
					handleRemoveTag(props.modelValue.length - 1);
				}
				break;
		}
	};
	const handleKeyup = (event) => {
		if (isComposing.value || !require_browser.isAndroid()) return;
		switch (require_event$1.getEventCode(event)) {
			case require_aria.EVENT_CODE.space:
				if (props.trigger === require_aria.EVENT_CODE.space) {
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
		emit(require_event.UPDATE_MODEL_EVENT, value);
		emit(require_event.CHANGE_EVENT, value);
		emit("remove-tag", item, index);
	};
	const handleClear = () => {
		inputValue.value = void 0;
		emit(require_event.UPDATE_MODEL_EVENT, void 0);
		emit(require_event.CHANGE_EVENT, void 0);
		emit("clear");
	};
	const handleDragged = (draggingIndex, dropIndex, type) => {
		const value = (props.modelValue ?? []).slice();
		const [draggedItem] = value.splice(draggingIndex, 1);
		const step = dropIndex > draggingIndex && type === "before" ? -1 : dropIndex < draggingIndex && type === "after" ? 1 : 0;
		value.splice(dropIndex + step, 0, draggedItem);
		emit(require_event.UPDATE_MODEL_EVENT, value);
		emit(require_event.CHANGE_EVENT, value);
		emit("drag-tag", draggingIndex, dropIndex + step, draggedItem);
	};
	const focus = () => {
		inputRef.value?.focus();
	};
	const blur = () => {
		inputRef.value?.blur();
	};
	const { wrapperRef, isFocused } = require_index.useFocusController(inputRef, {
		disabled,
		beforeBlur(event) {
			return tagTooltipRef.value?.isFocusInsideContent(event);
		},
		afterBlur() {
			if (props.saveOnBlur) handleAddTag();
			else inputValue.value = void 0;
			if (props.validateEvent) formItem?.validate?.("blur").catch((err) => require_error.debugWarn(err));
		}
	});
	const { isComposing, handleCompositionStart, handleCompositionUpdate, handleCompositionEnd } = require_index$1.useComposition({ afterComposition: handleInput });
	(0, vue.watch)(() => props.modelValue, () => {
		if (props.validateEvent) formItem?.validate?.(require_event.CHANGE_EVENT).catch((err) => require_error.debugWarn(err));
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
exports.useInputTag = useInputTag;
//# sourceMappingURL=use-input-tag.js.map