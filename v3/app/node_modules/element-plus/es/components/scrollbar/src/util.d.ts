import { ThumbProps } from "./thumb.js";
import { CSSProperties } from "vue";

//#region ../../packages/components/scrollbar/src/util.d.ts
declare const GAP = 4;
declare const BAR_MAP: {
  readonly vertical: {
    readonly offset: "offsetHeight";
    readonly scroll: "scrollTop";
    readonly scrollSize: "scrollHeight";
    readonly size: "height";
    readonly key: "vertical";
    readonly axis: "Y";
    readonly client: "clientY";
    readonly direction: "top";
  };
  readonly horizontal: {
    readonly offset: "offsetWidth";
    readonly scroll: "scrollLeft";
    readonly scrollSize: "scrollWidth";
    readonly size: "width";
    readonly key: "horizontal";
    readonly axis: "X";
    readonly client: "clientX";
    readonly direction: "left";
  };
};
declare const renderThumbStyle: ({
  move,
  size,
  bar
}: Pick<ThumbProps, "move" | "size"> & {
  bar: (typeof BAR_MAP)[keyof typeof BAR_MAP];
}) => CSSProperties;
//#endregion
export { BAR_MAP, GAP, renderThumbStyle };