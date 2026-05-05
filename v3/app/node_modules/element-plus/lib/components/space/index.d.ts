import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { Space, SpaceInstance, SpaceProps, SpacePropsPublic, spaceProps } from "./src/space.js";
import { SpaceItemInstance, SpaceItemProps, SpaceItemPropsPublic, spaceItemProps } from "./src/item.js";
import { useSpace } from "./src/use-space.js";

//#region ../../packages/components/space/index.d.ts
declare const ElSpace: SFCWithInstall<typeof Space>;
//#endregion
export { ElSpace, ElSpace as default, SpaceInstance, SpaceItemInstance, SpaceItemProps, SpaceItemPropsPublic, SpaceProps, SpacePropsPublic, spaceItemProps, spaceProps, useSpace };