import { Ref, ToRefs } from "vue";
import * as _floating_ui_dom0 from "@floating-ui/dom";
import { Middleware, Placement, SideObject, Strategy, VirtualElement } from "@floating-ui/dom";

//#region ../../packages/hooks/use-floating/index.d.ts
declare const useFloatingProps: {};
type UseFloatingProps = ToRefs<{
  middleware: Array<Middleware>;
  placement: Placement;
  strategy: Strategy;
}>;
declare const getPositionDataWithUnit: <T extends Record<string, number>>(record: T | undefined, key: keyof T) => string;
declare const useFloating: ({
  middleware,
  placement,
  strategy
}: UseFloatingProps) => {
  update: () => Promise<void>;
  referenceRef: Ref<HTMLElement | VirtualElement | undefined, HTMLElement | VirtualElement | undefined>;
  contentRef: Ref<HTMLElement | undefined, HTMLElement | undefined>;
  x: Ref<number | undefined, number | undefined>;
  y: Ref<number | undefined, number | undefined>;
  placement: Ref<Placement, Placement>;
  strategy: Ref<Strategy, Strategy>;
  middlewareData: Ref<{
    [x: string]: any;
    arrow?: {
      x?: number | undefined;
      y?: number | undefined;
      centerOffset: number;
      alignmentOffset?: number | undefined;
    } | undefined;
    autoPlacement?: {
      index?: number | undefined;
      overflows: {
        placement: Placement;
        overflows: Array<number>;
      }[];
    } | undefined;
    flip?: {
      index?: number | undefined;
      overflows: {
        placement: Placement;
        overflows: Array<number>;
      }[];
    } | undefined;
    hide?: {
      referenceHidden?: boolean | undefined;
      escaped?: boolean | undefined;
      referenceHiddenOffsets?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
      } | undefined;
      escapedOffsets?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
      } | undefined;
    } | undefined;
    offset?: {
      x: number;
      y: number;
      placement: Placement;
    } | undefined;
    shift?: {
      x: number;
      y: number;
      enabled: {
        x: boolean;
        y: boolean;
      };
    } | undefined;
  }, _floating_ui_dom0.MiddlewareData | {
    [x: string]: any;
    arrow?: {
      x?: number | undefined;
      y?: number | undefined;
      centerOffset: number;
      alignmentOffset?: number | undefined;
    } | undefined;
    autoPlacement?: {
      index?: number | undefined;
      overflows: {
        placement: Placement;
        overflows: Array<number>;
      }[];
    } | undefined;
    flip?: {
      index?: number | undefined;
      overflows: {
        placement: Placement;
        overflows: Array<number>;
      }[];
    } | undefined;
    hide?: {
      referenceHidden?: boolean | undefined;
      escaped?: boolean | undefined;
      referenceHiddenOffsets?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
      } | undefined;
      escapedOffsets?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
      } | undefined;
    } | undefined;
    offset?: {
      x: number;
      y: number;
      placement: Placement;
    } | undefined;
    shift?: {
      x: number;
      y: number;
      enabled: {
        x: boolean;
        y: boolean;
      };
    } | undefined;
  }>;
};
type ArrowMiddlewareProps = {
  arrowRef: Ref<HTMLElement | null | undefined>;
  padding?: number | SideObject;
};
declare const arrowMiddleware: ({
  arrowRef,
  padding
}: ArrowMiddlewareProps) => Middleware;
//#endregion
export { ArrowMiddlewareProps, UseFloatingProps, arrowMiddleware, getPositionDataWithUnit, useFloating, useFloatingProps };