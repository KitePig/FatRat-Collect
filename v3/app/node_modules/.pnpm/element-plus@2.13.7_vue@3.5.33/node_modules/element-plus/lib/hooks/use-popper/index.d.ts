import * as vue from "vue";
import { Ref } from "vue";
import * as _popperjs_core0 from "@popperjs/core";
import { Instance, Modifier, Options, State, VirtualElement } from "@popperjs/core";

//#region ../../packages/hooks/use-popper/index.d.ts
type ElementType = HTMLElement | undefined;
type ReferenceElement = ElementType | VirtualElement;
type PartialOptions = Partial<Options>;
declare const usePopper: (referenceElementRef: Ref<ReferenceElement>, popperElementRef: Ref<ElementType>, opts?: Ref<PartialOptions> | PartialOptions) => {
  state: vue.ComputedRef<{
    elements?: {
      reference: Element | VirtualElement;
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
  attributes: vue.ComputedRef<{
    [key: string]: {
      [key: string]: string | boolean;
    };
  }>;
  update: () => Promise<Partial<State>> | undefined;
  forceUpdate: () => void | undefined;
  instanceRef: vue.ComputedRef<Instance | undefined>;
};
type UsePopperReturn = ReturnType<typeof usePopper>;
//#endregion
export { PartialOptions, UsePopperReturn, usePopper };