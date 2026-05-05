import { withInstall, withNoopInstall } from "../../utils/vue/install.mjs";
import { avatarEmits, avatarProps } from "./src/avatar.mjs";
import { avatarGroupContextKey } from "./src/constants.mjs";
import avatar_default from "./src/avatar2.mjs";
import { avatarGroupProps } from "./src/avatar-group-props.mjs";
import avatar_group_default from "./src/avatar-group.mjs";

//#region ../../packages/components/avatar/index.ts
const ElAvatar = withInstall(avatar_default, { AvatarGroup: avatar_group_default });
const ElAvatarGroup = withNoopInstall(avatar_group_default);

//#endregion
export { ElAvatar, ElAvatar as default, ElAvatarGroup, avatarEmits, avatarGroupContextKey, avatarGroupProps, avatarProps };
//# sourceMappingURL=index.mjs.map