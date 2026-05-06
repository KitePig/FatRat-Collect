import { EmitFn } from "../../../../utils/vue/typescript.js";
import "../../../../utils/index.js";
import { TooltipInstance } from "../../../tooltip/src/tooltip.js";
import "../../../tooltip/index.js";
import { FormItemContext } from "../../../form/src/types.js";
import "../../../form/index.js";
import { InputTagEmits, InputTagProps } from "../input-tag.js";
import * as vue from "vue";

//#region ../../packages/components/input-tag/src/composables/use-input-tag.d.ts
interface UseInputTagOptions {
  props: InputTagProps;
  emit: EmitFn<InputTagEmits>;
  formItem?: FormItemContext;
}
declare function useInputTag({
  props,
  emit,
  formItem
}: UseInputTagOptions): {
  inputRef: vue.ShallowRef<HTMLInputElement | undefined, HTMLInputElement | undefined>;
  wrapperRef: vue.ShallowRef<HTMLElement | undefined, HTMLElement | undefined>;
  tagTooltipRef: vue.Ref<TooltipInstance | undefined, TooltipInstance | undefined>;
  isFocused: vue.Ref<boolean, boolean>;
  isComposing: vue.Ref<boolean, boolean>;
  inputValue: vue.Ref<string | undefined, string | undefined>;
  size: vue.ComputedRef<"" | "default" | "small" | "large">;
  tagSize: vue.ComputedRef<"default" | "small">;
  placeholder: vue.ComputedRef<string | undefined>;
  closable: vue.ComputedRef<boolean>;
  disabled: vue.ComputedRef<boolean>;
  inputLimit: vue.ComputedRef<boolean>;
  showTagList: vue.ComputedRef<string[] | undefined>;
  collapseTagList: vue.ComputedRef<string[] | undefined>;
  handleDragged: (draggingIndex: number, dropIndex: number, type: "before" | "after") => void;
  handlePaste: (event: ClipboardEvent) => void;
  handleInput: (event: Event) => void;
  handleKeydown: (event: KeyboardEvent) => void;
  handleKeyup: (event: KeyboardEvent) => void;
  handleAddTag: () => void;
  handleRemoveTag: (index: number) => void;
  handleClear: () => void;
  handleCompositionStart: (event: CompositionEvent) => void;
  handleCompositionUpdate: (event: CompositionEvent) => void;
  handleCompositionEnd: (event: CompositionEvent) => void;
  focus: () => void;
  blur: () => void;
};
//#endregion
export { useInputTag };