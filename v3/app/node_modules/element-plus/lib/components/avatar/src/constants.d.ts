import { AvatarProps } from "./avatar.js";
import { InjectionKey } from "vue";

//#region ../../packages/components/avatar/src/constants.d.ts
interface AvatarGroupContext {
  size?: AvatarProps['size'];
  shape?: AvatarProps['shape'];
}
declare const avatarGroupContextKey: InjectionKey<AvatarGroupContext>;
//#endregion
export { AvatarGroupContext, avatarGroupContextKey };