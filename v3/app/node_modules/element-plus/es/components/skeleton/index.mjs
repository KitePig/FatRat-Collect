import { withInstall, withNoopInstall } from "../../utils/vue/install.mjs";
import { skeletonProps } from "./src/skeleton.mjs";
import { skeletonItemProps } from "./src/skeleton-item.mjs";
import skeleton_item_default from "./src/skeleton-item2.mjs";
import skeleton_default from "./src/skeleton2.mjs";

//#region ../../packages/components/skeleton/index.ts
const ElSkeleton = withInstall(skeleton_default, { SkeletonItem: skeleton_item_default });
const ElSkeletonItem = withNoopInstall(skeleton_item_default);

//#endregion
export { ElSkeleton, ElSkeleton as default, ElSkeletonItem, skeletonItemProps, skeletonProps };
//# sourceMappingURL=index.mjs.map