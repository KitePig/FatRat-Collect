Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_install = require('../../utils/vue/install.js');
const require_avatar = require('./src/avatar.js');
const require_constants = require('./src/constants.js');
const require_avatar$1 = require('./src/avatar2.js');
const require_avatar_group_props = require('./src/avatar-group-props.js');
const require_avatar_group = require('./src/avatar-group.js');

//#region ../../packages/components/avatar/index.ts
const ElAvatar = require_install.withInstall(require_avatar$1.default, { AvatarGroup: require_avatar_group.default });
const ElAvatarGroup = require_install.withNoopInstall(require_avatar_group.default);

//#endregion
exports.ElAvatar = ElAvatar;
exports.default = ElAvatar;
exports.ElAvatarGroup = ElAvatarGroup;
exports.avatarEmits = require_avatar.avatarEmits;
exports.avatarGroupContextKey = require_constants.avatarGroupContextKey;
exports.avatarGroupProps = require_avatar_group_props.avatarGroupProps;
exports.avatarProps = require_avatar.avatarProps;
//# sourceMappingURL=index.js.map