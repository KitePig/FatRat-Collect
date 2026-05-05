import { withInstall, withNoopInstall } from "../../utils/vue/install.mjs";
import { anchorEmits, anchorProps } from "./src/anchor.mjs";
import anchor_default from "./src/anchor2.mjs";
import anchor_link_default from "./src/anchor-link2.mjs";

//#region ../../packages/components/anchor/index.ts
const ElAnchor = withInstall(anchor_default, { AnchorLink: anchor_link_default });
const ElAnchorLink = withNoopInstall(anchor_link_default);

//#endregion
export { ElAnchor, ElAnchor as default, ElAnchorLink, anchorEmits, anchorProps };
//# sourceMappingURL=index.mjs.map