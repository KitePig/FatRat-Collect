import { PopperContentProps } from "../content.js";
import * as vue from "vue";
import * as _popperjs_core0 from "@popperjs/core";
import { Modifier } from "@popperjs/core";

//#region ../../packages/components/popper/src/composables/use-content.d.ts
declare const usePopperContent: (props: PopperContentProps) => {
  attributes: vue.ComputedRef<{
    [key: string]: {
      [key: string]: string | boolean;
    };
  }>;
  arrowRef: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  contentRef: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  instanceRef: vue.ComputedRef<_popperjs_core0.Instance | undefined>;
  state: vue.ComputedRef<{
    elements?: {
      reference: Element | _popperjs_core0.VirtualElement;
      popper: HTMLElement;
      arrow?: HTMLElement;
    } | undefined;
    options?: _popperjs_core0.OptionsGeneric<any> | undefined;
    placement?: _popperjs_core0.Placement | undefined;
    strategy?: _popperjs_core0.PositioningStrategy | undefined;
    orderedModifiers?: Modifier<any, any>[] | undefined;
    rects?: _popperjs_core0.StateRects | undefined;
    scrollParents?: {
      reference: Array<Element | _popperjs_core0.Window | _popperjs_core0.VisualViewport>;
      popper: Array<Element | _popperjs_core0.Window | _popperjs_core0.VisualViewport>;
    } | undefined;
    styles?: {
      [key: string]: Partial<CSSStyleDeclaration>;
    } | undefined;
    attributes?: {
      [key: string]: {
        [key: string]: string | boolean;
      };
    } | undefined;
    modifiersData?: {
      [key: string]: any;
      arrow?: {
        x?: number;
        y?: number;
        centerOffset: number;
      };
      hide?: {
        isReferenceHidden: boolean;
        hasPopperEscaped: boolean;
        referenceClippingOffsets: _popperjs_core0.SideObject;
        popperEscapeOffsets: _popperjs_core0.SideObject;
      };
      offset?: {
        top?: _popperjs_core0.Offsets | undefined;
        auto?: _popperjs_core0.Offsets | undefined;
        bottom?: _popperjs_core0.Offsets | undefined;
        left?: _popperjs_core0.Offsets | undefined;
        right?: _popperjs_core0.Offsets | undefined;
        "auto-start"?: _popperjs_core0.Offsets | undefined;
        "auto-end"?: _popperjs_core0.Offsets | undefined;
        "top-start"?: _popperjs_core0.Offsets | undefined;
        "top-end"?: _popperjs_core0.Offsets | undefined;
        "bottom-start"?: _popperjs_core0.Offsets | undefined;
        "bottom-end"?: _popperjs_core0.Offsets | undefined;
        "right-start"?: _popperjs_core0.Offsets | undefined;
        "right-end"?: _popperjs_core0.Offsets | undefined;
        "left-start"?: _popperjs_core0.Offsets | undefined;
        "left-end"?: _popperjs_core0.Offsets | undefined;
      };
      preventOverflow?: _popperjs_core0.Offsets;
      popperOffsets?: _popperjs_core0.Offsets;
    } | undefined;
    reset?: boolean | undefined;
  }>;
  styles: vue.ComputedRef<{
    [key: string]: Partial<CSSStyleDeclaration>;
  }>;
  role: vue.ComputedRef<string>;
  forceUpdate: () => void | undefined;
  update: () => Promise<Partial<_popperjs_core0.State>> | undefined;
};
type UsePopperContentReturn = ReturnType<typeof usePopperContent>;
//#endregion
export { UsePopperContentReturn, usePopperContent };