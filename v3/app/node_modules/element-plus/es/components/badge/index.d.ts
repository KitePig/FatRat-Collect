import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { BadgeProps, BadgePropsPublic, badgeProps } from "./src/badge.js";
import { _default } from "./src/badge.vue.js";
import { BadgeInstance } from "./src/instance.js";

//#region ../../packages/components/badge/index.d.ts
declare const ElBadge: SFCWithInstall<typeof _default>;
//#endregion
export { type BadgeInstance, BadgeProps, BadgePropsPublic, ElBadge, ElBadge as default, badgeProps };