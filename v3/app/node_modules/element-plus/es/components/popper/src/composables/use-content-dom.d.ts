import { UsePopperReturn } from "../../../../hooks/use-popper/index.js";
import "../../../../hooks/index.js";
import { PopperContentProps } from "../content.js";
import { UsePopperContentReturn } from "./use-content.js";
import * as vue from "vue";
import { CSSProperties, StyleValue } from "vue";

//#region ../../packages/components/popper/src/composables/use-content-dom.d.ts
declare const usePopperContentDOM: (props: PopperContentProps, {
  attributes,
  styles,
  role
}: Pick<UsePopperReturn, "attributes" | "styles"> & Pick<UsePopperContentReturn, "role">) => {
  ariaModal: vue.ComputedRef<string | undefined>;
  arrowStyle: vue.ComputedRef<CSSProperties>;
  contentAttrs: vue.ComputedRef<{
    [key: string]: string | boolean;
  }>;
  contentClass: vue.ComputedRef<((string | {
    [x: string]: boolean;
  } | (string | {
    [x: string]: boolean;
  } | (string | {
    [x: string]: boolean;
  } | (string | {
    [x: string]: boolean;
  } | (string | {
    [x: string]: boolean;
  } | (string | {
    [x: string]: boolean;
  } | (string | {
    [x: string]: boolean;
  } | (string | {
    [x: string]: boolean;
  } | (string | {
    [x: string]: boolean;
  } | (string | {
    [x: string]: boolean;
  } | (string | {
    [x: string]: boolean;
  } | (string | {
    [x: string]: boolean;
  } | any)[])[])[])[])[])[])[])[])[])[])[]) | undefined)[]>;
  contentStyle: vue.ComputedRef<StyleValue[]>;
  contentZIndex: vue.Ref<number, number>;
  updateZIndex: () => void;
};
type UsePopperContentDOMReturn = ReturnType<typeof usePopperContentDOM>;
//#endregion
export { UsePopperContentDOMReturn, usePopperContentDOM };