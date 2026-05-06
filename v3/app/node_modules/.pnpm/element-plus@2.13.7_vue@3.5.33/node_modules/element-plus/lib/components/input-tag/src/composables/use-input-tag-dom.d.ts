import { IconComponent } from "../../../../utils/vue/icon.js";
import { ComponentSize } from "../../../../constants/size.js";
import "../../../../utils/index.js";
import { InputTagProps } from "../input-tag.js";
import * as vue from "vue";
import { ComputedRef, Ref, StyleValue } from "vue";

//#region ../../packages/components/input-tag/src/composables/use-input-tag-dom.d.ts
interface UseInputTagDomOptions {
  props: InputTagProps;
  isFocused: Ref<boolean>;
  hovering: Ref<boolean>;
  disabled: ComputedRef<boolean>;
  inputValue: Ref<string | undefined>;
  size: ComputedRef<ComponentSize>;
  validateState: ComputedRef<string>;
  validateIcon: ComputedRef<'' | IconComponent>;
  needStatusIcon: ComputedRef<boolean>;
}
declare function useInputTagDom({
  props,
  isFocused,
  hovering,
  disabled,
  inputValue,
  size,
  validateState,
  validateIcon,
  needStatusIcon
}: UseInputTagDomOptions): {
  ns: {
    namespace: ComputedRef<string>;
    b: (blockSuffix?: string) => string;
    e: (element?: string) => string;
    m: (modifier?: string) => string;
    be: (blockSuffix?: string, element?: string) => string;
    em: (element?: string, modifier?: string) => string;
    bm: (blockSuffix?: string, modifier?: string) => string;
    bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
    is: {
      (name: string, state: boolean | undefined): string;
      (name: string): string;
    };
    cssVar: (object: Record<string, string>) => Record<string, string>;
    cssVarName: (name: string) => string;
    cssVarBlock: (object: Record<string, string>) => Record<string, string>;
    cssVarBlockName: (name: string) => string;
  };
  nsInput: {
    namespace: ComputedRef<string>;
    b: (blockSuffix?: string) => string;
    e: (element?: string) => string;
    m: (modifier?: string) => string;
    be: (blockSuffix?: string, element?: string) => string;
    em: (element?: string, modifier?: string) => string;
    bm: (blockSuffix?: string, modifier?: string) => string;
    bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
    is: {
      (name: string, state: boolean | undefined): string;
      (name: string): string;
    };
    cssVar: (object: Record<string, string>) => Record<string, string>;
    cssVarName: (name: string) => string;
    cssVarBlock: (object: Record<string, string>) => Record<string, string>;
    cssVarBlockName: (name: string) => string;
  };
  containerKls: ComputedRef<unknown[]>;
  containerStyle: ComputedRef<StyleValue>;
  innerKls: ComputedRef<string[]>;
  showClear: ComputedRef<boolean | "" | 0 | undefined>;
  showSuffix: ComputedRef<boolean | "" | vue.Slot<any>>;
  tagStyle: ComputedRef<{
    maxWidth?: undefined;
  } | {
    maxWidth: string;
  }>;
  collapseItemRef: Ref<HTMLElement | undefined, HTMLElement | undefined>;
  innerRef: Ref<HTMLElement | undefined, HTMLElement | undefined>;
};
//#endregion
export { useInputTagDom };