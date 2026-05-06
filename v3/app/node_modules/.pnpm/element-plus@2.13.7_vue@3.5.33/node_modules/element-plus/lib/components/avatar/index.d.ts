import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { AvatarEmits, AvatarProps, AvatarPropsPublic, avatarEmits, avatarProps } from "./src/avatar.js";
import { _default } from "./src/avatar.vue.js";
import { _default as _default$1 } from "./src/avatar-group.js";
import { AvatarGroupContext, avatarGroupContextKey } from "./src/constants.js";
import { AvatarGroupProps, AvatarGroupPropsPublic, avatarGroupProps } from "./src/avatar-group-props.js";
import { AvatarGroupInstance, AvatarInstance } from "./src/instance.js";

//#region ../../packages/components/avatar/index.d.ts
declare const ElAvatar: SFCWithInstall<typeof _default> & {
  AvatarGroup: typeof _default$1;
};
declare const ElAvatarGroup: SFCWithInstall<typeof _default$1>;
//#endregion
export { AvatarEmits, AvatarGroupContext, type AvatarGroupInstance, AvatarGroupProps, AvatarGroupPropsPublic, type AvatarInstance, AvatarProps, AvatarPropsPublic, ElAvatar, ElAvatar as default, ElAvatarGroup, avatarEmits, avatarGroupContextKey, avatarGroupProps, avatarProps };