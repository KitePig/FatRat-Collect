import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { AnchorEmits, AnchorInstance, AnchorProps, AnchorPropsPublic, anchorEmits, anchorProps } from "./src/anchor.js";
import { _default } from "./src/anchor.vue.js";
import { _default as _default$1 } from "./src/anchor-link.vue.js";

//#region ../../packages/components/anchor/index.d.ts
declare const ElAnchor: SFCWithInstall<typeof _default> & {
  AnchorLink: typeof _default$1;
};
declare const ElAnchorLink: SFCWithInstall<typeof _default$1>;
//#endregion
export { AnchorEmits, AnchorInstance, AnchorProps, AnchorPropsPublic, ElAnchor, ElAnchor as default, ElAnchorLink, anchorEmits, anchorProps };