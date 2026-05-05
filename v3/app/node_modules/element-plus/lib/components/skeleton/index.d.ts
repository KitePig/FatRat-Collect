import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { SkeletonInstance, SkeletonProps, SkeletonPropsPublic, skeletonProps } from "./src/skeleton.js";
import { _default } from "./src/skeleton.vue.js";
import { SkeletonItemInstance, SkeletonItemProps, SkeletonItemPropsPublic, skeletonItemProps } from "./src/skeleton-item.js";
import { _default as _default$1 } from "./src/skeleton-item.vue.js";

//#region ../../packages/components/skeleton/index.d.ts
declare const ElSkeleton: SFCWithInstall<typeof _default> & {
  SkeletonItem: typeof _default$1;
};
declare const ElSkeletonItem: SFCWithInstall<typeof _default$1>;
//#endregion
export { ElSkeleton, ElSkeleton as default, ElSkeletonItem, SkeletonInstance, SkeletonItemInstance, SkeletonItemProps, SkeletonItemPropsPublic, SkeletonProps, SkeletonPropsPublic, skeletonItemProps, skeletonProps };