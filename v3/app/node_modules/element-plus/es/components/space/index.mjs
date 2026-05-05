import { withInstall } from "../../utils/vue/install.mjs";
import { spaceItemProps } from "./src/item.mjs";
import { useSpace } from "./src/use-space.mjs";
import Space, { spaceProps } from "./src/space.mjs";

//#region ../../packages/components/space/index.ts
const ElSpace = withInstall(Space);

//#endregion
export { ElSpace, ElSpace as default, spaceItemProps, spaceProps, useSpace };
//# sourceMappingURL=index.mjs.map