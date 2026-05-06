import { withInstall } from "../../utils/vue/install.mjs";
import { scrollbarEmits, scrollbarProps } from "./src/scrollbar.mjs";
import { BAR_MAP, GAP, renderThumbStyle } from "./src/util.mjs";
import { thumbProps } from "./src/thumb.mjs";
import { scrollbarContextKey } from "./src/constants.mjs";
import scrollbar_default from "./src/scrollbar2.mjs";

//#region ../../packages/components/scrollbar/index.ts
const ElScrollbar = withInstall(scrollbar_default);

//#endregion
export { BAR_MAP, ElScrollbar, ElScrollbar as default, GAP, renderThumbStyle, scrollbarContextKey, scrollbarEmits, scrollbarProps, thumbProps };
//# sourceMappingURL=index.mjs.map