import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { ScrollbarDirection, ScrollbarEmits, ScrollbarInstance, ScrollbarProps, ScrollbarPropsPublic, scrollbarEmits, scrollbarProps } from "./src/scrollbar.js";
import { _default } from "./src/scrollbar.vue.js";
import { ThumbInstance, ThumbProps, ThumbPropsPublic, thumbProps } from "./src/thumb.js";
import { BAR_MAP, GAP, renderThumbStyle } from "./src/util.js";
import { ScrollbarContext, scrollbarContextKey } from "./src/constants.js";

//#region ../../packages/components/scrollbar/index.d.ts
declare const ElScrollbar: SFCWithInstall<typeof _default>;
//#endregion
export { BAR_MAP, ElScrollbar, ElScrollbar as default, GAP, ScrollbarContext, ScrollbarDirection, ScrollbarEmits, ScrollbarInstance, ScrollbarProps, ScrollbarPropsPublic, ThumbInstance, ThumbProps, ThumbPropsPublic, renderThumbStyle, scrollbarContextKey, scrollbarEmits, scrollbarProps, thumbProps };